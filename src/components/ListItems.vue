<template>
  <div class="list-main">
    <Item
      class="list-item"
      v-for="(item, ind) in list"
      :key="ind"
      :itemInfo="item"
      />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from 'vuex';
import Item from '@/components/Item.vue';

export default defineComponent({
  name: 'ListItems',
  components: {
    Item,
  },
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.list).value;

    return { list }
  }
});
</script>

<style lang="scss" scoped>
.list-main{
  width: min-content;
  margin: 50px auto 0 auto;
  .list-item {
    & + .list-item {
      margin-top: 20px;
    }
    &:last-child{
      margin-bottom: 10px;
    }
  }
}
</style>