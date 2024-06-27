<script setup lang="ts">
import Auth from '@/utils/Auth'

const onClick = () => {
  Auth.logout()
  window.location.replace('/')
}
</script>

<template>
  <v-btn size="small" prepend-icon="mdi-logout" class="text-none" variant="flat" color="primary" @click="onClick">
    Logout
  </v-btn>
</template>
