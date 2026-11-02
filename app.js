/* סטטיסטיקה: Google Analytics נטען רק אחרי אישור המבקר */
(function () {
  var KEY = 'lexcoreAnalyticsConsent', ID = 'G-MP6RWXQK18', loaded = false;
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadGa() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID);
  }
  function closeBox() {
    var b = document.getElementById('consentBox');
    if (b) b.parentNode.removeChild(b);
    document.removeEventListener('keydown', onKey);
  }
  function choose(v) {
    write(v);
    closeBox();
    if (v === 'yes') loadGa();
    else if (loaded) window['ga-disable-' + ID] = true;
  }
  function onKey(e) { if (e.key === 'Escape') choose('no'); }
  function openBox() {
    if (document.getElementById('consentBox')) return;
    var b = document.createElement('div');
    b.id = 'consentBox';
    b.className = 'consent';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'הסכמה לסטטיסטיקה');
    b.innerHTML = '<p>אפשר להפעיל Google Analytics, כדי שנדע כמה מבקרים מגיעים ומה הם קוראים? <a href="privacy.html">פרטים</a></p>' +
      '<div class="consent-actions"><button type="button" class="btn" data-v="yes">כן, אפשר</button><button type="button" class="btn" data-v="no">לא, תודה</button></div>';
    b.addEventListener('click', function (e) { var v = e.target.getAttribute('data-v'); if (v) choose(v); });
    document.body.appendChild(b);
    document.addEventListener('keydown', onKey);
  }
  var st = read();
  if (st === 'yes') loadGa();
  else if (st === null) setTimeout(openBox, 3000);
  document.querySelectorAll('[data-consent-open]').forEach(function (el) { el.addEventListener('click', openBox); });
})();

/* תפריט בנייד */
(function () {
  var b = document.querySelector('.menu-btn');
  if (!b) return;
  b.addEventListener('click', function () {
    var open = document.querySelector('.top').classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* כניסה רכה של האזורים בגלילה */
(function () {
  var els = document.querySelectorAll('main > section, main > .page-head');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.06 });
  els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();

/* מסלול העסקה: מעבר רך בין השלבים */
(function () {
  var items = document.querySelectorAll('.show-item'), imgs = document.querySelectorAll('.show-view img');
  items.forEach(function (it) {
    it.addEventListener('click', function () {
      var n = +it.getAttribute('data-i');
      items.forEach(function (o, i) { o.classList.toggle('on', i === n); o.setAttribute('aria-pressed', i === n ? 'true' : 'false'); });
      imgs.forEach(function (o, i) {
        o.classList.toggle('on', i === n);
        if (i === n) { o.removeAttribute('aria-hidden'); o.loading = 'eager'; } else o.setAttribute('aria-hidden', 'true');
      });
    });
  });
})();

/* הקלטת המסך בראש הדף: מתחילה בנחת, ואפשר לעצור */
(function () {
  var v = document.getElementById('heroVideo'), b = document.getElementById('heroToggle');
  if (!v || !b) return;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function label() { b.textContent = v.paused ? 'הפעלה' : 'השהיה'; }
  b.hidden = false;
  v.addEventListener('play', label);
  v.addEventListener('pause', label);
  b.addEventListener('click', function () { if (v.paused) v.play(); else v.pause(); });
  label();
  if (reduced) return;
  v.playbackRate = 0.85;
  setTimeout(function () { var p = v.play(); if (p && p.catch) p.catch(label); }, 1800);
})();

/* רק סרטון אחד עם קול בכל רגע */
(function () {
  var stories = document.querySelectorAll('.stories video'), hero = document.getElementById('heroVideo');
  stories.forEach(function (v) {
    v.addEventListener('play', function () {
      stories.forEach(function (o) { if (o !== v) o.pause(); });
      if (hero) hero.pause();
    });
  });
})();

/* טופס יצירת קשר */
(function () {
  var f = document.getElementById('leadForm');
  if (!f) return;
  var ok = document.getElementById('formOk'), err = document.getElementById('formErr');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    ok.hidden = true; err.hidden = true;
    fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('send failed');
        f.reset(); ok.hidden = false;
        if (window.gtag) gtag('event', 'generate_lead');
      })
      .catch(function () { err.hidden = false; });
  });
})();
