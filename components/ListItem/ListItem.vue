<template>
  <li class="c-list-item" :class="{ done: status == 0 ? false : true }">
    <input
      :id="idComputed"
      type="checkbox"
      class="c-list-item__checkbox"
      :checked="status == 0 ? false : true"
      @change="setTaskStatus"
    />

    <label :for="idComputed"></label>

    <div class="u-margin-left">
      {{ taskName }} <br />
      <small class="u-text-small"> {{ date }}</small>
    </div>

    <span class="c-list-item__delete" @click="deleteTask"></span>
  </li>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { DELETE_TASK, SET_TASK_STATUS } from '~/graphql/mutations/index';
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    taskName: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '04.06.2021',
    },
    isDone: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      status: 0,
    };
  },

  computed: {
    idComputed() {
      return `item-${this.id}`;
    },
  },

  mounted() {
    this.status = this.isDone;
  },

  methods: {
    async setTaskStatus() {
      try {
        const response = await this.$apollo.mutate({
          mutation: SET_TASK_STATUS,
          variables: {
            step_id: this.id,
            name: this.taskName,
            status: this.status == 0 ? 1 : 0,
          },
        });

        this.status = response.data.updateStep.status;
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },

    async deleteTask() {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_TASK,
          variables: {
            step_id: this.id,
          },
        });

        this.$emit('taskDeleted', this.id);
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

<style lang="scss">
@import './ListItem';
</style>
