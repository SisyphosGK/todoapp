<template>
  <div class="u-width-100%">
    <BaseCard class="c-project-item">
      <NuxtLink :to="`${ROUTE_NAMES.PROJECT.PATH}/${id}`">
        <h2>{{ projectName }}</h2>

        <p class="u-color-white u-margin-bottom">
          {{ getDateFromISO(deadlineAt) }}
        </p>

        <div>
          <b class="u-color-white">Total tasks:</b>
          <span class="u-color-primary">{{ stepsCount }}</span>
        </div>
      </NuxtLink>

      <div class="c-project-item__actions">
        <Button
          theme="tertiary"
          :is-small="true"
          :is-circle="true"
          class="c-project-item__actions--edit"
          type="button"
          tag="button"
          @click.native="editProjectModal = true"
        >
          <svg-icon name="IconEdit" title="Edit Project" />
        </Button>

        <Button
          theme="primary"
          :is-small="true"
          :is-circle="true"
          class="c-project-item__actions--delete"
          type="button"
          tag="button"
          @click.native="deleteProject"
        >
          <svg-icon name="IconCross" title="Delete Project" />
        </Button>
      </div>
    </BaseCard>

    <modal :modal-state="editProjectModal" @closeModal="editProjectModal = false">
      <h4 class="h2 u-margin-bottom-small">
        Edit Project <svg-icon name="IconPlus" :title="`Project: ${projectName}`" />
      </h4>

      <ValidationObserver ref="editProjectForm" tag="div">
        <form @submit.prevent>
          <ValidationProvider
            v-slot="{ errors }"
            name="Project Name"
            rules="required"
            tag="div"
            class="u-margin-bottom-large"
          >
            <Input
              v-model="projectFormData.projectName"
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
              v-model="projectFormData.deadline"
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
            <Button theme="primary" tag="button" type="submit" @click.native="editProject">
              Update
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </modal>
  </div>
</template>

<script>
import { DELETE_PROJECT, EDIT_PROJECT } from '~/graphql/mutations';
import { GET_USERS } from '~/graphql/queries';
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';
import { getDateFromISO } from '~/utils/getDate';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      default: 'Proje İsmi Girilmedi',
    },
    deadlineAt: {
      type: String,
      required: false,
      default: null,
    },
    stepsCount: {
      type: Number,
      required: false,
      default: null,
    },
    users: {
      type: Array,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      ROUTE_NAMES,

      editProjectModal: false,
      usersSelectModel: [],
      userSelectOptions: [],

      projectFormData: {
        projectName: this.projectName,
        deadline: this.deadlineAt,
        users: [],
      },
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getDateFromISO,

    async getUsers() {
      try {
        const response = await this.$apollo.query({
          query: GET_USERS,
        });

        this.allUsers = response.data.users;

        this.allUsers.forEach(user => {
          this.userSelectOptions.push({ label: user.name, value: user.id });
        });

        this.users.forEach(user => {
          this.usersSelectModel.push({ label: user.name, value: user.id });
        });

        // this.usersSelectModel = this.users;
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    async editProject() {
      if (this.usersSelectModel != null) {
        this.usersSelectModel.forEach(selectedUser => {
          this.projectFormData.users.push(selectedUser.value);
        });
      }

      try {
        await this.$apollo.mutate({
          mutation: EDIT_PROJECT,
          variables: {
            job_id: this.id,
            name: this.projectFormData.projectName,
            deadline_at: this.projectFormData.deadline,
            users: this.projectFormData.users,
          },
        });

        this.editProjectModal = false;

        this.$toast.success('Successfully updated');
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    async deleteProject() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_PROJECT,
          variables: {
            job_id: this.id,
          },
        });

        this.$toast.success('Project successfully removed');
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './ProjectItem';
</style>
