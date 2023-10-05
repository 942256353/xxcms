<script setup lang="ts">
const {user} = useUserStore()
const {update} = useUser()
const tab = ref('info')

</script>

<template>
  <main v-if="user">
    <el-tabs v-model="tab" type="card" tab-position="top">
      <el-tab-pane label="基本资料" name="info">
        <el-form label-width="80px" class="border p-5 rounded-lg">
          <el-form-item label="账号">
            <el-input placeholder="起个有个性的昵称吧" v-model="user.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input placeholder="用于活动邮寄礼品使用" v-model="user.nickname"></el-input>
            <HdError name="name" />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="update(user)">确定修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="设置头像" name="avatar">
        <el-form label-width="80px" :inline="false" size="large" class="border p-5 rounded-xl">
          <HdUploadSingleImage v-model="user.avatar" @finish="update(user)" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>
