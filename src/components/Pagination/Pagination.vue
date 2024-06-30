<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { pageNumberKey, pageSizeKey } = defineProps({
  pageNumberKey: {
    type: String,
    default: 'pageNumber'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  }
})

const pageSizeOptions = [1, 5, 10, 25, 50]
const pageSize = useRouteQuery(pageSizeKey, '10', { transform: Number })
const pageNumber = useRouteQuery(pageNumberKey, '1', { transform: Number })

const onPageSizeChange = (value: number) => router.push({ query: { ...route.query, pageNumber: 1, pageSize: value } })

const onPageNumberChange = (value: number) => router.push({ query: { ...route.query, pageNumber: value } })

</script>
<template>

  <v-pagination :length="5" @update:model-value="onPageNumberChange" :model-value="pageNumber" />
  <v-select label="Page Size" :items="pageSizeOptions" variant="outlined" @update:model-value="onPageSizeChange"
            :model-value="pageSize" max-width="100px" />
</template>
