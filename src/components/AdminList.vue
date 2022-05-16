<template>
  <div class="admin-list">
    <AdminItem
      v-for="(item, ind) in list"
      :key="ind"
      :fullItemInfo="item"
    />
    <button @click="createNewItem" class="new-item">New item</button>
    <router-link to="/" @click="returnToMain" class="go-back">Go back</router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import AdminItem from "@/components/AdminItem.vue";
import { Item, SizeList } from "@/store/modules/listItems";

export default defineComponent({
  name: 'AdminList',
  components: {
    AdminItem
  },
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.list);

    const createNewItem = () => {
      list.value.push(
        new Item(
          {
            name: 'Name',
            description:
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt augue dui.
            Nam vulputate mauris eu velit vulputate semper. Donec feugiat nisi sit amet lobortis
            bibendum. Duis in orci vel tellus ornare aliquam ac at nisl. Fusce vel pulvinar urna.
            Suspendisse risus mi, tincidunt non suscipit vel, consectetur scelerisque elit. Nulla
            luctus, sapien vel eleifend dignissim, felis nisi varius nibh, id efficitur velit urna nec ipsum.`,
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            amount: 1,
            price: 1,
            imageSrc: 'bag-img-default',
            id: Number((Math.random()*10000000).toFixed(0)),
            selectedSize: 'XS',
            sizeList: new SizeList({
              'XS': 0,
              'S': 1,
              'M': 1.5,
              'L': 2,
              'XL': 2.5,
              '2XL': 3,
              '3XL': 3.5
            }),
          }
        )
      );
      console.log(list.value)
    }

    const returnToMain = () => {
      store.commit('CLEAR_BASKET');
      store.commit('TOGGLE_MODAL_WINDOW', false);
    }

    return { list, createNewItem, returnToMain };
  }
});
</script>

<style lang="scss" scoped>
.admin-list{
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .new-item{
    padding: 15px;
    border: 1px solid #000;
    cursor: pointer;
    background: none;
  }
  .go-back{
    width: 200px;
    height: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c3e50;
    text-decoration: none;
    &:hover{
      box-shadow: 0px 2px 15px rgb(109 135 154 / 60%);
      transition: 0.3s box-shadow ease;
    }
  }
}
</style>