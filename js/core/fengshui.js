/* ============================================================
 * core/fengshui.js —— 每日简易风水
 * 种子规则（MASTER 3.2）：dateKey（全用户一致）
 * 定位：生活趣味小提示，不是专业风水勘测
 * 本文件禁止出现 document / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var R = YS.random;

    function generate(dateKey) {
        var rng = R.makeRNG(dateKey + '|fengshui');
        var T = YS.data.fengshuiText;

        var direction = R.pick(rng, T.directions);
        var note = R.pick(rng, T.directionNote).replace('{DIR}', direction);

        return {
            dateKey: dateKey,
            direction: direction,
            directionNote: note,
            homeTips: R.pickN(rng, T.homeTips, 3),
            avoid: R.pick(rng, T.avoid),
            knowledge: R.pick(rng, T.knowledge)
        };
    }

    YS.fengshui = { generate: generate };
})(typeof window !== 'undefined' ? window : this);
