import { http } from '@/plugins/axios'

export default () => {
  const collections = ref<AdminModel>()
  const getAll = async () => {
    const response = await http.request<ApiData<AdminModel>>({
      url: `/all`,
    })
    collections.value = response.data;
  }


  return { collections, getAll }
}
