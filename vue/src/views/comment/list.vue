<script lang='ts' setup>
// import useSoft from '@/composables/useSoft'
import dayjs from "dayjs"
const route = useRoute()
const { collection, getList,del } = useComment()
await getList(+(route.query.page || 1))
</script>
<template>
  <main class="">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">评论列表</div>
      </template>
      <el-table :data="collection.data" style="width: 100%">
      <el-table-column prop="softId" label="软件ID" width="100" />
      <el-table-column prop="softTitle" label="软件标题" />
      <el-table-column prop="softName" label="软件名称" />
      <el-table-column prop="userName" label="评论用户" />
      <el-table-column prop="content" label="评论内容" />
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
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button v-if="row.id!==1"  type="text" @click="del(row.id,row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
   
    <el-pagination
      class="bg-white p-2 mt-3 rounded-sm"
      @current-change="$router.push({ name: 'admin.soft', query: { page: $event } })"
      :current-page="collection?.meta.page"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="collection?.meta.row"
      :total="collection?.meta.total"
      background
      :pager-count="7">
    </el-pagination>
  </main>
</template>
<style scoped>
</style>
