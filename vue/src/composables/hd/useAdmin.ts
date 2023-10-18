import { http } from '@/plugins/axios'

export default () => {
  const collections = ref<AdminModel>()
  const getAll = async () => {
    collections.value = await http.request<AdminModel>({
      url: `/all`,
    })
  }


  return { collections, getAll }
}
