<template>
  <transition name="fade">
    <div v-if="loading" class="c-page-loading">
      <div class="u-margin-top-xlarge">{{ loadingText }}</div>
    </div>
  </transition>
</template>

<script>
import { LOADING_SCREEN_MIN_DURATION } from '~/project-constants/generic';

export default {
  data() {
    return {
      loadingText: 'Yükleniyor...',
      loading: true,
      startTime: Date.now(),
      finishTime: null,
      PAGE_FAST_LOAD_WAITING_THRESHOLD: 100, // Avarage finishTime for faster loading is 15.
    };
  },

  methods: {
    start(newText) {
      if (newText) {
        this.loadingText = newText;
      }

      this.loading = true;
    },

    finish() {
      this.finishTime = Date.now() - this.startTime;

      if (this.finishTime < this.PAGE_FAST_LOAD_WAITING_THRESHOLD) {
        setTimeout(() => {
          this.loading = false;
        }, LOADING_SCREEN_MIN_DURATION);
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './PageLoading';
</style>
