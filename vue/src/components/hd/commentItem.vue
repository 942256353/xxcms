<script lang='ts' setup>
import useComment from '../../composables/hd/useComment'
import dayjs from 'dayjs'
import { use } from 'echarts'
const { comment, user,replys } = defineProps<{ comment: CommentModel; user?: UserModel,replys?:CommentModel[]}>()
const { model } = useComment(comment.softId)
model.value.commentId = comment.commentId || comment.id
const showTextarea = ref(false)
const { authorize } = useAuth()
const emit = defineEmits<{
  // (e:'del'):void
  del: [id: number]
  add: [comment: CommentModel]
}>()
const findName = (replys: CommentModel[],comment:CommentModel) => {
  const replyUser = replys.filter(v=>v.id==comment.replyId)[0]?.user
  const commentUser = user as UserModel
  if(replyUser?.id === comment.user.id){
    return ''
  }
  if(!replyUser && comment.user.id === commentUser?.id){
    return ''
  }
  if(!replyUser){
    return commentUser.nickname
  }
  return replyUser?.nickname||comment.user?.nickname
}
</script>
<template>
  <section class="mb-3 border p-3 rounded-md bg-white opacity-90">
    <div class="flex justify-between items-baseline border-b p-3">
      <div class="flex gap-2">
        <img :src="comment.user.avatar" alt="" class="w-8 h-8 rounded-full" />
        <div class="flex flex-col">
          <div class="font-bold flex">
            <div>{{ comment.user.nickname }}</div>
            <div v-if="replys?.length>0 && comment.replyId" class="flex items-center">
              <icon-right theme="filled" size="18" fill="#333" class=" opacity-70" v-if="findName(replys,comment)"/>
              <span>{{findName(replys,comment)}}</span>
            </div>
          </div>
          <div class="flex items-center text-sm gap-2">
            <div class="flex items-center text-gray-500">
              <icon-time theme="outline" size="12" />
              {{ dayjs(comment.createdAt).fromNow() }}
            </div>
            <div class="flex items-center cursor-pointer hover:font-bold" @click="showTextarea = !showTextarea">
              <icon-share-two theme="outline" size="12" fill="#333" />回复#{{ comment.id }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex cursor-pointer hover:text-red-500" v-if="authorize(comment.user.id)">
        <icon-delete-one theme="outline" size="14" @click="$emit('del', comment.id)" />
      </div>
    </div>
    <div class="p-3 flex">
      <div v-if="comment.replyId">【@#{{comment.replyId}}】:&nbsp;</div>
      <v-md-preview :text="comment.content"></v-md-preview>
    </div>
    <div class="p-3" v-if="showTextarea">
      <el-input v-model="model.content"  type="textarea" placeholder="" clearable></el-input>
      <el-button
        type="primary"
        size="small"
        @click="
          () => {
            $emit('add', {...model,replyId:comment.id})
            showTextarea = false
            model.content = ''
          }
        "
        >发表</el-button
      >
    </div>
    <!-- <div class="bg-gray-50 p-3 border mt-3" v-for="reply of comment.replys" :key="reply.id">
        {{ reply.content }}
      </div> -->
  </section>
</template>

<style lang='scss' scoped>
:deep(.github-markdown-body){
  @apply p-0;
}
:deep(.github-markdown-body p){
  @apply mb-0;
}
</style>
