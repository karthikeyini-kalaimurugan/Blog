<template>
    <div class="header">
        <div class="titleWrapper"><h1>{{title}}</h1></div>
        <div class="menuOptions">
            <router-link to="/">
                <button class="accessBtn" >Home</button>
            </router-link>
            <router-link to="/login" v-if="!isLoggedIn">
                <button class="accessBtn" >Login/Signup</button>
            </router-link>
            <span v-else>
                <router-link :to="`/posts/${userId}`">
                    <button class="accessBtn" >My Posts</button>
                </router-link>
                <router-link :to="`/${userId}/post`">
                    <button class="accessBtn" >Create Blog</button>
                </router-link>
                <button class="accessBtn" @click="logout()">Logout</button>
            </span>
        </div>
    </div>
</template>
<script>
import {checkifLoggedIn, logout} from './../../db';
export default {
    name: 'Header',
    props: ['title'],
    created(){
        this.checkstatus();
    },
    mounted(){
        this.$emit('updateHeader',false);
    },
    data(){
        return {
            isLoggedIn: false,
            userId:false
        }
    },
    methods:{
        checkstatus(){
            let userdata = checkifLoggedIn();
            this.isLoggedIn=userdata.success;
            if(userdata.success)this.userId = userdata.data.userId;
        },
        logout(){
            let resp= logout();
            if(resp.sucess) this.isLoggedIn=false;
        }
    }
}
</script>
<style scoped>
.header{
    background-color: black;
    color:white;
    display:flex;
    align-items: center;
}
.titleWrapper{
    display: flex;
    flex:1;
}
.menuOptions{
    flex:1;
    text-align:right;
}
.accessBtn{
    padding: 8px;
    margin: 16px;
}

</style>