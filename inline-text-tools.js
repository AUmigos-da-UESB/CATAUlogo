(function(){
  const PALETTE_KEY = 'catau_inline_text_colors_v1';
  let savedRange = null;
  let savedEditor = null;
  function validColor(v){return /^#[0-9a-f]{6}$/i.test(String(v||''));}
  function loadPalette(){try{const arr=JSON.parse(localStorage.getItem(PALETTE_KEY)||'[]');return Array.isArray(arr)?arr.filter(validColor).slice(0,16):[]}catch(e){return []}}
  function storePalette(arr){try{localStorage.setItem(PALETTE_KEY,JSON.stringify(arr.slice(0,16)))}catch(e){}}
  function currentSelection(){
    const sel=window.getSelection();if(!sel||!sel.rangeCount||sel.isCollapsed)return null;
    const node=sel.anchorNode?.nodeType===3?sel.anchorNode.parentElement:sel.anchorNode;
    const editor=node?.closest?.('.site-editable[contenteditable="true"]');
    if(!editor||!editor.contains(sel.focusNode))return null;
    return {range:sel.getRangeAt(0).cloneRange(),editor};
  }
  function rememberSelection(){
    if(!document.body.classList.contains('inline-text-edit'))return;
    const s=currentSelection();if(s){savedRange=s.range;savedEditor=s.editor;}
  }
  function restoreSelection(){
    if(!savedRange||!savedEditor||!savedEditor.isConnected)return false;
    savedEditor.focus();const sel=window.getSelection();sel.removeAllRanges();sel.addRange(savedRange);return !sel.isCollapsed;
  }
  function applyColor(color){
    if(!validColor(color)||!restoreSelection())return;
    document.execCommand('styleWithCSS',false,true);
    document.execCommand('foreColor',false,color);
    rememberSelection();
  }
  function paletteButton(color){
    const item=document.createElement('span');item.className='inline-color-preset';item.title='Aplicar '+color;
    const apply=document.createElement('button');apply.type='button';apply.className='inline-color-swatch';apply.style.background=color;apply.dataset.color=color;apply.setAttribute('aria-label','Aplicar cor '+color);
    const remove=document.createElement('button');remove.type='button';remove.className='inline-color-remove';remove.textContent='×';remove.title='Remover cor predefinida';remove.setAttribute('aria-label','Remover cor '+color);
    apply.onclick=()=>applyColor(color);
    remove.onclick=()=>{storePalette(loadPalette().filter(c=>c.toLowerCase()!==color.toLowerCase()));renderPalette()};
    item.append(apply,remove);return item;
  }
  function renderPalette(){
    const box=document.getElementById('inline-color-presets');if(!box)return;
    box.innerHTML='';loadPalette().forEach(c=>box.appendChild(paletteButton(c)));
  }
  function buildBar(){
    const bar=document.getElementById('inline-text-bar');if(!bar||bar.dataset.colorTools==='1')return;
    bar.dataset.colorTools='1';
    const tool=document.createElement('div');tool.className='inline-color-tools';
    tool.innerHTML='<span class="inline-color-label">Cor</span><input id="inline-text-color" type="color" value="#8ea3ff" title="Escolher cor para o texto selecionado" aria-label="Escolher cor para o texto selecionado"><button type="button" class="inline-color-save" id="inline-color-save" title="Salvar esta cor como predefinida" aria-label="Salvar cor predefinida">+</button><div class="inline-color-presets" id="inline-color-presets" aria-label="Cores predefinidas"></div>';
    const actions=bar.querySelector('.inline-text-actions');bar.insertBefore(tool,actions);
    const input=tool.querySelector('#inline-text-color');
    input.addEventListener('pointerdown',rememberSelection);
    input.addEventListener('change',()=>applyColor(input.value));
    tool.querySelector('#inline-color-save').onclick=()=>{
      const color=input.value.toLowerCase();if(!validColor(color))return;
      const arr=loadPalette().filter(c=>c.toLowerCase()!==color);arr.unshift(color);storePalette(arr);renderPalette();
    };
    renderPalette();
  }
  function patchStart(){
    const pencil=document.getElementById('ftext');if(!pencil||typeof window.startInlineTextEdit!=='function')return;
    const original=window.startInlineTextEdit;if(original.__colorToolsPatched)return;
    const wrapped=function(){original.apply(this,arguments);buildBar();};wrapped.__colorToolsPatched=true;window.startInlineTextEdit=wrapped;
    pencil.onclick=()=>window.startInlineTextEdit();
  }
  document.addEventListener('selectionchange',rememberSelection);
  document.addEventListener('pointerdown',e=>{if(e.target.closest?.('.site-editable[contenteditable="true"]'))setTimeout(rememberSelection,0)});
  document.addEventListener('click',e=>{if(e.target.closest?.('#inline-text-cancel')){savedRange=null;savedEditor=null;}});
  patchStart();
  const observer=new MutationObserver(()=>{if(document.getElementById('inline-text-bar'))buildBar()});observer.observe(document.body,{childList:true,subtree:true});
})();