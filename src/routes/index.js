import VueRouter from 'vue-router';
import Login from './../pages/Login';
import Post from './../pages/Post';
import Posts from './../pages/Posts';
import PostCreation from './../pages/PostCreation';
import Signup from './../pages/Signup';
import Notfound from './../pages/Notfound';

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Posts
        }, 
        {
            path: '/login',
            component: Login
        }, 
        {
            path: '/signup',
            component: Signup
        }, 
        {
            path: '/post/:id',
            component: Post
        }, 
        {
            path: '/:userId/posts',
            component: Posts
        }, 
        {
            path: '/:userId/post/:id?',
            component: PostCreation
        }, 
        {
            path: '*',
            component: Notfound
        },
    ]
});
