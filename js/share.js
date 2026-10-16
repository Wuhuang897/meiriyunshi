/* ============================================================
 * share.js —— canvas 生成分享图片卡片
 * 合规：卡片底部必须带免责小字（MASTER 4.3 / 6）
 * 迁移小程序：toDataURL → wx.canvasToTempFilePath + saveImageToPhotosAlbum
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    var DISCLAIMER = '本内容仅供娱乐，不构成任何决策建议';

    var W = 640, H = 900;

    /* 按最大宽度自动换行 */
    function wrap(ctx, text, maxW) {
        var lines = [], cur = '';
        for (var i = 0; i < text.length; i++) {
            var test = cur + text[i];
            if (ctx.measureText(test).width > maxW && cur) {
                lines.push(cur); cur = text[i];
            } else { cur = test; }
        }
        if (cur) lines.push(cur);
        return lines;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    /**
     * cfg = { title, subtitle, badge, blocks:[{label, value}], lines:[], footer }
     * 返回 dataURL
     */
    function drawCard(cfg) {
        var cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        var ctx = cv.getContext('2d');

        // 背景
        var g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, '#1a1230'); g.addColorStop(1, '#0b0b1a');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

        // 金色描边
        ctx.strokeStyle = 'rgba(212,175,106,0.55)'; ctx.lineWidth = 3;
        roundRect(ctx, 24, 24, W - 48, H - 48, 20); ctx.stroke();
        ctx.strokeStyle = 'rgba(212,175,106,0.18)'; ctx.lineWidth = 1;
        roundRect(ctx, 40, 40, W - 80, H - 80, 14); ctx.stroke();

        var y = 100;

        // 标题
        ctx.textAlign = 'center';
        ctx.fillStyle = '#d4af6a';
        ctx.font = '600 44px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(cfg.title || '玄机一算', W / 2, y);
        y += 46;

        // 副标题
        if (cfg.subtitle) {
            ctx.fillStyle = '#b8a78a';
            ctx.font = '22px "PingFang SC","Microsoft YaHei",sans-serif';
            ctx.fillText(cfg.subtitle, W / 2, y);
            y += 40;
        }

        // 徽章（如"中吉"）
        if (cfg.badge) {
            ctx.font = '600 26px "PingFang SC","Microsoft YaHei",sans-serif';
            var bw = ctx.measureText(cfg.badge).width + 44;
            ctx.fillStyle = 'rgba(212,175,106,0.16)';
            roundRect(ctx, W / 2 - bw / 2, y - 26, bw, 44, 22); ctx.fill();
            ctx.strokeStyle = 'rgba(212,175,106,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#e9c989';
            ctx.fillText(cfg.badge, W / 2, y + 4);
            y += 48;
        }

        // 分隔线
        ctx.strokeStyle = 'rgba(212,175,106,0.3)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(70, y); ctx.lineTo(W - 70, y); ctx.stroke();
        y += 40;

        // 大符号（卦象 / 塔罗 emoji）
        if (cfg.symbol) {
            ctx.fillStyle = '#e9c989';
            ctx.font = '90px serif';
            ctx.fillText(cfg.symbol, W / 2, y + 40);
            y += 110;
        }

        // 键值对块
        (cfg.blocks || []).forEach(function (b) {
            ctx.font = '20px "PingFang SC","Microsoft YaHei",sans-serif';
            ctx.fillStyle = '#7a6f5c'; ctx.textAlign = 'left';
            ctx.fillText(b.label, 80, y);
            ctx.textAlign = 'right'; ctx.fillStyle = '#f3e9d2';
            ctx.fillText(b.value, W - 80, y);
            ctx.textAlign = 'center';
            y += 40;
        });
        if ((cfg.blocks || []).length) y += 16;

        // 正文段落
        ctx.font = '24px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillStyle = '#f3e9d2';
        (cfg.lines || []).forEach(function (t) {
            wrap(ctx, t, W - 160).forEach(function (ln) {
                if (y > H - 170) return;
                ctx.fillText(ln, W / 2, y);
                y += 36;
            });
            y += 12;
        });

        // 页脚免责
        ctx.fillStyle = '#7a6f5c';
        ctx.font = '18px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(cfg.footer || DISCLAIMER, W / 2, H - 58);

        return cv.toDataURL('image/png');
    }

    /* 触发下载 */
    function download(dataURL, filename) {
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = filename || 'yunshi.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    YS.share = { drawCard: drawCard, download: download, DISCLAIMER: DISCLAIMER };
})(typeof window !== 'undefined' ? window : this);
