import { registerAs } from "@nestjs/config";

export default registerAs('app',()=>{
   return{
      name:'xiaoxie',
      app_key:'xiaoxie',
   }
})