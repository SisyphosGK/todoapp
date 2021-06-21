import { GRAPHQL_ERROR_MESSAGES } from '~/graphql/errors';
import { ROUTE_NAMES } from '~/project-constants/routeNames';

function checkApiRequestErrors(params) {
  const { that, error } = params;

  if (process.env.NUXT_ENV_MODE === 'development') console.log(error);

  const TOAST_OPTIONS = {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    queue: false,
    pauseOnHover: true,
  };

  if (error) {
    if (
      error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHORIZED ||
      error.graphQLErrors[0].message === GRAPHQL_ERROR_MESSAGES.UNAUTHENTICATED
    ) {
      that.$apolloHelpers.onLogout();
      that.$router.push({ name: ROUTE_NAMES.LOGIN.NAME });
    }

    if (that.$toast) {
      error.graphQLErrors.forEach(error => {
        Object.values(error.extensions.validation).forEach(validationMessages => {
          that.$toast.error(validationMessages[0], TOAST_OPTIONS);
        });
      });
    }

    return true;
  }
}

export { checkApiRequestErrors };
