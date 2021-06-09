<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col--md-10 col--lg-8 col--xl-6 u-margin-sides-auto">
        <BaseCard>
          <h1 class="u-color-primary u-text-align-center u-margin-bottom-xlarge">
            TODOAPP - Kayıt Ol
          </h1>

          <ValidationObserver ref="registerForm" tag="div">
            <div @submit.prevent>
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
                  @click.native="registerFormValidation"
                >
                  Kayıt Ol
                </Button>

                <p>Zaten hesabın var mı? <NuxtLink to="/login">Giriş Yap</NuxtLink></p>
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
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          console.log('Full Name', this.form.fullName);
        }
      });
    },
  },
};
</script>
