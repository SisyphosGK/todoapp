<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col--md-10 col--lg-8 col--xl-6 u-margin-sides-auto">
        <BaseCard>
          <h1 class="u-color-primary u-text-align-center u-margin-bottom-xlarge">TODOAPP</h1>
          <ValidationObserver ref="loginForm" tag="div">
            <div @submit.prevent>
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

              <div class="u-text-align-center u-margin-top-2xlarge">
                <Button
                  theme="ghost"
                  tag="button"
                  type="submit"
                  @click.native="loginFormValidation"
                >
                  Giriş yap
                </Button>
              </div>
            </div>
          </ValidationObserver>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          console.log('email', this.form.email);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/abstracts/index';
</style>
