<template>
  <div>
    <div
      class="home-container"
      :style="{ backgroundImage: `url('${require('@/assets/movies-background.jpg')}')` }"
    >
      <!-- Ce qui ira SUR l'image -->
    </div>
    <!--  Ce qui ira SOUS l'image -->
    <movie-list :request="this.requestUpcoming"></movie-list>
    <movie-list :request="this.requestNow"></movie-list>
    <movie-list :request="this.requestThisWeek"></movie-list>
  </div>
</template>


<script>
import MovieList from "../components/MovieList.vue";
import store from "../store";

/**
 * Avant de commencer, on récupère les dates au bon format pour les sorties de la semaine
 * Ca peut se faire de maniere plus propre dans un scrip js par exemple et l'importer ici
 */

var timestamp = new Date().getTime();
var date_not_formatted = new Date(timestamp);
var date_today = date_not_formatted.getFullYear() + "-";
if (date_not_formatted.getMonth() < 9) {
  date_today += "0";
}
date_today += date_not_formatted.getMonth() + 1;
date_today += "-";
if (date_not_formatted.getDate() < 10) {
  date_today += "0";
}
date_today += date_not_formatted.getDate();

var today = new Date();
var lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

var date_not_formatted = new Date(lastWeek);
var date_lastweek = date_not_formatted.getFullYear() + "-";
if (date_not_formatted.getMonth() < 9) {
  date_lastweek += "0";
}
date_lastweek += date_not_formatted.getMonth() + 1;
date_lastweek += "-";
if (date_not_formatted.getDate() < 10) {
  date_lastweek += "0";
}
date_lastweek += date_not_formatted.getDate();

console.log(date_lastweek)
console.log(date_today);

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
  }
};
</script>


<style>
body,
html {
  height: 100%;
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

.btn {
  z-index: 2;
}
</style>
