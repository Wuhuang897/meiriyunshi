/* ============================================================
 * store.js —— 状态 + 持久化（MASTER 1.2 #4）
 * ★ 全项目唯一触碰 localStorage 的文件
 *   迁移微信小程序时，只需把 get/set/remove 换成
 *   wx.getStorageSync / wx.setStorageSync / wx.removeStorageSync
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var PREFIX = 'ys:';

    /* ---- 底层读写（迁移小程序只改这三个方法） ---- */
    function get(key) {
        try {
            var v = global.localStorage.getItem(PREFIX + key);
            return v == null ? null : JSON.parse(v);
        } catch (e) { return null; }
    }
    function set(key, val) {
        try {
            global.localStorage.setItem(PREFIX + key, JSON.stringify(val));
            return true;
        } catch (e) { return false; }
    }
    function remove(key) {
        try { global.localStorage.removeItem(PREFIX + key); } catch (e) { }
    }

    /* ---- 用户 ID：首次进入生成，用于确定性种子 ---- */
    function getUserId() {
        var id = get('userId');
        if (!id) {
            id = 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
            set('userId', id);
        }
        return id;
    }

    /* ---- 用户档案 ---- */
    function getProfile() {
        return get('profile') || { birthday: '', nickname: '', zodiacOverride: null };
    }
    function saveProfile(p) {
        var cur = getProfile();
        set('profile', {
            birthday: p.birthday != null ? p.birthday : cur.birthday,
            nickname: p.nickname != null ? p.nickname : cur.nickname,
            zodiacOverride: p.zodiacOverride !== undefined ? p.zodiacOverride : cur.zodiacOverride
        });
    }

    /* ---- 当日缓存（key 带 dateKey，跨天自动读不到 → 自动重算） ---- */
    function getTodayCache(module, dateKey) {
        var v = get('cache:' + module + ':' + dateKey);
        return v ? v.data : null;
    }
    function setTodayCache(module, dateKey, data) {
        set('cache:' + module + ':' + dateKey, { dateKey: dateKey, data: data });
    }

    /* ---- 启动清理：清掉所有非当日的缓存（MASTER 3.3 / 7） ---- */
    function pruneOldCache(dateKey) {
        try {
            var del = [];
            for (var i = 0; i < global.localStorage.length; i++) {
                var k = global.localStorage.key(i);
                if (k && k.indexOf(PREFIX + 'cache:') === 0) {
                    if (k.indexOf(':' + dateKey) === -1) del.push(k);
                }
            }
            del.forEach(function (k) { global.localStorage.removeItem(k); });
        } catch (e) { }
    }

    /* ---- 历史记录：{ id, type, dateKey, title, summary, payload } ---- */
    function getHistory() {
        return get('history') || [];
    }
    function addHistory(item) {
        var list = getHistory();
        // 同类型同日期覆盖，避免重复堆积
        for (var i = 0; i < list.length; i++) {
            if (list[i].type === item.type && list[i].dateKey === item.dateKey) {
                list[i] = item;
                set('history', list);
                return item;
            }
        }
        list.unshift(item);
        if (list.length > 60) list = list.slice(0, 60); // 上限保护
        set('history', list);
        return item;
    }
    function removeHistory(id) {
        var list = getHistory().filter(function (h) { return h.id !== id; });
        set('history', list);
    }

    YS.store = {
        get: get, set: set, remove: remove,
        getUserId: getUserId,
        getProfile: getProfile, saveProfile: saveProfile,
        getTodayCache: getTodayCache, setTodayCache: setTodayCache,
        pruneOldCache: pruneOldCache,
        getHistory: getHistory, addHistory: addHistory, removeHistory: removeHistory
    };
})(typeof window !== 'undefined' ? window : this);
