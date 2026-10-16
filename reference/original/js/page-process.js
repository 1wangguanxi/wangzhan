/* ============================================================
   page-process.js —— process.html（服务流程页）专属脚本
   功能：总览时间轴 scroll-spy（滚动到哪个步骤区块，高亮对应节点）
   说明：
   - 依赖 main.js 先加载（defer 按顺序执行），节点点击的平滑滚动
     由 main.js 的 a[href^="#"] 统一处理，本脚本只负责高亮；
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

  function initStepSpy() {
    var timeline = $('.ptimeline');
    if (!timeline) return;
    var nodes = $all('.ptimeline__node[data-spy]', timeline);
    if (!nodes.length) return;

    // 收集目标步骤区块
    var steps = [];
    nodes.forEach(function (node) {
      var target = document.getElementById(node.getAttribute('data-spy'));
      if (target) steps.push({ id: target.id, el: target, node: node });
    });
    if (!steps.length) return;

    var headerH = $('.site-header') ? $('.site-header').offsetHeight : 64;
    var ticking = false;

    function setActive(id) {
      steps.forEach(function (item) {
        var on = item.id === id;
        item.node.classList.toggle('is-active', on);
        if (on) {
          item.node.setAttribute('aria-current', 'true');
        } else {
          item.node.removeAttribute('aria-current');
        }
      });
    }

    function update() {
      var pos = (window.pageYOffset || document.documentElement.scrollTop || 0) + headerH + 24;
      var currentId = steps[0].id;
      var passed = false;
      for (var i = 0; i < steps.length; i++) {
        if (steps[i].el.offsetTop <= pos) {
          currentId = steps[i].id;
          passed = true;
        } else {
          break;
        }
      }
      // 还没滚动到第一个步骤区块时，不高亮任何节点
      if (!passed) {
        setActive('');
      } else {
        setActive(currentId);
      }
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
    // 点击节点时立即高亮（平滑滚动过程中 spy 会接管）
    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        setActive(node.getAttribute('data-spy'));
      });
    });
    update(); // 初始状态
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStepSpy);
  } else {
    initStepSpy();
  }
})(window, document);
