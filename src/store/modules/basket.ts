import { Item } from "./listItems";

const basketStore = {
  namespace: true,
  state: {
    basketList: [],
    deliveryPrice: 2.5,
  },
  getters: {
    basketList: ({basketList}: any) => basketList,
    isEmpty: ({basketList}: any) => { return basketList.length },
    allBasketItemsCost: ({basketList}: any) => {
      let total = 0;
      basketList.forEach((el: Item) => {
        total = total + Number(( ( (el.price + el.sizeList[el.selectedSize]) * el.amount) - (el.discount ? (el.price/100)*el.discount : 0) ).toFixed(1));
      });
      return total;
    },
    deliveryCost: ({basketList, deliveryPrice}: any) => {
      let allItemsAmount = 0;
      basketList.forEach((el: Item) => allItemsAmount = allItemsAmount + el.amount);
      return allItemsAmount * deliveryPrice;
    }
  },
  mutations: {
    ADD_ITEM(state: any, item: Item) {
      state.basketList.push(Object.assign({}, item));
    },
    REMOVE_ITEM(state: any, shortItemInfo: {id: number, selectedSize: string}) {
      const index = state.basketList.findIndex((el: Item) => {
        return el.id === shortItemInfo.id &&
          el.selectedSize === shortItemInfo.selectedSize
      });
      state.basketList.splice(index, 1);
    },
    CLEAR_BASKET(state: any) {
      state.basketList = [];
    }
  },
  actions: {
  },
};

export default basketStore;
