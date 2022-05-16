<template>
  <div class="basket-list">
    <span class="sort-method" @click="sortBasketList" v-if="isEmpty">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330"
        style="enable-background:new 0 0 330 330;"
        xml:space="preserve"
      >
        <path
          id="XMLID_224_"
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
          l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
          C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
        />
      </svg>
      by price
    </span>
    <span v-else>
      empty basket
    </span>
    <BasketItem
      v-for="(basketItem, ind) in basketList"
      :key="ind"
      :basketItemInfo="basketItem"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import BasketItem from '@/components/BasketItem.vue';
import { Item } from '@/store/modules/listItems';

export default defineComponent({
  name: 'BasketList',
  components: {
    BasketItem,
  },
  setup() {
    const store = useStore();
    const basketList = computed((): any => store.getters.basketList);
    const isEmpty = computed(() => store.getters.isEmpty);

    const sortBasketList = (e: any) => {
      e.target.classList.toggle('descending');

      if(e.target.classList.contains('descending')) {
          basketList.value.sort((a: Item, b: Item) => (a.price < b.price) ? 1 : (a.price == b.price) ? 0 : -1);
      } else {
        basketList.value.sort((a: Item, b: Item) => (a.price > b.price) ? 1 : (a.price == b.price) ? 0 : -1);
      }
    };

    return { basketList, sortBasketList, isEmpty };
  },
})
</script>

<style lang="scss" scoped>
.basket-list {
  width: 270px;
  height: 355px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid;
  padding: 10px;
  margin: 40px auto 0 auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar, &::-webkit-slider-thumb{
    width: thin;
  }
  > div:last-child{
    margin-bottom: 0;
  }
  .sort-method{
    margin-bottom: 10px;
    cursor: pointer;
    background: transparent;
    z-index: 1;
    user-select: none;
    svg {
      position: relative;
      z-index: -1;
      width: 10px;
      height: 10px;
      transition: transform .3s ease;
    }
    &.descending{
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>