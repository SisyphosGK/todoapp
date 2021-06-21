<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-6 u-margin-sides-auto">
        <BaseCard class="o-user-card">
          <Button
            theme="primary"
            :is-small="true"
            :is-circle="true"
            class="o-user-card__edit"
            type="button"
            tag="button"
            @click.native="profileEditModalVisible = true"
          >
            <svg-icon name="IconEdit" title="Edit Profile" />
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

      <modal :modal-state="profileEditModalVisible" @closeModal="profileEditModalVisible = false">
        <ValidationObserver ref="profileEditForm" tag="div">
          <form @submit.prevent>
            <!-- Fullname -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Fullname"
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
                placeholder="Enter your fullname"
              />
              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <!-- E-Mail -->
            <ValidationProvider
              v-slot="{ errors }"
              name="E-Mail"
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
                placeholder="Enter your e-mail address"
              />
              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <!-- Current Password -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Current Password"
              rules="required"
              class="u-margin-bottom"
              tag="div"
            >
              <Input
                v-model="userData.current_password"
                :is-invalid="errors.length > 0"
                tag="input"
                input-element="input"
                input-type="password"
                placeholder="Enter your current password"
              />
              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <!-- New Password -->
            <ValidationProvider
              v-slot="{ errors }"
              name="New Password"
              class="u-margin-bottom"
              tag="div"
            >
              <Input
                v-model="userData.password"
                :is-invalid="errors.length > 0"
                tag="input"
                input-element="input"
                input-type="password"
                placeholder="Enter new password for change password"
              />
              <small>If you do not want to change your password, you can leave it blank.</small>

              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <!-- Upload file -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Profile Picture"
              tag="div"
              class="u-margin-bottom-large"
            >
              <FileUpload
                v-model="userData.profilePicture"
                @fileUploaded="file => (userData.profilePicture = file)"
              />

              <div class="u-color-danger">{{ errors[0] }}</div>
            </ValidationProvider>

            <div class="u-text-align-center u-margin-top-2xlarge">
              <Button
                theme="tertiary"
                tag="button"
                type="submit"
                @click.native="profileEditFormValidation"
              >
                Update
              </Button>
            </div>
          </form>
        </ValidationObserver>
      </modal>
    </div>
  </div>
</template>

<script>
import { GET_USER_DATA } from '~/graphql/queries';
import { UPDATE_PROFILE } from '~/graphql/mutations';
import { checkApiRequestErrors } from '~/utils/checkApiRequestErrors';

export default {
  layout: 'page',

  data() {
    return {
      profileEditModalVisible: false,

      userData: {
        fullname: null,
        email: null,
        current_password: null,
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

        this.checkProfilePictureSrc();

        this.$nuxt.$loading.finish();
      } catch (error) {
        if (checkApiRequestErrors({ that: this, error })) return;
      }
    },

    profileEditFormValidation() {
      this.$refs.profileEditForm.validate().then(async success => {
        if (success) {
          try {
            const response = await this.$apollo.mutate({
              mutation: UPDATE_PROFILE,
              variables: {
                name: this.userData.fullname,
                email: this.userData.email,
                password: this.userData.password,
                current_password: this.userData.current_password,
                profilePicture: this.userData.profilePicture,
              },
            });

            this.userData.profilePictureSrc = response.data.profile.profilePicture;
            this.checkProfilePictureSrc();

            this.profileEditModalVisible = false;

            this.$toast.success('Profile is updated');
          } catch (error) {
            if (checkApiRequestErrors({ that: this, error })) return;
          }
        }
      });
    },

    checkProfilePictureSrc() {
      if (this.userData.profilePictureSrc == null) {
        this.userData.profilePictureSrc = 'https://picsum.photos/200';
      }
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
