(function(){
"use strict";
const items=[{href:"#/",selector:".hero"},{href:"#catalogo",selector:"#catalogo"},{href:"#ajudar",selector:"#ajudar"},{href:"#sobre",selector:"#sobre"}];
function updateActive(){
 const links=Array.from(document.querySelectorAll("header nav a"));if(!links.length)return;
 const marker=window.scrollY+Math.min(window.innerHeight*.28,190);let current=items[0].href;
 for(const item of items){const el=document.querySelector(item.selector);if(el&&el.getBoundingClientRect().top+window.scrollY<=marker)current=item.href;}
 if(location.hash.startsWith("#/cao/"))current="#catalogo";
 links.forEach(a=>{if(a.getAttribute("href")===current)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
}
window.addEventListener("scroll",updateActive,{passive:true});
window.addEventListener("hashchange",()=>requestAnimationFrame(updateActive));
document.addEventListener("DOMContentLoaded",updateActive,{once:true});
window.addEventListener("load",updateActive,{once:true});
requestAnimationFrame(updateActive);
})();