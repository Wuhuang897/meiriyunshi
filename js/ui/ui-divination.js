/* ============================================================
 * ui-divination.js —— 每日一卦 / 问事占卜（六十四卦）
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    U.divination = {
        _cur: null,

        showResult: function (h) {
            this._cur = h;
            U.$('hexResult').classList.remove('hidden');
            U.$('hexSymbol').textContent = h.symbol;
            U.$('hexName').textContent = h.name + (h.question ? ' · 关于「' + h.question + '」' : '');
            var n = U.$('hexNature');
            n.textContent = h.nature + ' · ' + h.natureText;
            if (h.nature === '凶') n.classList.add('xiong');
            else n.classList.remove('xiong');
            U.$('hexLine').textContent = h.line;
            U.$('hexGuide').textContent = h.guide;
        },

        draw: function (ctx, question) {
            var sym = U.$('hexSymbol');
            var btn = U.$('hexDrawBtn');
            sym.classList.add('shaking');
            btn.disabled = true;
            setTimeout(function () {
                sym.classList.remove('shaking');
                btn.disabled = false;

                var h = question
                    ? YS.divination.askHexagram(question, ctx.dateKey)
                    : YS.divination.dailyHexagram(ctx.userId, ctx.dateKey);

                U.divination.showResult(h);

                if (!question) {
                    YS.store.set('drawn:hex', ctx.dateKey);
                    YS.store.addHistory({
                        id: 'hex-' + ctx.dateKey,
                        type: 'hex',
                        dateKey: ctx.dateKey,
                        title: h.name + ' · ' + h.nature,
                        summary: h.line
                    });
                } else {
                    YS.store.addHistory({
                        id: 'hex-ask-' + ctx.dateKey,
                        type: 'hex-ask',
                        dateKey: ctx.dateKey,
                        title: '问事：' + question + ' → ' + h.name,
                        summary: h.line
                    });
                }
            }, 520);
        },

        render: function (ctx) {
            if (YS.store.get('drawn:hex') === ctx.dateKey) {
                this.showResult(YS.divination.dailyHexagram(ctx.userId, ctx.dateKey));
                U.$('hexDrawBtn').textContent = '已摇今日卦 · 重新揭示';
            } else {
                U.$('hexResult').classList.add('hidden');
                U.$('hexSymbol').textContent = '䷀';
                U.$('hexDrawBtn').textContent = '摇一卦 · 今日卦象';
            }
        },

        init: function (ctx) {
            U.$('hexDrawBtn').addEventListener('click', function () {
                U.divination.draw(ctx, '');
            });
            U.$('hexSymbol').addEventListener('click', function () {
                U.divination.draw(ctx, '');
            });

            U.$('hexAskBtn').addEventListener('click', function () {
                var q = U.$('hexQuestion').value.trim();
                U.divination.draw(ctx, q);
            });

            U.$('hexShareBtn').addEventListener('click', function () {
                var h = U.divination._cur;
                if (!h) return;
                U.showShare({
                    title: '占卜问卦',
                    subtitle: h.question ? '关于「' + h.question + '」' : '今日一卦',
                    badge: h.nature + ' · ' + h.natureText,
                    symbol: h.symbol,
                    blocks: [
                        { label: '卦名', value: h.name },
                        { label: '第几卦', value: '第 ' + h.no + ' 卦' }
                    ],
                    lines: [h.line, h.guide]
                });
            });
        }
    };
})(typeof window !== 'undefined' ? window : this);
