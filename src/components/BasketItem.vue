<template>
  <div class="basket-item-main">
    <img :src="require(`../assets/${basketItemInfo.imageSrc}.jpg`)" :alt="basketItemInfo.imageSrc">
    <div class="basket-item-content">
      <h4 class="title-name">{{basketItemInfo.name}}</h4>
      <p class="description">{{basketItemInfo.shortDescription}}</p>
      <div class="basket-item-values">
        <span class="size">Size:
          <b>{{basketItemInfo.selectedSize}}</b>
        </span>
        <span class="amount">Amount:
          <b>
            <button class="amount-minus" @click="minusBasketItemAmount">-</button>
            {{basketItemInfo.amount}}
            <button class="amount-plus" @click="plusBasketItemAmount">+</button>
          </b>
        </span>
        <span class="price">Price:<b>{{basketItemInfo.price}}$</b></span>
        <span class="dsicount" v-if="basketItemInfo.discount">Discount:<b>{{basketItemInfo.discount}}%</b></span>
        <span class="cost">Cost:<b>{{cost}}$</b></span>
      </div>
      <button @click="removeItem">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from '@/store/modules/listItems';
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'BasketItem',
  props: {
    basketItemInfo: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    const basketList = computed(() => store.getters.basketList).value;

    const cost = computed(() => {
      const startCost = (props.basketItemInfo.price + props.basketItemInfo.sizeList[props.basketItemInfo.selectedSize]) * props.basketItemInfo.amount;
      const discountValue = props.basketItemInfo.discount ? ((props.basketItemInfo.price/100)*props.basketItemInfo.discount)*props.basketItemInfo.amount : 0;
      const finalCost = Number((startCost - discountValue).toFixed(1));
      console.log(discountValue)
      return finalCost;
    });

    const removeItem = () => {
      store.commit('REMOVE_ITEM',  {id: props.basketItemInfo.id, selectedSize: props.basketItemInfo.selectedSize});
    };

    const minusBasketItemAmount = () => {
      const basketItemData = basketList.find((el: Item) => el.id == props.basketItemInfo.id && el.selectedSize === props.basketItemInfo.selectedSize);
      basketItemData.amount--;
      basketItemData.amount <= 0 ? removeItem() : '';
    }

    const plusBasketItemAmount = () => {
      basketList.find((el: Item) => el.id == props.basketItemInfo.id && el.selectedSize === props.basketItemInfo.selectedSize).amount++;
    }

    return {cost, removeItem, minusBasketItemAmount, plusBasketItemAmount};
  },
})
</script>

<style lang="scss" scoped>
.basket-item-main {
  margin-bottom: 20px;
  width: 100%;
  min-height: 210px;
  max-height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  position: relative;
  img {
    width: 100px;
    height: 210px;
  }
  .basket-item-content{
    display: flex;
    align-items: center;
    flex-direction: column;
    .title-name{
      margin: 0;
    }
    .description{
      font-size: 14px;
      margin: 0;
    }
    .basket-item-values{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      width: 150px;
      font-size: 12px;
      margin-top: 15px;
      b .amount-plus, b .amount-minus {
        border: 1px solid #000;
        background: none;
        width: 20px;
        height: 20px;
        margin: 5px;
        cursor: pointer;
      }
    }
    > button {
      margin-top: 15px;
      background: none;
      border: 1px solid #000;
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>