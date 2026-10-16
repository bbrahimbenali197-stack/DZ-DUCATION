const $=s=>document.querySelector(s);
const storageKey='taalim-dz-static-v1';
const quiz=[
 {q:'احسب: 2/9 + 4/9 = ؟',a:['6/18','6/9 = 2/3','2/3 + 4/3'],correct:1,why:'عندما تتساوى المقامات نجمع البسطين: 2/9 + 4/9 = 6/9، ثم نبسّط إلى 2/3.'},
 {q:'مربع طول ضلعه 4 سم. ما محيطه؟',a:['8 سم','12 سم','16 سم'],correct:2,why:'محيط المربع = 4 × طول الضلع = 4 × 4 = 16 سم.'},
 {q:'إذا كانت f(x) = 2x + 1، فما f(3)؟',a:['5','6','7'],correct:2,why:'نعوّض x بـ 3: f(3) = 2 × 3 + 1 = 7.'}
];
let resources=[];
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function loadState(){try{return JSON.parse(localStorage.getItem(storageKey))||{tasks:[],scores:[],quizRuns:0}}catch{return {tasks:[],scores:[],quizRuns:0}}}
function saveState(s){localStorage.setItem(storageKey,JSON.stringify(s));renderProgress()}
function renderResources(){
 const q=$('#search').value.trim().toLocaleLowerCase(),level=$('#levelFilter').value,sub=$('#subjectFilter').value,type=$('#typeFilter').value;
 const rows=resources.filter(r=>(!q||(r.title+' '+r.desc+' '+r.stage+' '+r.subject).toLocaleLowerCase().includes(q))&&(!level||r.stage===level)&&(!sub||r.subject===sub)&&(!type||r.type===type));
 $('#resourceCount').textContent=rows.length+' موارد';
 $('#resourceList').innerHTML=rows.length?rows.map(r=>`<article class="card resource-card"><div><span class="tag">${safe(r.stage)} · ${safe(r.subject)}</span> <span class="tag">${r.type==='cours'?'درس':'اختبار'}</span></div><h3>${safe(r.title)}</h3><p>${safe(r.desc)}</p><p class="small">${safe(r.label||'ملف PDF')}</p><div class="push"><a href="./${safe(r.file).replace(/^\.?\//,'')}" target="_blank" rel="noopener" download><button type="button">فتح / تحميل PDF ↗</button></a></div></article>`).join(''):'<div class="empty">لا توجد موارد مطابقة. جرّب كلمات بحث أو مرشحات أخرى.</div>';
}
function renderQuiz(){
 $('#quizBox').innerHTML=quiz.map((item,i)=>`<article class="quiz-question" data-question="${i}"><span class="tag">السؤال ${i+1}</span><h3>${safe(item.q)}</h3><div class="answers">${item.a.map((a,j)=>`<label class="answer"><input type="radio" name="q${i}" value="${j}"><span>${safe(a)}</span></label>`).join('')}</div><div class="feedback hidden" id="feedback${i}"></div></article>`).join('');
}
function gradeQuiz(){
 let score=0;
 quiz.forEach((item,i)=>{const chosen=document.querySelector(`input[name="q${i}"]:checked`),box=$('#feedback'+i),ok=chosen&&Number(chosen.value)===item.correct;if(ok)score++;box.classList.remove('hidden','good');box.classList.add(ok?'good':'');box.textContent=(ok?'إجابة صحيحة. ':'الإجابة الصحيحة: '+item.a[item.correct]+'. ')+item.why;});
 const pct=Math.round(score/quiz.length*100);$('#quizResult').textContent=`نتيجتك: ${score}/${quiz.length} (${pct}%)`;const s=loadState();s.scores.push({date:new Date().toLocaleDateString('ar-DZ'),score:pct});s.quizRuns++;saveState(s);
}
function resetQuiz(){renderQuiz();$('#quizResult').textContent='لم تُرسل إجاباتك بعد.'}
function renderTasks(){
 const s=loadState(),tasks=s.tasks||[],done=tasks.filter(t=>t.done).length;
 $('#taskSummary').textContent=tasks.length?`${done} من ${tasks.length} مهام منجزة`:'لا توجد مهام بعد.';
 $('#taskProgress').style.width=tasks.length?(done/tasks.length*100)+'%':'0%';
 $('#taskList').innerHTML=tasks.length?tasks.map((t,i)=>`<div class="task ${t.done?'done':''}"><input aria-label="تم إنجاز المهمة" type="checkbox" data-toggle="${i}" ${t.done?'checked':''}><span>${safe(t.day)} — ${safe(t.title)}</span><button class="secondary" type="button" data-delete="${i}" aria-label="حذف المهمة">حذف</button></div>`).join(''):'<p class="small">أضف أول مهمة للمراجعة باستخدام النموذج.</p>';
}
function addTask(){const title=$('#taskTitle').value.trim();if(!title){$('#taskTitle').focus();return}const s=loadState();s.tasks.push({title,day:$('#taskDay').value,done:false});saveState(s);$('#taskTitle').value='';renderTasks()}
function exportData(){
 const s=loadState(),payload={platform:'TAALIM DZ',exportedAt:new Date().toISOString(),tasks:s.tasks,scores:s.scores,quizRuns:s.quizRuns};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='taalim-dz-progression.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)
}
function renderProgress(){const s=loadState(),avg=s.scores.length?Math.round(s.scores.reduce((n,x)=>n+x.score,0)/s.scores.length):0;$('#heroProgress').style.width=avg+'%';$('#heroProgressText').textContent=s.quizRuns?`اختبارات منجزة: ${s.quizRuns} · متوسط النتائج: ${avg}%`:'ابدأ أول اختبار لتتبّع تقدّمك.'}
function initTheme(){if(localStorage.getItem('taalim-theme')==='dark')document.body.classList.add('dark');$('#themeBtn').textContent=document.body.classList.contains('dark')?'☀️':'🌙'}
$('#themeBtn').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('taalim-theme',document.body.classList.contains('dark')?'dark':'light');$('#themeBtn').textContent=document.body.classList.contains('dark')?'☀️':'🌙'});
['search','levelFilter','subjectFilter','typeFilter'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',renderResources));
$('#submitQuiz').addEventListener('click',gradeQuiz);$('#resetQuiz').addEventListener('click',resetQuiz);$('#addTask').addEventListener('click',addTask);
$('#taskTitle').addEventListener('keydown',e=>{if(e.key==='Enter')addTask()});
$('#taskList').addEventListener('change',e=>{if(e.target.matches('[data-toggle]')){const s=loadState(),i=Number(e.target.dataset.toggle);if(s.tasks[i])s.tasks[i].done=e.target.checked;saveState(s);renderTasks()}});
$('#taskList').addEventListener('click',e=>{const b=e.target.closest('[data-delete]');if(b){const s=loadState();s.tasks.splice(Number(b.dataset.delete),1);saveState(s);renderTasks()}});
$('#clearTasks').addEventListener('click',()=>{if(confirm('هل تريد حذف جميع مهام المراجعة؟')){const s=loadState();s.tasks=[];saveState(s);renderTasks()}});
$('#exportData').addEventListener('click',exportData);$('#parentExport').addEventListener('click',exportData);$('#printPage').addEventListener('click',()=>window.print());
$('#year').textContent=new Date().getFullYear();initTheme();renderQuiz();renderTasks();renderProgress();
fetch('./resources.json').then(r=>{if(!r.ok)throw Error('resources');return r.json()}).then(data=>{resources=Array.isArray(data)?data:[];renderResources()}).catch(()=>{$('#resourceList').innerHTML='<div class="empty">تعذّر تحميل الموارد. تحقق من وجود resources.json في المستودع.</div>'});
if('serviceWorker' in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
