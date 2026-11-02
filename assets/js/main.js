/* ==========================================================================
   R.W Electrical — site scripts (vanilla, no dependencies)
   Menu · header state · scroll reveals · services explorer · quote form
   ========================================================================== */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('[data-open]').classList.toggle('hidden', open);
    menuBtn.querySelector('[data-close]').classList.toggle('hidden', !open);
    menuBtn.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 768) setMenu(false); });
  }

  /* ---------- Header border once scrolled ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    var scrolled = window.scrollY > 12;
    header.classList.toggle('border-graphite-line', scrolled);
    header.classList.toggle('shadow-card', scrolled);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Sticky mobile bar: show once the hero buttons are out of view ---------- */
  var bar = document.getElementById('mobileBar');
  var heroCtas = document.querySelector('[data-hero-ctas]');
  if (bar && heroCtas && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-shown', !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
    }).observe(heroCtas);
  } else if (bar) {
    bar.classList.add('is-shown');
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Services explorer (accessible tabs) ---------- */
  var explorer = document.querySelector('[data-explorer]');
  if (explorer) {
    var tabs = Array.prototype.slice.call(explorer.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        panels[i].classList.toggle('is-active', on);
      });
      if (focus) tabs[index].focus();
      // keep the chosen chip in view on the mobile scroller
      var list = tabs[index].parentElement;
      if (list.scrollWidth > list.clientWidth) {
        var t = tabs[index];
        list.scrollTo({ left: t.offsetLeft - list.clientWidth / 2 + t.clientWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
  }

  /* ---------- "Ask about …" links pre-fill the service dropdown ---------- */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!serviceSelect) return;
      var wanted = link.getAttribute('data-service');
      Array.prototype.forEach.call(serviceSelect.options, function (o) { if (o.text === wanted) serviceSelect.value = o.value; });
    });
  });

  /* ---------- Quote form: inline validation + submit state ---------- */
  var form = document.getElementById('quoteForm');
  if (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('input[required], textarea[required]'));
    var check = function (field) {
      var ok = field.checkValidity() && field.value.trim() !== '';
      var err = document.getElementById(field.getAttribute('aria-describedby'));
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.classList.toggle('hidden', ok);
      return ok;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = form.querySelector('[data-submit]');
      btn.disabled = true;
      btn.querySelector('[data-label]').textContent = 'Sending…';
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
