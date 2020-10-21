<template>
    <div>
        <h1 class="createposttitle">Post Creation</h1>
        <div class="postwrapper">
            <div>
                <span>title:</span><input type="text" placeholder="Enter Post Title" v-model="post.title"/>
                <div class="error" v-if="errors.title">{{errors.title}}</div>
            </div>
            <div>
                <span>description</span><textarea placeholder="Enter Post Description" v-model="post.description"></textarea>
                <div class="error" v-if="errors.description">{{errors.description}}</div>
            </div>
            <div>
                <button @click="createOrEditPost"> {{$route.params.id ? 'Update Post' : 'Create Post'}} </button>
            </div>
        </div>
    </div>    
</template>
<script>
import {addPost,checkifLoggedIn} from './../db'
export default {
    name: "PostCreation",
    created(){
        const { userId=false,id=false} = this.$route.params;
        console.log(userId,id);
        let LoggedInUser = checkifLoggedIn();
        if(LoggedInUser.success){
            const {username=false,userId=false} = LoggedInUser.data;
            this.post.userId = userId;
            this.post.author = username;
        }else{
            this.$router.push('/login');
        }
        // this.post = addPost(); 
    },
    data(){
        return {
            post:{
                id: false,
                userId: false,
                title: '',
                description: '',
                author: false
            },
            errors:{
                title: false,
                description:false
            }
        }
    },
    methods:{
        validateFields(){
            Object.keys(this.post).map(postkey=>{
                if(['title','description'].includes(postkey) && !this.post[postkey]){
                    this.errors[postkey]='This Field is Required!';
                }
            });
            return Object.values(this.errors).some(e=>e);
        },
        createOrEditPost(){
            this.errors={};
            if(!this.validateFields()){
                if(this.post.id){
                    //edit
                }else{
                    // create
                    console.log(this.post);
                    let status = addPost(this.post);
                    if(status.success){
                        console.log(status.data);
                        this.$router.push('/posts');
                    }else{
                        alert('Something Went Wrong');
                    }
                }
            }
        }
    }
}
</script>
<style scoped>
.error{
    color:red;
}
.createposttitle{
    text-align:center;
}
    .postwrapper{
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content:center;
    }
    .link{
        text-decoration: none;
        color:black;
    }
</style>