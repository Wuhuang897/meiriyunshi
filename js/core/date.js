/* ============================================================
 * core/date.js —— 日期工具与 dateKey 体系
 * 一切缓存 key 均带 dateKey，跨天自动失效（MASTER.md 3.3）
 * 本文件禁止出现 document / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};

    var WEEK = ['日', '一', '二', '三', '四', '五', '六'];

    /* 2 位补零 */
    function pad2(n) { return n < 10 ? '0' + n : String(n); }

    /* "2026-10-16" */
    function getDateKey(d) {
        d = d || new Date();
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    /* 解析 "2026-10-16" → Date（本地时区，避免 UTC 偏移） */
    function parseDateKey(key) {
        var p = key.split('-');
        return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
    }

    function weekdayName(d) {
        return '星期' + WEEK[(d || new Date()).getDay()];
    }

    /* "2026年10月16日" */
    function solarText(d) {
        d = d || new Date();
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
    }

    /* 公历日期是否合法（用于生日校验） */
    function isValidSolar(y, m, d) {
        var dt = new Date(y, m - 1, d);
        return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
    }

    /* 简易农历（MASTER 3.5 的轻量版：内置 1900-2100 数据表） */
    var LUNAR_INFO = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
        0x0d520
    ];
    var LUNAR_MONTH = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    var LUNAR_DAY = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
        '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
        '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    var GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    var ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    var SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    var JIEQI = ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至',
        '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];

    /* 取农历年天数 / 闰月 */
    function lYearDays(y) {
        var sum = 348;
        for (var i = 0x8000; i > 0x8; i >>= 1) sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
        return sum + leapDays(y);
    }
    function leapMonth(y) { return LUNAR_INFO[y - 1900] & 0xf; }
    function leapDays(y) {
        if (leapMonth(y)) return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
        return 0;
    }
    function monthDays(y, m) {
        return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29;
    }

    /* 公历 → 农历，返回 { month, day, isLeap, text, ganzhi, shengxiao } */
    function solarToLunar(y, m, d) {
        var base = new Date(1900, 0, 31);
        var obj = new Date(y, m - 1, d);
        var offset = Math.floor((obj - base) / 86400000);
        var i, temp = 0, lYear = 1900;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            lYear = i;
        }
        if (offset < 0) { offset += temp; } else { lYear = i; }
        var leap = leapMonth(lYear), isLeap = false;
        /* 月份：循环退出后 i 已自增，需按 offset 回退修正（标准农历换算写法） */
        var lMonth;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i === leap + 1 && !isLeap) {
                --i; isLeap = true; temp = leapDays(lYear);
            } else {
                temp = monthDays(lYear, i);
            }
            if (isLeap && i === leap + 1) isLeap = false;
            offset -= temp;
        }
        if (offset === 0 && leap > 0 && i === leap + 1) {
            if (isLeap) { isLeap = false; } else { isLeap = true; --i; }
        }
        if (offset < 0) { offset += temp; --i; }
        lMonth = i;
        var lDay = offset + 1;
        /* 兜底：极端边界下保证索引合法，避免 undefined */
        if (lMonth < 1 || lMonth > 12) lMonth = ((lMonth - 1) % 12 + 12) % 12 + 1;
        if (lDay < 1 || lDay > 30) lDay = Math.max(1, Math.min(30, lDay));
        return {
            month: lMonth,
            day: lDay,
            isLeap: isLeap,
            text: (isLeap ? '闰' : '') + LUNAR_MONTH[lMonth - 1] + '月' + LUNAR_DAY[lDay - 1],
            ganzhi: yearGanzhi(lYear),
            shengxiao: SHENGXIAO[(lYear - 1900) % 12]
        };
    }

    /* 年干支 */
    function yearGanzhi(y) {
        var idx = (y - 4) % 60;
        return GAN[idx % 10] + ZHI[idx % 12];
    }

    /* 日干支：以 1900-01-01 甲戌日为基准 */
    function dayGanzhi(y, m, d) {
        var base = new Date(1900, 0, 1);
        var cur = new Date(y, m - 1, d);
        var days = Math.floor((cur - base) / 86400000);
        var idx = (days + 10) % 60; // 1900-01-01 为甲戌(10)
        if (idx < 0) idx += 60;
        return GAN[idx % 10] + ZHI[idx % 12];
    }

    /* 节气近似（按基准日 ± 微调，MASTER 标注为近似值） */
    var JIEQI_BASE = [6, 20, 4, 19, 6, 21, 5, 20, 6, 21, 6, 22, 7, 23, 8, 23, 8, 23, 9, 24, 8, 22, 7, 22];
    function jieqiOf(y, m, d) {
        var idx = (m - 1) * 2;
        if (d === JIEQI_BASE[idx] || d === JIEQI_BASE[idx] + 1) return JIEQI[idx];
        if (d === JIEQI_BASE[idx + 1] || d === JIEQI_BASE[idx + 1] + 1) return JIEQI[idx + 1];
        return '';
    }

    YS.date = {
        pad2: pad2,
        getDateKey: getDateKey,
        parseDateKey: parseDateKey,
        weekdayName: weekdayName,
        solarText: solarText,
        isValidSolar: isValidSolar,
        solarToLunar: solarToLunar,
        yearGanzhi: yearGanzhi,
        dayGanzhi: dayGanzhi,
        jieqiOf: jieqiOf,
        GAN: GAN,
        ZHI: ZHI,
        SHENGXIAO: SHENGXIAO
    };
})(typeof window !== 'undefined' ? window : this);
