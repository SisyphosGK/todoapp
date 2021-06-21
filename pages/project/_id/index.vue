<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-3xsmall">
          <span class="u-color-primary"> {{ projectData.name }}</span>
        </h1>
        <p class="u-margin-bottom-medium u-margin-top-0">
          Deadline: <span class="u-color-primary"> {{ projectData.deadline }}</span>
        </p>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-bottom">
        <form @submit.prevent="addNewTask">
          <Input
            v-model="todoInputModel"
            tag="input"
            input-element="input"
            input-type="text"
            :has-label-text="false"
            placeholder="Add a task..."
          />
        </form>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-ends-small">
        <div class="u-display-flex u-justify-content-space-between u-align-items-center">
          <div>
            <h2 class="u-margin-0">Todo's</h2>
          </div>
        </div>

        <ListItem
          v-for="item in todoList"
          :id="item.id"
          :key="item.id"
          :task-name="item.name"
          :is-done="item.status"
          class="u-padding-ends-xsmall"
          @taskDeleted="onTaskDeleted"
          @updateTask="updateTask"
        />

        <div v-if="todoList.length < 1" class="u-margin-top">
          <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
          Todo list is empty
        </div>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-ends-small">
        <div class="u-display-flex u-justify-content-space-between u-align-items-center">
          <div>
            <h2 class="u-margin-0">Completed Tasks</h2>
          </div>
        </div>

        <ListItem
          v-for="item in completedTasks"
          :id="item.id"
          :key="item.id"
          :task-name="item.name"
          :is-done="item.status"
          class="u-padding-ends-xsmall"
          @taskDeleted="onTaskDeleted"
          @updateTask="updateTask"
        />

        <div v-if="completedTasks.length < 1" class="u-margin-top">
          <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
          No completed task found yet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_PROJECT_BY_ID } from '~/graphql/queries/index';
import { ADD_NEW_TASK, UPDATE_TASK } from '~/graphql/mutations/index';
import { getDateFromISO } from '~/utils/getDate';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';

export default {
  layout: 'page',

  data() {
    return {
      projectData: {
        name: null,
        deadline: null,
      },

      selectedCategory: 'todoApp',
      selectedFilter: 'Tümü',
      todoInputModel: '',

      allTasks: [],
      todoList: [],
      completedTasks: [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });

    this.getProjectInfo();
  },

  methods: {
    async getProjectInfo() {
      try {
        const response = await this.$apollo.query({
          query: GET_PROJECT_BY_ID,
          variables: {
            id: parseInt(this.$route.params.id, 10),
          },
        });

        this.projectData.name = response.data.job.name;
        this.projectData.deadline = getDateFromISO(response.data.job.deadline_at);

        this.allTasks = response.data.job.steps;
        this.sortTasks();
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    sortTasks() {
      this.todoList = [];
      this.completedTasks = [];

      this.allTasks.forEach(item => {
        let task = {
          id: item.id,
          name: item.name,
          status: item.status,
        };

        if (task.status == 0) {
          this.todoList.push(task);
        } else {
          this.completedTasks.push(task);
        }
      });
    },

    async addNewTask() {
      if (this.todoInputModel == '') {
        return;
      }

      try {
        const response = await this.$apollo.mutate({
          mutation: ADD_NEW_TASK,
          variables: {
            jobs_id: parseInt(this.$route.params.id, 10),
            name: this.todoInputModel,
            status: 0,
          },
        });

        let newTask = {
          id: response.data.createStep.id,
          name: response.data.createStep.name,
          status: response.data.createStep.status,
        };

        this.allTasks.push(newTask);
        this.sortTasks();

        this.todoInputModel = '';
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    async updateTask(params) {
      const { id, taskName, status } = params;

      try {
        const response = await this.$apollo.mutate({
          mutation: UPDATE_TASK,
          variables: {
            step_id: id,
            name: taskName,
            status: status,
          },
        });

        let index = this.allTasks.findIndex(i => i.id == id);
        this.allTasks[index].status = response.data.updateStep.status;
        this.sortTasks();
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    onTaskDeleted(id) {
      let index = this.allTasks.findIndex(i => i.id == id);

      if (index > -1) {
        this.allTasks.splice(index, 1);
      }

      this.sortTasks();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/abstracts/index';

.o-todo-list {
  @include list-unstyled();
}

.o-todo-filter {
  min-width: px-to-rem(200px);
}
</style>
