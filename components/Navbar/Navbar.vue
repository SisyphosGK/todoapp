<template>
  <nav class="c-navbar">
    <div class="c-navbar__container">
      <button
        v-for="(link, i) in navLinkDatas"
        :key="i"
        type="button"
        :class="[
          'c-navbar__link',
          'u-cursor-pointer',
          'u-text-align-left',
          link.path === $route.path ? 'is-active' : null,
        ]"
      >
        <svg-icon name="IconWallet" :title="link.name" /> {{ link.name }}
      </button>
    </div>
  </nav>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default {
  data() {
    return {
      ROUTE_NAMES,

      navLinkDatas: [
        {
          path: ROUTE_NAMES.PROJECT1.PATH,
          name: ROUTE_NAMES.PROJECT1.NAME,
        },
        {
          path: ROUTE_NAMES.PROJECT2.PATH,
          name: ROUTE_NAMES.PROJECT2.NAME,
        },
        {
          path: ROUTE_NAMES.PROJECT3.PATH,
          name: ROUTE_NAMES.PROJECT3.NAME,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import './Navbar';
</style>
