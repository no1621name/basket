<template>
  <div class="main-view">
    <Interface />
    <ListItems />
    <ModalWindow />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListItems from '@/components/ListItems.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import Interface from '@/components/Interface.vue';

export default defineComponent({
  name: 'MainView',
  components: {
    ListItems,
    ModalWindow,
    Interface,
  },
  setup() {
  },
})
</script>
