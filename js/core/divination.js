/* ============================================================
 * core/divination.js —— 每日一卦 / 问事占卜（六十四卦）
 * 种子规则（MASTER 3.2）：userId + "|" + dateKey
 * 本文件禁止出现 document / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var R = YS.random;

    var NATURE_TEXT = {
        '吉': '总体偏顺，可以积极一些',
        '平': '平顺为主，按部就班即可',
        '凶': '提醒谨慎，宜稳不宜急'
    };

    /* 每日一卦：同一人同一天固定 */
    function dailyHexagram(userId, dateKey) {
        var rng = R.makeRNG(userId + '|' + dateKey + '|hex');
        var list = YS.data.hexagrams;
        var hex = R.pick(rng, list);
        return build(hex, dateKey, 'daily', '');
    }

    /* 问事占卜：以问题为种子 */
    function askHexagram(question, dateKey) {
        var q = (question || '').trim() || '心中所问';
        var rng = R.makeRNG(q + '|' + dateKey + '|ask');
        var list = YS.data.hexagrams;
        var hex = R.pick(rng, list);
        return build(hex, dateKey, 'question', q);
    }

    function build(hex, dateKey, type, question) {
        return {
            dateKey: dateKey,
            type: type,
            question: question,
            no: hex.no,
            name: hex.name,
            shortName: hex.shortName,
            symbol: hex.symbol,
            nature: hex.nature,
            natureText: NATURE_TEXT[hex.nature] || '',
            line: hex.line,
            guide: hex.guide
        };
    }

    YS.divination = {
        dailyHexagram: dailyHexagram,
        askHexagram: askHexagram
    };
})(typeof window !== 'undefined' ? window : this);
