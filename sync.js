(function(){
 function syncGradientButtons(){
  const source=document.querySelector(".gradient-flow");
  if(!source||!source.getAnimations)return;
  const a=source.getAnimations().find(x=>x.animationName==="gradient-flow");
  if(!a||typeof a.currentTime!=="number")return;
  document.querySelectorAll(".gradient-flow,.rich-toolbar button:not(.color-dot)").forEach(el=>{
   if(el===source||!el.getAnimations)return;
   const b=el.getAnimations().find(x=>x.animationName==="gradient-flow");
   if(b&&typeof b.currentTime==="number")b.currentTime=a.currentTime;
  });
 }
 function boot(){
  syncGradientButtons();
  const app=document.getElementById("app");
  if(app)new MutationObserver(()=>requestAnimationFrame(syncGradientButtons)).observe(app,{childList:true,subtree:true});
  document.querySelectorAll("dialog").forEach(d=>new MutationObserver(()=>requestAnimationFrame(syncGradientButtons)).observe(d,{childList:true,subtree:true}));
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();