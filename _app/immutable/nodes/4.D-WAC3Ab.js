import{s as $,e as o,a as D,c as i,b as y,g as M,d as I,f as b,h as t,i as z,j as a,l as j,p as A,n as E}from"../chunks/scheduler.CyFU2WUr.js";import{S as B,i as F}from"../chunks/index.DhbsmVG4.js";import{g as U}from"../chunks/entry.Dg3TJLik.js";import{a as q,L as O,g as W,r as R,b as G,s as J}from"../chunks/router.BAPWZOKB.js";function K(v){let e,d,n,c,_='<span class="label-text text-base">Number of recent answers to save</span>',h,s,x,f,r,l,N='<span class="label-text text-base">Maximum amount of time for recalling a kana</span>',S,u,T,p,H=`<a href="${R.home}" class="btn btn-secondary">Cancel</a> <button type="submit" class="btn btn-primary">Save</button>`,C,k;return{c(){e=o("form"),d=o("div"),n=o("div"),c=o("label"),c.innerHTML=_,h=D(),s=o("input"),x=D(),f=o("div"),r=o("div"),l=o("label"),l.innerHTML=N,S=D(),u=o("input"),T=D(),p=o("div"),p.innerHTML=H,this.h()},l(g){e=i(g,"FORM",{class:!0});var m=y(e);d=i(m,"DIV",{});var V=y(d);n=i(V,"DIV",{class:!0});var w=y(n);c=i(w,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),M(c)!=="svelte-rckd9f"&&(c.innerHTML=_),h=I(w),s=i(w,"INPUT",{type:!0,name:!0,placeholder:!0,class:!0}),w.forEach(b),V.forEach(b),x=I(m),f=i(m,"DIV",{});var P=y(f);r=i(P,"DIV",{class:!0});var L=y(r);l=i(L,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),M(l)!=="svelte-1aoiizy"&&(l.innerHTML=N),S=I(L),u=i(L,"INPUT",{type:!0,name:!0,placeholder:!0,class:!0}),L.forEach(b),P.forEach(b),T=I(m),p=i(m,"DIV",{class:!0,"data-svelte-h":!0}),M(p)!=="svelte-1ba46in"&&(p.innerHTML=H),m.forEach(b),this.h()},h(){t(c,"class","label"),t(c,"for","recentStatCount"),t(s,"type","number"),t(s,"name","recentStatCount"),t(s,"placeholder","Type here"),t(s,"class","input input-bordered w-full max-w-xs"),s.value=v[0].recentStatCount,t(n,"class","form-control w-full max-w-xs"),t(l,"class","label"),t(l,"for","maxRecallDuration"),t(u,"type","number"),t(u,"name","maxRecallDuration"),t(u,"placeholder","Type here"),t(u,"class","input input-bordered w-full max-w-xs"),u.value=v[0].maxRecallDuration,t(r,"class","form-control w-full max-w-xs"),t(p,"class","mt-4"),t(e,"class",`flex flex-col p-6 ${v[2]} justify-between`)},m(g,m){z(g,e,m),a(e,d),a(d,n),a(n,c),a(n,h),a(n,s),a(e,x),a(e,f),a(f,r),a(r,l),a(r,S),a(r,u),a(e,T),a(e,p),C||(k=j(e,"submit",A(v[1])),C=!0)},p:E,i:E,o:E,d(g){g&&b(e),C=!1,k()}}}function Q(v){const e=G();e==="desktop"&&q.setSize(new O(350,500));const d=W("settings");function n(_){const h=new FormData(_.target),s={};for(let x of h){const[f,r]=x,l=Number.parseInt(r);s[f]=Number.isNaN(l)?r:l}J("settings",s),U(R.home)}return[d,n,e==="desktop"?"titlebar-vh w-screen":"aspect-[7/10] w-[350px] border border-gray rounded-md"]}class te extends B{constructor(e){super(),F(this,e,Q,K,$,{})}}export{te as component};