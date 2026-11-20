(function () {
  'use strict';

  function historyCard(coupon) {
    var stampText = coupon.status === 'used' ? '已使用' : '已过期';
    return '<div class="history-coupon"><div class="coupon-pic">' + coupon.icon + '</div><div class="history-coupon-info"><div class="wallet-coupon-type">' + coupon.typeLabel + '</div><h3>' + window.escapeHtml(coupon.name) + '</h3><p>' + window.escapeHtml(coupon.subtitle) + '</p><div class="wallet-expire">' + window.escapeHtml(coupon.timeText) + '</div><div class="history-rules" data-rules="' + coupon.id + '">详细规则 <i>⌄</i></div><div class="history-rules-body" id="rules-' + coupon.id + '">' + window.escapeHtml(coupon.rules) + '</div></div><div class="coupon-stamp ' + coupon.status + '">' + stampText + '</div></div>';
  }

  window.Pages['mobile-history'] = {
    render: function () {
      var tab = window.PrototypeState.historyTab || 'used';
      var list = window.ExchangeCouponMock.historyCoupons.filter(function (coupon) { return coupon.status === tab; });
      var body = list.length ? list.map(historyCard).join('') : '<div class="history-empty">您没有该类型的优惠券</div>';
      return window.prototypeShell('历史优惠券', '卡券中心 / 我的卡券 / 历史优惠券',
        '<div class="mobile-workspace"><div class="phone"><div class="phone-notch"></div><div class="mobile-nav"><span class="back" data-back>‹</span>历史优惠券</div><div class="mobile-body wallet-body">' +
        '<div class="wallet-tabs"><span class="' + (tab === 'used' ? 'active' : '') + '" data-history-tab="used">已使用</span><span class="' + (tab === 'expired' ? 'active' : '') + '" data-history-tab="expired">已过期</span></div>' + body +
        '<div class="history-footnote">仅显示180天内的数据</div>' +
        '<div class="mobile-tabbar"><span>首页</span><span>商城</span><span class="active">卡券</span><span>我的</span></div></div></div>' +
        '<div><div class="panel"><div class="panel-head">历史优惠券 <span class="tag orange">新增页面</span></div><div class="panel-body"><p>• 已核销、已过期的卡券只在历史优惠券展示，与未核销卡券不在同一列表。</p><p style="margin-top:8px">• tab 可切换“已使用 / 已过期”；数据源为 180 天内使用或过期的卡券。</p><p style="margin-top:8px">• 卡片展示内容与卡券列表一致：卡券类型、名称、副标题、使用时间、详细规则。</p><p style="margin-top:8px">• 无任何行动按钮，状态用“已使用 / 已过期”印章表达。</p><p style="margin-top:8px">• 底部固定文案：仅显示180天内的数据。</p></div></div>' +
        '<div class="panel"><div class="panel-head">入口</div><div class="panel-body"><p>卡券中心页面顶部导航右侧“历史优惠券”进入；返回键回到卡券中心。</p></div></div></div></div>');
    },
    init: function () {
      document.querySelector('[data-back]').onclick = function () { window.navigateTo('mobile-home'); };
      document.querySelectorAll('[data-history-tab]').forEach(function (tabEl) {
        tabEl.onclick = function () {
          window.PrototypeState.historyTab = tabEl.dataset.historyTab;
          window.navigateTo('mobile-history');
        };
      });
      document.querySelectorAll('[data-rules]').forEach(function (ruleEl) {
        ruleEl.onclick = function () {
          document.getElementById('rules-' + ruleEl.dataset.rules).classList.toggle('open');
        };
      });
    }
  };
})();
