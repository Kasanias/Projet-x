<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="row">
    <div class="col-md-8">
      <iframe width="840" height="473" :src="video_id" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-md-4 col-desc">
      <p class="details">
        <span class="detail-name">{{title}} </span>
        <span v-if="this.release_year != null">({{ release_year }})</span>
      </p>
      <p class="details">
        <span v-if="this.is_adult" class="restriction">Adult</span>
        <span v-else class="restriction">Tous publics</span>
        <span v-if="this.runtime != null" class="runtime">({{ runtime }} min)</span>
         - 
        <span v-for="genre in genres" :key="genre.name" class="genre">
          <span>{{ genre.name }} </span>
        </span>
      </p>
      <div class="star-rating">
        <div class="back-stars">
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        
        <div id="stars" class="front-stars" style="width: 7%">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
          </div> <div id="note"> {{this.vote_average}}%</div>
        </div> 
      <p class="desc">
        {{ overview }}
      </p>
      <p class="details">
        <span class="detail-name">Réalisateur : </span>
        <span v-for="director in directors" :key="director" class="director">
          <span>{{ director }}</span>
        </span>
      </p>
      <p class="details">
        <span class="detail-name">Acteurs : </span>
        <span v-for="actor in cast" :key="actor" class="actor">
          <span>{{ actor }}</span>
        </span>
      </p>
    </div>
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
        title: "tamere",
        is_adult: false,
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
        directors: [],
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
      this.is_adult = res.adult;
      this.overview = res.overview;
      this.genres = res.genres;
      this.vote_average = res.vote_average * 10;
      $("#stars").width(this.vote_average + "%");
      $("#note").css({'color': this.popularity_color});
      this.backdrop_path = res.backdrop_path;
      this.poster_path = res.poster_path;
      this.videos = res.videos.results;
      this.runtime = res.runtime;
      if(this.videos[0]) {
        this.video_id += this.videos[0].key;
      }
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
      res.credits.crew.forEach(element => {
        if (element.job == 'Director') {
          this.directors.push(element.name);
        }
      });
      res.credits.cast.forEach(element => {
        if (this.cast.length <= 5) {
          this.cast.push(element.name);
        }
      });
      })
    .catch(err => {
      console.error(err);
    })
  }
}

</script>


<style>
body,
html {
  height: 100%;
  background-color: #141414;
}
#note {
  font-weight: bold;
}
.row {
  margin-left: 2%;
  margin-right: 2%;
}
.col-desc {
  padding-left: 15px;
}
.details {
  text-align: left;
}
.detail-name {
    font-weight: bold;
}
.restriction {
  font-size: 0.8em;
  border-style: solid;
  border-width: 1px;
}
.runtime {
  font-style: italic;
}
.director {
    font-style: italic;
    color: yellow;
}
.actor {
    font-style: italic;
    color: rgb(15, 124, 248);
}
.actor + .actor:before, .director + .director:before {
  content: ", ";
}
.genre {
    font-size: 0.8em;
    font-style: italic;
    font-weight: bold;
    color: red;
}
.genre + .genre:before {
  content: "| ";
}
.title {
  margin-bottom: 2%;
}
.desc {
  text-align: justify;
}
</style>
<style lang="scss">
%flex-display {
    display: flex;
}
.star-rating {
    @extend %flex-display;
    align-items: left;
    font-size: 1em;
    justify-content: left;
    margin-bottom: 3%;
}
.back-stars {
    @extend %flex-display;
    color: #bb5252;
    position: relative;
    text-shadow: 4px 4px 10px #843a3a;
    margin-right: 2%;
}
.front-stars {
    @extend %flex-display;
    color: #FFBC0B;
    overflow: hidden;
    position: absolute;
    text-shadow: 2px 2px 5px #d29b09;
    top: 0;
}
</style>