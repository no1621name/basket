const modalWindowStore = {
  state: {
    isShowModalWindow: false,
    modalWindowContent: '',
  },
  getters: {
    isShowModalWindow: ({isShowModalWindow}: any) => isShowModalWindow,
    modalWindowContent: ({modalWindowContent}: any) => modalWindowContent,
  },
  mutations: {
    TOGGLE_MODAL_WINDOW(state: any, bool: boolean): void {
      state.isShowModalWindow = bool;
    },
    CHANGE_MODAL_WINDOW_CONTENT(state: any, content: string) {
      state.modalWindowContent = content;
    }
  },
  actions: {
  },
};

export default modalWindowStore;