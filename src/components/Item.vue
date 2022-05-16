<template>
  <div class="item-main">
    <img :src="require(`../assets/${itemInfo.imageSrc}.jpg`)" :alt="itemInfo.imageSrc" loading="lazy">
    <div class="item-textinfo">
      <h3>{{itemInfo.name}} </h3>
      <p>{{itemInfo.description}}</p>
      <div class="size-list">
        <button
          v-for="(size, ind) of Object.keys(itemInfo.sizeList)"
          :key="ind"
          :class="['size', {'active-size': isActiveSize(size)}]"
          @click="changeSize"
        >
          {{size}}
        </button>
      </div>
    </div>
    <div class="item-priceinfo">
      <span class="item-price">{{itemInfo.price}}$</span>
      <span class="item-discount" v-if="itemInfo.discount">{{itemInfo.discount}}%</span>
    </div>
    <button class="add-btn" @click="addItemToBasket"> Add to basket</button>
  </div>
</template>

<script lang="ts">
import { Item } from '@/store/modules/listItems';
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Item',
  props: {
    itemInfo: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    const basketList = computed(() => store.getters.basketList).value;
    const itemData = computed(() => store.getters.list).value.find((el: Item) => el.id === props.itemInfo.id);

    const isActiveSize = ref((size: string) => size == props.itemInfo.selectedSize);

    const addItemToBasket = () => {
      const selectedItem = props.itemInfo;
      const matchesInBasket = basketList.filter((el: Item) =>  {
        return el.id == selectedItem.id &&  el.selectedSize === selectedItem.selectedSize;
      });

      if (matchesInBasket.length > 0) {
        const basketItemIndex = basketList.findIndex((el: Item) => el.id === matchesInBasket[0].id);
        basketList[basketItemIndex].amount++;
      } else {
        store.commit('ADD_ITEM', selectedItem);
      }
    }

    const changeSize = (e: any) => {
      itemData.selectedSize = e.target.textContent;
    }

    return {addItemToBasket, changeSize, isActiveSize};
  }
})
</script>

<style lang="scss" scoped>
.item-main {
  width: 600px;
  height: 420px;
  border: 1px solid #000;
  display: flex;
  justify-content: space-around;
  position: relative;
  align-items: center;
  img{
    width: 200px;
    height: 200px;
  }
  .item-textinfo{
    max-width: 300px;
    text-align: left;
    .size-list{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
      .size{
        box-sizing: border-box;
        border: 1px solid #000;
        background: none;
        width: 37px;
        height: 20px;
        cursor: pointer;
        transition: .5s all ease;
        margin-bottom: 5px;
        &.active-size{
          border: none;
          background: #000;
          color: #fff;
        }
      }
    }
  }
  .item-priceinfo{
    position: absolute;
    bottom: 10px;
    left: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    .item-price{
      font-weight: bold;
    }
    .item-discount{
      font-size: 20px;
      text-decoration: underline;
      font-weight: bolder;
    }
  }
  .add-btn{
    position: absolute;
    bottom: 25px;
    right: 50px;
    background: transparent;
    cursor: pointer;
    border: 1px solid #000;
    padding: 5px;
    transition: .3s box-shadow ease;
    &:hover{
      box-shadow: 0px 2px 15px rgba(109, 135, 154, 0.6);
    }
  }
}
</style>
