<template>
  <div class="registraton-list">
    <h4>Your order:</h4>
    <RegistrationItem
      v-for="(item, ind) in basketList"
      :key="ind"
      :basketItemInfo="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex';
import RegistrationItem from '@/components/RegistrationItem.vue';

export default defineComponent({
  name: 'RegistrationList',
  components: {
    RegistrationItem
  },
  setup() {
    const store = useStore();
    const basketList = computed(() => store.getters.basketList);

    return { basketList };
  }
})
</script>

<style lang="scss" scoped>
.registraton-list{
  overflow-y: scroll;
  width: 140px;
  height: 100%;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  border-right: 1px solid #000;
}
</style>