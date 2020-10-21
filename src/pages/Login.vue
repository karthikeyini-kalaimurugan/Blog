<template>
    <div class="loginWrapper">
        <form>
            <h1>Login</h1>
            <div>
                <input type="text" placeholder="username" required v-model="username"/>
                <input type="password" placeholder="password" required v-model="password"/>
            </div>
            <div v-if="errorMsg" class="error">{{errorMsg}}</div>
            <button @click="login">Login</button>
            <router-link to="/signup"><a href="">Not a Member? Register Now.</a></router-link>
        </form>
    </div>
</template>
<script>
import { checkifLoggedIn, login } from './../db';

export default {
    name: "Login",
    created(){
        let isLoggedIn = checkifLoggedIn();
        if(isLoggedIn.success) this.$router.push('/');
    },
    data(){
        return {
            username: '',
            password:'',
            errorMsg:false,
        }
    },
    methods:{
        login(e){
            e.preventDefault();
            if(this.username && this.password){
                this.errorMsg=false;
                let loginresponse = login({username:this.username,password:this.password});
                if(loginresponse.success){
                    this.$emit('updateHeader',true)
                    this.$router.push('/');
                }else{
                    this.errorMsg=loginresponse.msg;
                }
            }else{
                this.errorMsg='Username & Password are required!';
            }
        }
    }
}
</script>
<style scoped>
.loginWrapper{

}
.error{
    color:red;
}
</style>