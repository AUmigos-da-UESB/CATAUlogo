(function(){
  function syncVolunteer(){
    const target=document.getElementById("vadd");
    if(!target)return;
    target.classList.add("gradient-flow");
    const source=document.querySelector("#fadd.gradient-flow:not([style*='display: none'])")||document.querySelector(".gradient-flow");
    if(!source||!source.getAnimations)return;
    const a=source.getAnimations().find(x=>x.animationName==="gradient-flow");
    const b=target.getAnimations().find(x=>x.animationName==="gradient-flow");
    if(a&&b&&typeof a.currentTime==="number"&&a.currentTime!=null){
      b.currentTime=a.currentTime;
    }
  }
  function boot(){
    syncVolunteer();
    const app=document.getElementById("app");
    if(app)new MutationObserver(syncVolunteer).observe(app,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();