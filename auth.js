(()=>{
const sessionKey='taalim-access-role';
const profiles={
 'DZ-PRI-7K4M-26':{role:'student',cycle:'Primaire',label:'التلميذ — ابتدائي',dest:'student.html'},
 'DZ-COL-9P2X-26':{role:'student',cycle:'Collège',label:'التلميذ — متوسط',dest:'student.html'},
 'DZ-LYC-5R8N-26':{role:'student',cycle:'Lycée',label:'التلميذ — ثانوي',dest:'student.html'},
 'DZ-PAR-4M8Q-26':{role:'parent',cycle:'Famille',label:'ولي التلميذ',dest:'parents.html'},
 'DZ-PROF-6T2W-26':{role:'teacher',cycle:'Enseignant',label:'الأستاذ',dest:'teachers.html'}
};
const current=()=>{try{return JSON.parse(localStorage.getItem(sessionKey)||'null')}catch{return null}};
const page=location.pathname.split('/').pop()||'index.html';
if(page==='access.html'){
 const form=document.getElementById('accessForm'),input=document.getElementById('accessCode'),status=document.getElementById('status'),submit=document.getElementById('submitBtn');let selected='';
 document.querySelectorAll('[data-role]').forEach(btn=>btn.addEventListener('click',()=>{selected=btn.dataset.role;document.querySelectorAll('[data-role]').forEach(b=>b.classList.toggle('selected',b===btn));submit.disabled=false;status.style.display='none';input.focus()}));
 form.addEventListener('submit',e=>{e.preventDefault();const code=input.value.trim().toUpperCase(),profile=profiles[code];status.style.display='block';if(!selected){status.className='status';status.textContent='اختر فضاءك أولًا.';return}if(!profile||profile.role!==selected){status.className='status';status.textContent='الرمز غير صحيح لهذا الفضاء. تحقق من الرمز أو اختر الفضاء المناسب.';return}const session={...profile,loggedAt:new Date().toISOString()};localStorage.setItem(sessionKey,JSON.stringify(session));status.className='status ok';status.textContent='تم قبول الرمز. جارٍ فتح فضائك…';setTimeout(()=>location.href=profile.dest,250)});return;
}
const session=current();if(!session){location.replace('access.html');return}
// A simple navigation guard for user experience only, not real security.
const pageRoles={
 'parents.html':['parent'],'teachers.html':['teacher'],
 'student.html':['student'],'levels.html':['student'],'library.html':['student'],
 'practice.html':['student'],'exam.html':['student'],'games.html':['student'],
 'kids.html':['student'],'flashcards.html':['student'],'planner.html':['student'],
 'gamification.html':['student'],'pathway.html':['student'],'ai-tutor.html':['student'],
 'worksheet-maker.html':['teacher'],'admin.html':['teacher'],'community.html':['student','parent','teacher'],
 'videos.html':['student'],'offline.html':['student'],'sources.html':['student'],
 'cours-en-ligne.html':['student','teacher','parent']
};
if(pageRoles[page] && !pageRoles[page].includes(session.role)){const dest=session.role==='parent'?'parents.html':session.role==='teacher'?'teachers.html':'student.html';location.replace(dest);return}
})();