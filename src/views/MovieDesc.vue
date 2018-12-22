<template>
  <div>
    <div class="row">
    <div class="col-md-6">
      <iframe width="560" height="315" :src="video_id" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-md-6">
      <h1>{{ title }}</h1>

    </div>
    </div>
  </div>
</template>


<script>
import MovieList from "../components/MovieList.vue";
import store from "../store";
import { date_lastweek } from "../tools/WeeklyReleases.js";
import { date_today } from "../tools/WeeklyReleases.js";

export default {
  data() {
    return {
        title: "tamere",
        movie: null,
        overview: "",
        genres: [],
        vote_average: 0,
        popularity_color: "green",
        release_year: "",
        backdrop_path: "",
        poster_path: "",
        videos: [],
        video_id: "https://www.youtube.com/embed/"
    };
  },
  props: {
      id: String
  },
  created() {
    let host = store.state.api_host;
    this.$jsonp(host + "movie/" + this.id, {
      api_key: store.state.api_key,
      language: "en-US",
      append_to_response: "videos"
    }).then(res => {
      console.log(res.videos.results);
      this.movie = res;
      this.title = res.title;
      this.overview = res.overview;
      this.genres = res.genres;
      this.vote_average = res.vote_average * 10;
      this.backdrop_path = res.backdrop_path;
      this.poster_path = res.poster_path;
      this.videos = res.videos.results;
      this.video_id += this.videos[0].key;
      console.log(this.video_id);
      this.release_year = this.movie.release_date ? this.movie.release_date.split("-")[0] :
                          this.movie.first_air_date.split("-")[0];
      if (this.vote_average < 70) {
        this.popularity_color = "yellow";
      } else if (this.vote_average < 40) {
        this.popularity_color = "red";
      }
    })
    .catch(err => {
      console.error(err);
    })
  }
};
</script>


<style>
body,
html {
  height: 100%;
}
</style>
