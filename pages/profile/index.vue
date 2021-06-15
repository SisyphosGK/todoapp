<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <transition name="first-area">
        <div class="col col--xs-4 u-margin-sides-auto">
          <BaseCard class="o-user-card">
            <Button
              theme="primary"
              :is-small="true"
              :is-circle="true"
              class="o-user-card__edit"
              type="button"
              tag="button"
              @click.native="editFormVisible = true"
            >
              <svg-icon name="IconEdit" title="Profil Düzenle" />
            </Button>

            <img
              :src="userData.profilePictureSrc"
              :alt="userData.fullname"
              class="o-user-card__profile-picture"
            />

            <h2>{{ userData.fullname }}</h2>

            <a :href="`mailto:${userData.email}`">{{ userData.email }}</a>
          </BaseCard>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="editFormVisible" class="col col--xs-12">
          <ValidationObserver ref="profileEditForm" tag="div">
            <form @submit.prevent>
              <!-- İsim Soyisim -->
              <ValidationProvider
                v-slot="{ errors }"
                name="İsim Soyisim"
                rules="required"
                class="u-margin-bottom"
                tag="div"
              >
                <Input
                  v-model="userData.fullname"
                  :is-invalid="errors.length > 0"
                  tag="input"
                  input-element="input"
                  input-type="text"
                  placeholder="İsim Soyisim"
                />
                <div class="u-color-danger">{{ errors[0] }}</div>
              </ValidationProvider>

              <!-- E-Posta -->
              <ValidationProvider
                v-slot="{ errors }"
                name="E-Posta"
                rules="required|email"
                class="u-margin-bottom"
                tag="div"
              >
                <Input
                  v-model="userData.email"
                  :is-invalid="errors.length > 0"
                  tag="input"
                  input-element="input"
                  input-type="email"
                  placeholder="E-Posta"
                />
                <div class="u-color-danger">{{ errors[0] }}</div>
              </ValidationProvider>

              <!-- Şifre -->
              <ValidationProvider
                v-slot="{ errors }"
                name="Şifre"
                rules="required"
                class="u-margin-bottom"
                tag="div"
              >
                <Input
                  v-model="userData.password"
                  :is-invalid="errors.length > 0"
                  tag="input"
                  input-element="input"
                  input-type="password"
                  placeholder="Şifre"
                />
                <div class="u-color-danger">{{ errors[0] }}</div>
              </ValidationProvider>

              <!-- Dosya Yükleme -->
              <ValidationProvider
                v-slot="{ errors }"
                name="Profil Resmi"
                rules="required"
                tag="div"
                class="u-margin-bottom-large"
              >
                <FileUpload
                  v-model="userData.profilePicture"
                  @fileUploaded="file => (form.profilePicture = file)"
                />
                <div class="u-color-danger">{{ errors[0] }}</div>
              </ValidationProvider>

              <div class="u-text-align-center u-margin-top-2xlarge">
                <Button
                  theme="ghost"
                  tag="button"
                  type="submit"
                  @click.native="editFormVisible = false"
                >
                  Geri Dön
                </Button>

                <Button
                  theme="tertiary"
                  tag="button"
                  type="submit"
                  @click.native="profileEditFormValidation"
                >
                  Güncelle
                </Button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import { GET_USER_DATA } from '~/graphql/queries';
import { UPDATE_PROFILE } from '~/graphql/mutations';
import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default {
  layout: 'page',

  data() {
    return {
      editFormVisible: false,

      userData: {
        fullname: null,
        email: null,
        password: null,
        profilePicture: null,
        profilePictureSrc: null,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getMeData();
    });
  },

  methods: {
    async getMeData() {
      try {
        const response = await this.$apollo.query({
          query: GET_USER_DATA,
        });

        this.userData.fullname = response.data.me.name;
        this.userData.email = response.data.me.email;
        this.userData.profilePictureSrc = response.data.me.profilePicture;
        console.log(response.data.me);

        this.$nuxt.$loading.finish();
      } catch (error) {
        if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

        if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
          this.$apolloHelpers.onLogout();
          this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
        }
      }
    },

    profileEditFormValidation() {
      this.$refs.profileEditForm.validate().then(async success => {
        if (success) {
          try {
            await this.$apollo.mutate({
              mutation: UPDATE_PROFILE,
              variables: {
                name: this.userData.fullname,
                email: this.userData.email,
                password: this.userData.password,
                profilePicture: this.userData.profilePicture,
              },
            });

            this.$toast.success('Profil Güncellendi');
          } catch (error) {
            if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

            if (error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED) {
              this.$apolloHelpers.onLogout();
              this.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
            }
          }
          console.log('Profil edit' + success);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/abstracts/index';

.o-user-card {
  text-align: center;

  &__profile-picture {
    max-width: px-to-rem(128px);
    margin-bottom: gap();
    border-radius: 50%;
  }
  &__edit {
    position: absolute;
    //stylelint-disable
    top: 30px;
    right: 30px;
    //stylint-enable
  }
}
</style>
