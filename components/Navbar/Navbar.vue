<template>
  <nav class="c-navbar">
    <div class="c-navbar__container">
      <button
        type="button"
        :class="['c-navbar__link', ROUTE_NAMES.Project2.PATH === $route.path ? 'is-active' : null]"
        @click="setTodoCategory()"
      >
        <svg-icon name="IconWallet" title="Gurkan Kose" /> Gürkan Köse
      </button>

      <button
        type="button"
        :class="['c-navbar__link', ROUTE_NAMES.Project1.PATH === $route.path ? 'is-active' : null]"
        @click="setTodoCategory()"
      >
        <svg-icon name="IconInvoice" title="Yılmaz Oktav" /> Yılmaz Oktav
      </button>

      <button
        type="button"
        :class="['c-navbar__link', ROUTE_NAMES.HOME.PATH === $route.path ? 'is-active' : null]"
        @click="setTodoCategory()"
      >
        <svg-icon name="IconCheckmark" title="Todoapp" /> Todoapp
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import './Navbar';
</style>
