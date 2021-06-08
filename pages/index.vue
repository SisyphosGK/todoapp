<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Nietzsche !</b>
        </h1>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-bottom">Ana sayfa</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'page',

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },
};
</script>
