/* CATAUlogo — navegação principal substituída, acessível e responsiva. */
(function(){
 "use strict";
 const header=document.getElementById("site-header");
 const toggle=document.getElementById("site-menu-toggle");
 const nav=document.getElementById("site-primary-nav");
 if(!header||!toggle||!nav)return;
 const links=Array.from(nav.querySelectorAll("a"));
 const targets=[
  {href:"#inicio",selector:"#inicio"},
  {href:"#catalogo",selector:"#catalogo"},
  {href:"#ajudar",selector:"#ajudar"},
  {href:"#sobre",selector:"#sobre"}
 ];
 function closeMenu(){
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded","false");
  toggle.setAttribute("aria-label","Abrir menu");
 }
 function updateActive(){
  const marker=window.scrollY+Math.min(window.innerHeight*.32,210);
  let current="#inicio";
  for(const item of targets){
   const el=document.querySelector(item.selector);
   if(el&&el.getBoundingClientRect().top+window.scrollY<=marker)current=item.href;
  }
  if(location.hash.startsWith("#/cao/"))current="#catalogo";
  links.forEach(link=>{
   if(link.getAttribute("href")===current)link.setAttribute("aria-current","page");
   else link.removeAttribute("aria-current");
  });
 }
 toggle.addEventListener("click",()=>{
  const open=toggle.getAttribute("aria-expanded")!=="true";
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
  nav.classList.toggle("is-open",open);
 });
 links.forEach(link=>link.addEventListener("click",()=>{
  closeMenu();
  const target=document.querySelector(link.getAttribute("href"));
  if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"}));
 }));
 document.addEventListener("click",event=>{if(!header.contains(event.target))closeMenu()});
 document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeMenu();toggle.focus()}});
 window.addEventListener("resize",()=>{if(window.innerWidth>820)closeMenu()});
 window.addEventListener("scroll",updateActive,{passive:true});
 window.addEventListener("hashchange",()=>requestAnimationFrame(updateActive));
 window.addEventListener("load",updateActive,{once:true});
 requestAnimationFrame(updateActive);
})();