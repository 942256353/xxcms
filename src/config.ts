import { registerAs } from "@nestjs/config";

export default registerAs('app',()=>{
   return{
      name:'xiaoxie',
      city:'beijing',
   }
})