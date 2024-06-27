<script setup lang="ts">
import NavigationList from '@/components/NavigationList/NavigationList.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Auth from '@/utils/Auth'

const router = useRouter()
const isDrawerOpen = ref(true)

const toggleDrawer = () => isDrawerOpen.value = !isDrawerOpen.value

onBeforeMount(() => {
  if (!Auth.isLoggedIn()) {
    Auth.setRedirectedUrl(window.location.pathname)
    router.replace('/login')
  }
})
</script>

<template>
  <v-app>
    <template v-if="Auth.isLoggedIn()">
      <v-app-bar :elevation="2">
        <v-app-bar-nav-icon @click="toggleDrawer" />
        <v-app-bar-title>Logo</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="isDrawerOpen">
        <NavigationList />
      </v-navigation-drawer>
    </template>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
