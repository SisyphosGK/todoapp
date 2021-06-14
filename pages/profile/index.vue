<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Nietzsche !</b>
        </h1>
      </div>
      <div class="col col--xs-12">
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
                v-model="form.fullname"
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
                v-model="form.email"
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
                v-model="form.password"
                :is-invalid="errors.length > 0"
                tag="input"
                input-element="input"
                input-type="password"
                placeholder="Şifre"
              />
              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Profil Resmi"
              rules="required"
              tag="div"
              class="u-margin-bottom-large"
            >
              <FileUpload
                v-model="form.profilePicture"
                @fileUploaded="file => (form.profilePicture = file)"
              />

              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <div class="u-text-align-center u-margin-top-2xlarge">
              <Button
                theme="ghost"
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
    </div>
  </div>
</template>

<script>
import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import { UPDATE_PROFILE } from '~/graphql/mutations';
import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default {
  layout: 'page',

  data() {
    return {
      form: {
        fullname: null,
        email: null,
        password: null,
        profilePicture: null,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    profileEditFormValidation() {
      this.$refs.profileEditForm.validate().then(async success => {
        if (success) {
          try {
            await this.$apollo.mutate({
              mutation: UPDATE_PROFILE,
              variables: {
                name: this.form.fullname,
                email: this.form.email,
                password: this.form.password,
                profilePicture: this.form.profilePicture,
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
</style>
