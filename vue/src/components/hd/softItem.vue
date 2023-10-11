<script lang='ts' setup>
const { soft, showButton } = withDefaults(defineProps<{ soft: ModelSoft; showButton?: boolean }>(), {
  showButton: false,
})
const {open} = useUtil()
const { destroy } = useSoft()
</script>

<template>
  <main class="rounded-sm border flex flex-col">
    <div class="flex flex-col cursor-pointer overflow-hidden shadow-lg" @click="open({ name: 'soft.show',params:{id:soft.id}},'_blank')" >
      <img
        :src="soft.preview"
        :alt="soft.title"
        class="aspect-video object-cover hover:scale-105 transition-transform duration-300"
        />
      <h2 class="text-center opacity-90 text-gray-900 p-3">{{ soft.title }}</h2>
      <div class="text-sm opacity-70 px-2 line-clamp-2 flex-grow mb-3 mx-3">
        {{ soft.description }}
      </div>
    </div>

    <div class="flex justify-center py-3 border-t" v-if="showButton">
      <el-button
        type="success"
        plain
        size="small"
        @click="$router.push({ name: 'soft.update', params: { id: soft.id } })"
        >编辑</el-button
      >
      <el-button class="!ml-2" type="danger" plain size="small" @click="destroy(soft.id)">删除</el-button>
    </div>
  </main>
</template>
<style scoped>
</style>
