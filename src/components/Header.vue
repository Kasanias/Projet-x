<template>
  <div class="header-container">
    <div class="d-flex justify-content-center">
      <div class="searchbar">
        <input
          class="search_input"
          type="text"
          v-model="search_text"
          v-on:keyup.enter="search"
          name
          placeholder="Search..."
        >
        <a @click="search" class="search_icon">
          <i class="fas fa-search"></i>
        </a>
      </div>
    </div>
    <div class="btn-header">
      <button type="button" @click="toHome" class="btn btn-outline-light">Accueil</button>
      <button type="button" class="btn btn-outline-light">Films</button>
      <button type="button" class="btn btn-outline-light">Acteurs</button>
    </div>
  </div>
</template>


<script>
import store from "../store/";
import router from "../router/";
import debounce from "debounce";

import JQuery from "jquery";
let $ = JQuery;

export default {
  data() {
    return {
      search_text: ""
    };
  },
  watch: {
    search_text() {
      this.search();
    }
  },
  created() {
    this.search = debounce(this.search, 200);
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    search() {
      if (this.search_text != "") {
        console.log("searching...");
        router.push({
          name: "Page",
          params: {
            query: this.search_text,
            request_url: "search/movie",
            title: "Résultats pour: " + this.search_text
          }
        });
      }
    },
    toHome() {
      router.push({
        name: "Home"
      });
    },
    updateScroll() {
      if (!$(".header-container").offset().top) {
        $('.header-container').css('background', 'transparent');
      } else {
        $('.header-container').css('background', '#141414');
      }
    }
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
.header-container {
  height: 65px;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  background-color: transparent;
  transition: background 1s linear;
  -webkit-transition: background 1s linear;
  -moz-transition: background 1s linear;
}

/* .active {
  background-color: #141414;
} */

.btn-header {
  position: absolute;
  top: 10px;
  right: 10px;
}

.searchbar {
  position: absolute;
  top: 2px;
  left: 10px;
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #353b48;
  border-radius: 30px;
  padding: 10px;
  z-index: 3;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
  z-index: 3;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 200px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_icon {
  background: white;
  color: #e74c3c;
}

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: red;
}
</style>