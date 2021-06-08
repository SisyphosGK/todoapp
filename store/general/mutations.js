import STORE_GENERAL from './constants';

export default {
  [STORE_GENERAL.MUTATIONS.SET_NAVBAR_VISIBLE_STATUS](state, payload) {
    state.isNavbarVisible = payload;
  },
};
