import { ROUTE_NAMES } from '~/project-constants/routeNames';

export default async function (context) {
  const routeName = context.route.name;

  if (routeName === null) {
    // Nuxt returns null when page can not be found
    return;
  }

  if (!context.$apolloHelpers.getToken() && routeName !== ROUTE_NAMES.LOGIN.NAME) {
    context.redirect(302, ROUTE_NAMES.LOGIN.PATH);
  }

  if (!!context.$apolloHelpers.getToken() && routeName === ROUTE_NAMES.LOGIN.NAME) {
    context.redirect(302, ROUTE_NAMES.HOME.PATH);
  }
}
