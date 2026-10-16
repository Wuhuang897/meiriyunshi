/* ============================================================
 * data/tarot-data.js —— 22 张大阿卡纳
 * 字段：id / name / en / emoji / upright / reversed
 * upright|reversed = { keywords:[], meaning, advice }
 * 合规：娱乐化解读，留有余地，不做强预言
 * ============================================================ */
(function (global) {
    var YS = global.YS = global.YS || {};
    YS.data = YS.data || {};

    YS.data.tarot = [
        {
            id: 0, name: '愚者', en: 'The Fool', emoji: '🃏',
            upright: { keywords: ['新的开始', '冒险', '自由'], meaning: '一张充满起点能量的牌，暗示今天适合尝试从未做过的事，轻装上阵反而更有收获。', advice: '不妨放下过多顾虑，给新鲜事物留一点空间。' },
            reversed: { keywords: ['鲁莽', '准备不足', '犹豫'], meaning: '提醒你热情之外还需要一点规划，别在没看清路之前就全力冲刺。', advice: '行动前先列个最简单的清单，会稳当很多。' }
        },
        {
            id: 1, name: '魔术师', en: 'The Magician', emoji: '🎩',
            upright: { keywords: ['创造力', '资源', '行动力'], meaning: '你手边其实已经具备完成事情的条件，缺的只是把它们组合起来的那一下。', advice: '盘点已有资源，今天很适合把想法落地。' },
            reversed: { keywords: ['眼高手低', '拖延', '浪费'], meaning: '能量有但没聚焦，容易在多个方向之间来回切换而耗尽热情。', advice: '今天只挑一件最重要的事做完，比做五件半成品强。' }
        },
        {
            id: 2, name: '女祭司', en: 'The High Priestess', emoji: '🌙',
            upright: { keywords: ['直觉', '静观', '内在'], meaning: '答案可能已经在你心里，只是被外界噪音盖住了。今天适合安静下来听一听。', advice: '给自己留 10 分钟不被打扰的时间，直觉会说话。' },
            reversed: { keywords: ['忽视内心', '秘密', '焦虑'], meaning: '你可能知道却不愿承认某件事，或者被他人的意见牵着走。', advice: '试着把真实想法写下来，不评判，只看见。' }
        },
        {
            id: 3, name: '皇后', en: 'The Empress', emoji: '👑',
            upright: { keywords: ['丰盛', '滋养', '美感'], meaning: '温柔而富足的能量，适合照顾自己也照顾身边的人。', advice: '吃点喜欢的、收拾下房间，小小宠爱自己也是正事。' },
            reversed: { keywords: ['过度付出', '忽略自己', '依赖'], meaning: '提醒你别总把别人的需求排在前面，透支的温柔撑不了太久。', advice: '今天学会温和地说一次"不"。' }
        },
        {
            id: 4, name: '皇帝', en: 'The Emperor', emoji: '🏛️',
            upright: { keywords: ['秩序', '掌控', '责任'], meaning: '适合建立规则、推进流程、做需要魄力的决定。', advice: '把混乱的事情定个标准，效率立刻不同。' },
            reversed: { keywords: ['固执', '僵化', '权力冲突'], meaning: '过于坚持原有做法反而会卡住，或与权威方产生摩擦。', advice: '原则可以守，方法不妨灵活一点。' }
        },
        {
            id: 5, name: '教皇', en: 'The Hierophant', emoji: '📜',
            upright: { keywords: ['学习', '传承', '指引'], meaning: '适合请教、上课、遵循经过验证的方法，别急着创新。', advice: '找个有经验的人聊聊，能少走不少弯路。' },
            reversed: { keywords: ['墨守成规', '教条', '叛逆'], meaning: '你可能被"应该怎样"绑住了，或者反过来一味反抗规则。', advice: '问自己一句：这是规定，还是习惯？' }
        },
        {
            id: 6, name: '恋人', en: 'The Lovers', emoji: '💞',
            upright: { keywords: ['结合', '选择', '真诚'], meaning: '与人的连接在今天很突出，也可能是面临一个重要的二选一。', advice: '遵从让你更自在的那个选项，别只看利弊。' },
            reversed: { keywords: ['摇摆', '失衡', '价值观冲突'], meaning: '关系里或选择上出现了不协调，需要先对齐彼此真正在意什么。', advice: '把话说开，比各自猜测省力得多。' }
        },
        {
            id: 7, name: '战车', en: 'The Chariot', emoji: '🏇',
            upright: { keywords: ['前进', '意志', '掌控'], meaning: '方向明确时你的推进力很强，今天适合冲一个具体目标。', advice: '锁定一个目标全力推进，别同时开两条战线。' },
            reversed: { keywords: ['失控', '方向不明', '急躁'], meaning: '力道有了但方向散了，容易忙了一天却没进展。', advice: '先停下来确认目的地，再踩油门。' }
        },
        {
            id: 8, name: '力量', en: 'Strength', emoji: '🦁',
            upright: { keywords: ['勇气', '耐心', '柔和'], meaning: '真正的力量是温柔的坚持，今天你有足够韧性应对麻烦。', advice: '用耐心代替硬碰硬，效果往往更好。' },
            reversed: { keywords: ['自我怀疑', '急躁', '内耗'], meaning: '能量偏低，容易怀疑自己，或被情绪消耗掉力气。', advice: '先补觉、先吃饭，状态回来再谈表现。' }
        },
        {
            id: 9, name: '隐者', en: 'The Hermit', emoji: '🕯️',
            upright: { keywords: ['内省', '独处', '智慧'], meaning: '今天适合从喧闹中退一步，答案往往在安静里浮现。', advice: '安排一段独处时光，复盘比社交更有价值。' },
            reversed: { keywords: ['孤立', '逃避', '固执己见'], meaning: '独处变成了封闭，可能是在回避某个需要面对的问题。', advice: '找信任的人说说话，别一个人扛。' }
        },
        {
            id: 10, name: '命运之轮', en: 'Wheel of Fortune', emoji: '🎡',
            upright: { keywords: ['转机', '循环', '时机'], meaning: '局势正在转动，出现意料之外的变化或机会。', advice: '保持灵活，变化来时接住它就好。' },
            reversed: { keywords: ['停滞', '重复', '错失'], meaning: '可能感觉卡在同一个循环里，或者时机尚未成熟。', advice: '换个做法打破惯性，哪怕只是很小的一步。' }
        },
        {
            id: 11, name: '正义', en: 'Justice', emoji: '⚖️',
            upright: { keywords: ['公正', '权衡', '因果'], meaning: '适合理清是非、签署约定、为过去的选择负责。', advice: '做决定前把所有事实摆在桌面上。' },
            reversed: { keywords: ['偏颇', '逃避责任', '不公'], meaning: '可能存在信息不对称，或者你在回避应承担的部分。', advice: '承认自己那部分，问题就解开一半。' }
        },
        {
            id: 12, name: '倒吊人', en: 'The Hanged Man', emoji: '🙃',
            upright: { keywords: ['暂停', '换个角度', '等待'], meaning: '暂时没进展不代表失败，换个视角看问题会有新发现。', advice: '试试从对方的角度重述一遍这件事。' },
            reversed: { keywords: ['无谓牺牲', '拖延', '钻牛角尖'], meaning: '等待变成了逃避，或者你在为不值得的事消耗。', advice: '设一个期限，到期就换方案。' }
        },
        {
            id: 13, name: '死神', en: 'Death', emoji: '🦋',
            upright: { keywords: ['结束', '转化', '放下'], meaning: '象征一个阶段的自然收尾，旧的结束给新的腾出位置。', advice: '清理掉不再适合你的东西，包括物品和念头。' },
            reversed: { keywords: ['抗拒改变', '停滞', '不舍'], meaning: '明知该结束却迟迟不放手，因而卡在原地。', advice: '先从小处放下，感受一下轻松。' }
        },
        {
            id: 14, name: '节制', en: 'Temperance', emoji: '🏺',
            upright: { keywords: ['平衡', '调和', '耐心'], meaning: '提醒你走中间路线，不极端、不透支，节奏刚刚好。', advice: '凡事留三分余力，反而走得更远。' },
            reversed: { keywords: ['失衡', '过度', '急功近利'], meaning: '可能用力过猛或彻底摆烂，两个极端都不舒服。', advice: '今天把作息和饮食调回正轨。' }
        },
        {
            id: 15, name: '恶魔', en: 'The Devil', emoji: '⛓️',
            upright: { keywords: ['执念', '诱惑', '束缚'], meaning: '提示某种让你上瘾或难以摆脱的模式，多半是自己给的枷锁。', advice: '认出那个"离不开"，就是松绑的开始。' },
            reversed: { keywords: ['觉醒', '挣脱', '释放'], meaning: '你正在意识到某个束缚，并具备走出来的力量。', advice: '今天就做一件打破惯性的小事。' }
        },
        {
            id: 16, name: '塔', en: 'The Tower', emoji: '🗼',
            upright: { keywords: ['突变', '瓦解', '醒悟'], meaning: '维持已久的某件事可能突然松动，冲击带来的是看清真相。', advice: '变化时先稳住基本盘，其余顺其自然。' },
            reversed: { keywords: ['延后的危机', '勉强维持', '内在崩塌'], meaning: '表面还在撑，但内部结构已经不稳，宜及早调整。', advice: '主动做小修小补，胜过被动大翻修。' }
        },
        {
            id: 17, name: '星星', en: 'The Star', emoji: '⭐',
            upright: { keywords: ['希望', '疗愈', '灵感'], meaning: '风雨之后的一缕光，适合许愿、疗伤、重新相信自己。', advice: '写下三件期待的小事，让希望具体起来。' },
            reversed: { keywords: ['信心不足', '迷茫', '悲观'], meaning: '暂时看不见光，容易放大困难、低估自己。', advice: '回想一次你挺过来的经历，你比想象中能扛。' }
        },
        {
            id: 18, name: '月亮', en: 'The Moon', emoji: '🌕',
            upright: { keywords: ['潜意识', '不安', '幻象'], meaning: '眼前可能看不真切，信息混杂，别急着下结论。', advice: '重要判断留到明天，今天先观察。' },
            reversed: { keywords: ['看清真相', '释然', '走出迷雾'], meaning: '迷雾正在散开，之前困扰你的事逐渐清晰。', advice: '把你担心的事写下来，会发现没那么可怕。' }
        },
        {
            id: 19, name: '太阳', en: 'The Sun', emoji: '☀️',
            upright: { keywords: ['喜悦', '成功', '活力'], meaning: '明朗而温暖的一天，适合表达、展示、享受成果。', advice: '别把开心藏着，今天值得好好庆祝一下。' },
            reversed: { keywords: ['热情减退', '暂时的阴云', '过度乐观'], meaning: '喜悦打了折扣，或因期待过高而有些失落。', advice: '降低一点预期，反而容易遇到惊喜。' }
        },
        {
            id: 20, name: '审判', en: 'Judgement', emoji: '📯',
            upright: { keywords: ['觉醒', '回顾', '召唤'], meaning: '到了总结与重新出发的节点，过去的努力正在被看见。', advice: '做一次阶段复盘，然后轻装前行。' },
            reversed: { keywords: ['自我批判', '拖延', '错失召唤'], meaning: '可能过度苛责自己，或迟迟不回应内心的声音。', advice: '原谅过去的自己，是往前走的前提。' }
        },
        {
            id: 21, name: '世界', en: 'The World', emoji: '🌍',
            upright: { keywords: ['圆满', '整合', '完成'], meaning: '一个循环走向完成，适合收尾、庆祝、开启新旅程。', advice: '给这段时间画个句号，仪式感很重要。' },
            reversed: { keywords: ['未竟', '拖延收尾', '缺一角'], meaning: '只差临门一脚却迟迟没完成，可能有细节被忽略。', advice: '找出那件没做完的小事，今天就收掉它。' }
        }
    ];
})(typeof window !== 'undefined' ? window : this);
