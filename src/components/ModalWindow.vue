<template>
  <div
    :class="['modal-window', 'close', {'active-modal': isShowModalWindow}]"
    @click="closeModalBasket"
  >
   <template v-if="modalWindowContent == 'basket'">
     <BasketMain />
   </template>
   <template v-if="modalWindowContent == 'admin'">
     <AdminConfirmation />
   </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import BasketMain from '@/components/BasketMain.vue';
import AdminConfirmation from '@/components/AdminConfirmation.vue';

export default defineComponent({
  name: 'ModalWindow',
  components: {
    BasketMain,
    AdminConfirmation,
  },
  setup() {
    const store = useStore();
    const isShowModalWindow = computed(() => store.getters.isShowModalWindow);
    const modalWindowContent = computed(() => store.getters.modalWindowContent);

    const closeModalBasket = (e: any) => {
      if(e.target.classList.contains('close')) {
        store.commit('TOGGLE_MODAL_WINDOW', false);
      }
    }

    return { isShowModalWindow, modalWindowContent, closeModalBasket };
  },
})
</script>

<style lang="scss" scoped>

.modal-window {
  width: 100px;
  height: 100px;
  cursor: pointer;
  opacity: 0;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all .3s ease;
  &.active-modal{
    z-index: 2;
    opacity: 1;
  }
}
</style>
