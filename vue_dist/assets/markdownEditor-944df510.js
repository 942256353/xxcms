import{b as f}from"./@kangc-c2a2341a.js";import{u as g}from"./useUpload-9210c0cb.js";import{F as h,r as v,k as s,o as V,S as k,u as t,B as w}from"./@vue-2b4cd1a6.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const I=h({__name:"markdownEditor",props:{modelValue:null,height:{default:300}},emits:["update:modelValue"],setup(m,{emit:r}){const u=m,{uploadImage:p}=g(),{modelValue:l,height:_=400}=u,a=v(l);s(()=>u.modelValue,e=>{a.value=e}),s(a,e=>{r("update:modelValue",e)}),s(()=>l,e=>{a.value=e});const i=async(e,o,n)=>{const d=new FormData;d.append("file",n[0]);const{url:c}=await p(d);o({url:c})};return(e,o)=>(V(),k(t(f),{value:t(l),modelValue:t(a),"onUpdate:modelValue":o[0]||(o[0]=n=>w(a)?a.value=n:null),"disabled-menus":[],height:t(_)+"px",onUploadImage:i},null,8,["value","modelValue","height"]))}});const b=x(I,[["__scopeId","data-v-a5f883f0"]]);export{b as _};
