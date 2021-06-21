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
        <Tooltip content="Create new project" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconPlus" title="Create new project" />
        </Tooltip>
      </button>

      <div class="c-header__brand">
        <NuxtLink :to="ROUTE_NAMES.HOME.PATH" class="c-header__brand--link">
          <svg-icon name="IconCheckmark" title="TodoApp" /> TodoAPP</NuxtLink
        >
      </div>

      <NuxtLink :to="ROUTE_NAMES.PROFILE.PATH" class="c-header__button">
        <Tooltip content="Profile" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconUserCircle" />
        </Tooltip>
      </NuxtLink>

      <button type="button" class="c-header__button" @click="logout">
        <Tooltip content="Logout" theme="material" :hide-on-mobile="true">
          <svg-icon name="IconExit" />
        </Tooltip>
      </button>
    </div>

    <modal :modal-state="addProjectModal" @closeModal="addProjectModal = false">
      <h4 class="h2 u-margin-bottom-small">
        Create New Project <svg-icon name="IconPlus" title="Create New Project" />
      </h4>

      <ValidationObserver ref="addProjectForm" tag="div">
        <form @submit.prevent>
          <ValidationProvider
            v-slot="{ errors }"
            name="Project Name"
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
              placeholder="Project Name"
              :is-invalid="errors.length > 0"
              :has-label-text="false"
            />

            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="Project deadline"
            rules="required"
            tag="div"
            class="u-margin-bottom-large"
          >
            <DatePicker
              v-model="newProjectData.deadline"
              :is-invalid="errors.length > 0"
              :has-label-text="false"
              name="projectDeadline"
              placeholder="Project deadline"
            />

            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="Select User"
            tag="div"
            class="u-margin-bottom-large"
          >
            <v-select
              v-model="usersSelectModel"
              :class="errors.length > 0 ? 'is-invalid' : null"
              :options="userSelectOptions"
              placeholder="Select user"
              multiple
            >
              <div slot="no-options" class="u-color-primary">Not found any options</div>
            </v-select>

            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <div class="u-text-align-center">
            <Button theme="primary" tag="button" type="submit" @click.native="createNewProject">
              Create
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
import { GET_USERS, LOGOUT } from '~/graphql/queries';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';

export default {
  data() {
    return {
      ROUTE_NAMES,

      addProjectModal: false,

      allUsers: [],
      usersSelectModel: [],
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
    createNewProject() {
      this.$refs.addProjectForm.validate().then(async success => {
        if (success) {
          if (this.usersSelectModel != null) {
            this.usersSelectModel.forEach(selectedUser => {
              this.newProjectData.users.push(selectedUser.value);
            });
          }

          try {
            await this.$apollo.mutate({
              mutation: CREATE_PROJECT,
              variables: {
                name: this.newProjectData.projectName,
                deadline_at: this.newProjectData.deadline,
                users: this.newProjectData.users,
              },
            });

            this.addProjectModal = false;

            this.$toast.success('Successfully add new project');
          } catch (error) {
            if (checkApiRequestErrors({ that: this, error })) return;
          }
        }
      });
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
        if (checkApiRequestErrors({ that: this, error })) return;
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

      try {
        this.$apollo.query({
          query: LOGOUT,
        });

        this.$apolloHelpers.onLogout();
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }

      this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });

      this.$toast.success('Başarıyla çıkış yaptınız', TOAST_OPTIONS);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Header';
</style>
