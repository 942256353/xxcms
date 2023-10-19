<script lang='ts' setup>
// import useSoft from '@/composables/useSoft'
import dayjs from "dayjs"
const route = useRoute()
const { collections, getAll } = useSoft()
await getAll(+(route.query.page || 1))
</script>
<template>
  <main class="">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">软件列表</div>
      </template>
      <el-table :data="collections.data" style="width: 100%">
      <el-table-column prop="id" label="软件ID" width="100" />
      <el-table-column prop="title" label="软件标题" />
      <el-table-column prop="name" label="软件名字" />
      <el-table-column prop="version" label="软件版本" />
      <el-table-column prop="description" label="内容简介" />
      <el-table-column prop="download" label="下载量" />
      <el-table-column prop="description" label="是否免费">
        <template #default="{ row }">
          <el-tag v-if="row.is_free" type="success" effect="dark">是</el-tag>
          <el-tag v-else type="danger" effect="dark">否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="发布时间" >
        <template #default="{ row }">
          {{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="updateAt" label="更新时间" >
        <template #default="{ row }">
          {{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" /> -->
    </el-table>
    </el-card>
   
    <el-pagination
      class="bg-white p-2 mt-3 rounded-sm"
      @current-change="$router.push({ name: 'admin.soft', query: { page: $event } })"
      :current-page="collections?.meta.page"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="collections?.meta.row"
      :total="collections?.meta.total"
      background
      :pager-count="7">
    </el-pagination>
  </main>
</template>
<style scoped>
</style>
