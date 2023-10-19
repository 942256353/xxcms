import { http } from "@/plugins/axios";
import { ElMessageBox } from "element-plus";


export default (sid?: number) => {
    const collections = ref<CommentModel[]>([]);
    const collection = ref();
    const model = ref<Partial<CommentModel>>({});
    const findAll = async () => {
        collections.value = await http.request({
            url: `comment/${sid}`
        })
    }
    const getList = async (page = 1, row = 10) => {
        collection.value = await http.request<any>({
          url: `comment/list?page=${page}&row=${row}`
        })
      }
    const add = async (data:any) => {
        console.log('data-add',data)
       const comment = await http.request<CommentModel>({
            url: `comment/${sid}`,
            method: 'POST',
            data: data
        })
        model.value.content = '' 
        findAll() 
    }
    const del = async (id: number) => {
        await ElMessageBox.confirm('确定要删除吗？')
        await http.request({
            url: `comment/${sid}/${id}`,
            method: 'DELETE'
        })
        findAll()
    }
    return {findAll,add,del,collections,collection,model,getList}
}