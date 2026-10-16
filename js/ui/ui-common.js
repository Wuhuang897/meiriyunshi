/* ============================================================
 * ui-common.js —— DOM 工具 / 页面切换 / 星级 / 分享弹窗
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    U.$ = function (id) { return document.getElementById(id); };
    U.$$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

    /* 星级 HTML：实心 n 个，其余空心 */
    U.stars = function (n, max) {
        max = max || 5;
        var s = '';
        for (var i = 0; i < max; i++) {
            s += (i < n) ? '★' : '<span class="empty">★</span>';
        }
        return s;
    };

    /* 星级纯文本（用于 canvas 分享图）：实心 ★ / 空心 ☆ */
    U.starText = function (n, max) {
        max = max || 5;
        var s = '';
        for (var i = 0; i < max; i++) s += (i < n) ? '★' : '☆';
        return s;
    };

    /* 页面切换：name ∈ home|zodiac|tarot|fengshui|divination|mine */
    U.showPage = function (name) {
        U.$$('.page').forEach(function (p) { p.classList.add('hidden'); });
        var el = U.$('page-' + name);
        if (el) el.classList.remove('hidden');
        U.$$('.tab-item').forEach(function (t) {
            if (t.getAttribute('data-tab') === name) t.classList.add('active');
            else t.classList.remove('active');
        });
        try { global.scrollTo({ top: 0, behavior: 'smooth' }); }
        catch (e) { global.scrollTo(0, 0); }
    };

    /* 分享弹窗 */
    U.currentShareUrl = '';
    U.showShare = function (cfg) {
        var url = YS.share.drawCard(cfg);
        U.currentShareUrl = url;
        U.$('shareImg').src = url;
        U.$('shareModal').classList.remove('hidden');
    };

    U.bindShareModal = function () {
        U.$('shareClose').addEventListener('click', function () {
            U.$('shareModal').classList.add('hidden');
        });
        U.$('shareMask').addEventListener('click', function () {
            U.$('shareModal').classList.add('hidden');
        });
        U.$('shareDownload').addEventListener('click', function () {
            if (U.currentShareUrl) YS.share.download(U.currentShareUrl, '玄机一算.png');
        });
    };

    /* 日期头：公历 + 农历 + 星期 */
    U.renderTopDate = function (dateKey) {
        var d = YS.date.parseDateKey(dateKey);
        var lunar = YS.date.solarToLunar(d.getFullYear(), d.getMonth() + 1, d.getDate());
        var jq = YS.date.jieqiOf(d.getFullYear(), d.getMonth() + 1, d.getDate());
        U.$('topDate').textContent =
            YS.date.solarText(d) + ' · ' + YS.date.weekdayName(d) +
            ' · 农历' + lunar.text + (jq ? ' · ' + jq : '');
    };
})(typeof window !== 'undefined' ? window : this);
