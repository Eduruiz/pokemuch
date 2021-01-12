<template>
  <article class="column is-one-quarter">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
        {{ generation.name }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
        </div>
      </div>
      <footer class="card-footer">
        <button
          @click.prevent="handleClick(generation.url)"
          :class="{ 'is-loading': loadingGeneration }"
          class="card-footer-item button">
          Details
        </button>
      </footer>
    </div>
  </article>
</template>

<script>

export default {
  name: 'GenerationCard',
  props: ['generation'],
  data() {
    return {
      loadingGeneration: false,
    };
  },
  methods: {
    handleClick(url) {
      this.loadingGeneration = true;
      this.$emit('select-generation', url);
    },
  },
};
</script>
