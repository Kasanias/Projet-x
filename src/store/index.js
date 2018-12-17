import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';


Vue.use(Vuex)

const vuexLocal = new VuexPersist({
    storage: window.localStorage, // or window.sessionStorage or localForage
  })

const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state : {
            api_key : '664b51c6b810fc45fb826a0a9652ac40',
            api_host : 'https://api.themoviedb.org/3/',

            movie_genres : null,
        },

     mutations : {
         setMovieGenres(state, genres) {
             this.state.movie_genres = genres;
         }
    }

    
})

export default store