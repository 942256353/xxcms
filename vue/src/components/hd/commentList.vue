
<script lang='ts' setup>
import useComment from '../../composables/hd/useComment';
import { retry } from 'rxjs'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
const { sid } = defineProps<{ sid: number }>()
const { collections, findAll, model, add,del } = useComment(sid)
await findAll()
const schema = yup.object({
  content: yup.string().required('内容不能为空').max(1000, '内容不能超过1000字')
})
const {exec,time} = useIntervalRequest(20,(data:any)=>{
 return add(data)
})
</script>
<template>
  <main class="">
    <section v-if="collections.length">
      <div v-for="comment of collections" :key="comment.id">
        <HdCommentItem :comment="comment" @del="del" @add="add"/>
        <div class="ml-5">
          <HdCommentItem :comment="reply" v-for="reply of comment.replys" :key="reply.id" @del="del" @add="add"/>
        </div>
      </div>
    </section>
    <!-- 回复框 -->
    <section class="py-3">
      <!-- <Form :validation-schema="schema" #default="{handleSubmit}" :validateOnMount="false" :key="collections.length"> 
        <Field name="content" class="border" v-model="model.content" :validate-on-input="true"> -->
          <HdMarkdownEditor v-model="model.content" v-clearError="'content'"/>
          <HdError name="content" />
          <el-button type="primary" :disabled="time>0?true:false" size="default" class="mt-3" @click="exec(model)">保存提交{{time>0?`(${time})`:''}}</el-button>
        <!-- </Field>
        <ErrorMessage name="content" class="hd-error" as="div" /> -->
        <!-- <el-button type="primary" :disabled="time>0?true:false" size="default" class="mt-3" @click="handleSubmit(schema,exec(model))">保存提交{{time>0?(time):''}}</el-button> -->
      <!-- </Form> -->
    </section>
  </main>
</template>
<style scoped>
</style>
