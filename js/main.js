/* ============================================================
 * main.js —— 入口：初始化、导航装配、跨天刷新
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui;

    function boot() {
        var ctx = {
            dateKey: YS.date.getDateKey(),
            userId: YS.store.getUserId()
        };

        // 跨天缓存清理 + 顶部日期
        YS.store.pruneOldCache(ctx.dateKey);
        U.renderTopDate(ctx.dateKey);
        U.bindShareModal();

        // 各模块初始化
        U.zodiac.init(ctx);
        U.tarot.init(ctx);
        U.fengshui.init(ctx);
        U.divination.init(ctx);
        U.mine.init(ctx);

        // 首页模块卡片 → 详情页
        U.$$('.module-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var go = card.getAttribute('data-go');
                U.showPage(go);
                renderModule(go, ctx);
            });
        });

        // 详情页返回
        U.$$('[data-back]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                U.showPage('home');
                U.home.render(ctx);
            });
        });

        // 底部 Tab
        U.$$('.tab-item').forEach(function (tab) {
            tab.addEventListener('click', function () {
                var name = tab.getAttribute('data-tab');
                U.showPage(name);
                renderModule(name, ctx);
            });
        });

        // 未设置生日引导
        U.$('guideSetBtn').addEventListener('click', function () {
            U.showPage('mine');
            U.mine.render(ctx);
        });

        // 首屏
        U.home.render(ctx);

        /* 跨天自动刷新（回到前台时比对 dateKey，MASTER 3.3） */
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) return;
            var nowKey = YS.date.getDateKey();
            if (nowKey !== ctx.dateKey) {
                ctx.dateKey = nowKey;
                YS.store.pruneOldCache(nowKey);
                U.renderTopDate(nowKey);
                U.home.render(ctx);
            }
        });
    }

    function renderModule(name, ctx) {
        if (name === 'home') U.home.render(ctx);
        else if (name === 'zodiac') U.zodiac.render(ctx);
        else if (name === 'tarot') U.tarot.render(ctx);
        else if (name === 'fengshui') U.fengshui.render(ctx);
        else if (name === 'divination') U.divination.render(ctx);
        else if (name === 'mine') U.mine.render(ctx);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})(typeof window !== 'undefined' ? window : this);
