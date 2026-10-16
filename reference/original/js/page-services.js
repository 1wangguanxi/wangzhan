/* ============================================================
   page-services.js —— services.html（服务介绍页）专属脚本
   功能：左侧 sticky 服务导航滚动高亮（scroll-spy）
   说明：
   - 依赖 main.js 先加载（defer 按顺序执行），平滑滚动由 main.js 统一处理；
   - 本脚本只负责「滚动到哪个服务区块，就给导航对应链接加 .is-active」；
   - 兼容 iOS12+ / Android8+，不使用 ?. ?? 等新语法。
   ============================================================ */
(function (window, document) {
  'use strict';

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }
  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  function initServiceSpy() {
    var nav = $('.svc-nav');
    if (!nav) return;
    var links = $all('a[data-spy]', nav);
    if (!links.length) return;

    // 收集目标区块
    var sections = [];
    links.forEach(function (link) {
      var target = document.getElementById(link.getAttribute('data-spy'));
      if (target) sections.push({ id: target.id, el: target, link: link });
    });
    if (!sections.length) return;

    var headerH = $('.site-header') ? $('.site-header').offsetHeight : 64;
    var ticking = false;

    function setActive(id) {
      sections.forEach(function (item) {
        var on = item.id === id;
        item.link.classList.toggle('is-active', on);
        if (on) {
          item.link.setAttribute('aria-current', 'true');
        } else {
          item.link.removeAttribute('aria-current');
        }
      });
    }

    function update() {
      var pos = (window.pageYOffset || document.documentElement.scrollTop || 0) + headerH + 24;
      var currentId = sections[0].id;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].el.offsetTop <= pos) {
          currentId = sections[i].id;
        } else {
          break;
        }
      }
      // 滚动到底部附近时，高亮最后一项（避免价格/套餐区时无高亮）
      var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      var winH = window.innerHeight || document.documentElement.clientHeight;
      if (pos - headerH - 24 + winH >= docH - 80) {
        currentId = sections[sections.length - 1].id;
      }
      setActive(currentId);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(update);
      } else {
        update();
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // 点击导航时立即高亮（平滑滚动过程中 spy 会接管）
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setActive(link.getAttribute('data-spy'));
      });
    });
    update(); // 初始状态
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceSpy);
  } else {
    initServiceSpy();
  }
})(window, document);
