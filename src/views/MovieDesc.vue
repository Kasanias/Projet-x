<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="row">
    <div class="col-md-8">
      <iframe width="840" height="473" :src="video_id" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-md-4">
      <p class="details">
        <span class="detail-name">Date de sortie : </span>
        {{ release_year }} (<span class="runtime">{{ runtime }} min</span>)
      </p>
      <p class="details">
        <span class="detail-name">Réalisateur : </span>
      </p>
      <p class="details">
        <span class="detail-name">Acteurs : </span>
      </p>
      <p class="details">
        <span class="detail-name">Genres : </span>
        <span v-for="genre in genres" :key="genre.name" class="genre">
          <span>{{ genre.name }} </span>
        </span>
      </p>
    </div>
      <p class="desc">
        {{ overview }}
      </p>
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
        runtime: 0,
        video_id: "https://www.youtube.com/embed/",
        crew: [],
        cast: []
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
      this.movie = res;
      this.title = res.title;
      this.overview = res.overview;
      this.genres = res.genres;
      this.vote_average = res.vote_average * 10;
      this.backdrop_path = res.backdrop_path;
      this.poster_path = res.poster_path;
      this.videos = res.videos.results;
      this.runtime = res.runtime;
      this.video_id += this.videos[0].key;
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
    this.$jsonp(host + "movie/" + this.id, {
      api_key: store.state.api_key,
      language: "en-US",
      append_to_response: "credits"
    }).then(res => {
      console.log(res);
      this.cast = res.cast.filter(x => x.job == "Director")
    })
  }
};
</script>


<style>
body,
html {
  height: 100%;
  background-color: #141414;
}

.details {
  text-align: left;
}
.detail-name {
    font-weight: bold;
}
.runtime {
  font-style: italic;
}
.genre {
    font-style: italic;
    color: red;
}
.title {
  margin-bottom: 2%;
}
.desc {
  margin-left: 5%;
  margin-right: 5%;
}
</style>
