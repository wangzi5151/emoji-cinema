const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load.cjs');
const context = load(['meme-data.js', 'logic.js']);
const M = context.MemeLogic;

test('映射数据去重后为 178 个 key，并保留原始 181 条记录用于去重', () => {
  assert.equal(M.RAW_STORY_PATTERNS.length, 181);
  assert.equal(Object.keys(M.STORY_PATTERNS).length, 178);

  const keys = M.RAW_STORY_PATTERNS.map(pair => pair[0]);
  assert.equal(new Set(keys).size, 178);
  assert.ok(keys.includes('黑客帝国'));
  assert.ok(keys.includes('旅行'));
});

test('映射值只保留 Emoji，普通文字和乱码被清除', () => {
  assert.equal(M.STORY_PATTERNS['猫'], '🐱😺🐟🐠🐾💤✨');
  assert.equal(M.STORY_PATTERNS['婚礼'], '💒👰🤵💐🥂💍🎉');
  assert.equal(M.STORY_PATTERNS['养猫'], '🐱🐾💤📦✨');
  assert.equal(M.STORY_PATTERNS['养狗'], '🐕🦮❤️🦴🎉');
  assert.equal(M.STORY_PATTERNS['表白'], '❤️🌹💍✨');
  assert.equal(M.STORY_PATTERNS['求婚'], '💍❤️😭🎉✨');
  assert.equal(M.STORY_PATTERNS['吃瓜'], '🍉👀😏✨💫');

  Object.values(M.STORY_PATTERNS).forEach(value => {
    assert.equal(M.cleanEmojiValue(value), value);
  });
});

test('cleanEmojiValue 清除普通文字但保留 ZWJ、变体选择符和旗帜', () => {
  assert.equal(M.cleanEmojiValue('🐱🐈🐈‍⬛😿仙境'), '🐱🐈🐈‍⬛😿');
  assert.equal(M.cleanEmojiValue('💕 nervous😅🌹✨🥂'), '💕😅🌹✨🥂');
  assert.equal(M.cleanEmojiValue('❤️🇨🇳👨‍👩‍👧‍👦'), '❤️🇨🇳👨‍👩‍👧‍👦');
});

test('Intl.Segmenter 按字素拆分 ZWJ、变体选择符、肤色和旗帜', () => {
  const input = '👨‍👩‍👧‍👦❤️🇨🇳👍🏽1️⃣🧑‍💻';
  const expected = ['👨‍👩‍👧‍👦', '❤️', '🇨🇳', '👍🏽', '1️⃣', '🧑‍💻'];
  assert.deepEqual(M.splitGraphemes(input), expected);
  assert.deepEqual(M.fallbackSplitGraphemes(input), expected);
});

test('最长匹配优先：AI觉醒 不会被 AI 抢先匹配', () => {
  assert.equal(M.findLongestMatch(M.STORY_PATTERNS, 'AI觉醒').key, 'AI觉醒');
  assert.equal(M.findLongestMatch(M.STORY_PATTERNS, 'AI觉醒').value, '🤖👁️🧠⚡🔓🌍💫');
  assert.equal(M.findLongestMatch(M.STORY_PATTERNS, '人工智能觉醒').key, '人工智能');
  assert.equal(M.findLongestMatch(M.STORY_PATTERNS, '我想看泰坦尼克号').key, '泰坦尼克号');
  assert.equal(M.findLongestMatch(M.STORY_PATTERNS, '完全不存在的输入'), null);
});

test('buildPatterns 去重 key 并丢弃没有 Emoji 的值', () => {
  const built = M.buildPatterns([
    ['重复', '😀'],
    ['重复', '😎'],
    ['纯文字', 'hello 世界'],
    ['猫', '🐱仙境']
  ]);
  assert.deepEqual(built, { '重复': '😀', '猫': '🐱' });
});

test('Emoji 库按字素抽取且不包含普通文字', () => {
  const all = M.getAllEmojiGraphemes();
  assert.ok(all.length > 300);
  assert.ok(all.includes('🐈‍⬛'));
  assert.ok(all.includes('👩‍🚀'));
  assert.ok(!all.includes('仙'));
});

test('热门画廊数据已清洗并保留 15 条', () => {
  assert.equal(M.GALLERY_DATA.length, 15);
  assert.equal(M.GALLERY_DATA[0].text, '泰坦尼克号');
  assert.equal(M.cleanEmojiValue(M.GALLERY_DATA[0].emojis), M.GALLERY_DATA[0].emojis);
});
