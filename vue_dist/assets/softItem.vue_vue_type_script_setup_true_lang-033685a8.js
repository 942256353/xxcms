import{f as y}from"./element-plus-b263d37b.js";import{b as v}from"./index-ba33d66b.js";import{u as b}from"./useSoft-5415d87a.js";import{F as k,o as n,c as l,a as s,W as r,u as i,b as c,R as p,V as d,X as B}from"./@vue-2b4cd1a6.js";const h={class:"rounded-sm border flex flex-col"},w=["src","alt"],C={class:"text-center opacity-90 text-gray-900 p-3"},g={class:"text-sm opacity-70 px-2 line-clamp-2 flex-grow mb-3 mx-3"},V={key:0,class:"flex justify-center py-3 border-t"},E=k({__name:"softItem",props:{soft:null,showButton:{type:Boolean,default:!1}},setup(m){const{soft:t,showButton:f}=m,{open:u}=v(),{destroy:_}=b();return(x,e)=>{const o=y;return n(),l("main",h,[s("div",{class:"flex flex-col cursor-pointer",onClick:e[0]||(e[0]=a=>i(u)({name:"soft.show",params:{id:t.id}},"_blank"))},[s("img",{src:t.preview,alt:t.title,class:"aspect-video object-cover"},null,8,w),s("h2",C,r(t.title),1),s("div",g,r(t.description),1)]),f?(n(),l("div",V,[c(o,{type:"success",plain:"",size:"small",onClick:e[1]||(e[1]=a=>x.$router.push({name:"soft.update",params:{id:t.id}}))},{default:p(()=>[d("编辑")]),_:1}),c(o,{class:"!ml-2",type:"danger",plain:"",size:"small",onClick:e[2]||(e[2]=a=>i(_)(t.id))},{default:p(()=>[d("删除")]),_:1})])):B("",!0)])}}});export{E as _};