import CryptoJS from 'crypto-js';

// Configure localstorage keys
const posts_key = 'posts',
    users = 'allusers',
    user_key = 'currentUser',
    secret = 'something';


// Users Functions

export function checkifLoggedIn(){
    let userLoggedIn = localStorage.getItem(user_key);
    return userLoggedIn ? { success: true, data: JSON.parse(userLoggedIn) } : {success: false, msg: 'No User currently Logged In'};
}
export function login(creditals){
    const {username,password} = creditals;
    let userLoggedIn = localStorage.getItem(user_key);
    if(userLoggedIn){
        //Already Logged In
        let userData = JSON.parse(userLoggedIn);
        return { success: false, msg:`Please logout from ${userData.username} to continue Login`};
    }else{
        //Login
        let allUsersData = localStorage.getItem(users),
            allUsers = allUsersData ? JSON.parse(allUsersData) : [];
        
        let usernameMatches = false;
        // [] [{username:'test',password:'uibknknuubhcgfhvjhubk'}]
        let credentialsMatches = allUsers.filter(user=>{
            if(user.username==username) usernameMatches=true;
            let decryptedPassword = (user.password) ? CryptoJS.AES.decrypt(user.password,secret) : false;
            return usernameMatches && decryptedPassword && decryptedPassword.toString(CryptoJS.enc.Utf8)==password;
        });
        if(credentialsMatches.length){
            // Set Current User Data 
            localStorage.setItem(user_key,JSON.stringify(credentialsMatches[0]));
            return { success: true, data: credentialsMatches[0] } 
        }else{
            return {success: false, msg: usernameMatches ? 'Incorrect Password!' : 'User Does not Exist! Please Register to Login!'};
        }
    }
}

export function signup({username, password}){
    let encryptedPassword = CryptoJS.AES.encrypt(password,secret),
        allUsers = localStorage.getItem(users),
        allUsersData = allUsers ? JSON.parse(allUsers) : [];
        let existingUser = allUsersData.filter(user=>user.username==username);
        if(existingUser.length) return {success:false, msg:'Username Already Exist'};
        let updatedUsers = [
            {
                userId: allUsersData.length+1,
                username: username,
                password: encryptedPassword.toString()
            },
            ...allUsersData
        ];
        console.log(updatedUsers);
        localStorage.setItem(users,JSON.stringify(updatedUsers))
    let currentUser = {
        userId: updatedUsers.length,
        username,
        password:encryptedPassword.toString()
    };
    localStorage.setItem(user_key,JSON.stringify(currentUser));
    return { 
        success: true, 
        data: currentUser
    }
}

//  Posts Functions

export function addPost({id = false, userId, author, title, description}){
    let existingPosts = localStorage.getItem(posts_key),
        initialPosts = existingPosts ? JSON.parse(existingPosts) : [];
    let updatedPosts = !id ? [
            {
                id: initialPosts.length+1,
                userId: userId,
                title: title,
                description: description,
                author: author
            },
            ...initialPosts
        ]: [];
        localStorage.setItem(posts_key,JSON.stringify(updatedPosts))
    return { 
        success: true, 
        data: {
            id: updatedPosts.length,
            userId,
            title,
            description
        }
    }
} 

export function fetchallPosts(userId = false){
    let existingPosts = localStorage.getItem(posts_key),
        allPosts = existingPosts ? JSON.parse(existingPosts) : [];
    return userId ? allPosts.filter(p=>p.userId==userId) : allPosts;
} 

export function logout(){
    localStorage.removeItem(user_key);
    return { sucess:true };
}