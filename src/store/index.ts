import { createStore } from 'vuex';
import adminStore from './modules/admin';
import basketStore from './modules/basket';
import listItemsStore from './modules/listItems';
import modalWindowStore from './modules/modalWindow';
import orderStore from './modules/order';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    listItemsStore,
    basketStore,
    modalWindowStore,
    adminStore,
    orderStore,
  }
})
