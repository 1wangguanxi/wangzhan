/* ============================================================
   page-faq.js —— faq.html 常见问题页专属脚本（原生 ES5/ES6，零依赖）
   功能：分类 tab 点击过滤 FAQ 手风琴项（手风琴开合由 main.js 的
   YH.initFaq 自动初始化，本文件只负责显示/隐藏）。
   支持 URL hash 直达分类：faq.html#service / #price / #quality /
   #after / #privacy（contact.html 快捷入口会用到）。
   ============================================================ */
(function (window, document) {
  'use strict';

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }
  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  function initFaqFilter() {
    var tabs = $all('.faq-tab');
    var items = $all('.faq-list .faq-item');
    if (!tabs.length || !items.length) return;

    // 切换分类：高亮 tab + 显示/隐藏对应问题
    function applyCategory(cat, updateHash) {
      tabs.forEach(function (tab) {
        var active = tab.getAttribute('data-cat') === cat;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      items.forEach(function (item) {
        var show = (cat === 'all') || (item.getAttribute('data-cat') === cat);
        item.style.display = show ? '' : 'none';
      });
      if (updateHash && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', cat === 'all' ? 'faq.html' : '#' + cat);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        applyCategory(tab.getAttribute('data-cat'), true);
      });
    });

    // URL hash 直达分类（如 faq.html#price），无匹配则默认「全部」
    function applyFromHash() {
      var hash = (window.location.hash || '').replace('#', '');
      if (!hash) return; // 无 hash 时保持当前状态（默认全部）
      var matched = tabs.some(function (tab) {
        return tab.getAttribute('data-cat') === hash;
      });
      if (matched) applyCategory(hash, false);
    }
    applyFromHash();
    // 同页 hash 跳转（页面不刷新时）也能切换分类
    window.addEventListener('hashchange', applyFromHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqFilter);
  } else {
    initFaqFilter();
  }
})(window, document);
