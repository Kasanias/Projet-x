import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MovieDesc from '@/views/MovieDesc'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/movie/:id',
            name: 'MovieDesc',
            component: MovieDesc,
            props: true
        }
    ]
})