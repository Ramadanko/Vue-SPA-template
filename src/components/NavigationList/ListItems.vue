<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type RouteGroup, type RouteLink, type RouteDivider } from '@/router/appRoutes'

defineProps({
  navList: {
    required: true,
    type: Array<RouteLink | RouteDivider | RouteGroup>
  }
})

const router = useRouter()

const navigateTo = (name: string) => router.push({ name })

</script>

<template>
  <template v-for="(item, index) in navList" :key="index">
    <template v-if="item.type === 'link' && !item.isDynamic">
      <v-list-item color="primary" :title="item.name" :active="$route.name === item.name"
                   @click="navigateTo(item.name)" />
    </template>
    <template v-else-if="item.type === 'divider'">
      <v-divider />
    </template>
    <template v-else-if="item.type === 'group'">
      <v-list-group :title="item.name" :prepend-icon="item.prependIcon">
        <template v-slot:activator="{props}">
          <v-list-item :title="item.name" v-bind="props" />
        </template>
        <ListItems :navList="item.children" />
      </v-list-group>
    </template>
  </template>
</template>
