<template>
    <div>
        <h1 class = 'postTitle'>
            <router-link to = '/'>
            <button class = 'back'>
                Back
            </button>
            </router-link>
            {{post.title}}
            <div class = 'author'>
                - {{post.author}}
            </div>
        </h1>
        <div class = 'description'>
            {{post.description}}
        </div>
    </div>    
</template>
<script>
import {fetchPost} from './../db'
export default {
    name: "Post",
    created(){
        let {id} = this.$route.params;
        let response = fetchPost(id);
        if(response.success){
            this.post = response.data;
        }
    },
    data(){
        return {
            post: {
                title: '',
                description: '',
                author: ''
            },

        };
    }
}
</script>
<style scoped>
.postTitle{
    text-align: center;
    font-size: 48px;
}
.author{
    font-style: italic;
    font-size: 16px;
}
.description{
    color: #585555;
    font-size: 24px;
}
.back{
    float: left;
    padding: 8px;
    margin-top: 12px;
}
</style>