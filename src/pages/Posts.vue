<template>
    <div>
        <h1 class="posttitle">All Posts</h1>
        <div class="postwrapper">
            <div v-for="(post) in posts" :key="post.id" class="post">
                <router-link :to="`/post/${post.id}`" class="link">
                    <div>Title : {{post.title}}</div>
                    <div>Description: {{post.description}}</div>
                    <div>Author: {{post.author}}</div>
                </router-link>
            </div>
        </div>
    </div>    
</template>
<script>
import {fetchallPosts} from './../db';
export default {
    name: "Posts",
    created(){
        this.posts=fetchallPosts();
    },
    data(){
        return {
            posts: [
            //    {
            //         id: 1,
            //         userId: 2,
            //         title: 'First Post',
            //         description: 'First Post Description',
            //         author: 'Karthikeyini senthur'
            //     }
            ]
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