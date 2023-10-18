interface UserModel {
  id: number
  name: string
  nickname:string
  email: string
  sex: number
  real_name?: any
  address?: any
  avatar?: any
  home?: any
  weibo?: any
  wechat?: any
  github?: string
  qq?: any
  wakatime?: string
  openid?: string
  unionid?: string
  createdAt: string
  updatedAt: string
}
interface ModelSoft {
  id: number;
  title: string;
  content: string;
  description:string;
  preview: string;
  filePath:string;
  download?:number
  version:string;
  is_free: boolean;
  createdAt: string;
  updatedAt: string;
}
interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  softId: number;
  commentId?: any;
  replyId?: any;
  user: UserModel;
  replys: CommentModel[];
}

interface ConfigModel {
  [key: string]: Record<string, any>
}
