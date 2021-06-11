<template>
  <header class="c-header">
    <div class="c-header__header">
      <div>
        <button class="c-header__button" type="button" @click="toggleNavbarVisibility">
          <svg-icon name="IconMenu" />
        </button>
      </div>

      <div class="c-header__brand">
        <NuxtLink :to="ROUTE_NAMES.HOME.PATH" class="c-header__brand--link">TodoAPP</NuxtLink>
      </div>

      <button type="button" class="c-header__button" @click="logout">
        <Tooltip content="Çıkış yap" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconExit" />
        </Tooltip>
      </button>
    </div>
  </header>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { mapGetters, mapActions } from 'vuex';
import STORE_GENERAL from '~/store/general/constants';
import { MOBILE_THRESHOLD_VALUE } from '~/project-constants/breakpoints';

export default {
  data() {
    return {
      ROUTE_NAMES,
    };
  },

  methods: {
    ...mapGetters({
      getNavbarVisibleStatus: `${STORE_GENERAL.BASE}/${STORE_GENERAL.GETTERS.GET_NAVBAR_VISIBLE_STATUS}`,
    }),

    ...mapActions({
      setNavbarVisibleStatus: `${STORE_GENERAL.BASE}/${STORE_GENERAL.ACTIONS.SET_NAVBAR_VISIBLE_STATUS}`,
    }),

    toggleNavbarVisibility() {
      this.setNavbarVisibleStatus(!this.getNavbarVisibleStatus());
    },

    logout() {
      let TOAST_OPTIONS;

      if (document.body.clientWidth < MOBILE_THRESHOLD_VALUE) {
        TOAST_OPTIONS = {
          position: 'top',
          duration: 2000,
          dismissible: true,
          queue: true,
          pauseOnHover: false,
        };
      } else {
        TOAST_OPTIONS = {
          position: 'top-right',
          duration: 3000,
          dismissible: true,
          queue: false,
          pauseOnHover: true,
        };
      }

      this.$apolloHelpers.onLogout();

      this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });

      this.$toast.success('Başarıyla çıkış yaptınız', TOAST_OPTIONS);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Header';
</style>
