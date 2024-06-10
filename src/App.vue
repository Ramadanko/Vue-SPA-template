<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon />
      </template>
      <v-app-bar-title>Logo</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer></v-navigation-drawer>
    <v-main>

      <!--      <RouterView />-->
    </v-main>
  </v-app>
</template>
