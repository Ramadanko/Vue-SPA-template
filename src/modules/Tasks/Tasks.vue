<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { loadAllTasks } from '@/modules/Tasks/TaskasApi'
import Pagination from '@/components/Pagination/Pagination.vue'

const route = useRoute()
const router = useRouter()

const pageSize = computed(() => route.query.pageSize ?? 10)
const pageNumber = computed(() => route.query.pageNumber ?? 1)

const { isError, isPending, data } = useQuery({
  queryKey: ['tasks', pageSize, pageNumber],
  queryFn: () => loadAllTasks({ pageNumber: pageNumber.value, pageSize: pageSize.value })
})

</script>
<template>
  <v-sheet class="d-flex">
    <h1>Tasks</h1>
    <v-spacer />
    <v-btn color="primary" variant="flat" @click="()=> router.push({name: 'newTask'})">Create new</v-btn>
  </v-sheet>
  <span v-if="isPending">loading..</span>
  <span v-if="isError">Error!!!</span>
  <v-list v-if="!!data">
    <v-list-item v-for="task in data.items" :title="task.title" :key="task.id" />
  </v-list>
  <Pagination v-if="!!data?.count" :total-items="data.count" />
</template>

