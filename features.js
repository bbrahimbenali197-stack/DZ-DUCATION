
(()=>{
'use strict';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readState=()=>{try{return JSON.parse(localStorage.getItem('taalim-excellence')||'{}')}catch{return {}}};
const readExtra=()=>{try{return JSON.parse(localStorage.getItem('taalim-features')||'{}')}catch{return {games:0,gameCorrect:0,worksheetCount:0}}};
const writeExtra=s=>localStorage.setItem('taalim-features',JSON.stringify(s));
const toast=s=>{const t=$('#toast');if(t){t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}};
const questions=[
 {topic:'Mathématiques',q:'Combien font 7 × 8 ?',a:['54','56','64','48'],c:1,why:'7 × 8 = 56.'},
 {topic:'Mathématiques',q:'Un rectangle mesure 8 cm sur 3 cm. Son aire est…',a:['11 cm²','16 cm²','24 cm²','22 cm²'],c:2,why:'Aire = longueur × largeur = 8 × 3 = 24 cm².'},
 {topic:'Mathématiques',q:'Si x + 9 = 15, alors x = …',a:['24','9','6','5'],c:2,why:'On soustrait 9 aux deux membres : x = 15 − 9 = 6.'},
 {topic:'Langue arabe',q:'ما ضد كلمة «قريب»؟',a:['بعيد','سريع','جميل','صغير'],c:0,why:'ضد قريب هو بعيد.'},
 {topic:'Langue arabe',q:'ما جمع كلمة «قلم»؟',a:['أقلام','قلمان فقط','قالم','قلمات'],c:0,why:'جمع قلم هو أقلام.'},
 {topic:'Sciences',q:'Quelle partie de la plante absorbe principalement l’eau ?',a:['La fleur','Les racines','Le fruit','La feuille uniquement'],c:1,why:'Les racines absorbent l’eau et les sels minéraux du sol.'},
 {topic:'Français',q:'Quel est le pluriel de « cheval » ?',a:['chevals','chevaux','chevales','chevaus'],c:1,why:'Le pluriel usuel de cheval est chevaux.'},
 {topic:'English',q:'Choose the correct sentence.',a:['They is ready.','They are ready.','They am ready.','They be ready.'],c:1,why:'Avec « they », on utilise « are ».'},
 {topic:'Sciences',q:'Quel organe pompe le sang ?',a:['Le poumon','Le cerveau','Le cœur','L’estomac'],c:2,why:'Le cœur propulse le sang dans les vaisseaux.'},
 {topic:'Mathématiques',q:'La moitié de 3/4 est…',a:['3/8','2/4','1/4','6/4'],c:0,why:'La moitié de 3/4 est (3/4) ÷ 2 = 3/8.'}
];
const wordQs=[
 {q:'Quel est le contraire de « facile » ?',a:['simple','difficile','rapide','calme'],c:1,why:'Le contraire de facile est difficile.'},
 {q:'ما مرادف كلمة «سعيد»؟',a:['حزين','فرح','غاضب','متعب'],c:1,why:'مرادف سعيد هو فرح.'},
 {q:'Choose the opposite of “early”.',a:['late','soon','quick','first'],c:0,why:'The opposite of early is late.'},
 {q:'Quel est le synonyme de « commencer » ?',a:['terminer','débuter','arrêter','oublier'],c:1,why:'Commencer signifie débuter.'}
];
function addScore(label,score,total){
 const s=readState();s.scores=Array.isArray(s.scores)?s.scores:[];s.activity=Array.isArray(s.activity)?s.activity:[];
 s.scores.push({label,score,total,date:new Date().toISOString()});s.activity.push(new Date().toISOString().slice(0,10));
 localStorage.setItem('taalim-excellence',JSON.stringify(s));
}
function calcXP(){
 const s=readState(),x=readExtra();
 const scores=Array.isArray(s.scores)?s.scores:[],tasks=Array.isArray(s.tasks)?s.tasks:[];
 const scoreXP=scores.reduce((n,r)=>n+Math.round(5*(Number(r.score)||0)/Math.max(1,Number(r.total)||1)),0);
 const taskXP=tasks.filter(t=>t.done).length*10;
 const gameXP=(Number(x.gameCorrect)||0)*5;
 const total=scoreXP+taskXP+gameXP;
 const unique=[...new Set(Array.isArray(s.activity)?s.activity:[])];
 let streak=0;const now=new Date();
 for(let i=0;i<31;i++){const d=new Date(now);d.setDate(now.getDate()-i);const key=d.toISOString().slice(0,10);if(unique.includes(key))streak++;else if(i>0)break}
 return {total,streak,daily:Math.min(20,taskXP%25+Math.min(10,gameXP%15)),tasks,scores,x};
}
function renderBadges(){
 const target=$('#badgeGrid');if(!target)return;const d=calcXP();
 const defs=[
  ['🌱','Premier pas','Terminer un premier quiz',d.scores.length>=1],
  ['📚','Organisé','Compléter 3 tâches',d.tasks.filter(t=>t.done).length>=3],
  ['🎯','Persévérant','Faire 5 tentatives',d.scores.length>=5],
  ['🧠','Esprit joueur','Réussir 5 réponses dans les jeux',d.x.gameCorrect>=5],
  ['🔥','Régulier','Étudier 3 jours différents',new Set((readState().activity||[])).size>=3],
  ['🏆','Champion du progrès','Atteindre 100 points',d.total>=100]
 ];
 if($('#xpTotal'))$('#xpTotal').textContent=d.total;
 if($('#xpStreak'))$('#xpStreak').textContent=d.streak;
 if($('#xpDaily'))$('#xpDaily').textContent=`${d.daily} / 20`;
 if($('#xpDailyBar'))$('#xpDailyBar').style.width=Math.min(100,d.daily/20*100)+'%';
 if($('#xpBadgesCount'))$('#xpBadgesCount').textContent=defs.filter(b=>b[3]).length;
 target.innerHTML=defs.map(b=>`<article class="card"><div class="symbol">${b[0]}</div><h3>${b[1]}</h3><p>${b[2]}</p><span class="pill ${b[3]?'green':''}">${b[3]?'Débloquée':'À débloquer'}</span></article>`).join('');
}
function setupGame(type){
 const math=type==='math', qs=math?questions.filter(q=>q.topic==='Mathématiques'):wordQs;
 const question=$(`#game${math?'Math':'Word'}Question`), choices=$(`#game${math?'Math':'Word'}Choices`), feedback=$(`#game${math?'Math':'Word'}Feedback`), score=$(`#game${math?'Math':'Word'}Score`), start=$(`#game${math?'Math':'Word'}Start`);
 if(!question||!choices||!start)return;
 let current=null,points=0,answered=false;
 function next(){current=qs[Math.floor(Math.random()*qs.length)];answered=false;question.textContent=current.q;choices.innerHTML=current.a.map((a,i)=>`<button class="answer" data-game-choice="${i}">${esc(a)}</button>`).join('');feedback.classList.add('hidden');}
 start.addEventListener('click',next);
 choices.addEventListener('click',e=>{
  const b=e.target.closest('[data-game-choice]');if(!b||!current||answered)return;answered=true;const ok=Number(b.dataset.gameChoice)===current.c;
  feedback.classList.remove('hidden','good','bad');feedback.classList.add(ok?'good':'bad');feedback.innerHTML=`<strong>${ok?'Bonne réponse ! +5 points':'Essaie encore !'}</strong><p>${esc(current.why)}</p>`;
  if(ok){points+=1;const x=readExtra();x.gameCorrect=(Number(x.gameCorrect)||0)+1;x.games=(Number(x.games)||0)+1;writeExtra(x);addScore('Jeu éducatif',1,1);renderBadges();}
  score.textContent=`Score : ${points}`;[...choices.querySelectorAll('button')].forEach((el,i)=>{el.disabled=true;if(i===current.c)el.style.borderColor='var(--teal)'});
 });
}
function setupPathway(){
 const btn=$('#buildPath'),out=$('#pathResults'),add=$('#pathAddTasks'),status=$('#pathStatus');if(!btn||!out||!add)return;
 let plan=[];
 btn.addEventListener('click',()=>{
  const level=$('#pathLevel').value,subject=$('#pathSubject').value,goal=$('#pathGoal').value;
  const s=readState(),scores=Array.isArray(s.scores)?s.scores:[];
  const last=scores.slice(-5);const avg=last.length?Math.round(last.reduce((n,r)=>n+(Number(r.score)||0)/Math.max(1,Number(r.total)||1),0)/last.length*100):null;
  const mode=goal==='exam'?'Préparation d’examen':goal==='practice'?'Entraînement progressif':'Revoir les bases';
  plan=[
   {title:`${mode} — ${subject}`,detail:`Niveau sélectionné : ${level.toUpperCase()}. Durée conseillée : 20 min.`},
   {title:`Lire une fiche de cours en ${subject}`,detail:'Choisis un document dans la bibliothèque locale ou un cours d’une source pédagogique.'},
   {title:`Faire 5 exercices de ${subject}`,detail:'Réponds sur papier puis consulte le corrigé disponible.'},
   {title:'Terminer un mini-quiz',detail:avg===null?'Une première tentative permettra de créer une référence de progression.':`Moyenne récente estimée : ${avg} %. Révise les notions difficiles.`}
  ];
  out.innerHTML=`<p class="pill green">${esc(mode)}</p><p>${avg===null?'Pas encore de résultats enregistrés.':'Moyenne récente : '+avg+'%.'}</p><ol>${plan.map(p=>`<li><strong>${esc(p.title)}</strong><p class="tiny">${esc(p.detail)}</p></li>`).join('')}</ol><a class="btn alt" href="library.html?level=${encodeURIComponent(level)}">Ouvrir la bibliothèque</a>`;
  status.textContent='Parcours créé. Tu peux ajouter les étapes au planning.';
 });
 add.addEventListener('click',()=>{
  if(!plan.length){status.textContent='Crée d’abord ton parcours.';return}
  const s=readState();s.tasks=Array.isArray(s.tasks)?s.tasks:[];
  plan.forEach(p=>s.tasks.push({id:'path-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),title:p.title,subject:$('#pathSubject').value,date:'',done:false}));
  localStorage.setItem('taalim-excellence',JSON.stringify(s));status.textContent=`${plan.length} étapes ajoutées à ton planning.`;toast('Parcours ajouté au planning');
 });
}
const tutorRules=[
 {keys:['aire','rectangle','area'],html:'<strong>Aire d’un rectangle</strong><p>Aire = longueur × largeur.</p><p>Exemple : 6 cm × 3 cm = 18 cm². N’oublie pas l’unité carrée.</p>'},
 {keys:['fraction','كسر','fractions'],html:'<strong>Comprendre les fractions</strong><p>Une fraction représente une ou plusieurs parts égales. Dans 3/4, le 4 indique le nombre total de parts et le 3 le nombre de parts prises.</p><p>Exemple : 1/2 = 2/4 en multipliant le numérateur et le dénominateur par 2.</p>'},
 {keys:['bac','bem','exam','examen'],html:'<strong>Préparer un examen</strong><ol><li>Révise une notion pendant 20–25 minutes.</li><li>Fais des exercices sans regarder la correction.</li><li>Corrige tes erreurs et note les notions à revoir.</li><li>Fais un sujet chronométré chaque semaine.</li></ol>'},
 {keys:['conjug','verbe','فعل'],html:'<strong>Conseil de grammaire</strong><p>Repère d’abord le sujet, puis le temps du verbe. Vérifie la terminaison avec la personne (je, tu, il/elle, nous, vous, ils/elles).</p><p>Écris une phrase d’exemple puis transforme-la à une autre personne.</p>'},
 {keys:['aire','périmètre','perimetre'],html:'<strong>Périmètre</strong><p>Le périmètre est la longueur du contour. Pour un rectangle : P = 2 × (longueur + largeur).</p>'},
 {keys:['science','plante','plant','جذر'],html:'<strong>Sciences : la plante</strong><p>Les racines absorbent l’eau et les sels minéraux ; la tige soutient la plante et transporte la sève ; les feuilles participent à la photosynthèse.</p>'},
 {keys:['anglais','english','present simple'],html:'<strong>English — present simple</strong><p>Use the base verb with I/you/we/they. With he/she/it, usually add -s or -es: “She plays”, “They play”.</p>'}
];
function setupTutor(){
 const input=$('#tutorQuestion'),out=$('#tutorAnswer'),ask=$('#tutorAsk');if(!input||!out||!ask)return;
 const answer=()=>{const q=input.value.trim().toLowerCase();if(!q){out.textContent='Écris une question ou choisis un exemple.';return}
 const rule=tutorRules.find(r=>r.keys.some(k=>q.includes(k)));
 out.innerHTML=rule?rule.html:'<strong>Je peux t’aider à organiser ta recherche.</strong><p>Essaie des mots-clés comme « aire », « fraction », « conjugaison », « plante », « anglais », « BEM » ou « BAC ».</p><p>Pour une réponse générative libre, une future version devra connecter un service d’IA avec une clé API protégée côté serveur. Ne partage aucune donnée personnelle ici.</p>';
 };
 ask.addEventListener('click',answer);input.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')answer()});
 $('#tutorClear').addEventListener('click',()=>{input.value='';out.textContent='Écris une question ou choisis un exemple pour commencer.'});
 $$('.tutor-prompt').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.prompt;answer()}));
}
function setupWorksheet(){
 const gen=$('#wsGenerate'),preview=$('#wsPreview'),download=$('#wsDownload'),print=$('#wsPrint');if(!gen||!preview||!download||!print)return;
 let generated='';
 gen.addEventListener('click',()=>{
  const level=$('#wsLevel').value,subject=$('#wsSubject').value,count=Number($('#wsCount').value),withAnswers=$('#wsIncludeAnswers').checked;
  const shuffled=[...questions].sort(()=>Math.random()-.5).slice(0,count);
  const items=Array.from({length:count},(_,i)=>shuffled[i%shuffled.length]);
  generated=`<!doctype html><html lang="fr" dir="auto"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fiche TAALIM DZ</title><style>body{font-family:Arial,sans-serif;max-width:850px;margin:30px auto;padding:20px;line-height:1.6;color:#222}h1{color:#4f46e5}li{margin:14px 0}.answers{color:#555}</style><h1>TAALIM DZ — Fiche d’entraînement</h1><p><strong>Niveau :</strong> ${esc(level)} | <strong>Matière :</strong> ${esc(subject)} | <strong>Date :</strong> ${new Date().toLocaleDateString()}</p><p>Nom : ____________________ Classe : __________</p><hr><ol>${items.map(q=>`<li>${esc(q.q)}<p class="answers">${q.a.map(a=>'□ '+esc(a)).join('　')}</p></li>`).join('')}</ol>${withAnswers?`<hr><h2>Corrigé modèle</h2><ol>${items.map(q=>`<li>${esc(q.a[q.c])} — ${esc(q.why)}</li>`).join('')}</ol>`:''}<p>Support original d’entraînement, non officiel. Vérifier l’adéquation au programme avant utilisation.</p></html>`;
  preview.innerHTML=`<p><strong>${esc(level)} — ${esc(subject)}</strong></p><p>${count} questions générées${withAnswers?' avec corrigé.':'.'}</p><ol>${items.map(q=>`<li>${esc(q.q)}</li>`).join('')}</ol>${withAnswers?'<span class="pill green">Corrigé inclus dans le téléchargement</span>':'<span class="pill">Sans corrigé</span>'}`;
  download.disabled=false;print.disabled=false;const x=readExtra();x.worksheetCount=(Number(x.worksheetCount)||0)+1;writeExtra(x);toast('Fiche créée. Tu peux la télécharger ou l’imprimer.');
 });
 download.addEventListener('click',()=>{if(!generated)return;const blob=new Blob([generated],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='taalim-dz-fiche.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 print.addEventListener('click',()=>{if(!generated)return;const w=window.open('','_blank');if(!w){toast('Autorise les fenêtres pop-up pour imprimer la fiche.');return}w.document.open();w.document.write(generated);w.document.close();w.focus();w.print()});
}
function setupOffline(){
 const status=$('#offlineStatus'),network=$('#networkStatus'),check=$('#offlineCheck'),shell=$('#offlineShell'),shellStatus=$('#offlineShellStatus'),pdfBtn=$('#offlinePdfs'),pdfStatus=$('#offlinePdfStatus'),bar=$('#offlinePdfBar');if(!status||!network||!check||!shell||!pdfBtn)return;
 function update(){const online=navigator.onLine;status.textContent=online?'Connecté':'Hors ligne';status.className='pill '+(online?'green':'');network.textContent=online?'Connexion disponible. Tu peux précharger les ressources.':'Tu es hors ligne. Les ressources mises en cache restent consultables.'}
 check.addEventListener('click',update);window.addEventListener('online',update);window.addEventListener('offline',update);update();
 shell.addEventListener('click',async()=>{if(!('serviceWorker'in navigator)){shellStatus.textContent='Ce navigateur ne prend pas en charge les service workers.';return}try{const reg=await navigator.serviceWorker.register('./sw.js');await reg.update();const cache=await caches.open('taalim-dz-user-assets');const paths=['./','./index.html','./levels.html','./library.html','./practice.html','./exam.html','./gamification.html','./games.html','./pathway.html','./ai-tutor.html','./worksheet-maker.html','./offline.html','./app.js','./features.js','./resources.js','./resources.json'];let n=0;for(const p of paths){try{await cache.add(p);n++}catch(e){}}shellStatus.textContent=`${n}/${paths.length} ressources essentielles mises en cache.`;toast('Préchargement des pages terminé.')}catch(e){shellStatus.textContent='Impossible de précharger : ouvre le site via HTTPS ou localhost.'}});
 pdfBtn.addEventListener('click',async()=>{if(!navigator.onLine){pdfStatus.textContent='Connecte-toi avant de précharger les PDF.';return}pdfBtn.disabled=true;try{let data=window.TAALIM_RESOURCES||[];const files=[...new Set(data.filter(r=>r.local&&r.file).map(r=>r.file))];const cache=await caches.open('taalim-dz-user-pdfs');let done=0,failed=0;for(const f of files){try{const response=await fetch(f);if(response.ok)await cache.put(f,response);else failed++}catch(e){failed++}done++;bar.style.width=Math.round(done/files.length*100)+'%';pdfStatus.textContent=`${done}/${files.length} fichiers traités • ${failed} échecs`; }pdfStatus.textContent=`Terminé : ${done-failed} fichiers en cache, ${failed} échecs. Tu peux maintenant tester le mode hors connexion.`;toast('Préchargement PDF terminé.')}catch(e){pdfStatus.textContent='Préchargement impossible. Vérifie la connexion et l’espace disponible.'}finally{pdfBtn.disabled=false}});
}
function renderParentEnhancement(){
 const container=$('#parentSummaryPlus');if(!container)return;
 const s=readState(),x=readExtra(),scores=Array.isArray(s.scores)?s.scores:[],tasks=Array.isArray(s.tasks)?s.tasks:[];
 const total=scores.length,avg=total?Math.round(scores.reduce((n,r)=>n+(Number(r.score)||0)/Math.max(1,Number(r.total)||1),0)/total*100):0;
 container.innerHTML=`<div class="grid grid4"><article class="card"><div class="symbol">🧪</div><h3>Tests réalisés</h3><strong>${total}</strong></article><article class="card"><div class="symbol">📈</div><h3>Moyenne d'entraînement</h3><strong>${avg}%</strong></article><article class="card"><div class="symbol">✅</div><h3>Tâches terminées</h3><strong>${tasks.filter(t=>t.done).length}/${tasks.length}</strong></article><article class="card"><div class="symbol">🎮</div><h3>Bonnes réponses en jeu</h3><strong>${Number(x.gameCorrect)||0}</strong></article></div><p class="tiny mt">Rapport calculé à partir des données locales de cet appareil ; ce n'est pas un dossier scolaire officiel.</p>`;
}
document.addEventListener('DOMContentLoaded',()=>{
 setupGame('math');setupGame('word');setupPathway();setupTutor();setupWorksheet();setupOffline();renderBadges();renderParentEnhancement();
 document.addEventListener('click',()=>setTimeout(()=>{renderBadges();renderParentEnhancement()},100));
 document.addEventListener('change',()=>setTimeout(()=>{renderBadges();renderParentEnhancement()},100));
});
})();
