<template>
    <div class="lWrapper">
        <form>
            <h1>SignUp</h1>
            <div>
                <input type="text" placeholder="username" required v-model="username"/>
                <input type="password" placeholder="password" required v-model="password"/>
            </div>
            <div v-if="errorMsg" class="error">{{errorMsg}}</div>
            <button @click="signup">Signup</button>
            <router-link to="/login"><a href="">Already a Member? Login Now.</a></router-link>
        </form>
    </div>
</template>
<script>
import { checkifLoggedIn, signup } from './../db';

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
        signup(e){
            e.preventDefault();
            if(this.username && this.password){
                this.errorMsg=false;
                let loginresponse = signup({username:this.username,password:this.password});
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
.signupWrapper{

}
.error{
    color:red;
}
</style>