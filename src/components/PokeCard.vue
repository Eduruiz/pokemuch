<template>
  <article class="column is-one-quarter">
    <div class="card">
      <header class="card-header">
        <h2 class="card-header-title is-centered">
          {{ pokemon.name }}
        </h2>
      </header>
      <div class="card-content">
        <div class="content">
          <img
            v-lazy="getPokemonSprite(pokemon.url)"
            :alt="pokemon.name">
        </div>
      </div>
      <footer class="card-footer">
        <button
          @click.prevent="$emit('show-pokemon-details', pokemon.url)"
          :aria-label="`${pokemon.name} details`"
          class="card-footer-item button">
          Pokémon Details
        </button>
      </footer>
    </div>
  </article>
</template>

<script>

import getPokemonIdFromURL from '@/helpers';

export default {
  name: 'PokeCard',
  props: ['pokemon'],
  methods: {
    getPokemonSprite(pokemonURL) {
      const pokemonId = getPokemonIdFromURL(pokemonURL);
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    },
  },
};
</script>
