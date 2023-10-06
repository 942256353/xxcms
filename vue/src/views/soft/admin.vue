<script lang='ts' setup>
import useSoft from '@/composables/useSoft'
const route = useRoute()
const { collections, getAll } = useSoft()
await getAll(+(route.query.page || 1))
</script>
<template>
  <main class="">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          软件管理
          <el-button type="primary" @click="$router.push({ name: 'soft.create' })">上架软件</el-button>
        </div>
      </template>
      <main class="grid grid-cols-5 gap-2" v-if="collections">
        <HdSoftItem
          v-for="soft in collections.data"
          :key="soft.id"
          class="rounded-sm border"
          :soft="soft"
          show-button="true" />
      </main>
    </el-card>
    <el-pagination
      class="bg-white p-2 mt-3 rounded-sm"
      @current-change="$router.push({ name: 'admin.soft', query: { page: $event } })"
      :current-page="collections?.meta.page"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="collections?.meta.row"
      :total="collections?.meta.total" background>
      :pager-count="7">
    </el-pagination>
    
  </main>
</template>
<style scoped>
</style>
