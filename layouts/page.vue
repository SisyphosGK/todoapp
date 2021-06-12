<template>
  <div class="o-layout">
    <Header />

    <div class="o-layout__wrapper">
      <div class="o-layout__content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default {
  data() {
    return {
      ROUTE_NAMES,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './Layout';
</style>
