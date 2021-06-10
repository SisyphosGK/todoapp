<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Nietzsche !</b>
        </h1>
      </div>
    </div>

    <div v-if="projects" class="row">
      <div
        v-for="(project, i) in projects"
        :key="i"
        class="col col-12 col--md-6 col--lg-4 u-padding-right@2xl-up u-margin-bottom u-display-flex"
      >
        <BaseCard>
          <NuxtLink :to="`projects/${project.id}`">
            <h2>{{ project.name }}</h2>

            <p class="u-color-white u-margin-bottom">
              {{ getDateFromISOWithHourAndMinute(project.deadline_at) }}
            </p>

            <div>
              <b class="u-color-white">Toplam:</b>
              <span class="u-color-primary">{{ todoCount }}</span>
            </div>

            <div>
              <b class="u-color-white">Tamamlanan:</b>
              <span class="u-color-success">{{ isDoneCount }}</span>
            </div>

            <div>
              <b class="u-color-white">Devam eden:</b>
              <span class="u-color-warning">{{ inProgressCount }}</span>
            </div>
          </NuxtLink>
        </BaseCard>
      </div>

      <div class="col">
        <div class="u-text-align-center">
          <NuxtLink :to="ROUTE_NAMES.PROJECTS.PATH">Hepsini Görüntüle</NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="u-margin-top">
      <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
      Yapılacaklar listeniz boş
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { GET_ALL_PROJECTS } from '~/graphql/queries/index';
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import STORE_PAGES_HOME from '~/store/pages/home/constants';
import { mapGetters } from 'vuex';
import { getDateFromISOWithHourAndMinute } from '~/utils/getDate';

export default {
  layout: 'page',

  async asyncData(context) {
    try {
      const response = await context.app.apolloProvider.defaultClient.query({
        query: GET_ALL_PROJECTS,
      });

      await context.store.dispatch(
        `${STORE_PAGES_HOME.BASE}/${STORE_PAGES_HOME.ACTIONS.SET_PROJECTS}`,
        response.data.jobs,
      );
    } catch (error) {
      if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

      if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHENTICATED) {
        context.app.$apolloHelpers.onLogout();
        context.redirect(302, ROUTE_NAMES.LOGIN.PATH);
      }
    }
  },

  data() {
    return {
      todoCount: 5,
      isDoneCount: 10,
      inProgressCount: 1,

      projects: null,

      MAXIMUM_VISIBLE_PROJECT_COUNT: 6,

      ROUTE_NAMES,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });

    this.showProjects();
  },

  methods: {
    getDateFromISOWithHourAndMinute,

    ...mapGetters({
      getProjects: `${STORE_PAGES_HOME.BASE}/${STORE_PAGES_HOME.GETTERS.GET_PROJECTS}`,
    }),

    showProjects() {
      this.projects = this.getProjects().slice(0, this.MAXIMUM_VISIBLE_PROJECT_COUNT);
    },

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

  color: $color-white;
}
</style>
