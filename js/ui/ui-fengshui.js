/* ============================================================
 * ui-fengshui.js —— 每日风水页
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    U.fengshui = {
        getData: function (dateKey) {
            var cached = YS.store.getTodayCache('fengshui', dateKey);
            if (cached) return cached;
            var d = YS.fengshui.generate(dateKey);
            YS.store.setTodayCache('fengshui', dateKey, d);
            return d;
        },

        render: function (ctx) {
            var f = this.getData(ctx.dateKey);
            this._cur = f;

            U.$('fsDirection').textContent = f.direction;
            U.$('fsDirectionNote').textContent = f.directionNote;
            U.$('fsHomeTips').innerHTML = f.homeTips.map(function (t) {
                return '<li>' + t + '</li>';
            }).join('');
            U.$('fsAvoid').textContent = f.avoid;
            U.$('fsKnowledge').textContent = f.knowledge;
        },

        init: function (ctx) {
            U.$('fsShareBtn').addEventListener('click', function () {
                var f = U.fengshui._cur;
                if (!f) return;
                U.showShare({
                    title: '每日风水',
                    subtitle: f.dateKey,
                    badge: '有利方位 · ' + f.direction,
                    blocks: [{ label: '今日有利方位', value: f.direction }],
                    lines: [f.directionNote]
                        .concat(f.homeTips)
                        .concat(['避坑：' + f.avoid, '小知识：' + f.knowledge]),
                    footer: '仅供娱乐，不作为装修、布局决策依据'
                });
            });
        }
    };
})(typeof window !== 'undefined' ? window : this);
