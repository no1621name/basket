<template>
  <div class="admin-view">
    <AdminList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminList from '@/components/AdminList.vue'

export default defineComponent({
  name: 'AdminView',
  components: {
    AdminList
  },
  setup() {
  },
})
</script>
