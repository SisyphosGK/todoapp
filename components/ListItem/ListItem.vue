<template>
  <li class="c-list-item" :class="{ done: isDone == 0 ? false : true }">
    <input
      :id="idComputed"
      type="checkbox"
      class="c-list-item__checkbox"
      :checked="isDone == 0 ? false : true"
      @change="changeTaskStatus"
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
// import { ROUTE_NAMES } from '~/project-constants/routeNames';
// import { SET_TASK_STATUS } from '~/graphql/mutations/index';
// import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
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

  computed: {
    idComputed() {
      return `item-${this.id}`;
    },
  },

  methods: {
    /*  async setTaskStatus() {
      try {
        const response = await this.$apollo.mutate({
          mutate: SET_TASK_STATUS,
          variables: {
            status: this.isDone == 0 ? 1 : 0,
          },
        });
        console.log(response);

        this.projectName = response.data.job.name;
        this.todoList = response.data.job.steps;
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },
*/
    changeTaskStatus(e) {
      const checked = e.target.checked;
      this.$emit('taskStatusChange', this.id, checked);
    },

    deleteTask(e) {
      this.$emit('taskDelete', this.id);
    },
  },
};
</script>

<style lang="scss">
@import './ListItem';
</style>
