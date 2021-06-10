<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Nietzsche !</b>
        </h1>
      </div>
    </div>

    <div v-if="projects.length > 1" class="row">
      <div
        v-for="(project, i) in projects"
        :key="i"
        class="col col-12 col--2xl-4 u-padding-right@2xl-up u-margin-bottom"
      >
        <NuxtLink :to="project.link">
          <BaseCard>
            <h2>{{ project.name }}</h2>
            <p class="u-color-white">{{ project.deadline }}</p>
            <p class="u-color-white">
              <b>Toplam:</b>
              <span class="u-color-primary">{{ project.status.todoCount }}</span> <br />
              <b>Tamamlanan:</b>
              <span class="u-color-success">{{ project.status.isDoneCount }}</span> <br />
              <b>Devam eden:</b>
              <span class="u-color-warning">{{ project.status.inProgressCount }}</span>
            </p>
          </BaseCard>
        </NuxtLink>
      </div>
    </div>
    <div v-if="projects.length < 1" class="u-margin-top">
      <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
      Yapılacaklar listeniz boş
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
          deadline: '11.06.2021',

          status: {
            todoCount: 15,
            isDoneCount: 7,
            inProgressCount: 8,
          },
        },
        {
          link: ROUTE_NAMES.PROJECT2.PATH,
          name: ROUTE_NAMES.PROJECT2.NAME,
          deadline: '18.07.2021',

          status: {
            todoCount: 15,
            isDoneCount: 7,
            inProgressCount: 8,
          },
        },
        {
          link: ROUTE_NAMES.PROJECT3.PATH,
          name: ROUTE_NAMES.PROJECT3.NAME,
          deadline: '15.06.2021',

          status: {
            todoCount: 15,
            isDoneCount: 7,
            inProgressCount: 8,
          },
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
