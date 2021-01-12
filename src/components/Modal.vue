<template>
  <div class="modal micromodal-slide" id="modal-details" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div
        class="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-details-title">

        <dialog
          :open="loadingPokemon"
          class="dialog notification is-success is-light">
          <p>Loading Pokémon data...</p>
        </dialog>

        <dialog
          :open="errorLoadingPokemon"
          class="dialog notification is-danger is-light">
          <p>Ops! {{ errorLoadingPokemon }}</p>
        </dialog>

        <template>
          <header class="modal__header">
            <figure class="modal__image">
              <img
                v-if="selectedPokemon"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`"
                :alt="selectedPokemon.name">
            </figure>

            <h1 class="modal__title" id="modal-details-title">
              {{ selectedPokemon ? selectedPokemon.name : 'Select a pokémon to see details' }}
            </h1>
          </header>
          <main
            v-if="selectedPokemon"
            class="modal__content"
            id="modal-details-content">
            <ul class="modal__list">
              <li>
                <strong>Number:</strong> {{ selectedPokemon.id }}
              </li>
              <li>
                <strong>Color:</strong> {{ selectedPokemon.color.name }}
              </li>
              <li>
                <strong>Genus:</strong> {{ getGenera(selectedPokemon.genera) }}
              </li>
              <li>
                <strong>Habitat:</strong> {{ selectedPokemon.habitat.name }}
              </li>
              <li>
                <strong>Shape:</strong> {{ selectedPokemon.shape.name }}
              </li>
            </ul>
          </main>
        </template>
        <footer class="modal__footer">
          <button
            class="button"
            data-micromodal-close
            aria-label="Close this dialog window">
            Close
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: [
    'selectedPokemon',
    'loadingPokemon',
    'errorLoadingPokemon',
  ],
  methods: {
    getGenera(generaArray) {
      return generaArray.find((genera) => genera.language?.name === 'en').genus;
    },
  },
};
</script>
