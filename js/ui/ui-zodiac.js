/* ============================================================
 * ui-zodiac.js —— 星座运势页
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    U.zodiac = {
        /* 带当日缓存的数据获取 */
        getData: function (zodiacName, dateKey) {
            var cached = YS.store.getTodayCache('zodiac:' + zodiacName, dateKey);
            if (cached) return cached;
            var d = YS.zodiac.generateFortune(zodiacName, dateKey);
            YS.store.setTodayCache('zodiac:' + zodiacName, dateKey, d);
            return d;
        },

        render: function (ctx) {
            var sel = U.$('zodiacSelect');
            // 首次填充下拉
            if (!sel.options.length) {
                YS.zodiac.getAllZodiacs().forEach(function (z) {
                    var o = document.createElement('option');
                    o.value = z; o.textContent = z;
                    sel.appendChild(o);
                });
            }
            var cur = U.currentZodiac() || '白羊座';
            sel.value = cur;
            this.paint(cur, ctx);
        },

        paint: function (zodiacName, ctx) {
            var f = this.getData(zodiacName, ctx.dateKey);

            U.$('zdOverall').textContent = f.scores.overall;
            U.$('zdName').textContent = f.zodiac;
            U.$('zdOverallText').textContent = f.texts.overall;

            U.$('zdCareerStars').innerHTML = U.stars(f.scores.career);
            U.$('zdWealthStars').innerHTML = U.stars(f.scores.wealth);
            U.$('zdLoveStars').innerHTML = U.stars(f.scores.love);
            U.$('zdHealthStars').innerHTML = U.stars(f.scores.health);

            U.$('zdCareerText').textContent = f.texts.career;
            U.$('zdWealthText').textContent = f.texts.wealth;
            U.$('zdLoveText').textContent = f.texts.love;
            U.$('zdHealthText').textContent = f.texts.health;

            var c = U.$('zdColor');
            c.textContent = f.lucky.color;
            c.style.color = f.lucky.colorHex;
            U.$('zdNumber').textContent = f.lucky.number;
            U.$('zdDirection').textContent = f.lucky.direction;
            U.$('zdAvoid').textContent = f.avoid;

            U.zodiac._cur = f;
        },

        init: function (ctx) {
            U.$('zodiacSelect').addEventListener('change', function () {
                var z = this.value;
                YS.store.saveProfile({ zodiacOverride: z }); // 手动切换
                U.zodiac.paint(z, ctx);
            });

            U.$('zdShareBtn').addEventListener('click', function () {
                var f = U.zodiac._cur;
                if (!f) return;
                U.showShare({
                    title: '星座运势',
                    subtitle: f.zodiac + ' · ' + f.dateKey,
                    badge: '综合 ' + f.scores.overall + ' 星',
                    blocks: [
                        { label: '事业运', value: U.starText(f.scores.career) },
                        { label: '财运', value: U.starText(f.scores.wealth) },
                        { label: '感情运', value: U.starText(f.scores.love) },
                        { label: '健康运', value: U.starText(f.scores.health) },
                        { label: '幸运色', value: f.lucky.color },
                        { label: '幸运数字', value: String(f.lucky.number) },
                        { label: '幸运方位', value: f.lucky.direction }
                    ],
                    lines: [f.texts.overall, '避雷提醒：' + f.avoid]
                });
            });
        }
    };
})(typeof window !== 'undefined' ? window : this);
