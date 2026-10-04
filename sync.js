(function(){
 const DURATION=8000;
 function syncGradientButtons(){
  const phase=Math.floor(performance.now()%DURATION);
  document.querySelectorAll(".gradient-flow").forEach(el=>{
   if(!el||!el.style)return;
   el.style.setProperty("animation","gradient-flow 8s linear infinite alternate","important");
   el.style.setProperty("animation-duration","8000ms","important");
   el.style.setProperty("animation-delay","-"+phase+"ms","important");
   el.style.setProperty("animation-play-state","running","important");
  });
 }
 function boot(){
  const start=()=>requestAnimationFrame(syncGradientButtons);
  start();
  const app=document.getElementById("app");
  if(app)new MutationObserver(start).observe(app,{childList:true,subtree:true});
  document.querySelectorAll("dialog").forEach(d=>new MutationObserver(start).observe(d,{childList:true,subtree:true}));
  window.addEventListener("resize",start,{passive:true});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();