/* Google Analytics */
(function () {
  var id = 'G-MP6RWXQK18';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
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

/* רק סרטון אחד מתנגן בכל רגע */
(function () {
  var all = document.querySelectorAll('video');
  all.forEach(function (v) {
    v.addEventListener('play', function () {
      all.forEach(function (o) { if (o !== v) o.pause(); });
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
