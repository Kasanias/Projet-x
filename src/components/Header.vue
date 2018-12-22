<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="searchbar">
        <input class="search_input" type="text" name placeholder="Search...">
        <a href="#" class="search_icon">
          <i class="fas fa-search"></i>
        </a>
      </div>
    </div>
    <div class="btn-header">
      <button type="button" class="btn btn-outline-light">Films</button>
      <button type="button" class="btn btn-outline-light">Acteurs</button>
      <button type="button" class="btn btn-outline-light">Autres</button>
    </div>
  </div>
</template>


<script>
import store from "../store/";
import router from "../router/";
// import debounce from "debounce";

import JQuery from "jquery";
let $ = JQuery;

export default {};
</script>

<style>
.searchbar {
  position: absolute;
  left : 10px;
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
  color: white;
}
</style>