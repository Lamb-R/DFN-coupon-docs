(function () {
  'use strict';

  function couponCard(coupon) {
    return '<div class="wallet-coupon" data-open-coupon="' + coupon.id + '"><div class="wallet-coupon-main"><div class="wallet-coupon-type">' + coupon.typeLabel + '</div><h3>' + coupon.name + '</h3><p>' + coupon.subtitle + '</p><div class="wallet-expire">有效期至 ' + coupon.expiresAt + '</div></div><div class="wallet-coupon-action"><button data-use-coupon="' + coupon.id + '">去使用</button></div></div>';
  }

  function openCouponDetail(couponId) {
    var coupon = window.ExchangeCouponMock.walletCoupons.find(function (item) { return item.id === couponId; });
    var d = window.ExchangeCouponMock.couponDetail;
    var bars = '<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>';
    window.openModal('<div class="modal-content mobile-coupon-detail"><div class="modal-header"><b>卡券详情 · ' + window.escapeHtml(coupon.name) + '</b><button class="btn btn-link" data-close-modal>×</button></div><div class="modal-body">' +
      '<div class="detail-verify"><span>核销码</span><div class="barcode">' + bars + '</div><strong>' + window.escapeHtml(d.verifyCode) + '</strong><p class="helper">仅“待使用”状态的卡券可发起核销</p></div>' +
      '<div class="detail-lines">' +
      '<p><span>卡券名称</span><b>' + window.escapeHtml(d.name) + '</b></p>' +
      '<p><span>卡券描述</span><b>' + window.escapeHtml(d.description) + '</b></p>' +
      '<p><span>适用车系</span><b>' + window.escapeHtml(d.series) + '</b></p>' +
      '<p><span>适用车型</span><b>' + window.escapeHtml(d.models) + '</b></p>' +
      '<p><span>卡券领取时间</span><b>' + window.escapeHtml(d.claimedAt) + '</b></p>' +
      '<p><span>卡券有效期</span><b>' + window.escapeHtml(d.validPeriod) + '</b></p>' +
      '<p><span>使用须知</span><b>' + window.escapeHtml(d.notice) + '</b></p>' +
      '<p><span>适用车架号</span><b>' + window.escapeHtml(d.vin) + '</b></p>' +
      '</div></div><div class="modal-footer"><button class="btn btn-primary" data-close-modal>关闭</button></div></div>');
  }

  window.Pages['mobile-home'] = {
    render: function () {
      var tab = window.PrototypeState.walletTab || 'all';
      var coupons = window.ExchangeCouponMock.walletCoupons;
      var cards = coupons.map(couponCard).join('');
      return window.prototypeShell('前台卡券中心', '卡券中心 / App与微信小程序',
        '<div class="mobile-workspace"><div class="phone"><div class="phone-notch"></div><div class="mobile-nav">我的卡券<span class="nav-right" data-history>历史优惠券</span></div><div class="mobile-body wallet-body">' +
        '<div class="wallet-tabs"><span class="' + (tab === 'all' ? 'active' : '') + '" data-wallet-tab="all">全部</span><span class="' + (tab === 'usable' ? 'active' : '') + '" data-wallet-tab="usable">待使用</span></div>' + cards +
        '<div class="mobile-tabbar"><span>首页</span><span>商城</span><span class="active">卡券</span><span>我的</span></div></div></div>' +
        '<div><div class="panel"><div class="panel-head">本次迭代（参照现卡包设计） <span class="tag orange">2026-11-20</span></div><div class="panel-body"><div class="rule-list">' +
        '<div class="rule-item"><span class="rule-no">1</span><p><strong>移除顶部数量统计。</strong>不再展示可使用 / 已核销 / 已过期橙色统计区。</p></div>' +
        '<div class="rule-item"><span class="rule-no">2</span><p><strong>状态tab改为历史口径。</strong>tab行仅保留“全部 / 待使用”；已核销、已过期不在此页展示。</p></div>' +
        '<div class="rule-item"><span class="rule-no">3</span><p><strong>卡券卡片收敛字段。</strong>不再露出适用车辆；按钮上方不再显示可使用 / 已核销文字。</p></div>' +
        '<div class="rule-item"><span class="rule-no">4</span><p><strong>已核销卡券隔离。</strong>已核销卡券只出现在“历史优惠券”页面，与未核销卡券分列表显示。</p></div>' +
        '<div class="rule-item"><span class="rule-no">5</span><p><strong>“去使用”直达兑换商品页。</strong>点击卡片查看卡券详情（核销码、适用车系车型、领取时间、有效期、使用须知、适用车架号）。</p></div>' +
        '</div></div></div>' +
        '<div class="panel"><div class="panel-head">一期前台入口 <span class="tag orange">已确认</span></div><div class="panel-body"><div class="evidence-note"><b>一期只展示产品中心GUI皮肤兑换券。</b>直邮与到店/E3S是独立场景，本次不修改也不混入一期主入口。</div><div style="margin-top:16px"><b>同步履约</b><p class="helper">用户选完GUI皮肤后确认兑换，卡券中心同步调用车联网并直接展示最终成功或失败。</p></div></div></div>' +
        '<div class="panel"><div class="panel-head">一期规则</div><div class="panel-body"><p>• 商品数据来自产品中心，不依赖商城销售上架。</p><p style="margin-top:8px">• 销售未上架但可兑换的GUI皮肤仍可选。</p><p style="margin-top:8px">• 同步成功才核销；同步失败卡券保持可使用。</p></div></div></div></div>');
    },
    init: function () {
      document.querySelectorAll('[data-wallet-tab]').forEach(function (tabEl) {
        tabEl.onclick = function () {
          window.PrototypeState.walletTab = tabEl.dataset.walletTab;
          window.navigateTo('mobile-home');
        };
      });
      document.querySelectorAll('[data-open-coupon]').forEach(function (card) {
        card.onclick = function () { openCouponDetail(card.dataset.openCoupon); };
      });
      document.querySelectorAll('[data-use-coupon]').forEach(function (button) {
        button.onclick = function (event) {
          event.stopPropagation();
          window.ExchangeFlow.startCoupon(button.dataset.useCoupon);
          window.PrototypeState.exchangeStep = 'select';
          window.navigateTo('mobile-flow');
        };
      });
      document.querySelector('[data-history]').onclick = function () { window.navigateTo('mobile-history'); };
    }
  };
})();
