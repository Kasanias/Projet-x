<template>
  <div class="home-page-container">
    <div
      class="home-container"
      :style="{ backgroundImage: `url('${require('@/assets/movies-background.jpg')}')` }"
    >
      <blockquote class="blockquote text-center">
        <p class="mb-0">Projet-X</p>
        <footer class="blockquote-footer">Qui considère l'étrange admet l'impossible</footer>
      </blockquote>

      <!-- Ce qui ira SUR l'image -->
    </div>
    <!--  Ce qui ira SOUS l'image -->
    <div class="movie-lists">
      <movie-list :request="this.requestUpcoming"></movie-list>
      <movie-list :request="this.requestNow"></movie-list>
      <movie-list :request="this.requestThisWeek"></movie-list>
    </div>
  </div>
</template>


<script>
import MovieList from "../components/MovieList.vue";
import store from "../store";
import { date_lastweek } from "../tools/WeeklyReleases.js";
import { date_today } from "../tools/WeeklyReleases.js";
import JQuery from "jquery";
let $ = JQuery;

export default {
  data() {
    return {
      requestUpcoming: {
        title: "Prochainement",
        url: "movie/upcoming",
        class: "upcomingContainer",
        query: {
          api_key: store.state.api_key,
          language: "fr-FR",
          region: "FR"
        }
      },
      requestNow: {
        title: "A l'affiche",
        url: "movie/now_playing",
        class: "nowContainer",
        query: {
          api_key: store.state.api_key,
          language: "fr-FR",
          region: "FR"
        }
      },
      requestThisWeek: {
        title: "Sorties de la semaine",
        class: "weekContainer",
        url: "discover/movie",
        query: {
          api_key: store.state.api_key,
          language: "fr-FR",
          region: "FR",
          "release_date.gte": date_lastweek, //format yyyy-mm-dd
          "release_date.lte": date_today
        }
      }
    };
  },
  components: {
    MovieList
  },
  methods: {
    handleScroll() {
      // console.log("Scrolling");
      // /**
      //  * Il faut sauter l'image peut importe où on est sur l'image
      //  * si on est au top de lécran, on saute 100vh, si à la moitié on saute 50vh
      //  */
      // let home_height = $(".home-container").height();
      // let page_position = $(window).scrollTop();
      // if (page_position <= home_height) {
      //   // on est toujours sur l'image
      //   console.log(home_height, page_position);
      //   let toScroll = home_height - page_position;
      //   $([document.documentElement, document.body]).animate(
      //     {
      //       scrollTop: $(".movie-lists").offset().top
      //     },
      //     1000
      //   );
      // }
      // else
      // {
      //   $([document.documentElement, document.body]).animate(
      //     {
      //       scrollTop: $(".home-container").offset().top
      //     },
      //     1000
      //   );
      // }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>


<style>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

.home-container {
  height: 100vh;
  width: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  position: relative;
}

.btn-header {
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: 70vw;
  z-index: 1;
}

.mb-0 {
  font-size: 8vw;
  padding-top: 25vh;
}
.blockquote-footer {
  font-size: 5vw;
  color: rgb(182, 5, 5);
}

.btn {
  z-index: 1;
}
</style>
