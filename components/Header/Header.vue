<template>
  <div class="c-header">
    <header class="c-header__header">
      <NuxtLink :to="ROUTE_NAMES.HOME.PATH" class="c-header__brand">TodoAPP</NuxtLink>
    </header>
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
@import './Header';
</style>
