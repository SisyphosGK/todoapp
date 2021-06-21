<template>
  <div>
    <li class="c-list-item" :class="{ 'is-done': status == 0 ? false : true }">
      <input
        :id="idComputed"
        type="checkbox"
        class="c-list-item__checkbox"
        :checked="status == 0 ? false : true"
        @change="setTaskStatus"
      />

      <label :for="idComputed"></label>

      <div class="u-margin-left">
        <button
          type="button"
          class="u-cursor-pointer u-color-white u-text-align-left"
          @click="listItemEditModal = true"
        >
          {{ name }}
        </button>
      </div>

      <span class="c-list-item__delete" @click="deleteTask"></span>
    </li>

    <modal :modal-state="listItemEditModal" @closeModal="listItemEditModal = false">
      <ValidationObserver ref="profileEditForm" tag="div">
        <form @submit.prevent>
          <!-- Task -->
          <ValidationProvider
            v-slot="{ errors }"
            name="Task"
            rules="required"
            class="u-margin-bottom"
            tag="div"
          >
            <Input
              v-model="nameInputModel"
              :is-invalid="errors.length > 0"
              tag="input"
              input-element="input"
              input-type="text"
              placeholder="Edit task"
            />
            <div class="u-color-danger">{{ errors[0] }}</div>
          </ValidationProvider>

          <div class="u-text-align-center u-margin-top-2xlarge">
            <Button theme="tertiary" tag="button" type="submit" @click.native="editTask">
              Update
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </modal>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { DELETE_TASK } from '~/graphql/mutations/index';
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

    isDone: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      name: this.taskName,
      nameInputModel: this.taskName,
      status: this.isDone,

      listItemEditModal: false,
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
    setTaskStatus() {
      this.status = this.status == 0 ? 1 : 0;
      this.editTask();
    },

    async editTask() {
      this.name = this.nameInputModel;
      this.$emit('updateTask', { id: this.id, taskName: this.name, status: this.status });
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
