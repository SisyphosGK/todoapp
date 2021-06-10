<template>
  <div>
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

          <Button
            theme="primary"
            class="u-margin-bottom"
            tag="button"
            type="button"
            @click.native="addProjectModal = true"
          >
            <svg-icon name="IconPlus" title="Yeni proje oluştur" /> Yeni proje oluştur
          </Button>
        </div>
      </nav>
    </transition>

    <modal :modal-state="addProjectModal" @closeModal="addProjectModal = false">
      <h4 class="h2 u-margin-bottom-small">
        Yeni Proje Oluştur <svg-icon name="IconPlus" title="Yeni proje oluştur" />
      </h4>
      <ValidationObserver ref="addProjectForm" tag="div">
        <form @submit.prevent>
          <ValidationProvider
            v-slot="{ errors }"
            name="Proje İsmi"
            rules="required|email"
            tag="div"
            class="u-margin-bottom-large"
          >
            <Input
              v-model="newProjectData.projectName"
              tag="input"
              input-type="text"
              input-element="input"
              name="projectName"
              placeholder="Proje İsmi"
              :is-invalid="errors.length > 0"
              :has-label-text="false"
            />

            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="Proje Bitiş Tarihi"
            rules="required"
            tag="div"
            class="u-margin-bottom-large"
          >
            <DatePicker
              v-model="newProjectData.deadline"
              :is-invalid="errors.length > 0"
              :has-label-text="false"
              name="projectDeadline"
              placeholder="Proje Bitiş Tarihi"
            />

            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <div class="u-text-align-center">
            <Button
              theme="primary"
              tag="button"
              type="submit"
              @click.native="validateAddProjectForm"
            >
              Oluştur
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </modal>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { mapGetters } from 'vuex';
import STORE_GENERAL from '~/store/general/constants';

export default {
  data() {
    return {
      ROUTE_NAMES,
      isVisible: false,
      addProjectModal: false,

      newProjectData: {
        projectName: null,
        deadline: null,
      },

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
    validateaddProjectForm() {
      this.$refs.addProjectForm.validate().then(success => {
        if (success) {
          console.log(this.$refs.addProjectForm);
        }
      });
    },

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
