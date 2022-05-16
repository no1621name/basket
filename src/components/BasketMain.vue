<template>
  <div class="basket-main">
    <button class="close close-button">x</button>
    <BasketList />
    <BasketInfo />
    <router-link to="/4d82F4gSiKXB4lZYih6gb1CW35sAtj9Q" class="registration-link" v-if="isEmpty">Order registration</router-link>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from 'vue';
import BasketList from '@/components/BasketList.vue';
import BasketInfo from '@/components/BasketInfo.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'BasketMain',
  components: {
    BasketList,
    BasketInfo
  },
  setup() {
    const store = useStore();
    const isEmpty = computed(() => store.getters.isEmpty);

    return {isEmpty};
  },
})
</script>

<style lang="scss" scoped>
.basket-main {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  overflow-y: scroll;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background: #fff;
  cursor: auto;
  opacity: 1;
  z-index: 3;
  transform: translateX(0%);
  transition: all .5s ease;
  width: 350px;
  .close-button {
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 15px;
  }
  .registration-link {
    display: block;
    color: #000;
    border: 1px solid #000;
    width: 170px;
    padding: 10px;
    text-decoration: none;
    margin: 80% auto 0 auto;
  }
}
</style>