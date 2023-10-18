<script lang='ts' setup>
const { find, model,download } = useSoft()
const route = useRoute()

model.value = await find(+route.params.id)
const tabName = ref('content')
const downLoadSoft = async (id:number) => {
   alert('正在下载')

   const filePath = await download(id)
   const url = import.meta.env.VITE_API_URL+'/'+filePath
   console.log(filePath)
   window.open(url,'self')
}
</script>
<template>
  <main class="">
    <section class="bg-white p-5 rounded-md">
      <h1 class="text-xl font-bold flex justify-between items-center opacity-90">
        <div class="flex items-center gap-2">{{ model.title }} 
          <el-tag type="success" size="small"  effect="plain">{{model.version}}</el-tag>
        </div>

        <div class="">
          <el-button type="primary" size="default" @click="downLoadSoft(+model.id)">下载软件</el-button>
        </div>
      </h1>
    </section>
    <el-tabs v-model="tabName" type="card" tab-position="top" class="bg-white mt-5 rounded-sm opacity-90 px-5 mt-5 pt-5">
      <el-tab-pane label="软件介绍" name="content">
        <section class="">
          <v-md-preview :text="model.content"></v-md-preview>
        </section>
      </el-tab-pane>
      <el-tab-pane label="使用交流" name="comment">
        <HdCommentList :sid="model.id"/>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>


<style lang="scss" scoped>
:deep(.github-markdown-body) {
  @apply px-0;
}
</style>
