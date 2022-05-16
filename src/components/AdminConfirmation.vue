<template>
  <div class="admin-confirmation">
    <div class="admin-confirmation-content">
      <h3>Please, enter admin password:</h3>
      <input
        type="text"
        name="adminPassword"
        id="adminPassword"
        v-model="adminPasswordInput"
        placeholder="Password..."
        @change="passwordCheck"
      />
      <!-- autocomplete="off" -->
      <router-link
        to="/70xXaJI828b529HtWfG4ghXLev9JiyWQ"
        v-if="getAccess"
        class="router-link"
      >
        Wellcome, Admin
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminConfirmation',
  setup() {
    const store = useStore();
    const adminPassword = computed(() => store.getters.password).value;
    const isShowModalWindow = computed(() => store.getters.isShowModalWindow);

    let adminPasswordInput = ref('');
    let getAccess = ref(false);

    const passwordCheck = () => {
      if(adminPasswordInput.value == adminPassword) {
        getAccess.value = true;
      }
    }

    watch(() => isShowModalWindow.value, () => {
      if (!isShowModalWindow.value) {
        adminPasswordInput.value = '';
        getAccess.value = false;
      }
    })

    return {passwordCheck, getAccess, adminPasswordInput};
  },
})
</script>

<style lang="scss" scoped>
.admin-confirmation{
  width: 300px;
  height: 150px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .admin-confirmation-content{
    display: flex;
    height: 100px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h3{
      margin: 0;
    }
    input{
      width: 150px;
    }
    .router-link{
      color: #2c3e50;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
