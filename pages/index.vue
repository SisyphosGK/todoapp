<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">{{ userName }} !</b>
        </h1>
      </div>
    </div>

    <div v-if="projects">
      <div class="row">
        <div
          v-for="(project, i) in projects"
          :key="i"
          class="
            col col-12 col--md-6 col--lg-4
            u-padding-right@2xl-up u-margin-bottom u-display-flex
          "
        >
          <BaseCard>
            <NuxtLink :to="`${ROUTE_NAMES.PROJECT.PATH}/${project.id}`">
              <h2>{{ project.name }}</h2>

              <p class="u-color-white u-margin-bottom">
                {{ getDateFromISOWithHourAndMinute(project.deadline_at) }}
              </p>

              <div>
                <b class="u-color-white">Toplam:</b>
                <span class="u-color-primary">{{ project.steps_count }}</span>
              </div>
            </NuxtLink>
          </BaseCard>
        </div>

        <div
          v-for="another in anothers"
          :key="another.id"
          class="
            col col-12 col--md-6 col--lg-4
            u-padding-right@2xl-up u-margin-bottom u-display-flex
          "
        >
          <BaseCard>
            <NuxtLink :to="`${ROUTE_NAMES.PROJECT.PATH}/${another.id}`">
              <h2>{{ another.name }}</h2>

              <p class="u-color-white u-margin-bottom">
                {{ getDateFromISOWithHourAndMinute(another.deadline_at) }}
              </p>

              <div>
                <b class="u-color-white">Toplam:</b>
                <span class="u-color-primary">{{ another.steps_count }}</span>
              </div>
            </NuxtLink>
          </BaseCard>
        </div>
      </div>

      <InfiniteLoading @infinite="infiniteHandler">
        <div slot="spinner">
          <div
            class="
              p-1
              text-center
              font-weight-bolder
              d-flex
              align-items-center
              justify-content-center
            "
          >
            Yükleniyor
          </div>
        </div>

        <div slot="no-more">
          <div class="p-1 text-center font-weight-bold">Hepsi bu kadar.</div>
        </div>

        <div slot="no-results">
          <div class="p-1 text-center font-weight-bold">Hiçbir sonuç bulunamadı.</div>
        </div>
      </InfiniteLoading>
    </div>

    <div v-else class="u-margin-top">
      <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
      Yapılacaklar listeniz boş
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { GET_ALL_PROJECTS, GET_USER_DATA } from '~/graphql/queries/index';
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import STORE_PAGES_HOME from '~/store/pages/home/constants';
import { mapGetters, mapActions } from 'vuex';
import { getDateFromISOWithHourAndMinute } from '~/utils/getDate';

import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: { InfiniteLoading },

  layout: 'page',

  async asyncData(context) {
    try {
      const response = await context.app.apolloProvider.defaultClient.query({
        query: GET_ALL_PROJECTS,
        variables: {
          limit: 12,
          page: 1,
        },
      });

      await context.store.dispatch(
        `${STORE_PAGES_HOME.BASE}/${STORE_PAGES_HOME.ACTIONS.SET_PROJECTS}`,
        response.data.jobs,
      );
    } catch (error) {
      if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

      if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
        context.app.$apolloHelpers.onLogout();
        context.redirect(302, ROUTE_NAMES.LOGIN.PATH);
      }
    }
  },

  data() {
    return {
      userName: null,
      hasProjects: true,

      page: 1,

      projects: null,
      anothers: [],

      ROUTE_NAMES,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });

    this.showProjects();
    this.getMeData();
  },

  methods: {
    async getMeData() {
      try {
        const response = await this.$apollo.query({
          query: GET_USER_DATA,
        });

        this.userName = response.data.me.name;
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },

    getDateFromISOWithHourAndMinute,

    ...mapGetters({
      getProjects: `${STORE_PAGES_HOME.BASE}/${STORE_PAGES_HOME.GETTERS.GET_PROJECTS}`,
    }),

    ...mapActions({
      setProjects: `${STORE_PAGES_HOME.BASE}/${STORE_PAGES_HOME.ACTIONS.SET_PROJECTS}`,
    }),

    showProjects() {
      this.projects = this.getProjects().data;
    },

    async infiniteHandler($state) {
      try {
        if (!this.getProjects().has_more_pages) {
          $state.complete();
          return;
        }

        this.page += 1;

        const response = await this.$apollo.query({
          query: GET_ALL_PROJECTS,
          variables: {
            limit: 12,
            page: this.page,
          },
        });

        if (!response.data.jobs.has_more_pages) {
          this.anothers.push(...response.data.jobs.data);
          $state.complete();
        } else {
          this.anothers.push(...response.data.jobs.data);
          $state.loaded();
        }
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
@import '../assets/styles/abstracts/index';

.o-todo-list {
  @include list-unstyled();

  color: $color-white;
}
</style>
