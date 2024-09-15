<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const { pageNumberKey, pageSizeKey, totalItems } = defineProps({
  pageNumberKey: {
    type: String,
    default: 'pageNumber'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  },
  totalItems: {
    type: Number,
    default: 0
  }
})

const pageSizeOptions = [1, 5, 10, 25, 50]
const pageSize = useRouteQuery(pageSizeKey, '10', { transform: Number })
const pageNumber = useRouteQuery(pageNumberKey, '1', { transform: Number })
const length = computed(() => Math.ceil(totalItems / pageSize.value))

const onPageSizeChange = (value: number) => router.push({ query: { ...route.query, pageNumber: 1, pageSize: value } })

const onPageNumberChange = (value: number) => router.push({ query: { ...route.query, pageNumber: value } })

</script>
<template>
  <v-sheet class="d-flex">
    <v-col>
      <v-select density="compact" label="Page Size" :items="pageSizeOptions" variant="outlined" max-width="100px"
                @update:model-value="onPageSizeChange" :model-value="pageSize" />
    </v-col>
    <v-spacer />
    <v-col>
      <v-pagination density="compact" v-if="length > 1" :length="length" @update:model-value="onPageNumberChange"
                    :model-value="pageNumber" />
    </v-col>
  </v-sheet>
</template>
