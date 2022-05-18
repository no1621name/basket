<template>
 <div class="admin-item">
   <button @click="totalDeleteItem" class="delete-item">Delete</button>
   <form class="main-info" @submit.prevent="saveEditedItem">
     <div class="textinfo">
      <img
        class="item-image"
        :src="require(`../assets/${fullItemInfo.imageSrc}.jpg`)"
        :alt="fullItemInfo.imageSrc"
        loading="lazy"
        @click="visibleSrc = !visibleSrc"
      >
      <input
        type="text"
        v-if="visibleSrc"
        v-model.trim="preSaveItemInfo.imageSrc"
        name="image-src"
        required
        placeholder="image src"
      >
      <input
        type="text"
        name="itemName"
        v-model.trim="preSaveItemInfo.name"
        required
        placeholder="name"
      >
      <input
        type="number"
        name="itemPrice"
        v-model="preSaveItemInfo.price"
        min="1"
        required
        placeholder="$"
      >
      <label for="itemDiscount">
        <button
          type="button"
          @click="hasDiscount = true"
          v-if="!hasDiscount"
        >
          Add discount
        </button>
        <input
          type="number"
          name="itemDiscount"
          v-if="hasDiscount"
          v-model="preSaveItemInfo.discount"
          min="1"
          max="99"
          required
          placeholder="%"
        >
        <button
          type="button"
          @click="hasDiscount = false; preSaveItemInfo.discount = 0"
          v-if="hasDiscount"
        >
          X
        </button>
      </label>
      <div class="descriptions">
        <textarea
          name="description"
          v-model.trim="preSaveItemInfo.description"
          required
          placeholder="description"></textarea>
        <textarea
          name="shortDescription"
          v-model.trim="preSaveItemInfo.shortDescription"
          required
          placeholder="short description"></textarea>
      </div>
     </div>
     <div class="size-list">
       <span v-for="(size, ind) in sizeNamesList" :key="ind">
          <input
            type="text"
            v-model.trim="sizeNamesList[ind]"
            pattern="^[0-9A-Z]+$"
            required
            placeholder="Size name"
          >
          <input
            type="number"
            min="0"
            step="any"
            v-model="preSaveItemInfo.sizeList[size]"
            required
            placeholder="$"
          >
          <button v-if="sizeNamesList.length > 1" @click="deleteSize(size, ind)">X</button>
       </span>
       <button @click="createNewSize">New size</button>
     </div>
     <button type="submit">Submit changes</button>
   </form>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: 'AdminItem',
  props: {
    fullItemInfo: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    const preSaveItemInfo = {...props.fullItemInfo};
    const visibleSrc = ref(false);
    const hasDiscount = ref(Boolean(props.fullItemInfo.discount));
    const sizeNamesList = ref(Object.keys(preSaveItemInfo.sizeList));

    const totalDeleteItem = () => store.commit('DELETE_ITEM', props.fullItemInfo.id);

    const saveEditedItem = () => {
      if(preSaveItemInfo.discount) delete props.fullItemInfo.discount;
      store.commit('EDIT_ITEM', preSaveItemInfo);
    };

    const deleteSize = (size: string, ind: number) => {
      sizeNamesList.value.splice(ind, 1);
      delete preSaveItemInfo.sizeList[size];
    };

    const createNewSize = () => {
      if(sizeNamesList.value.some((el: string) => el.trim() === '')) { return; }
      else { sizeNamesList.value.push(''); }
    };

    return {
      preSaveItemInfo,
      visibleSrc,
      hasDiscount,
      sizeNamesList,
      totalDeleteItem,
      saveEditedItem,
      deleteSize,
      createNewSize,
    };
  }
})
</script>

<style lang="scss" scoped>
.admin-item{
  margin-bottom: 30px;
  width: 500px;
  border: 1px solid #000;
  padding: 10px;
  position: relative;
  button {
    cursor: pointer;
    background: none;
    border: 1px solid #000;
    padding: 5px;
  }
  .delete-item{
    margin-left: 85%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 640px;
    .textinfo{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 475px;
      .item-image{
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
      .descriptions{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
         textarea{
          text-align: left;
          border-radius: 0;
          resize: none;
          width: 290px;
          height: 100px;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            width: 0;
          }
          &:last-child{
            width: 160px;
            height: 40px;
          }
        }
      }
    }
    .size-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      span input[type="text"]{
        width: 65px;
        margin-bottom: 5px;
      }
    }
    input, textarea{
      text-align: center;
      border: 1px solid #000;
      padding: 5px;
      &:focus{
        outline: none;
      }
    }
    input[type="number"]{
      -moz-appearance:textfield;
      width: 30px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>