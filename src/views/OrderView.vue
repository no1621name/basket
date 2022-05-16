<template>
  <div class="order-view">
    <RegistrationForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue';

export default defineComponent({
  name: 'OrderView',
  components: {
    RegistrationForm
  },
})
</script>

<style lang="scss" scoped>
.order-view{
  position: relative;
  min-height: 100vh;
  background: linear-gradient(90deg, rgba(98,98,98,1) 0%, rgba(161,161,161,1) 50%, rgba(255,255,255,1) 100%);
}
</style>