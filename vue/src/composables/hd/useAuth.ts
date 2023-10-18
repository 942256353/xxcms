import { http } from '@/plugins/axios'
import router from '@/plugins/router'
import { ElMessage } from 'element-plus'
const storage = useStorage()

export default () => {
  const form = reactive({
    name: '',
    password: '',
    password_confirmation: '',
    captcha:{
      key:'',
      value:''
    }
  })

  //模型权限验证
  function authorize(userId: undefined | number) {
    return userId == useUserStore().user?.id || useUserStore().user?.id == 1
  }

  //登录检测
  function isLogin(): boolean {
    return useStorage().get(CacheEnum.TOKEN_NAME)
  }

  //退出登录
  async function logout() {
    storage.remove(CacheEnum.TOKEN_NAME)
    location.href = '/'
  }

  //找回密码
  async function findPassword() {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.FORGOT_PASSWORD,
        method: 'post',
        data: form,
      })
      storage.set(CacheEnum.TOKEN_NAME, token)
      const route = router.resolve({ name: RouteEnum.ADMIN })
      location.href = route.fullPath
    } catch (error) {
      // useCaptcha().getCaptcha()
    }
  }

  //登录
  const login = useUtil().request(async () => {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.LOGIN,
        method: 'POST',
        data: form,
      })
      storage.set(CacheEnum.TOKEN_NAME, token)
      // router.push({name:RouteEnum.HOME})
      ElMessage.success({
        message: '登录成功',
        type: 'success',
        duration: 1000,
        onClose: () => {
          const route = router.resolve({ name: RouteEnum.HOME })
          location.href = route.fullPath
        },
      })
     
    } catch (error) {
      // useCaptcha().getCaptcha()
    }
  })

  //注册
  const register = useUtil().request(async () => {
    try {
      const { token } = await http.request<{ token: string; user: UserModel }>({
        url: ApiEnum.REGISTER,
        method: 'POST',
        data: form,
      })
      ElMessage.success({
        message: '注册成功',
        type: 'success',
        duration: 1000,
        onClose: () => {
          storage.set(CacheEnum.TOKEN_NAME, token)
          const route = router.resolve({ name: RouteEnum.HOME })
          location.href = route.fullPath
          // router.push({name:RouteEnum.LOGIN})
        },
      })
     
      // const route = router.resolve({ name: RouteEnum.ADMIN })
      // location.href = route.fullPath
    } catch (error) {
      // useCaptcha().getCaptcha()
    }
  })

  return { authorize, isLogin, logout, login, register, form, findPassword }
}
