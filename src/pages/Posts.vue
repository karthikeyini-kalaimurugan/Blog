<template>
    <div :key="$route.params.userId">
        <h1 class="posttitle"><span v-if="!$route.params.userId">All</span><span v-else>My</span> Posts</h1>
        <div class="postwrapper">
            <div v-for="(post) in posts" :key="post.id" class="post">
                <router-link :to="`/post/${post.id}`" class="link">
                    <div>Title : {{post.title}}</div>
                    <div>Description: {{post.description}}</div>
                    <div>Author: {{post.author}}</div>
                </router-link>
                <router-link v-if="userId && post.userId == userId" :to="`${userId}/post/${post.id}`" class="link">Edit Post</router-link>
            </div>
        </div>
    </div>    
</template>
<script>
import {fetchallPosts,checkifLoggedIn} from './../db';
export default {
    name: "Posts",
    created(){
        this.updatePosts();
    },
    data(){
        return {
            userId:false,
            posts: []
        }
    },
    methods:{
        updatePosts(){
            const { userId=false} = this.$route.params;
            let LoggedInUser = checkifLoggedIn();
            this.posts=fetchallPosts(userId);
            if(LoggedInUser.success){
                this.userId= LoggedInUser.data.userId;
            }else{
               if(userId) this.$router.push('/')
            }
        }
    },
    watch:{
        '$route.params.userId'(){
            const { userId=false} = this.$route.params;
            this.posts=fetchallPosts(userId);
        }
    }
}
</script>
<style scoped>
.posttitle{
    text-align:center;
}
    .post{
        border:1px solid #ccc;
        padding:8px;
        margin:8px;
        max-width:300px;
    }
    .postwrapper{
        display:flex;
        flex-wrap: wrap;
        justify-content:center;
    }
    .link{
        text-decoration: none;
        color:black;
    }
</style>