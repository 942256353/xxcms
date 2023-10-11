<script lang='ts' setup>
import { http } from '@/plugins/axios'
import { ElMessage, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus'
const { model, add, find, update } = useSoft()
const route = useRoute()
if (route.params.id) {
  model.value = await find(+route.params.id)
}
let fileUrl = ref<string>('')

const headers = {
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('login_token')!).data,
}

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = async (file, uploadFiles) => {
  await http.request({
    url: `upload/delete`,
    method: 'DELETE',
    data: {
      url: fileUrl.value,
    },
  })
  model.value.filePath = ''
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  // console.log(uploadFile)
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定删除 ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  )
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFiles) => {
  fileUrl.value = response.url
  model.value.filePath = response.url
  ElMessage.success(`上传成功`)
}

const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
  ElMessage.warning(`支持上传附件最大数量为${files.length}`)
}

const handleError: UploadProps['onError'] = (err, file, fileList) => {
  ElMessage.error(`上传失败`)
}
</script>
<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <template #header> 添加软件 </template>
    <el-form :model="model" label-width="80px" size="default">
      <el-form-item label="软件标题">
        <el-input v-model="model.title"></el-input>
        <HdError name="title" />
      </el-form-item>
      <el-form-item label="软件简介">
        <el-input v-model="model.description"></el-input>
        <HdError name="description" />
      </el-form-item>
      <el-form-item label="软件版本">
        <el-input v-model="model.version"></el-input>
        <HdError name="version" />
      </el-form-item>
      <el-form-item label="预览图">
        <div class="flex flex-col">
          <HdUploadSingleImage v-model="model.preview" />
          <HdError name="preview" />
        </div>
      </el-form-item>
      <el-form-item label="附件上传">
        <div class="flex flex-col">
          <el-upload
            v-model="fileList"
            class="upload-demo"
            action="http://localhost:3003/api/upload/file"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :limit="1"
            :on-error="handleError"
            :on-exceed="handleExceed"
            :before-remove="beforeRemove">
            <el-button type="primary">点击上传</el-button>
            <!-- <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
            </template> -->
          </el-upload>
          <HdError name="filePath" />
        </div>
      </el-form-item>
      <el-form-item label="使用说明">
        <HdMarkdownEditor v-model="model.content" />
        <HdError name="content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="route.params.id ? update() : add()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style scoped>
</style>
