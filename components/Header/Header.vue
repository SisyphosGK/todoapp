<template>
  <header class="c-header">
    <div class="c-header__header">
      <button
        theme="tertiary"
        tag="button"
        type="button"
        class="c-header__button"
        @click="addProjectModal = true"
      >
        <Tooltip content="Yeni proje oluştur" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconPlus" title="Yeni proje oluştur" />
        </Tooltip>
      </button>

      <div class="c-header__brand">
        <NuxtLink :to="ROUTE_NAMES.HOME.PATH" class="c-header__brand--link">TodoAPP</NuxtLink>
      </div>

      <button type="button" class="c-header__button" @click="logout">
        <Tooltip content="Çıkış yap" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconExit" />
        </Tooltip>
      </button>
    </div>

    <modal :modal-state="addProjectModal" @closeModal="addProjectModal = false">
      <h4 class="h2 u-margin-bottom-small">
        Yeni Proje Oluştur <svg-icon name="IconPlus" title="Yeni proje oluştur" />
      </h4>

      <ValidationObserver ref="addProjectForm" tag="div">
        <form @submit.prevent>
          <ValidationProvider
            v-slot="{ errors }"
            name="Proje İsmi"
            rules="required"
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
  </header>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { MOBILE_THRESHOLD_VALUE } from '~/project-constants/breakpoints';

export default {
  data() {
    return {
      ROUTE_NAMES,
      addProjectModal: false,
      newProjectData: {
        projectName: null,
        deadline: null,
      },
    };
  },

  methods: {
    validateAddProjectForm() {
      this.$refs.addProjectForm.validate().then(success => {
        if (success) {
          console.log(this.$refs.addProjectForm);
        }
      });
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
