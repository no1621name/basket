<template>
  <div class="registration-form">
    <RegistrationList />
    <form action="/" @submit.prevent="returnToMain">
      <div class="contact-info">
        <input
          type="text"
          name="clientFullName"
          id="clientFullName"
          placeholder="Full name"
          v-model.trim="formData.clientFullName"
          pattern="\b\w{3,}\b \b\w{3,}\b \b\w{3,}\b"
          required
        >
        <input
          type="text"
          name="clientEmail"
          id="clientEmail"
          placeholder="Email"
          v-model.trim="formData.clientEmail"
        >
      </div>
      <textarea name="clientComment" id="clientComment" v-model.trim="formData.clientComment" placeholder="Your comment for order (optional)"></textarea>
      <select name="payMethod" id="payMethod" v-model.trim="formData.payMethod" required>
        <option value="" disabled selected>Select pay method</option>
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
        <option value="cash">Cash</option>
      </select>
      <div class="pay-info" v-if="formData.payMethod !== 'cash' && formData.payMethod !== ''">
        <template v-if="formData.payMethod === 'card'">
          <input
            type="number"
            name="cardNumber"
            id="cardNumber"
            v-model.trim="formData.cardNumber"
            placeholder="Card number"
            required
            pattern="^\d{13,16}$"
          >
          <input
            type="number"
            name="cardValidity"
            id="cardValidity"
            v-model.trim="formData.cardValidity"
            placeholder="Card validity"
            required
            pattern="^\d{4}$"
          >
          <input
            type="number"
            name="cardCVV"
            id="cardCVV"
            v-model.trim="formData.cardCVV"
            placeholder="Card CVV"
            required
            pattern="^\d{3}$"
          >
        </template>
        <template v-else-if="formData.payMethod === 'paypal'">
          <input
            type="number"
            name="paypalWalletNumber"
            id="paypalWalletNumber"
            v-model.trim="formData.paypalWalletNumber"
            placeholder="PayPal wallet number"
            required
            pattern="^\d{12}$"
          >
          <input
            type="string"
            name="paypalPassword"
            id="paypalPassword"
            v-model.trim="formData.paypalPassword"
            placeholder="PayPal password"
            required
            pattern="^\w+{12, 48}$"
          >
        </template>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import RegistrationList from '@/components/RegistrationList.vue';
import router from '@/router';
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: 'RegistrationForm',
  components: {
    RegistrationList
  },
  setup() {
    const store = useStore();
    const formData = computed(() => store.getters.formData).value;

    const returnToMain = () => {
      store.commit('CLEAR_BASKET');
      store.commit('TOGGLE_MODAL_WINDOW', false);
      router.push('/')
    }

    return { formData, returnToMain }
  }
})
</script>

<style lang="scss" scoped>
.registration-form{
  display: flex;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  form {
    width: 360px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    input, select, button{
      box-sizing: border-box;
      padding: 5px;
      width: 150px;
      height: 30px;
      border: 1px solid #000;
      &:focus {
        outline: none;
      }
      &[type="number"]{
        -moz-appearance:textfield;
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{
          -webkit-appearance: none;
          margin: 0;
        }
      }
      &.warn{
        border: 1px solid #f00;
      }
    }
    select {
      margin: 20px auto;
    }
    button {
      margin: 20px auto;
      background: transparent;
      cursor: pointer;
      &:hover{
        box-shadow: 0px 2px 15px rgba(109, 135, 154, 0.6);
      }
    }
    .contact-info {
      display: flex;
      justify-content: space-around;
    }
    textarea{
      box-sizing: border-box;
      width: 323px;
      padding: 5px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      border-radius: 0;
      margin: 20px auto 0 auto;
      height: 50px;
      resize: none;
      border: 1px solid #000;
      &:focus {
        outline: none;
      }
    }
    .pay-info{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;
    }
  }
}
</style>