<script setup lang="ts">
import NavigationList from '@/components/NavigationList/NavigationList.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const isDrawerOpen = ref(true)

const toggleDrawer = () => isDrawerOpen.value = !isDrawerOpen.value

</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-app-bar-title>Logo</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="isDrawerOpen">
      <NavigationList />
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
