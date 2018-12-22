import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MovieDesc from '@/views/MovieDesc'
import Page from '@/views/Page'

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
        },
        {
            path: '/:request_url/:query/:title',
            name : 'Page',
            component : Page,
            props : true,
          },
    ]
})