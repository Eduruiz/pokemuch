<template>
  <div id="app" class="app">
    <AppHeader />
    <main class="container is-fluid">
      <div class="columns is-multiline">
        <dialog
          data-test="error-dialog"
          v-if="error"
          :open="error"
          class="dialog notification is-danger is-light">
          <p>Ops! {{ error.message }}</p>
          <button
            v-if="error.retryFunction"
            @click="error.retryFunction"
            class="button"
            type="button">
            {{ error.retryText ? error.retryText : 'Retry' }}
          </button>
        </dialog>

        <template v-if="!generationDetails">
          <GenerationCard
            v-for="(generation, key) in generations"
            :generation="generation"
            :loadingGeneration="loadingGeneration"
            @select-generation="handleSelectGeneration"
            :key="`generation-${key}`" />
        </template>

        <article
          class="columns is-multiline"
          v-if="generationDetails">
          <header class="list-header column is-full">
            <a
              data-test="remove-selection"
              @click.prevent="removeSelectedGeneration()"
              href="#">
              ◀ Back
            </a>
            <ul class="level">
              <li class="level-item has-text-centered">
                <div>
                  <p class="heading">Generation</p>
                  <p class="title is-uppercase">{{ generationDetails.name }}</p>
                </div>
              </li>
              <li class="level-item has-text-centered">
                <div>
                  <p class="heading">Pokémons</p>
                  <p class="title is-uppercase">{{ generationDetails.pokemon_species.length }}</p>
                </div>
              </li>
              <li class="level-item has-text-centered">
                <div>
                  <p class="heading">Region:</p>
                  <p class="title is-uppercase"> {{ generationDetails.main_region.name }} </p>
                </div>
              </li>
            </ul>
          </header>
          <PokeCard
            v-for="(pokemon, key) in generationDetails.pokemon_species"
            @show-pokemon-details="showPokemonDetails"
            :pokemon="pokemon"
            :key="`pokecart-${key}`" />
        </article>

        <Modal
          :loadingPokemon="loadingPokemon"
          :errorLoadingPokemon="errorLoadingPokemon"
          :selectedPokemon="selectedPokemon" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import MicroModal from 'micromodal';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import GenerationCard from './components/GenerationCard.vue';
import PokeCard from './components/PokeCard.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    GenerationCard,
    PokeCard,
    Modal,
  },
  data() {
    return {
      generations: null,
      generationDetails: null,
      loadingGeneration: false,

      loadingPokemon: false,
      errorLoadingPokemon: false,

      selectedPokemon: null,

      error: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    showPokemonDetails(pokemonURL) {
      this.errorLoadingPokemon = null;
      this.loadingPokemon = true;
      MicroModal.show('modal-details', {
        onClose: () => {
          this.selectedPokemon = null;
          return true;
        },
      });
      fetch(pokemonURL)
        .then((response) => response.json())
        .then((jsonData) => {
          this.selectedPokemon = jsonData;
          return true;
        })
        .then(() => {
          this.loadingPokemon = false;
          return true;
        })
        .catch((err) => {
          this.errorLoadingPokemon = err;
          this.loadingPokemon = false;
        });
    },
    removeSelectedGeneration() {
      this.generationDetails = null;
    },
    handleSelectGeneration(generationURL) {
      this.error = null;
      this.loadingGeneration = true;
      fetch(generationURL)
        .then((response) => response.json())
        .then((jsonData) => {
          this.generationDetails = jsonData;
          return true;
        })
        .then(() => {
          this.loadingGeneration = false;
          return true;
        })
        .catch((err) => {
          console.error(err);
          this.error = {};
          this.error.message = 'failed to fetch';
          this.loadingGeneration = false;
        });
    },
    getData() {
      const url = 'https://pokeapi.co/api/v2/generation/';

      fetch(url)
        .then(this.error = null)
        .then(this.loading = true)
        .then((response) => response.json())
        .then((jsonData) => {
          this.generations = jsonData.results;
          return true;
        })
        .then(() => {
          this.loading = false;
          return true;
        })
        .catch((err) => {
          console.error(err);
          this.error = {};
          this.error.message = 'failed to fetch';
          this.loadingGeneration = false;
          this.error.retryFunction = this.getData;
          this.error.retryText = 'Retry loading generations';
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
  @import "./assets/scss/index.scss";
</style>
