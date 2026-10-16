(()=>{
const codes={
 'DZ-PRI-7K4M-26':{role:'Primaire',cycle:'Primaire'},
 'DZ-COL-9P2X-26':{role:'Collège',cycle:'Collège'},
 'DZ-LYC-5R8N-26':{role:'Lycée',cycle:'Lycée'}
};
const key='taalim-access-role';
const current=()=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}};
const page=(location.pathname.split('/').pop()||'index.html');
if(page==='access.html'){
 const form=document.getElementById('accessForm'),status=document.getElementById('status'),box=document.getElementById('activeBox'),roleText=document.getElementById('activeRole');
 const active=current();
 if(active){form.style.display='none';box.style.display='block';roleText.textContent='Cycle actuel : '+(active.cycle||active.role||'Visiteur');}
 form.addEventListener('submit',e=>{e.preventDefault();const code=document.getElementById('accessCode').value.trim().toUpperCase();const profile=codes[code];status.style.display='block';if(!profile){status.className='status';status.textContent='رمز غير صحيح. Vérifie le code et réessaie.';return}localStorage.setItem(key,JSON.stringify({...profile,loggedAt:new Date().toISOString()}));status.className='status ok';status.textContent='مرحباً بك! تم قبول الرمز. Redirection…';const params=new URLSearchParams(location.search);let next=params.get('next')||'index.html';if(!/^(index|levels|library|practice|exam|flashcards|planner|parents|sources|help|gamification|games|pathway|ai-tutor|worksheet-maker|offline|videos|kids|admin|teachers|community)\.html$/.test(next))next='index.html';setTimeout(()=>location.href=next,350)});
 document.getElementById('logoutBtn').addEventListener('click',()=>{localStorage.removeItem(key);form.style.display='block';box.style.display='none';status.style.display='block';status.className='status ok';status.textContent='تم تسجيل الخروج من هذا الجهاز.'});return}
const session=current();if(!session){const next=page+location.search;location.replace('access.html?next='+encodeURIComponent(next))}
})();
