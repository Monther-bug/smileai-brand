(function () {
  "use strict";
  var doc = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  /* ------------------------------------------------ language */
  function apply(lang) {
    var ar = lang === "ar";
    doc.lang = ar ? "ar" : "en";
    doc.dir = ar ? "rtl" : "ltr";
    document.querySelectorAll("[data-ar]").forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll("[data-ar-src]").forEach(function (el) {
      if (el.dataset.enSrc === undefined) el.dataset.enSrc = el.getAttribute("src");
      el.setAttribute("src", ar ? el.dataset.arSrc : el.dataset.enSrc);
    });
    document.querySelectorAll("[data-ar-href]").forEach(function (el) {
      if (el.dataset.enHref === undefined) el.dataset.enHref = el.getAttribute("href");
      el.setAttribute("href", ar ? el.dataset.arHref : el.dataset.enHref);
    });
    document.querySelectorAll("[data-ar-alt]").forEach(function (el) {
      if (el.dataset.enAlt === undefined) el.dataset.enAlt = el.getAttribute("alt");
      el.setAttribute("alt", ar ? el.dataset.arAlt : el.dataset.enAlt);
    });
    document.querySelectorAll("[data-ar-ph]").forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute("placeholder");
      el.setAttribute("placeholder", ar ? el.dataset.arPh : el.dataset.enPh);
    });
    document.title = ar ? "سمايل · مقترح الهوية" : "SmileAI · Brand Proposal";
    var btn = document.getElementById("lang");
    if (btn) btn.setAttribute("aria-label", ar ? "Switch to English" : "التبديل إلى العربية");
    store.set("smileai-lang", lang);
  }
  var q = new URLSearchParams(location.search).get("lang");
  var start = q === "ar" || q === "en" ? q : store.get("smileai-lang");
  if (start === "ar") apply("ar");
  document.getElementById("lang").addEventListener("click", function () {
    apply(doc.lang === "ar" ? "en" : "ar");
  });

  /* ------------------------------------------------ reveal + motion */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add(e.target.classList.contains("anim") ? "play" : "in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll(".reveal, .anim").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  document.querySelectorAll(".anim").forEach(function (el) {
    var board = el.closest(".board") || el;
    board.addEventListener("mouseenter", function () {
      el.classList.remove("play"); void el.getBoundingClientRect(); el.classList.add("play");
    });
  });

  /* ------------------------------------------------ choice */
  var form = document.getElementById("choice");
  var toast = document.getElementById("toast");
  var cfg = window.CONFIG || {};
  var S = window.STR || {};
  function say(pair) { toast.textContent = doc.lang === "ar" ? pair[1] : pair[0]; setTimeout(function () { toast.textContent = ""; }, 5000); }
  var saved = store.get("smileai-choice");
  if (saved) { var r = document.getElementById("p-" + saved); if (r) r.checked = true; }
  form.addEventListener("change", function (e) {
    if (e.target.name === "concept") store.set("smileai-choice", e.target.value);
  });
  function message() {
    var pick = form.querySelector("input[name=concept]:checked");
    if (!pick) { say(S.need); return null; }
    var ar = doc.lang === "ar";
    var name = document.getElementById("f-name").value.trim();
    var sel = document.getElementById("f-appname");
    var appName = sel.options[sel.selectedIndex].textContent.trim();
    var notes = document.getElementById("f-notes").value.trim();
    var label = ar ? pick.dataset.labelAr : pick.dataset.labelEn;
    var lines = ar
      ? ["اختيار شعار سمايل", "الاتجاه: " + label, "بخصوص الاسم: " + appName]
      : ["SmileAI logo choice", "Concept: " + label, "App name: " + appName];
    if (name) lines.push((ar ? "الاسم: " : "From: ") + name);
    if (notes) lines.push((ar ? "ملاحظات: " : "Notes: ") + notes);
    lines.push(location.href.split("#")[0]);
    return lines.join("\n");
  }
  document.getElementById("send-wa").addEventListener("click", function () {
    var m = message(); if (!m) return;
    var num = (cfg.whatsapp || "").replace(/\D/g, "");
    window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(m), "_blank", "noopener");
  });
  document.getElementById("send-mail").addEventListener("click", function () {
    var m = message(); if (!m) return;
    var subj = doc.lang === "ar" ? "اختيار شعار سمايل" : "SmileAI logo choice";
    location.href = "mailto:" + (cfg.email || "") + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(m);
  });
  document.getElementById("copy").addEventListener("click", function () {
    var m = message(); if (!m) return;
    function done() { say(S.copied); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(m).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = m; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  });
})();
