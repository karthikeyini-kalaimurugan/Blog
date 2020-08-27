import VueRouter from 'vue-router';
import Firstpage from './../pages/Firstpage.vue';

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Firstpage
        }
    ]
});
