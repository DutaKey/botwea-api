const app = Vue.createApp({})

app.component('BaseLoadingSpinner', {
  props: ['size'],
  template: `
    <div
      class="loading-spinner"
      :class="size ? 'loading-spinner--' + size : ''"
      aria-live="polite"
      aria-busy="true">
      <div
        class="spinner"
        role="presentation">
        <svg class="container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path class="track" d="M2,16a14,14 0 1,0 28,0a14,14 0 1,0 -28,0" />
          <path class="indicator" d="M2,16a14,14 0 1,0 28,0a14,14 0 1,0 -28,0" />
        </svg>
      </div>
      <p class="label" v-if="$slots.default">
        <slot />
      </p>
    </div>
  `
})

app.mount('#app')
