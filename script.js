/* =========================================================
   YBFC-Studio 官网 · 交互脚本
   ========================================================= */

(function () {
  "use strict";

  /* 1. 移动端导航开关 */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    // 点击菜单项后自动收起
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  /* 2. 滚动渐显（IntersectionObserver） */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* 3. 数字滚动计数 */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var nums = document.querySelectorAll(".stat-num");
  if ("IntersectionObserver" in window && nums.length) {
    var countIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach(function (el) {
      countIo.observe(el);
    });
  } else {
    nums.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* 4. 导航栏滚动加阴影 */
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 10) nav.style.boxShadow = "0 1px 12px rgba(0,0,0,0.06)";
        else nav.style.boxShadow = "none";
      },
      { passive: true }
    );
  }

  /* 5. 页脚年份 */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 6. 中英双语切换 */
  var langBtn = document.getElementById("langSwitch");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var en = document.body.classList.toggle("lang-en");
      document.body.classList.toggle("lang-zh", !en);
      langBtn.textContent = en ? "中" : "EN";
      document.documentElement.lang = en ? "en" : "zh-CN";
    });
  }
})();
