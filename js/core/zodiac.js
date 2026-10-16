/* ============================================================
 * core/zodiac.js —— 星座识别 + 每日星座运势
 * 种子规则（MASTER 3.2）：zodiac + "|" + dateKey（不含生日）
 * 本文件禁止出现 document / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var R = YS.random;

    /* 12 星座边界（公历月日），摩羯跨年 */
    var ZODIAC = [
        { name: '摩羯座', s: [12, 22], e: [1, 19] },
        { name: '水瓶座', s: [1, 20], e: [2, 18] },
        { name: '双鱼座', s: [2, 19], e: [3, 20] },
        { name: '白羊座', s: [3, 21], e: [4, 19] },
        { name: '金牛座', s: [4, 20], e: [5, 20] },
        { name: '双子座', s: [5, 21], e: [6, 21] },
        { name: '巨蟹座', s: [6, 22], e: [7, 22] },
        { name: '狮子座', s: [7, 23], e: [8, 22] },
        { name: '处女座', s: [8, 23], e: [9, 22] },
        { name: '天秤座', s: [9, 23], e: [10, 23] },
        { name: '天蝎座', s: [10, 24], e: [11, 22] },
        { name: '射手座', s: [11, 23], e: [12, 21] }
    ];

    /* 按公历月日识别星座 */
    function getZodiac(month, day) {
        for (var i = 0; i < ZODIAC.length; i++) {
            var z = ZODIAC[i];
            if (z.s[0] === z.e[0]) {
                if (month === z.s[0] && day >= z.s[1] && day <= z.e[1]) return z.name;
            } else {
                // 跨年（摩羯 12/22 - 次年 1/19）
                if ((month === z.s[0] && day >= z.s[1]) || (month === z.e[0] && day <= z.e[1])) return z.name;
            }
        }
        return '摩羯座';
    }

    function getAllZodiacs() {
        return ZODIAC.map(function (z) { return z.name; });
    }

    /* 加权星级：大部分落在 3-5，避免制造焦虑（合规红线） */
    function weightedStar(rng) {
        var r = rng();
        if (r < 0.10) return 1;
        if (r < 0.30) return 2;
        if (r < 0.60) return 3;
        if (r < 0.85) return 4;
        return 5;
    }

    /* 生成每日星座运势（确定性） */
    function generateFortune(zodiacName, dateKey) {
        var rng = R.makeRNG(zodiacName + '|' + dateKey);
        var T = YS.data.fortuneText;

        var career = weightedStar(rng);
        var wealth = weightedStar(rng);
        var love = weightedStar(rng);
        var health = weightedStar(rng);
        var overall = Math.max(1, Math.min(5, Math.round((career + wealth + love + health) / 4)));

        var color = R.pick(rng, T.colors);
        return {
            dateKey: dateKey,
            zodiac: zodiacName,
            scores: { overall: overall, career: career, wealth: wealth, love: love, health: health },
            texts: {
                overall: R.pick(rng, T.overall),
                career: R.pick(rng, T.career),
                wealth: R.pick(rng, T.wealth),
                love: R.pick(rng, T.love),
                health: R.pick(rng, T.health)
            },
            lucky: {
                color: color.name,
                colorHex: color.hex,
                number: R.randInt(rng, 1, 99),
                direction: R.pick(rng, T.directions)
            },
            avoid: R.pick(rng, T.avoid)
        };
    }

    YS.zodiac = {
        getZodiac: getZodiac,
        getAllZodiacs: getAllZodiacs,
        generateFortune: generateFortune
    };
})(typeof window !== 'undefined' ? window : this);
