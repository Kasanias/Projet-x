<template>
  <div>
    <h1>{{this.title}}</h1>
    <div class="flex-container">
      <movie-cover class="cover-page" :movie="item" v-for="(item,n) in result_list" :key="n"/>
    </div>
    <i class="fas fa-arrow-down next_icon" v-if="this.result_list.length > 0" @click="next_page"/>
  </div>
</template>

<script>
/**
 * Le but de ce composant est de contenir le resultat des recherches. Le bouton pour passer à une autre page
 * récuperera le corps de la requête en modifiant la page. C'est donc un composant réutilisable pour n'importe quel type
 * de recherche utilisant les pages
 */

import MovieCover from "../components/MovieCover.vue";
import store from "../store/";
import JQuery from "jquery";
let $ = JQuery;

export default {
  data() {
    return {
      result_list: [],
      total_pages: 1,
      current_page: 1,
      body: {}
    };
  },
  props: {
    query: String,
    request_url: String,
    title: String
  },
  mounted() {
    let host = store.state.api_host;
    this.body = {
      api_key: store.state.api_key,
      language: "fr-FR"
    };
    /**
     * Si api_request -> c'est une recherche dans la BDD
     * Si ce n'est pas api_request -> c'est par exemple movie/upcoming, du coup on ajouter la region FR pour avoir
     * des bonnes informations sur les films en France
     */
    if (this.query != "api_request") {
      Object.assign(this.body, { query: this.query });
    }
    else {
      Object.assign(this.body, { region: "FR" });
    }
    console.log(this.body);
    Object.assign(this.body, { page: 1 });

    this.$jsonp(host + this.request_url, this.body)
      .then(res => {
        console.log(res);
        res.results.forEach(element => {
          if (element.poster_path != null) {
            this.result_list.push(element);
          }
        });

        this.total_pages = res.total_pages;
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    /**
     * Il suffit de faire une nouvelle requête en modifiant la page et en ajoutant la reponse dans notre liste
     */
    next_page() {
      let host = store.state.api_host;
      this.current_page++;
      this.body["page"] = this.current_page; // IL FAUT PEUT ETRE DES QUOTES

      this.$jsonp(host + this.request_url, this.body)
        .then(res => {
          res.results.forEach(element => {
            this.result_list.push(element);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  components: {
    MovieCover
  }
};
</script>



<style>
html,
body {
  height: 100%;
  width: 100%;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cover-page {
  margin: 15px;
}

.flexitem {
  display: flex;
  justify-content: center;
}

.next_icon {
  color: red;
  font-size: 30px;
}
</style>