/* ============================================================
 * ui-tarot.js —— 每日塔罗 / 问事塔罗
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    U.tarot = {
        _cur: null,

        showResult: function (r) {
            this._cur = r;
            U.$('tarotResult').classList.remove('hidden');
            U.$('trEmoji').textContent = r.emoji;
            U.$('trName').textContent = r.name + '（' + r.en + '）';
            var pos = U.$('trPosition');
            pos.textContent = r.positionText + (r.question ? ' · 关于「' + r.question + '」' : '');
            if (r.isReversed) pos.classList.add('reversed');
            else pos.classList.remove('reversed');

            U.$('trKeywords').innerHTML = r.keywords.map(function (k) {
                return '<span class="kw">' + k + '</span>';
            }).join('');
            U.$('trMeaning').textContent = r.meaning;
            U.$('trAdvice').textContent = r.advice;
        },

        /* 抽牌：播动画 → 展示 → 记录 */
        draw: function (ctx, question) {
            var btn = U.$('tarotDrawBtn');
            var cardEl = U.$('tarotCard');
            cardEl.classList.add('shaking');
            btn.disabled = true;
            setTimeout(function () {
                cardEl.classList.remove('shaking');
                btn.disabled = false;

                var r = question
                    ? YS.tarot.drawForQuestion(question, ctx.dateKey)
                    : YS.tarot.drawDaily(ctx.userId, ctx.dateKey);

                U.tarot.showResult(r);

                if (!question) {
                    YS.store.set('drawn:tarot', ctx.dateKey);
                    YS.store.addHistory({
                        id: 'tarot-' + ctx.dateKey,
                        type: 'tarot',
                        dateKey: ctx.dateKey,
                        title: r.name + '（' + r.positionText + '）',
                        summary: r.keywords.join(' / ')
                    });
                } else {
                    YS.store.addHistory({
                        id: 'tarot-ask-' + ctx.dateKey,
                        type: 'tarot-ask',
                        dateKey: ctx.dateKey,
                        title: '问事：' + question + ' → ' + r.name + '（' + r.positionText + '）',
                        summary: r.keywords.join(' / ')
                    });
                }
            }, 520);
        },

        render: function (ctx) {
            // 今日已抽 → 直接展示，不再播动画
            if (YS.store.get('drawn:tarot') === ctx.dateKey) {
                this.showResult(YS.tarot.drawDaily(ctx.userId, ctx.dateKey));
                U.$('tarotDrawBtn').textContent = '已抽今日一牌 · 重新揭示';
            } else {
                U.$('tarotResult').classList.add('hidden');
                U.$('tarotDrawBtn').textContent = '抽取今日一牌';
            }
        },

        init: function (ctx) {
            U.$('tarotDrawBtn').addEventListener('click', function () {
                U.tarot.draw(ctx, '');
            });
            U.$('tarotCard').addEventListener('click', function () {
                U.tarot.draw(ctx, '');
            });

            U.$('tarotAskBtn').addEventListener('click', function () {
                var q = U.$('tarotQuestion').value.trim();
                U.tarot.draw(ctx, q);
            });

            U.$('tarotShareBtn').addEventListener('click', function () {
                var r = U.tarot._cur;
                if (!r) return;
                U.showShare({
                    title: '塔罗牌',
                    subtitle: r.question ? '关于「' + r.question + '」' : '今日一牌',
                    badge: r.positionText,
                    symbol: r.emoji,
                    blocks: [
                        { label: '牌名', value: r.name },
                        { label: '关键词', value: r.keywords.join('、') }
                    ],
                    lines: [r.meaning, r.advice]
                });
            });
        }
    };
})(typeof window !== 'undefined' ? window : this);
