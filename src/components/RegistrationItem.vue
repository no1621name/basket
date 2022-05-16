<template>
  <div class="registration-item">
    <h3>{{basketItemInfo.name}}</h3>
    <div class="item-values">
      <span>Size: <b>{{basketItemInfo.selectedSize}}</b></span>
      <span>Price: <b>{{basketItemInfo.price}}$</b></span>
      <span>Amount: <b>{{basketItemInfo.amount}}</b></span>
      <span v-if="basketItemInfo.discount">Discount: <b>{{basketItemInfo.discount}}%</b></span>
      <span>Cost: <b>{{cost}}</b></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: 'RegistrationItem',
  props: {
    basketItemInfo: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    // copied from @/components/BasketItem.vue
    const cost = computed(() => {
      const startCost = (props.basketItemInfo.price + props.basketItemInfo.sizeList[props.basketItemInfo.selectedSize]) * props.basketItemInfo.amount;
      const discountValue = props.basketItemInfo.discount ? (props.basketItemInfo.price/100)*props.basketItemInfo.discount : 0;
      const finalCost = Number((startCost - discountValue).toFixed(1));
      return finalCost;
    });

    return {cost};
  }
})
</script>

<style lang="scss" scoped>
.registration-item {
  border: 1px solid #000;
  width: 95px;
  margin: 10px auto 0 auto;
  padding: 15px 0;
  &:first-child {
    margin:  0 auto;
  }
  h3{
    margin-top: 0;
  }
  .item-values {
    display: flex;
    flex-direction: column;
  }
}
</style>