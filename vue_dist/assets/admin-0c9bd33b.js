import{f as k,i as C,k as x}from"./element-plus-b263d37b.js";import{_ as B}from"./softItem.vue_vue_type_script_setup_true_lang-033685a8.js";import{u as V}from"./vue-router-f57cd58c.js";import{u as E}from"./useSoft-5415d87a.js";import{F as N,bw as $,o as a,c as n,b as i,R as s,a as z,V as m,u as o,P as S,ae as q,X as v,S as A}from"./@vue-2b4cd1a6.js";import"./@vueuse-b062602b.js";import"./lodash-es-b0faf9a4.js";import"./async-validator-dee29e8b.js";import"./@element-plus-c5e9c587.js";import"./dayjs-ddc12617.js";import"./@kangc-c2a2341a.js";import"./vue-68db48eb.js";import"./normalize-wheel-es-4ed993c7.js";import"./@sxzz-c75af06c.js";import"./@ctrl-384ef2e5.js";import"./index-ba33d66b.js";import"./pinia-aad22ebe.js";import"./vue-demi-71ba0ef2.js";/* empty css                    */import"./@icon-park-0de560ca.js";import"./axios-aba6f0e0.js";import"./prismjs-b3e294df.js";import"./highlight.js-42a3adc5.js";import"./vee-validate-60af52d7.js";import"./@vee-validate-1fd1bc20.js";import"./yup-0079fcd3.js";import"./property-expr-38205fa5.js";import"./tiny-case-d0726479.js";import"./toposort-59d3f8f4.js";const F={class:""},P={class:"flex justify-between items-center"},R={key:0,class:"grid grid-cols-5 gap-2"},dt=N({__name:"admin",async setup(j){let p,u;const f=V(),{collections:t,getAll:g}=E();return[p,u]=$(()=>g(+(f.query.page||1))),await p,u(),(c,r)=>{var l,d,_;const y=k,w=B,b=C,h=x;return a(),n("main",F,[i(b,{shadow:"always","body-style":{padding:"20px"}},{header:s(()=>[z("div",P,[m(" 软件管理 "),i(y,{type:"primary",onClick:r[0]||(r[0]=e=>c.$router.push({name:"soft.create"}))},{default:s(()=>[m("上架软件")]),_:1})])]),default:s(()=>[o(t)?(a(),n("main",R,[(a(!0),n(S,null,q(o(t).data,e=>(a(),A(w,{key:e.id,class:"rounded-sm border",soft:e,"show-button":"true"},null,8,["soft"]))),128))])):v("",!0)]),_:1}),i(h,{class:"bg-white p-2 mt-3 rounded-sm",onCurrentChange:r[1]||(r[1]=e=>c.$router.push({name:"admin.soft",query:{page:e}})),"current-page":(l=o(t))==null?void 0:l.meta.page,"page-sizes":[20,40,80,100],"page-size":(d=o(t))==null?void 0:d.meta.row,total:(_=o(t))==null?void 0:_.meta.total,background:""},{default:s(()=>[m(' :pager-count="7"> ')]),_:1},8,["current-page","page-size","total"])])}}});export{dt as default};