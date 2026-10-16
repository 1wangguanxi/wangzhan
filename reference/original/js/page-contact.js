/* ============================================================
   page-contact.js —— contact.html 联系我们页专属脚本（原生，零依赖）
   功能：在线留言表单的前端验证 + 模拟提交。
   验证规则：
   - 姓名：必填，去空格后不少于 2 个字，且不能纯符号（至少含一个汉字/字母/数字）；
   - 学校：必填，去空格后不少于 2 个字；
   - 专业：必填，去空格后不能为空；
   - 需求描述：必填，去空格后不少于 10 个字；
   - 论文截止时间：必填，且不能早于今天；
   - 错误在对应字段下方红字提示，输入时即时清除；
   - 提交中按钮进入 loading 态（禁用 + 文案变「提交中…」）；
   - 当前无真实后端：直接模拟成功，显示绿色成功卡并清空表单。
     上线时把下方注释里的 fetch 解开、指向真实接口即可。
   ============================================================ */
(function (window, document) {
  'use strict';

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function initContactForm() {
    var form = $('#contact-form');
    if (!form) return;

    var fields = {
      name: $('#f-name'),
      school: $('#f-school'),
      major: $('#f-major'),
      deadline: $('#f-deadline'),
      message: $('#f-message')
    };
    var submitBtn = $('#contact-submit');
    var successCard = $('#form-success');
    var submitBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    /* 显示 / 清除某个字段的错误 */
    function showError(input, msg) {
      var field = input.closest('.form-field');
      if (!field) return;
      field.classList.add('has-error');
      var tip = $('.form-error', field);
      if (tip) tip.textContent = msg;
      input.setAttribute('aria-invalid', 'true');
    }
    function clearError(input) {
      var field = input.closest('.form-field');
      if (!field) return;
      field.classList.remove('has-error');
      input.removeAttribute('aria-invalid');
    }

    /* 单个字段校验，返回是否通过 */
    function validateField(key) {
      var input = fields[key];
      var value = (input.value || '').replace(/^\s+|\s+$/g, '');
      if (!value) {
        var labelMap = {
          name: '请填写你的姓名',
          school: '请填写你的学校',
          major: '请填写你的专业',
          deadline: '请选择论文截止时间',
          message: '请简单描述一下你的需求'
        };
        showError(input, labelMap[key]);
        return false;
      }
      if (key === 'name') {
        if (value.length < 2) {
          showError(input, '姓名至少写 2 个字哦');
          return false;
        }
        // 不能纯符号：至少要有一个汉字、字母或数字
        if (!/[一-龥a-zA-Z0-9]/.test(value)) {
          showError(input, '姓名不能全是符号，请写真实称呼');
          return false;
        }
      }
      if (key === 'school' && value.length < 2) {
        showError(input, '学校名称至少写 2 个字，写全称更好');
        return false;
      }
      if (key === 'message' && value.length < 10) {
        showError(input, '需求描述至少写 10 个字——说说专业、题目方向和截止时间，我们才能给你靠谱方案');
        return false;
      }
      if (key === 'deadline') {
        // 日期不能早于今天（按本地时区比较「日」粒度）
        var picked = new Date(value + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(picked.getTime())) {
          showError(input, '日期格式不正确，请重新选择');
          return false;
        }
        if (picked.getTime() < today.getTime()) {
          showError(input, '论文截止时间不能早于今天，请检查');
          return false;
        }
      }
      clearError(input);
      return true;
    }

    /* 输入/改日期时即时清除错误 */
    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      input.addEventListener('input', function () { clearError(input); });
      input.addEventListener('change', function () { clearError(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // 全部必填校验，定位到第一个错误字段
      var firstBad = null;
      Object.keys(fields).forEach(function (key) {
        var ok = validateField(key);
        if (!ok && !firstBad) firstBad = fields[key];
      });
      if (firstBad) {
        firstBad.focus();
        return;
      }

      // 收集表单数据
      var data = {
        name: fields.name.value.replace(/^\s+|\s+$/g, ''),
        school: fields.school.value.replace(/^\s+|\s+$/g, ''),
        major: fields.major.value.replace(/^\s+|\s+$/g, ''),
        deadline: fields.deadline.value,
        message: fields.message.value.replace(/^\s+|\s+$/g, ''),
        page: 'contact.html',
        submittedAt: new Date().toISOString()
      };

      // 提交中：按钮 loading 态
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.textContent = '提交中…';

      // 【后端接口预留】上线时把留言数据POST到此处接口
      /*
      fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { if (!res.ok) throw new Error('submit failed'); })
        .then(function () { onSuccess(); })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.innerHTML = submitBtnHTML;
          alert('提交失败，请稍后重试，或直接扫码加微信咨询');
        });
      return;
      */

      // 当前无真实后端：模拟网络延迟后直接成功
      window.setTimeout(function () {
        onSuccess();
      }, 800);

      function onSuccess() {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.innerHTML = submitBtnHTML;
        // 隐藏表单，显示绿色成功卡
        form.style.display = 'none';
        if (successCard) {
          successCard.classList.add('is-visible');
          successCard.setAttribute('tabindex', '-1');
          try { successCard.focus({ preventScroll: false }); } catch (err) { successCard.focus(); }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})(window, document);
