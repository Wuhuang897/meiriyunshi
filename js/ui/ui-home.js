/* ============================================================
 * ui-home.js —— 首页总览（4 模块卡片 + 引导）
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    /* 当前生效星座：手动覆盖 > 生日推算 */
    U.currentZodiac = function () {
        var p = YS.store.getProfile();
        if (p.zodiacOverride) return p.zodiacOverride;
        if (p.birthday) {
            var b = YS.date.parseDateKey(p.birthday);
            return YS.zodiac.getZodiac(b.getMonth() + 1, b.getDate());
        }
        return '';
    };

    U.home = {
        render: function (ctx) {
            // 生日引导
            var profile = YS.store.getProfile();
            var guide = U.$('birthGuide');
            if (!profile.birthday) guide.classList.remove('hidden');
            else guide.classList.add('hidden');

            // 星座
            var zd = U.currentZodiac();
            if (zd) {
                var f = YS.ui.zodiac.getData(zd, ctx.dateKey);
                U.$('homeZodiacDesc').textContent = zd + ' · 今日综合 ' + f.scores.overall + ' 星';
            } else {
                U.$('homeZodiacDesc').textContent = '设置生日后查看专属运势';
            }

            // 塔罗
            var drawnTarot = YS.store.get('drawn:tarot');
            if (drawnTarot === ctx.dateKey) {
                var tr = YS.tarot.drawDaily(ctx.userId, ctx.dateKey);
                U.$('homeTarotDesc').textContent = '今日：' + tr.name + '（' + tr.positionText + '）';
            } else {
                U.$('homeTarotDesc').textContent = '抽取你的今日一牌';
            }

            // 风水
            var fs = YS.ui.fengshui.getData(ctx.dateKey);
            U.$('homeFengshuiDesc').textContent = '有利方位：' + fs.direction;

            // 占卜
            var drawnHex = YS.store.get('drawn:hex');
            if (drawnHex === ctx.dateKey) {
                var hx = YS.divination.dailyHexagram(ctx.userId, ctx.dateKey);
                U.$('homeDivinationDesc').textContent = '今日：' + hx.name + ' · ' + hx.nature;
            } else {
                U.$('homeDivinationDesc').textContent = '今日一卦 · 心诚则灵';
            }

            U.$('homeTip').textContent = '数据每日 0 点自动更新，同一天结果固定。所有内容仅供娱乐参考。';
        }
    };
})(typeof window !== 'undefined' ? window : this);
