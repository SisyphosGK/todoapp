<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col--md-10 col--lg-8 col--xl-6 u-margin-sides-auto">
        <BaseCard>
          <h1 class="u-color-primary u-text-align-center u-margin-bottom-xlarge">TODOAPP</h1>

          <ValidationObserver ref="loginForm" tag="div">
            <form @submit.prevent>
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

              <div class="u-text-align-center u-margin-top-2xlarge">
                <Button
                  theme="ghost"
                  tag="button"
                  type="submit"
                  @click.native="loginFormValidation"
                >
                  Giriş yap
                </Button>

                <p>Bir hesabın yok mu? <NuxtLink to="/register">Kayıt Ol</NuxtLink></p>
              </div>
            </form>
          </ValidationObserver>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { LOGIN_MUTATION } from '~/graphql/mutations/index';
import { MOBILE_THRESHOLD_VALUE } from '~/project-constants/breakpoints';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';

export default {
  layout: 'full',

  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    loginFormValidation() {
      let TOAST_OPTIONS;

      if (document.body.clientWidth < MOBILE_THRESHOLD_VALUE) {
        TOAST_OPTIONS = {
          position: 'top',
          duration: 2000,
          dismissible: true,
          queue: true,
          pauseOnHover: false,
        };
      } else {
        TOAST_OPTIONS = {
          position: 'top-right',
          duration: 3000,
          dismissible: true,
          queue: false,
          pauseOnHover: true,
        };
      }

      this.$refs.loginForm.validate().then(async success => {
        if (!success) {
          try {
            const response = await this.$apollo.mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                email: 'a',
                password: 'a',
              },
            });
            this.$apolloHelpers.onLogin(response.data.login.access_token);

            this.$router.push({ name: ROUTE_NAMES.HOME.NAME });

            this.$toast.success('Başarıyla giriş yaptınız', TOAST_OPTIONS);
          } catch (error) {
            if (checkApiRequestErrors({ that: this, error })) return;
          }
        }
      });
    },
  },
};
</script>
