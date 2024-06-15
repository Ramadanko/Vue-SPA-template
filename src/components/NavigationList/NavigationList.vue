<script setup lang="ts">
import ListItems from './ListItems.vue'
import { appRoutes } from '@/router/appRoutes'

</script>

<template>
  <v-list>
    <ListItems :navList="appRoutes" />
  </v-list>
</template>
