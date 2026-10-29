// Warm only the renderer code after the first photo; construct the stadium on entry.
(()=>{
  const button=document.querySelector('#exploreMode');let modulePromise;
  const warm=()=>modulePromise||=(import('./explore.js?v=20261029.2').catch(error=>{modulePromise=null;throw error;}));
  button.addEventListener('pointerenter',()=>warm().catch(()=>{}),{once:true});
  document.addEventListener('photochange',()=>{if(connection?.saveData||/2g/.test(connection?.effectiveType||''))return;idle(()=>warm().catch(()=>{}));},{once:true});
  button.onclick=async()=>{button.disabled=true;const previous=button.innerHTML;button.textContent='正在进入…';try{const module=await warm();await module.start();}catch(error){console.error('Exploration could not load:',error);button.textContent='重试进入';return;}finally{button.disabled=false;}button.innerHTML=previous;};
})();
