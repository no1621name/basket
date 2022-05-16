<template>
  <div class="basket-info">
    <p>Cost: <span class="decorate"></span> {{allBasketItemsCost}}</p>
    <p>Delivery cost: <span class="decorate"></span> {{deliveryCost}}</p>
    <p>Total: <span class="decorate"></span> {{total}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: 'BasketInfo',
  setup() {
    const store = useStore();
    const allBasketItemsCost = computed(() => store.getters.allBasketItemsCost);
    const deliveryCost = computed(() => store.getters.deliveryCost);

    const total = computed(() => allBasketItemsCost.value + deliveryCost.value);

    return { allBasketItemsCost, deliveryCost, total };
  }
})
</script>

<style lang="scss" scoped>
.basket-info{
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  justify-content: space-between;
  margin-top: 50px;
  p{
    width: 100%;
    justify-content: space-between;
    align-items: end;
    margin: 0;
    display: flex;
    .decorate{
      width: 60%;
      border-bottom: 1px dotted #000;
    }
    &:nth-child(2) .decorate {
      width: 45%;
    }
  }
}
</style>