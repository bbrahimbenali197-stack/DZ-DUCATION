(()=>{
 'use strict';
 const SESSION_KEY='taalim-access-role';
 const PROFILES={
  'DZ-PRI-7K4M-26':{role:'student',cycle:'Primaire',label:'التلميذ — ابتدائي',dest:'student.html'},
  'DZ-COL-9P2X-26':{role:'student',cycle:'Collège',label:'التلميذ — متوسط',dest:'student.html'},
  'DZ-LYC-5R8N-26':{role:'student',cycle:'Lycée',label:'التلميذ — ثانوي',dest:'student.html'},
  'DZ-PAR-4M8Q-26':{role:'parent',cycle:'Famille',label:'ولي التلميذ',dest:'parents.html'},
  'DZ-PROF-6T2W-26':{role:'teacher',cycle:'Enseignant',label:'الأستاذ',dest:'teachers.html'}
 };
 const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(_){return null}};
 const page=location.pathname.split('/').pop()||'index.html';
 if(page==='access.html'){
  const form=document.getElementById('accessForm'), input=document.getElementById('accessCode'), status=document.getElementById('status'), submit=document.getElementById('submitBtn');
  const roleButtons=[...document.querySelectorAll('[data-role]')];
  if(!form||!input||!status||!submit){console.error('TAALIM DZ: formulaire de connexion incomplet');return;}
  let selectedRole='';
  const show=(message,ok=false)=>{status.textContent=message;status.className=ok?'status ok':'status';status.style.display='block';status.setAttribute('role','status');};
  submit.disabled=false; submit.removeAttribute('disabled');
  roleButtons.forEach(button=>{button.type='button';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{selectedRole=button.dataset.role||'';roleButtons.forEach(other=>{const active=other===button;other.classList.toggle('selected',active);other.setAttribute('aria-pressed',String(active));});status.style.display='none';input.focus();});});
  input.addEventListener('input',()=>{status.style.display='none';});
  form.addEventListener('submit',event=>{
   event.preventDefault();
   if(!selectedRole){show('اختر فضاءك أولًا — Choisis d’abord ton profil.');roleButtons[0]?.focus();return;}
   const code=String(input.value||'').trim().toUpperCase().replace(/\s+/g,'');
   const profile=PROFILES[code];
   if(!profile||profile.role!==selectedRole){show('الرمز غير صحيح لهذا الفضاء. — Code incorrect pour ce profil.');input.focus();input.select();return;}
   try{localStorage.setItem(SESSION_KEY,JSON.stringify({...profile,loggedAt:new Date().toISOString()}));}catch(_){show('Le stockage local est indisponible. Autorise le stockage du navigateur puis réessaie.');return;}
   show('تم قبول الرمز. جارٍ فتح فضائك… — Code accepté, ouverture de votre espace…',true);
   submit.disabled=true;submit.textContent='جارٍ فتح فضائك…';
   location.assign(new URL(profile.dest,document.baseURI).href);
  });
  return;
 }
 const session=readSession();
 if(!session||!session.role){if(page!=='access.html')location.replace(new URL('access.html',document.baseURI).href);return;}
 const pageRoles={
  'parents.html':['parent'],'teachers.html':['teacher'],'student.html':['student'],'levels.html':['student'],'library.html':['student'],'practice.html':['student'],'exam.html':['student'],'games.html':['student'],'kids.html':['student'],'flashcards.html':['student'],'planner.html':['student'],'gamification.html':['student'],'pathway.html':['student'],'ai-tutor.html':['student'],'worksheet-maker.html':['teacher'],'admin.html':['teacher'],'community.html':['student','parent','teacher'],'videos.html':['student'],'offline.html':['student'],'sources.html':['student'],'cours-en-ligne.html':['student','teacher','parent']
 };
 if(pageRoles[page]&&!pageRoles[page].includes(session.role)){const dest=session.role==='parent'?'parents.html':session.role==='teacher'?'teachers.html':'student.html';location.replace(new URL(dest,document.baseURI).href);}
})();
