(function (global) {
  'use strict';

  var DATA = global.MemeData || {};

  var RAW_STORY_PATTERNS = (DATA && DATA.RAW_STORY_PATTERNS) || [];
  var EMOJI_DB = (DATA && DATA.EMOJI_DB) || {};
  var RAW_GALLERY_DATA = (DATA && DATA.GALLERY_DATA) || [];

  var FALLBACK_GRAPHEME_RE = null;
  try {
    FALLBACK_GRAPHEME_RE = new RegExp(
      '(?:\\p{Regional_Indicator}{2})' +
      '|(?:[0-9#*]\\uFE0F?\\u20E3)' +
      '|(?:\\p{Extended_Pictographic}(?:\\uFE0F|\\uFE0E)?(?:\\p{Emoji_Modifier})?(?:\\u200D\\p{Extended_Pictographic}(?:\\uFE0F|\\uFE0E)?(?:\\p{Emoji_Modifier})?)*(?:[\\u{E0020}-\\u{E007F}]*)' +
      ')|(?:[\\s\\S]\\p{M}*)',
      'gu'
    );
  } catch (e) {
    FALLBACK_GRAPHEME_RE = null;
  }

  var EMOJI_GRAPHEME_RE = null;
  try {
    EMOJI_GRAPHEME_RE = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;
  } catch (e) {
    EMOJI_GRAPHEME_RE = null;
  }

  function fallbackSplitGraphemes(text) {
    var str = String(text == null ? '' : text);
    if (FALLBACK_GRAPHEME_RE) {
      var matches = str.match(FALLBACK_GRAPHEME_RE);
      if (matches) return matches;
    }
    return Array.from(str);
  }

  function splitGraphemes(text) {
    var str = String(text == null ? '' : text);
    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
      try {
        var segmenter = new Intl.Segmenter('zh', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(str), function (part) { return part.segment; });
      } catch (e) {}
    }
    return fallbackSplitGraphemes(str);
  }

  function isEmojiGrapheme(grapheme) {
    if (!grapheme) return false;
    if (EMOJI_GRAPHEME_RE) return EMOJI_GRAPHEME_RE.test(grapheme);
    return /[0-9#*]\uFE0F?\u20E3/.test(grapheme) ||
      /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(grapheme);
  }

  function extractEmojis(text) {
    return splitGraphemes(text).filter(isEmojiGrapheme);
  }

  function cleanEmojiValue(value) {
    return extractEmojis(value).join('');
  }

  function toEntries(patterns) {
    if (!patterns) return [];
    if (Array.isArray(patterns)) return patterns.slice();
    if (typeof Map !== 'undefined' && patterns instanceof Map) return Array.from(patterns.entries());
    if (typeof patterns === 'object') return Object.keys(patterns).map(function (key) {
      return [key, patterns[key]];
    });
    return [];
  }

  function buildPatterns(patterns) {
    var entries = toEntries(patterns);
    var seen = Object.create(null);
    var result = {};
    entries.forEach(function (entry) {
      if (!Array.isArray(entry) || typeof entry[0] !== 'string') return;
      var key = entry[0].trim();
      if (!key || seen[key]) return;
      var value = cleanEmojiValue(entry[1]);
      if (!value) return;
      seen[key] = true;
      result[key] = value;
    });
    return result;
  }

  function findLongestMatch(patterns, text) {
    var entries = toEntries(patterns);
    var haystack = String(text == null ? '' : text).toLowerCase();
    var candidates = [];
    entries.forEach(function (entry, index) {
      if (!Array.isArray(entry) || typeof entry[0] !== 'string') return;
      var key = entry[0].trim();
      if (!key) return;
      candidates.push({ key: key, value: entry[1], length: key.length, index: index });
    });
    candidates.sort(function (a, b) {
      if (b.length !== a.length) return b.length - a.length;
      return a.index - b.index;
    });
    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      if (haystack.indexOf(candidate.key.toLowerCase()) !== -1) {
        return { key: candidate.key, value: candidate.value };
      }
    }
    return null;
  }

  function getAllEmojiGraphemes(db) {
    var source = db || EMOJI_DB;
    var seen = Object.create(null);
    var result = [];
    Object.keys(source).forEach(function (category) {
      var group = source[category];
      Object.keys(group).forEach(function (name) {
        extractEmojis(group[name]).forEach(function (emoji) {
          if (!seen[emoji]) {
            seen[emoji] = true;
            result.push(emoji);
          }
        });
      });
    });
    return result;
  }

  var STORY_PATTERNS = buildPatterns(RAW_STORY_PATTERNS);
  var GALLERY_DATA = RAW_GALLERY_DATA.map(function (item) {
    return { text: item.text, emojis: cleanEmojiValue(item.emojis) || item.emojis };
  });

  var api = {
    EMOJI_DB: EMOJI_DB,
    RAW_STORY_PATTERNS: RAW_STORY_PATTERNS,
    STORY_PATTERNS: STORY_PATTERNS,
    GALLERY_DATA: GALLERY_DATA,
    splitGraphemes: splitGraphemes,
    fallbackSplitGraphemes: fallbackSplitGraphemes,
    isEmojiGrapheme: isEmojiGrapheme,
    extractEmojis: extractEmojis,
    cleanEmojiValue: cleanEmojiValue,
    buildPatterns: buildPatterns,
    findLongestMatch: findLongestMatch,
    getAllEmojiGraphemes: getAllEmojiGraphemes
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.MemeLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
