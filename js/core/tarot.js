/* ============================================================
 * core/tarot.js —— 每日塔罗 / 问事塔罗
 * 种子规则（MASTER 3.2）：userId + "|" + dateKey
 * 本文件禁止出现 document / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var R = YS.random;

    /* 每日一牌：同一人同一天固定 */
    function drawDaily(userId, dateKey) {
        var rng = R.makeRNG(userId + '|' + dateKey + '|tarot');
        var cards = YS.data.tarot;
        var card = R.pick(rng, cards);
        var isReversed = rng() < 0.45; // 约 45% 逆位
        return build(card, isReversed, dateKey, 'daily');
    }

    /* 问事抽牌：以问题文本为种子，同一问题同日稳定 */
    function drawForQuestion(question, dateKey) {
        var q = (question || '').trim() || '心中所问';
        var rng = R.makeRNG(q + '|' + dateKey + '|ask');
        var cards = YS.data.tarot;
        var card = R.pick(rng, cards);
        var isReversed = rng() < 0.45;
        return build(card, isReversed, dateKey, 'question', q);
    }

    function build(card, isReversed, dateKey, type, question) {
        var side = isReversed ? card.reversed : card.upright;
        return {
            dateKey: dateKey,
            type: type,
            question: question || '',
            cardId: card.id,
            name: card.name,
            en: card.en,
            emoji: card.emoji,
            isReversed: isReversed,
            positionText: isReversed ? '逆位' : '正位',
            keywords: side.keywords,
            meaning: side.meaning,
            advice: side.advice
        };
    }

    YS.tarot = { drawDaily: drawDaily, drawForQuestion: drawForQuestion };
})(typeof window !== 'undefined' ? window : this);
