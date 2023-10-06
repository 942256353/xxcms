
<script lang='ts' setup>
const {model,add,find,update} = useSoft()
const route = useRoute()
if(route.params.id){
    model.value = await find(+route.params.id)
}
</script>
<template>
   <el-card shadow="always" :body-style="{padding:'20px'}">
     <template #header>
    添加软件
     </template>
     <el-form :model="model" label-width="80px"  size="default">
        <el-form-item label="软件标题">   
            <el-input v-model="model.title"></el-input>
            <HdError name="title"/>
        </el-form-item>
        <el-form-item label="软件简介">   
            <el-input v-model="model.description"></el-input>
            <HdError name="description"/>
        </el-form-item>
        <el-form-item label="预览图">   
           <div class="flex flex-col">
            <HdUploadSingleImage v-model="model.preview"/>
            <HdError name="preview"/>
           </div>
        </el-form-item>
        <el-form-item label="使用说明">   
            <HdMarkdownEditor v-model="model.content"/>
            <HdError name="content"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="route.params.id?update():add()">提交</el-button>
        </el-form-item>
    </el-form>
   </el-card>
</template>
<style scoped>

</style>
