<template>
  <transition name="slide-x">
    <nav v-if="isVisible" class="c-navbar">
      <Button
        theme="ghost"
        :is-circle="true"
        class="c-navbar__close u-display-none@lg-up"
        tag="button"
        @click.native="toggleNavbarVisibility"
      >
        <svg-icon name="IconCross" title="Kapat" />
      </Button>

      <div class="c-navbar__container">
        <div>
          <button
            v-for="(link, i) in navLinkDatas"
            :key="i"
            type="button"
            :class="[
              'c-navbar__link',
              'u-text-align-left@lg-up',
              link.path === $route.path ? 'is-active' : null,
            ]"
          >
            <svg-icon name="IconDot" :title="link.name" /> {{ link.name }}
          </button>
        </div>

        <Button theme="primary" class="u-margin-bottom" tag="NuxtLink" :to="ROUTE_NAMES.HOME.PATH">
          <svg-icon name="IconPlus" title="Yeni proje oluştur" /> Yeni proje oluştur
        </Button>
      </div>
    </nav>
  </transition>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { mapGetters } from 'vuex';
import STORE_GENERAL from '~/store/general/constants';

export default {
  data() {
    return {
      isVisible: false,

      ROUTE_NAMES,

      navLinkDatas: [
        {
          path: ROUTE_NAMES.HOME.PATH,
          name: ROUTE_NAMES.HOME.NAME,
        },
        {
          path: ROUTE_NAMES.HOME.PATH,
          name: ROUTE_NAMES.HOME.NAME,
        },
        {
          path: ROUTE_NAMES.HOME.PATH,
          name: ROUTE_NAMES.HOME.NAME,
        },
      ],
    };
  },

  computed: {
    watchNavbarVisibleStatus() {
      return this.getNavbarVisibleStatus();
    },
  },

  watch: {
    watchNavbarVisibleStatus() {
      this.toggleNavbarVisibility();
    },
  },

  methods: {
    ...mapGetters({
      getNavbarVisibleStatus: `${STORE_GENERAL.BASE}/${STORE_GENERAL.GETTERS.GET_NAVBAR_VISIBLE_STATUS}`,
    }),

    toggleNavbarVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Navbar';
</style>
