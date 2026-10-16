/* ============================================================
 * ui-mine.js —— 我的：资料管理 + 历史记录 + 免责
 * ============================================================ */
(function (global) {
    var YS = global.YS;
    var U = YS.ui = YS.ui || {};

    var TYPE_LABEL = {
        'tarot': '塔罗',
        'tarot-ask': '塔罗问事',
        'hex': '卦象',
        'hex-ask': '卦象问事'
    };

    U.mine = {
        render: function (ctx) {
            var p = YS.store.getProfile();
            U.$('mNickname').value = p.nickname || '';
            U.$('mBirthday').value = p.birthday || '';
            U.$('mZodiac').textContent = U.currentZodiac() || '未设置生日';
            U.$('mSaveHint').textContent = '';
            this.renderHistory();
        },

        renderHistory: function () {
            var list = YS.store.getHistory();
            var box = U.$('mHistory');
            if (!list.length) {
                box.innerHTML = '<div class="hist-empty">暂无记录，去首页抽张塔罗或摇一卦吧</div>';
                return;
            }
            box.innerHTML = list.map(function (h) {
                var label = TYPE_LABEL[h.type] || h.type;
                return '<div class="hist-item">' +
                    '<div class="hist-main">' +
                    '<div class="hist-title">' + escapeHtml(h.title) + '</div>' +
                    '<div class="hist-sub">' + label + ' · ' + h.dateKey + '</div>' +
                    '</div>' +
                    '<button class="hist-del" data-del="' + escapeHtml(h.id) + '">删除</button>' +
                    '</div>';
            }).join('');

            Array.prototype.slice.call(box.querySelectorAll('[data-del]')).forEach(function (btn) {
                btn.addEventListener('click', function () {
                    YS.store.removeHistory(this.getAttribute('data-del'));
                    U.mine.renderHistory();
                });
            });
        },

        init: function (ctx) {
            U.$('mSaveBtn').addEventListener('click', function () {
                var birth = U.$('mBirthday').value;
                var nick = U.$('mNickname').value.trim();
                var hint = U.$('mSaveHint');

                if (birth) {
                    var p = birth.split('-');
                    if (!YS.date.isValidSolar(+p[0], +p[1], +p[2])) {
                        hint.textContent = '生日日期不合法，请检查';
                        return;
                    }
                }
                // 改生日后清除手动星座覆盖，让星座跟随生日
                YS.store.saveProfile({ birthday: birth, nickname: nick, zodiacOverride: null });
                U.$('mZodiac').textContent = U.currentZodiac() || '未设置生日';
                hint.textContent = '已保存 ✓';
                U.home.render(ctx);
            });
        }
    };

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
})(typeof window !== 'undefined' ? window : this);
