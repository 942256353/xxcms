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
  download?:number;
  name:string
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

interface MonthCountsModel {name: string, value: number}
interface MonthSoftCountsModel {
  softId: string,
  name:string,
  data:MonthCountsModel[]
}
interface AdminModel {
  downloadTotal: number;
  commentTotal: number;
  softTotal: number;
  userTotal: number;
  currentMonthDownloads: number;
  currentMonthUsers: number;
  currentMonthSofts: number;
  currentMonthComments: number;
  monthlyUserCounts: MonthCountsModel[];
  monthlySoftCounts: MonthCountsModel[];
  monthlyCommentCounts: MonthSoftCountsModel[];
}
interface ConfigModel {
  [key: string]: Record<string, any>
}
