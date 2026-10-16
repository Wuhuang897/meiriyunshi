/* ============================================================
 * core/random.js —— 确定性伪随机
 * 规则（MASTER.md 3.1）：同一 (种子, 日期) 必须永远得到相同结果
 * 本文件禁止出现 document / window.* / localStorage
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};

    /* cyrb53：字符串 → 32bit+ 哈希 */
    function cyrb53(str, seed) {
        seed = seed || 0;
        var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (var i = 0; i < str.length; i++) {
            var ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }

    /* mulberry32：seed → [0,1) 伪随机序列 */
    function mulberry32(a) {
        return function () {
            a |= 0;
            a = (a + 0x6D2B79F5) | 0;
            var t = a;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function makeRNG(seedStr) {
        return mulberry32(cyrb53(seedStr));
    }

    /* 从数组中取 1 个 */
    function pick(rng, arr) {
        return arr[Math.floor(rng() * arr.length)];
    }

    /* 从数组中不重复取 n 个（Fisher-Yates 部分洗牌） */
    function pickN(rng, arr, n) {
        var copy = arr.slice();
        var out = [];
        n = Math.min(n, copy.length);
        for (var i = 0; i < n; i++) {
            var j = i + Math.floor(rng() * (copy.length - i));
            var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
            out.push(copy[i]);
        }
        return out;
    }

    /* 生成 [min, max] 闭区间整数 */
    function randInt(rng, min, max) {
        return min + Math.floor(rng() * (max - min + 1));
    }

    YS.random = { cyrb53: cyrb53, mulberry32: mulberry32, makeRNG: makeRNG, pick: pick, pickN: pickN, randInt: randInt };
})(typeof window !== 'undefined' ? window : this);
