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

      <NuxtLink :to="ROUTE_NAMES.PROFILE.PATH" class="c-header__button">
        <Tooltip content="Profil" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconUserCircle" />
        </Tooltip>
      </NuxtLink>
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

          <ValidationProvider
            v-slot="{ errors }"
            name="Kullanıcı Ata"
            tag="div"
            class="u-margin-bottom-large"
          >
            <v-select
              v-model="newProjectData.users"
              :class="errors.length > 0 ? 'is-invalid' : null"
              :options="userSelectOptions"
              placeholder="Kullanıcı Seçin"
            >
              <div slot="no-options" class="u-color-primary">Seçenek Bulunamadı</div>
            </v-select>

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
import { CREATE_PROJECT } from '~/graphql/mutations';
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import { GET_USERS } from '~/graphql/queries';

export default {
  data() {
    return {
      ROUTE_NAMES,

      addProjectModal: false,

      allUsers: [],
      userSelectOptions: [],

      newProjectData: {
        projectName: null,
        deadline: null,
        users: [],
      },
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    async validateAddProjectForm() {
      this.$refs.addProjectForm.validate().then(success => {
        if (success) {
          this.createNewProject();
        }
      });
    },

    async createNewProject() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_PROJECT,
          variables: {
            name: this.newProjectData.projectName,
            deadline_at: this.newProjectData.deadline,
            users: this.newProjectData.users,
          },
        });

        this.$toast.success('Proje başarıyla eklendi');
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },

    async getUsers() {
      try {
        const response = await this.$apollo.query({
          query: GET_USERS,
        });

        this.allUsers = response.data.users;

        this.allUsers.forEach(user => {
          this.userSelectOptions.push({ label: user.name, value: user.id });
        });
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
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
