import STORE_GENERAL from './constants';

export const setNavbarVisibleStatus = async ({ commit }, payload) => {
  commit(STORE_GENERAL.MUTATIONS.SET_NAVBAR_VISIBLE_STATUS, payload);
};
