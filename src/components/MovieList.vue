<template>
  <div class="scrollmenu" :id="request.class">
    <div class="titre">
      <span @click="toPage">
        {{request.title}}
        <i class="fas fa-chevron-right"></i>
      </span>
      <i @click="prev" class="fas fa-chevron-left prev"></i>
      <i @click="next" class="fas fa-chevron-right next"></i>
    </div>
    <a v-for="(item,n) in movie_list" :key="n">
      <movie-cover :movie="item"/>
    </a>
  </div>
</template>


<script>
import store from "../store/";
import router from "../router/"
import MovieCover from "./MovieCover.vue";
import JQuery from "jquery";
let $ = JQuery;

export default {
  data() {
    return {
      movie_list: []
    };
  },
  props: {
    request: {
      title: String,
      url: String,
      class: String,
      query: Object //Il va contenir tous les paramètres de la requete
    }
  },
  components: {
    MovieCover
  },
  methods: {
    toPage() {
      router.push({
        name: "Page",
        params: {
          query: "api_request",
          request_url: this.request.url,
          title: this.request.title
        }
      });
    },
    prev() {
      let width = document.getElementById(this.request.class).offsetWidth;
      $("#" + this.request.class).animate({ scrollLeft: "-=" + width });
    },
    next() {
      let width = document.getElementById(this.request.class).offsetWidth;
      $("#" + this.request.class).animate({ scrollLeft: "+=" + width });
    }
  },
  mounted() {
    let host = store.state.api_host;

    this.$jsonp(host + this.request.url, this.request.query)
      .then(res => {
        res.results.forEach(element => {
          if (element.poster_path !== null) {
            this.movie_list.push(element);
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>


<style>
.container {
  width: 100%;
}

.titre {
  color: white;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 25px;
  margin-left: 5px;
  font-weight: bold;
  cursor: pointer;
}

span {
  position: absolute;
  left: 10px;
}

.prev {
  position: absolute;
  right: 40px;
}

.next {
  position: absolute;
  right: 10px;
}

.flexitem {
  display: flex;
  justify-content: center;
}

::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}

div.scrollmenu {
  overflow: scroll;
  overflow-y: hidden;

  white-space: nowrap;
  margin-top: 20px;
}

div.scrollmenu a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}
</style>
