const levels=[
{cups:[{cap:5,fill:5},{cap:3,fill:0}],target:4},
{cups:[{cap:8,fill:8},{cap:5,fill:0},{cap:3,fill:0}],target:4},
{cups:[{cap:6,fill:6},{cap:4,fill:0},{cap:2,fill:0}],target:2},
{cups:[{cap:7,fill:7},{cap:5,fill:0},{cap:3,fill:0}],target:4},
{cups:[{cap:9,fill:9},{cap:7,fill:0},{cap:4,fill:0}],target:6},
{cups:[{cap:10,fill:10},{cap:7,fill:0},{cap:3,fill:0}],target:5},
{cups:[{cap:8,fill:0},{cap:5,fill:5},{cap:3,fill:3}],target:4},
{cups:[{cap:12,fill:12},{cap:8,fill:0},{cap:4,fill:0}],target:6},
{cups:[{cap:9,fill:0},{cap:5,fill:5},{cap:4,fill:4}],target:7},
{cups:[{cap:7,fill:7},{cap:6,fill:0},{cap:5,fill:0},{cap:3,fill:0}],target:2}
]
const elCups=document.getElementById('cups')
const elLevel=document.getElementById('level')
const elTarget=document.getElementById('target')
const elSteps=document.getElementById('steps')
const elUndo=document.getElementById('undo')
const elRestart=document.getElementById('restart')
const elPrev=document.getElementById('prev')
const elNext=document.getElementById('next')
const elOverlay=document.getElementById('overlay')
const elOverlayText=document.getElementById('overlay-text')
const elOverlayNext=document.getElementById('overlay-next')
let state={}
function clone(v){return JSON.parse(JSON.stringify(v))}
function setup(i){state={level:i,steps:0,history:[],selected:null,completed:false,init:clone(levels[i]),cups:clone(levels[i].cups),target:levels[i].target}
render()
}
function render(){elLevel.textContent='关卡 '+(state.level+1)+'/'+levels.length;elTarget.textContent='目标水量：'+state.target;elSteps.textContent='步数：'+state.steps;elCups.innerHTML='';state.cups.forEach((c,idx)=>{const wrap=document.createElement('button');wrap.className='cup';wrap.disabled=state.completed;wrap.setAttribute('data-idx',idx);if(state.selected===idx)wrap.classList.add('highlight');const water=document.createElement('div');water.className='water';water.style.height=Math.max(0,Math.min(100,(c.fill/c.cap)*100))+'%';const label=document.createElement('div');label.className='label';label.textContent=c.fill+'/'+c.cap;const cap=document.createElement('div');cap.className='cap';const targetTag=document.createElement('div');targetTag.className='target';targetTag.textContent='选中倒入';const tip=document.createElement('div');tip.className='pour-tip';tip.textContent='源杯';wrap.appendChild(water);wrap.appendChild(label);wrap.appendChild(cap);wrap.appendChild(targetTag);wrap.appendChild(tip);wrap.addEventListener('pointerup',onCupClick,{passive:true});elCups.appendChild(wrap)});elUndo.disabled=state.history.length===0||state.completed;elRestart.disabled=false;elPrev.disabled=state.level===0;elNext.disabled=state.level===levels.length-1;}
function onCupClick(e){if(state.completed)return;const idx=Number(e.currentTarget.getAttribute('data-idx'));if(state.selected==null){if(state.cups[idx].fill===0)return;state.selected=idx;render();return}if(idx===state.selected){state.selected=null;render();return}doPour(state.selected,idx);state.selected=null;}
function doPour(s,t){const a=state.cups[s];const b=state.cups[t];const space=b.cap-b.fill;const move=Math.min(a.fill,space);if(move<=0)return;state.history.push({cups:clone(state.cups),steps:state.steps});a.fill-=move;b.fill+=move;state.steps+=1;render();check()
}
function check(){const ok=state.cups.some(c=>c.fill===state.target);if(ok){state.completed=true;elOverlayText.textContent='完成';elOverlay.classList.remove('hidden')}}
function undo(){if(state.history.length===0||state.completed)return;const last=state.history.pop();state.cups=last.cups;state.steps=last.steps;state.selected=null;render()}
function restart(){state.cups=clone(state.init.cups);state.steps=0;state.selected=null;state.history=[];state.completed=false;elOverlay.classList.add('hidden');render()}
function prev(){if(state.level===0)return;setup(state.level-1)}
function next(){if(state.level===levels.length-1)return;setup(state.level+1)}
elUndo.addEventListener('pointerup',undo,{passive:true})
elRestart.addEventListener('pointerup',restart,{passive:true})
elPrev.addEventListener('pointerup',prev,{passive:true})
elNext.addEventListener('pointerup',next,{passive:true})
elOverlayNext.addEventListener('pointerup',()=>{elOverlay.classList.add('hidden');next()},{passive:true})
setup(0)
