<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Nietzsche !</b>
        </h1>
      </div>

      <div
        v-for="(project, i) in projects"
        :key="i"
        class="col col-12 col--2xl-4 u-padding-right@2xl-up u-margin-bottom"
      >
        <NuxtLink :to="project.link">
          <BaseCard theme="primaryLight">
            <h2>{{ project.name }}</h2>
          </BaseCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default {
  layout: 'page',

  data() {
    return {
      projects: [
        {
          link: ROUTE_NAMES.PROJECT1.PATH,
          name: ROUTE_NAMES.PROJECT1.NAME,

          todos: [
            {
              id: 0,
              text: 'YK',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 1,
              text: 'YK',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 2,
              text: 'YK',
              date: '04.06.2021',
              isDone: false,
            },
          ],
        },
        {
          link: ROUTE_NAMES.PROJECT2.PATH,
          name: ROUTE_NAMES.PROJECT2.NAME,

          todos: [
            {
              id: 0,
              text: 'YO',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 1,
              text: 'YO',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 2,
              text: 'YO',
              date: '04.06.2021',
              isDone: false,
            },
          ],
        },
        {
          link: ROUTE_NAMES.PROJECT3.PATH,
          name: ROUTE_NAMES.PROJECT3.NAME,

          todos: [
            {
              id: 0,
              text: 'GK',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 1,
              text: 'GK',
              date: '04.06.2021',
              isDone: false,
            },
            {
              id: 2,
              text: 'GK',
              date: '04.06.2021',
              isDone: false,
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    onTaskStatusChange(id, status) {
      let item = this.todoList.find(i => i.id == id);

      if (item) {
        item.isDone = status;
      }
    },

    onTaskDelete(id) {
      let index = this.todoList.findIndex(i => i.id == id);

      if (index > -1) {
        this.todoList.splice(index, 1);
      }

      console.log(this.todoList);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/abstracts/index';

.o-todo-list {
  @include list-unstyled();
  color: white;
}
</style>
