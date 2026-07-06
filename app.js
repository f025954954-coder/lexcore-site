app.js/* ===== לקסקור — JS משותף לכל העמודים ===== */
(function(){
  // icons
  var IC={'scale-balanced':'⚖️','bolt':'⚡','rocket':'🚀','images':'🖼️','shield-halved':'🛡️','mobile-screen':'📱','check-circle':'✅','plug':'🔌','gauge-high':'📊','users':'👥','folder-open':'📂','hourglass-half':'⏳','envelope':'✉️','envelope-open-text':'📨','calendar-days':'📅','magnifying-glass':'🔎','file-lines':'📄','file-signature':'✍️','coins':'🪙','receipt':'🧾','file-invoice':'🧾','file-invoice-dollar':'💵','file-word':'📝','whatsapp':'💬','chrome':'🌐','print':'🖨️','address-card':'🪪','id-card':'🪪','landmark':'🏛️','building-columns':'🏛️','scroll':'📜','database':'🗄️','user-lock':'🔐','cloud-arrow-down':'☁️','user':'👤','briefcase':'💼','crown':'👑','headset':'🎧','bell':'🔔','layer-group':'📚','circle-play':'▶️','mobile':'📱','book-open':'📖','triangle-exclamation':'⚠️','wand-magic-sparkles':'✨','comment-dots':'💬','robot':'🤖','check':'✓','xmark':'✗','plus':'+','arrow-left':'←','arrow-right':'→','flag':'⚑','star':'★','play':'▶','pause':'⏸','bars':'☰','phone':'📞','clock-rotate-left':'🕘'};
  function icons(root){(root||document).querySelectorAll('i[class*="fa-"]').forEach(function(el){if(el.dataset.ic)return;var key=[].slice.call(el.classList).map(function(c){return c.replace(/^fa-/,'');}).find(function(c){return IC[c]!==undefined;});el.textContent=key?IC[key]:'•';el.dataset.ic='1';});}

  // reveal
  function reveal(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.1});document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(Math.min(i%6,5)*50)+'ms';io.observe(el);});}

  // faq
  function faq(){document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){q.parentElement.classList.toggle('open');});});}

  // mobile menu
  function menu(){var t=document.querySelector('.menu-toggle'),l=document.querySelector('.nav-links');if(t&&l)t.addEventListener('click',function(){l.classList.toggle('open');});}

  // active nav
  function activeNav(){var page=document.body.dataset.page;if(!page)return;document.querySelectorAll('.nav-links a').forEach(function(a){if(a.dataset.page===page)a.classList.add('active');});}

  // ===== chat widget =====
  var WA='https://wa.me/97225954954?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%9C%D7%A7%D7%A1%D7%A7%D7%95%D7%A8';
  var MAIL='mailto:l0533151511@gmail.com?subject=%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%94%D7%93%D7%92%D7%9E%D7%94';
  var CHIPS=['מה זה לקסקור?','מה המחיר?','אילו תוספים יש?','חתימה דיגיטלית','מנוע מועדי־חובה','קבעו הדגמה'];
  var INTENTS=[
   {k:['מה זה','מה זו','מהי','מה המערכת','על מה','להסביר','מה אתם','לקסקור','מה עושה'],a:'לקסקור היא מערכת ההפעלה של משרד עורכי דין למיסוי ומקרקעין — מרכזת תיקים, לקוחות, מועדי־חובה, מסמכים, טפסים, חתימות, מייל ופורטל לקוחות במקום אחד, עם אוטומציה שעושה את העבודה השחורה לבד.',c:['אילו תוספים יש?','מנוע מועדי־חובה','מה המחיר?']},
   {k:['מחיר','עלות','כמה עולה','כמה זה','מסלול','מסלולים','תשלום','חבילה','לשלם','יקר'],a:'יש שלושה מסלולים — יסוד, משרד ופרימיום — כשכל אחד עשיר מקודמו. המחיר נקבע לפי גודל המשרד והמסלול. אשמח לחבר אותך לנציג להצעה אישית מדויקת.',c:['מה כולל מסלול משרד?','קבעו הדגמה','דברו עם נציג']},
   {k:['מה כולל','הבדל','משרד','פרימיום','יסוד','מה יש ב','כלול'],a:'״יסוד״ — תיקים, מנוע מועדי־חובה, טופס 7005 ותבניות. ״משרד״ מוסיף תוספי Word/Chrome, סוכן מייל, חתימות ופורטל לצוות. ״פרימיום״ — משתמשים ללא הגבלה, התאמות אישיות והטמעה במשרד.',c:['מה המחיר?','קבעו הדגמה']},
   {k:['תוסף','תוספים','word','וורד','chrome','כרום','7000','נסח','טאבו','טופס','ממשלתי','מקרקעין ברשת'],a:'תוסף Word מתייק כל מסמך שכתבת ישר לתיק. תוספי Chrome ממלאים לבד את טופס 7000 של רשות המיסים ומזמינים נסח טאבו במקרקעין ברשת — הכול מנתוני התיק.',c:['חתימה דיגיטלית','מנוע מועדי־חובה','קבעו הדגמה']},
   {k:['חתימה','לחתום','חותם','comsign','כרטיס חכם','תעודה מזהה','חתימות','דיגיטלית','טוקן'],a:'שתי דרכים: (1) אתה חותם בכרטיס חכם/ComSign ישירות על הקובץ — קביל להגשה בטאבו. (2) הלקוח חותם מרחוק מהטלפון עם קוד־אימות ואתה מקבל PDF חתום.',c:['פורטל לקוחות','קבעו הדגמה']},
   {k:['מועד','מועדי','7005','מש','מיסוי','שבח','לוח זמנים','דדליין','חוזה','תזכורת','התראה','דיווח'],a:'מנוע מועדי־החובה קורא תאריך אחד מהחוזה ובונה לוח־זמנים מלא: דיווח מש״ח, תשלומים, מסירה ורישום — עם התראות. טופס 7005 מתמלא לבד מנתוני התיק.',c:['אילו תוספים יש?','אבטחה','קבעו הדגמה']},
   {k:['מייל','אימייל','דואר','סוכן','מיילים','לענות','תשובות'],a:'סוכן המייל קורא את התיבה, מתייק צרופות לתיק, ומכין טיוטת תשובה. אתה תמיד המאשר האחרון — הוא לא שולח כלום בלי אישורך.',c:['מנוע מועדי־חובה','מה המחיר?']},
   {k:['פורטל','לקוח','לקוחות','otp','קוד'],a:'בפורטל הלקוח נכנס בקוד־אימות, רואה את מצב התיק, מעלה מסמכים וחותם — 24/7. אתה מקבל התראה על כל פעולה.',c:['חתימה דיגיטלית','אבטחה']},
   {k:['אבטח','בטוח','נתונים','פרטיות','גיבוי','סודיות','מאובטח','ענן'],a:'הנתונים נשמרים מקומית במשרד (לא אצל גורם שלישי), עם הצפנת סיסמאות, הרשאות, שער־OTP וגיבוי יומי.',c:['מה זה לקסקור?','קבעו הדגמה']},
   {k:['נייד','אפליקציה','מובייל','טאבלט','pwa','מרחוק'],a:'יש אפליקציה לנייד ולטאבלט (PWA) עם ממשק מגע מלא, ואפשר לנהל את המשרד מרחוק מכל מקום.',c:['אילו תוספים יש?','קבעו הדגמה']},
   {k:['התקנה','להתקין','זמן','כמה מהר','להתחיל','ייבוא'],a:'ההתקנה אורכת דקות. מחברים Word, Chrome, מייל ו־WhatsApp, מייבאים לקוחות קיימים, ופותחים תיק ראשון עוד באותו יום.',c:['מה המחיר?','קבעו הדגמה']},
   {k:['תודה','מעולה','אחלה','סבבה','מגניב','יופי','נהדר'],a:'בשמחה! 🙏 אפשר לקבוע הדגמה אישית קצרה ולראות הכול על תיק אמיתי.',c:['קבעו הדגמה','דברו עם נציג']},
   {k:['שלום','היי','הי','אהלן','בוקר','ערב','מה נשמע'],a:'שלום! 👋 אני העוזר החכם של לקסקור. אפשר לשאול על היכולות, התוספים, החתימות או המחיר — או לקבוע הדגמה.',c:['מה זה לקסקור?','אילו תוספים יש?','מה המחיר?']}
  ];
  var ACTION_RE=/(הדגמה|דמו|לנסות|demo|נציג|לדבר|ליצור קשר|צור קשר|וואטסאפ|whatsapp|לתאם|פגישה)/i;
  function botAnswer(q){var t=q.toLowerCase().replace(/[?!.,]/g,' ');if(ACTION_RE.test(t))return{act:true,c:['מה המחיר?','אילו תוספים יש?']};var best=null,sc=0;INTENTS.forEach(function(it){var s=0;it.k.forEach(function(k){if(t.indexOf(k)>-1)s++;});if(s>sc){sc=s;best=it;}});if(best&&sc>0)return{a:best.a,c:best.c};return{a:'שאלה מצוינת! לקסקור מרכזת את כל המשרד — תיקים, מועדי־חובה, טפסים, חתימות, מייל ופורטל. על מה תרצה לשמוע יותר?',c:['מה זה לקסקור?','אילו תוספים יש?','דברו עם נציג']};}
  var chatInit=false;
  function buildChat(){
    var fab=document.createElement('div');fab.className='fab';fab.id='fab';
    fab.innerHTML='<a class="fab-btn mail" href="'+MAIL+'" title="אימייל"><span class="fab-lbl">שלחו אימייל</span>✉️</a>'+
      '<a class="fab-btn wa" href="'+WA+'" target="_blank" rel="noopener" title="WhatsApp"><span class="fab-lbl">דברו איתנו ב־WhatsApp</span>💬</a>'+
      '<button class="fab-btn ai" title="עוזר AI"><span class="fab-lbl">שאלו את העוזר החכם</span>🤖</button>';
    document.body.appendChild(fab);
    var w=document.createElement('div');w.className='chatw';w.id='chatw';
    w.innerHTML='<div class="cw-hdr"><div class="a">🤖</div><div class="t">העוזר החכם של לקסקור<small>בדרך כלל עונה מיד</small></div><button class="cw-x">×</button></div><div class="cw-body" id="cwBody"></div><div class="cw-chips" id="cwChips"></div><div class="cw-in"><input id="cwInput" placeholder="כתבו שאלה..."><button id="cwSend">➤</button></div>';
    document.body.appendChild(w);
    fab.querySelector('.ai').addEventListener('click',toggleChat);
    w.querySelector('.cw-x').addEventListener('click',toggleChat);
    document.getElementById('cwSend').addEventListener('click',send);
    document.getElementById('cwInput').addEventListener('keydown',function(e){if(e.key==='Enter')send();});
  }
  function addMsg(t,c){var b=document.getElementById('cwBody');var d=document.createElement('div');d.className='cb-msg '+c;d.textContent=t;b.appendChild(d);b.scrollTop=b.scrollHeight;}
  function addActions(){var b=document.getElementById('cwBody');var w=document.createElement('div');w.className='cb-actions';w.innerHTML='<a class="cb-act wa" href="'+WA+'" target="_blank" rel="noopener">💬 נציג ב־WhatsApp</a><a class="cb-act mail" href="'+MAIL+'">✉️ אימייל</a>';b.appendChild(w);b.scrollTop=b.scrollHeight;}
  function chips(list){var ch=document.getElementById('cwChips');ch.innerHTML='';(list&&list.length?list:CHIPS).forEach(function(c){var s=document.createElement('span');s.className='cw-chip';s.textContent=c;s.onclick=function(){addMsg(c,'me');respond(c);};ch.appendChild(s);});}
  function respond(q){var r=botAnswer(q);var b=document.getElementById('cwBody');var ty=document.createElement('div');ty.className='cb-typing';ty.innerHTML='<span></span><span></span><span></span>';b.appendChild(ty);b.scrollTop=b.scrollHeight;var d=480+Math.min(850,(r.a?r.a.length:20)*11);setTimeout(function(){ty.remove();if(r.act){addMsg('בכיף! אפשר לתאם הדגמה אישית — בחרו איך נוח לכם:','bot');addActions();}else addMsg(r.a,'bot');chips(r.c);},d);}
  function send(){var i=document.getElementById('cwInput');var v=i.value.trim();if(!v)return;addMsg(v,'me');i.value='';respond(v);}
  function toggleChat(){var w=document.getElementById('chatw'),f=document.getElementById('fab');var open=w.classList.toggle('on');f.style.display=open?'none':'flex';if(open&&!chatInit){chatInit=true;setTimeout(function(){addMsg('שלום! 👋 אני העוזר החכם של לקסקור. איך אפשר לעזור?','bot');chips(CHIPS);},250);}}

  document.addEventListener('DOMContentLoaded',function(){icons();reveal();faq();menu();activeNav();buildChat();icons();});
  window.LEX={icons:icons};
})();
