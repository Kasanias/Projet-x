
<template>
  <div class="cover-container">
    <img :src="'https://image.tmdb.org/t/p/w300' + this.movie.poster_path">
    <div class="title">{{this.title}}</div>
    <!-- <div class="year">{{this.release_year}}</div>
    <div class="title">{{this.title}}</div>
    <div class="genre">
      <div v-for="g in genre" :key="g">{{ g }}</div>
    </div>
    <div class="rank">{{this.movie.vote_average}}/10</div> -->
  </div>
</template>

<script>
import store from "../store";
import router from "../router";
export default {
  data() {
    return {
      genre: [],
      release_year: "",
      title: ""
    };
  },
  props: {
    movie: Object
  },
  methods: {
    toMovie() {
      console.log(typeof this.movie.id);
      router.push({
        name: "Movie",
        params: {
          id: this.movie.id
        }
      });
    }
  },
  /**
   * Looking for the genre of the movie and then formatting release date
   */
  created() {
    // store.state.movie_genres.forEach(element => {
    //   let array = this.movie.genre_ids;
    //   if (array.indexOf(element.id) != -1) {
    //     this.genre.push(element.name);
    //   }
    // });


    // this.title = (this.movie.title != null) ? this.movie.title : this.movie.name

    // this.release_year = (this.movie.release_date) ? this.movie.release_date.split("-")[0] : this.movie.first_air_date.split("-")[0];
  }
};
</script>
<style>
.cover-container {
  position: relative;
  max-width: 213px;
  max-height: 320px;
}



.title {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.rank {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-overflow: ellipsis;
  font-weight: bold;
}

.genre {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-overflow: ellipsis;
  width: 100%;
}

.year {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-overflow: ellipsis;
  width: 100%;
  font-weight: bolder;
}

li {
  display: inline;
}

.cover-container:hover img {
  /* grow */
  transform: scale(1.2);
  z-index: 10;
}
.cover-container:hover .title {
  opacity: 1;
}
.cover-container:hover .rank {
  opacity: 1;
}

.cover-container:hover .genre {
  opacity: 1;
}

.cover-container:hover .year {
  opacity: 1;
}

.cover-container:hover {
  box-shadow: 10px 10px 5px black;
}

img {
  width: 140px;
  height: 209px !important;
  display: block;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
  /* grow */
  transition: transform .2s; /* Animation */

}

title {
  visibility: hidden;
} 
</style>
