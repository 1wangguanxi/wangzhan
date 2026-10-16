/* ============================================================
   知瑜网络 · 官网全站交互脚本 main.js（原生 ES6，零依赖）
   ------------------------------------------------------------
   全局命名空间：window.YH
   后续页面复用方式：
     <body data-page="services"> ... <script src="js/main.js" defer></script>
   约定说明：
   - 当前页高亮：nav 链接加 data-page="xxx"，与 body[data-page] 对应即可，
     无 data-page 时脚本按 pathname 自动匹配；
   - 滚动进入动画：元素加 class="reveal"，进入视口自动加 .in-view；
   - 数字滚动：元素加 data-count="目标值"，可选 data-suffix="后缀"；
   - 扫码弹窗：任意元素加 data-open-modal="qrcode-modal" 即可触发；
   - FAQ 手风琴：容器加 class="faq-list"（结构见 index.html），自动初始化；
   - 平滑滚动：href 以 # 开头的站内锚点自动平滑滚动。
   兼容：iOS12+ / Android8+，避免使用 ?. ?? 等新语法，IntersectionObserver
   不可用时有兜底（元素直接可见 / 数字直接显示终值）。
   ============================================================ */
(function (window, document) {
  'use strict';

  var YH = window.YH = window.YH || {};

  /* ---------- 工具函数 ---------- */

  // 简写选择器
  function $(selector, context) {
    return (context || document).querySelector(selector);
  }
  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  // 判断是否尊重系统「减弱动效」设置
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // 平滑滚动兜底：requestAnimationFrame 版缓动滚动（不依赖 scroll-behavior）
  function smoothScrollTo(targetY, duration) {
    if (prefersReducedMotion() || !window.requestAnimationFrame) {
      window.scrollTo(0, targetY);
      return;
    }
    duration = duration || 500;
    var startY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var diff = targetY - startY;
    if (diff === 0) return;
    var startTime = null;
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * easeInOut(progress));
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  YH.smoothScrollTo = smoothScrollTo;

  /* ---------- 1. 汉堡菜单（移动端抽屉导航） ---------- */
  function initNavToggle() {
    var toggle = $('.nav-toggle');
    var mobileNav = $('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 点击菜单内链接后自动收起
    $all('a', mobileNav).forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. 当前页导航高亮 ---------- */
  function initNavHighlight() {
    // 优先使用 body[data-page]
    var page = document.body.getAttribute('data-page') || '';
    if (!page) {
      // 兜底：按文件名推断，如 /services.html -> services，/ 或 /index.html -> index
      var path = window.location.pathname;
      var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
      page = file.replace('.html', '') || 'index';
    }
    $all('.main-nav a[data-page], .mobile-nav a[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === page) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- 3. 扫码弹窗（免费咨询） ---------- */
  var Modal = {
    el: null,
    lastFocus: null, // 记录触发弹窗的元素，关闭后还原焦点
    init: function () {
      this.el = $('#qrcode-modal');
      if (!this.el) return;
      var self = this;

      // 所有 data-open-modal="qrcode-modal" 的触发器（按钮/链接）
      $all('[data-open-modal="qrcode-modal"]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          self.open(trigger);
        });
      });

      // 点击遮罩关闭
      var overlay = $('.modal__overlay', this.el);
      if (overlay) overlay.addEventListener('click', function () { self.close(); });

      // 关闭按钮
      $all('[data-close-modal]', this.el).forEach(function (btn) {
        btn.addEventListener('click', function () { self.close(); });
      });

      // ESC 关闭
      document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.keyCode === 27) && self.el.classList.contains('is-open')) {
          self.close();
        }
      });
    },
    open: function (trigger) {
      this.lastFocus = trigger || document.activeElement;
      this.el.classList.add('is-open');
      this.el.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      // 焦点移入弹窗（无障碍兜底，旧设备无 focus 选项也能工作）
      var closeBtn = $('.modal__close', this.el);
      if (closeBtn && closeBtn.focus) {
        try { closeBtn.focus({ preventScroll: true }); } catch (err) { closeBtn.focus(); }
      }
    },
    close: function () {
      this.el.classList.remove('is-open');
      this.el.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      // 焦点还原到触发按钮
      if (this.lastFocus && this.lastFocus.focus) {
        try { this.lastFocus.focus({ preventScroll: true }); } catch (err) { this.lastFocus.focus(); }
      }
      this.lastFocus = null;
    }
  };
  YH.modal = Modal;

  /* ---------- 4. FAQ 手风琴（可复用：页面上所有 .faq-item 自动初始化） ---------- */
  function initFaq() {
    $all('.faq-item').forEach(function (item) {
      var btn = $('.faq-item__q', item);
      var panel = $('.faq-item__a', item);
      if (!btn || !panel) return;

      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
          // 展开：设置实际内容高度以触发过渡动画
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          panel.style.maxHeight = '0px';
        }
      });
    });
  }
  YH.initFaq = initFaq; // 其他页动态插入 FAQ 后可手动调用

  /* ---------- 5. 数字滚动动画（进入视口触发） ---------- */
  function animateNumber(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500; // 1.5s，在 0.3-0.6s 基础节奏上放长便于观感

    // 减弱动效 / 无 RAF：直接显示终值
    if (prefersReducedMotion() || !window.requestAnimationFrame) {
      el.textContent = target + suffix;
      return;
    }
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOut 缓动
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function initCounters(observer) {
    var counters = $all('[data-count]');
    if (!counters.length) return;
    if (observer) {
      counters.forEach(function (el) {
        // 初始显示 0
        el.textContent = '0' + (el.getAttribute('data-suffix') || '');
        observer.observed.push(el);
        observer.io.observe(el);
      });
    } else {
      // 无 IO 兜底：直接显示终值
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      });
    }
  }

  /* ---------- 6. 滚动进入动画（IntersectionObserver -> .in-view） ---------- */
  function initReveal() {
    var revealEls = $all('.reveal');
    var hasIO = 'IntersectionObserver' in window;

    if (!hasIO) {
      // 兜底：IO 不可用时加 .no-io 类，CSS 中让所有 reveal 直接可见
      document.documentElement.classList.add('no-io');
      initCounters(null);
      return;
    }

    // 统一用一个 IO 处理 reveal 与数字滚动
    var observerRef = { io: null, observed: [] };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains('reveal')) {
          el.classList.add('in-view');
        }
        if (el.hasAttribute('data-count')) {
          animateNumber(el);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    observerRef.io = io;
    revealEls.forEach(function (el) { io.observe(el); });
    initCounters(observerRef);
  }

  /* ---------- 7. 回到顶部 ---------- */
  function initBackToTop() {
    var btn = $('.back-to-top');
    if (!btn) return;
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      // 用 RAF 节流，避免滚动事件频繁触发
      window.requestAnimationFrame(function () {
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        btn.classList.toggle('is-visible', y > 400);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初始化状态

    btn.addEventListener('click', function () {
      smoothScrollTo(0, 500);
    });
  }

  /* ---------- 8. 站内锚点平滑滚动 ---------- */
  function initSmoothScroll() {
    $all('a[href^="#"]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      link.addEventListener('click', function (e) {
        var target = $(href);
        if (!target) return;
        e.preventDefault();
        // 预留 sticky header 高度
        var headerH = $('.site-header') ? $('.site-header').offsetHeight : 0;
        var y = target.getBoundingClientRect().top +
                (window.pageYOffset || document.documentElement.scrollTop || 0) -
                headerH - 12;
        smoothScrollTo(Math.max(y, 0), 500);
        // 更新 URL hash（不跳动）
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      });
    });
  }

  /* ---------- 8.5 跨页锚点冷加载二次定位 ---------- */
  // 冷加载时浏览器在图片/字体就位前就跳到锚点，落点常会偏移；
  // window load 后再校正一次（尊重 prefers-reduced-motion）
  function initHashRecheck() {
    if (!window.location.hash) return;
    var hash = window.location.hash;
    var recheck = function () {
      var target = $(hash);
      if (!target) return;
      setTimeout(function () {
        var headerH = $('.site-header') ? $('.site-header').offsetHeight : 0;
        var y = target.getBoundingClientRect().top +
                (window.pageYOffset || document.documentElement.scrollTop || 0) -
                headerH - 12;
        y = Math.max(y, 0);
        var cur = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (Math.abs(cur - y) <= 4) return; // 已到位，不动
        if (prefersReducedMotion()) {
          window.scrollTo(0, y);
        } else {
          smoothScrollTo(y, 300);
        }
      }, 60);
    };
    if (document.readyState === 'complete') {
      recheck();
    } else {
      window.addEventListener('load', recheck);
    }
  }

  /* ---------- 初始化入口 ---------- */
  function init() {
    initNavToggle();
    initNavHighlight();
    Modal.init();
    initFaq();
    initReveal();
    initBackToTop();
    initSmoothScroll();
    initHashRecheck();
    // JS 就绪后移除 no-js 兜底类
    document.documentElement.classList.remove('no-js');
  }

  // defer 加载时 DOM 一般已就绪，仍做状态判断兜底
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
