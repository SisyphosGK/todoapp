<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col--md-10 col--lg-8 col--xl-6 u-margin-sides-auto">
        <BaseCard>
          <h1 class="u-color-primary u-text-align-center u-margin-bottom-xlarge">
            TODOAPP - Kayıt Ol
          </h1>

          <ValidationObserver ref="registerForm" tag="div">
            <form @submit.prevent>
              <!-- İsim Soyisim -->
              <ValidationProvider
                v-slot="{ errors }"
                name="Tam Ad"
                rules="required"
                class="u-margin-bottom"
                tag="div"
              >
                <Input
                  v-model="form.fullName"
                  :is-invalid="errors.length > 0"
                  tag="input"
                  input-element="input"
                  input-type="text"
                  placeholder="Tam Ad"
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
                  input-type="text"
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

              <!-- Şifre Onay -->
              <ValidationProvider
                v-slot="{ errors }"
                name="Şifre Onay"
                rules="required|confirmed:Şifre"
                class="u-margin-bottom"
                tag="div"
              >
                <Input
                  v-model="form.passwordConfirm"
                  :is-invalid="errors.length > 0"
                  tag="input"
                  input-element="input"
                  input-type="password"
                  placeholder="Şifre Onay"
                />
                <div class="u-color-danger">{{ errors[0] }}</div>
              </ValidationProvider>

              <div class="u-text-align-center u-margin-top-2xlarge">
                <Button
                  theme="ghost"
                  tag="button"
                  type="submit"
                  class="u-margin-bottom"
                  @click.native="registerFormValidation"
                >
                  Kayıt Ol
                </Button>

                <div>
                  Zaten hesabın var mı? <NuxtLink :to="ROUTE_NAMES.LOGIN.PATH">Giriş Yap</NuxtLink>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { REGISTER_MUTATION } from '~/graphql/mutations';
import { ROUTE_NAMES } from '~/project-constants/routeNames';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';

export default {
  layout: 'full',

  data() {
    return {
      ROUTE_NAMES,
      form: {
        fullName: null,
        email: null,
        password: null,
        passwordConfirm: null,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    registerFormValidation() {
      this.$refs.registerForm.validate().then(async success => {
        if (success) {
          try {
            const response = await this.$apollo.mutate({
              mutation: REGISTER_MUTATION,
              variables: {
                name: this.form.fullName,
                email: this.form.email,
                password: this.form.password,
              },
            });

            this.$apolloHelpers.onLogin(response.data.register.access_token);

            this.$router.push({ name: ROUTE_NAMES.HOME.NAME });

            this.$toast.success('Başarıyla üye olundu');
          } catch (error) {
            if (checkApiRequestErrors({ that: this, error })) return;
          }
        }
      });
    },
  },
};
</script>
