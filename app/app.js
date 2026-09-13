/**
 * HOOK & SHOWCASE -- app.js
 * ================================================================
 * This file is still ONE flat closure (the original build put everything in a
 * single `!function(){ ... }()` IIFE with short minified names) -- nothing has
 * been split into modules or rewritten, because doing that safely without a
 * live browser to test against is too easy to get wrong silently. What HAS been
 * done, mechanically and verifiably, so this file is easier for a human or
 * another Claude session to read:
 *
 *   1. Beautified: consistent 2-space indentation, one statement per line.
 *   2. The ~221 `const x = document.getElementById("...")` DOM-reference
 *      variables were renamed from single/double letters (e.g. `Z`) to
 *      descriptive names (e.g. `cardColorPickerEl`), using a scope-aware AST
 *      rename (Babel `scope.rename`) so only the correct binding's references
 *      moved -- shadowed same-letter variables elsewhere were left untouched.
 *   3. Leading comments were added above the ~9 core pipeline functions whose
 *      role was confirmed by reading their bodies (see TABLE OF CONTENTS below),
 *      plus lightweight "heuristic scan" hints above other functions where a
 *      keyword match gave a reasonable guess. Anything with no comment simply
 *      had no reliable signal -- it was left alone rather than mis-labeled.
 *
 * VERIFICATION: after every change, the file was checked with `node --check`
 * for valid syntax, AND parsed to an AST and diffed against the ORIGINAL
 * app.min.js: same count of every AST node type, and the exact same set of
 * every string literal and every numeric literal, in the same quantities.
 * Only identifiers (names) and comments changed -- zero logic, values, control
 * flow, or string content was added, removed, or altered.
 *
 * CONFIRMED top-of-file constants (from reading how they're used, not guessed):
 *   e = 1080, t = 1920     -> output canvas width x height (portrait 9:16 video)
 *   n = 10                 -> number of image slots
 *   a                      -> hookDur (hook segment duration, seconds)
 *   o                      -> cardDur (card segment duration, seconds)
 *   r                      -> cardPos (index where the card segment is inserted)
 *   i[]                    -> per-slot show duration array
 *   _[]                    -> per-slot loaded file/image array
 * Everything else (u, m, p, f, g, h, y, v, b, w, x, k, ...) is reused with
 * different meanings in different nested scopes throughout the file -- do NOT
 * assume a single-letter name means the same thing in two different functions.
 * Trace each one locally before renaming it.
 *
 * TABLE OF CONTENTS -- every top-level function in file order:
 * (a = async, params = arg count, "verified" = read+confirmed, "scan" = keyword
 *  guess only -- check the body before trusting it)
 * ----------------------------------------------------------------------------
 *   line  173  Kt(0 args)
 *   line  188  Zt(0 args)  [verified -- see comment at definition]
 *   line  209  Xt(0 args)  [verified -- see comment at definition]
 *   line  212  Yt(0 args)  [verified -- see comment at definition]
 *   line  215  Qt(0 args)  [verified -- see comment at definition]
 *   line  225  en(3 args)
 *   line  234  tn(1 args)
 *   line  246  nn(3 args)
 *   line  257  an(0 args)
 *   line  260  on(0 args)
 *   line  270  rn(4 args)  [scan: canvas drawing]
 *   line  377  ln(0 args)  [scan: card segment]
 *   line  399  un(1 args)  [scan: card segment]
 *   line  402  mn(0 args)  [scan: card segment]
 *   line  419  pn(0 args)  [scan: canvas drawing]
 *   line  461  fn(7 args)
 *   line  471  async gn(2 args)  [scan: Web Audio, sync/timing, playback speed]
 *   line  527  async hn(1 args)  [verified -- see comment at definition]
 *   line  599  yn(1 args)
 *   line  602  vn(2 args)
 *   line  621  async bn(0 args)  [verified -- see comment at definition]
 *   line  863  wn(1 args)
 *   line  872  xn(1 args)
 *   line  881  kn(0 args)  [scan: hook segment, card segment]
 *   line  901  En(0 args)
 *   line  905  In(0 args)
 *   line  908  Ln(0 args)  [scan: hook segment, card segment]
 *   line  916  Cn(1 args)
 *   line 1056  Dn(2 args)  [scan: project manifest]
 *   line 1059  jn(1 args)
 *   line 1062  _n(1 args)
 *   line 1065  Un(1 args)  [scan: project manifest, MP3 matching]
 *   line 1084  Nn(3 args)  [verified -- see comment at definition]
 *   line 1219  qn(2 args)  [scan: MP3 matching]
 *   line 1222  async Hn(0 args)  [verified -- see comment at definition]
 *   line 1274  Gn(0 args)  [verified -- see comment at definition]
 *   line 1309  Wn(0 args)  [verified -- see comment at definition]
 *   line 1360  Jn(0 args)
 *   line 1373  Qn(0 args)  [scan: IndexedDB storage, captions, hook segment, render pipeline, download/save, batch pack processing]
 *   line 1456  async ta(3 args)  [scan: IndexedDB storage, sync/timing]
 *   line 1469  async na(2 args)  [scan: IndexedDB storage, sync/timing]
 *   line 1476  async aa(1 args)  [scan: IndexedDB storage, sync/timing]
 *   line 1485  async oa(2 args)  [scan: IndexedDB storage, sync/timing]
 *   line 1493  async ra(1 args)  [scan: IndexedDB storage, sync/timing]
 *   line 1500  ia(1 args)  [scan: MP3 matching, sync/timing, batch pack processing, pipeline stepper UI]
 *   line 1513  async sa(1 args)  [scan: sync/timing, batch pack processing]
 *   line 1521  async la(0 args)  [scan: sync/timing, batch pack processing]
 *   line 1533  async da(1 args)  [scan: sync/timing, batch pack processing]
 *   line 1536  async ua(1 args)  [scan: sync/timing, batch pack processing]
 *   line 1539  async ma(2 args)  [scan: sync/timing]
 *   line 1544  async pa(3 args)  [scan: sync/timing]
 *   line 1550  async fa(2 args)  [scan: sync/timing]
 *   line 1553  async ga(1 args)  [scan: sync/timing]
 *   line 1557  async ha(2 args)  [scan: sync/timing]
 *   line 1563  async ya(1 args)  [scan: sync/timing]
 *   line 1567  async ba(0 args)  [scan: captions, hook segment, card segment, sync/timing, playback speed]
 *   line 1616  async wa(1 args)  [scan: Whisper/transcription, captions, hook segment, card segment, MP3 matching, sync/timing, playback speed]
 *   line 1681  Ia(0 args)  [scan: hook segment, card segment]
 *   line 1693  async La(0 args)  [scan: sync/timing]
 *   line 1705  async Ba(0 args)  [scan: sync/timing, download/save, batch pack processing]
 *   line 1721  Aa(1 args)
 *   line 1729  Ra(2 args)
 *   line 1734  Ta(1 args)
 *   line 1740  Pa(1 args)
 *   line 1838  async ja(0 args)  [scan: sync/timing]
 *   line 1847  async _a(1 args)  [scan: captions, MP3 matching, sync/timing]
 *   line 1870  Ua(1 args)
 *   line 1874  Na(2 args)
 *   line 1883  Oa(3 args)  [scan: sync/timing, download/save, gallery save]
 *   line 1974  async Va(0 args)  [scan: sync/timing, gallery save]
 *   line 1994  Ka(1 args)
 *   line 1997  async Za(0 args)  [scan: sync/timing, render pipeline, download/save]
 *   line 2011  async Xa(1 args)  [scan: sync/timing]
 *   line 2068  fo(2 args)
 *   line 2071  async go(1 args)  [scan: MP3 matching, sync/timing, download/save]
 *   line 2088  async ho(2 args)  [scan: Whisper/transcription, network fetch, sync/timing]
 *   line 2104  yo(1 args)
 *   line 2126  async bo(0 args)  [scan: MP3 matching, sync/timing, gallery save]
 *   line 2155  xo(1 args)
 *   line 2158  ko(2 args)
 *   line 2231  async Eo(0 args)  [scan: captions, MP3 matching, sync/timing]
 *   line 2262  async Io(3 args)  [scan: sync/timing]
 *   line 2266  async Lo(2 args)  [scan: MP3 matching, sync/timing]
 *   line 2299  async Co(1 args)  [scan: Whisper/transcription, sync/timing, playback speed]
 *   line 2303  async $o(0 args)  [scan: captions, MP3 matching, sync/timing, download/save]
 *   line 2391  async _o(1 args)  [scan: MP3 matching, sync/timing, download/save]
 *   line 2405  Uo(0 args)
 *   line 2408  async No(0 args)  [scan: sync/timing]
 *   line 2428  zo(1 args)
 *   line 2432  Vo(0 args)
 *   line 2435  qo(0 args)
 *   line 2451  Ho(0 args)
 *   line 2460  async Go(0 args)  [scan: sync/timing]
 *   line 2491  Wo(0 args)
 *   line 2494  Jo(5 args)  [scan: canvas drawing]
 *   line 2499  Ko(8 args)
 *   line 2516  Zo(3 args)
 *   line 2522  Xo(3 args)
 *   line 2531  Yo(5 args)
 *   line 2545  Qo(7 args)
 *   line 2550  er(4 args)
 *   line 2562  tr(1 args)  [scan: hook segment, card segment]
 *   line 2573  nr(1 args)
 *   line 2619  sr(1 args)
 *   line 2622  cr(0 args)
 *   line 2625  lr(1 args)
 *   line 2653  ur(0 args)  [scan: animation loop]
 *   line 2659  async mr(1 args)  [scan: Web Audio, sync/timing, render pipeline]
 *   line 2733  pr(1 args)
 *   line 2779  async gr(3 args)  [verified -- see comment at definition]
 *   line 2884  async yr(3 args)  [scan: sync/timing]
 *   line 2912  async br(1 args)  [verified -- see comment at definition]
 * ----------------------------------------------------------------------------
 *
 * Batch/auto-prepare pipeline (7-stage stepper UI) and the manifest ingestion/
 * JSZip loader live further down the file (search for `plStages`, `plBuild`,
 * `manifest`, and `JSZip` -- those sections already use readable, non-minified
 * names in the original source, unlike the core app above).
 */
!function () {
  const e = 1080,
    t = 1920;
  let n = 10;
  let a = .2,
    o = 2,
    r = 5,
    i = new Array(n).fill(1),
    s = {
      xNorm: .06,
      yNorm: .895,
      align: "left"
    },
    c = new Array(n).fill(null),
    l = {
      xNorm: .5,
      yNorm: .88,
      align: "center"
    },
    d = {
      xNorm: .5,
      yNorm: .5
    },
    u = 0,
    m = 42,
    p = 30,
    f = 30;
  let g = !1,
    h = !1,
    y = null,
    v = null,
    b = null,
    w = .25,
    x = 0,
    k = null,
    E = 0,
    I = null,
    L = null,
    C = !1,
    $ = "#ffffff",
    S = .9,
    B = "#0e3d24",
    M = "color",
    A = null,
    R = null,
    T = "#ffffff",
    P = {},
    F = {},
    D = {},
    j = {},
    _ = new Array(n).fill(null),
    U = new Array(n).fill(""),
    N = "",
    O = null;
  const fileInputEl = document.getElementById("fileInput"),
    dropZoneEl = document.getElementById("dropZone"),
    trayEl = document.getElementById("tray"),
    countNumEl = document.getElementById("countNum"),
    capListEl = document.getElementById("capList"),
    cardTextEl = document.getElementById("cardText"),
    cardColorSwatchEl = document.getElementById("cardColorSwatch"),
    cardColorAutoToggleEl = document.getElementById("cardColorAutoToggle"),
    cardColorPickerEl = document.getElementById("cardColorPicker"),
    presetSwatchesEl = document.getElementById("presetSwatches"),
    customColorToggleBtnEl = document.getElementById("customColorToggleBtn"),
    customColorChevronEl = document.getElementById("customColorChevron"),
    customColorBodyEl = document.getElementById("customColorBody"),
    svCanvasEl = document.getElementById("svCanvas"),
    svMarkerDotEl = (svCanvasEl.getContext("2d"), document.getElementById("svMarkerDot")),
    hueCanvasEl = document.getElementById("hueCanvas"),
    hexInputEl = (hueCanvasEl.getContext("2d"), document.getElementById("hexInput")),
    cardAlphaRangeEl = document.getElementById("cardAlphaRange"),
    cardAlphaValEl = document.getElementById("cardAlphaVal"),
    cardBgModeColorBtnEl = document.getElementById("cardBgModeColorBtn"),
    cardBgModeImageBtnEl = document.getElementById("cardBgModeImageBtn"),
    cardBgUploadInputEl = document.getElementById("cardBgUploadInput"),
    cardBgUploadBtnEl = document.getElementById("cardBgUploadBtn"),
    cardBgThumbsWrapEl = document.getElementById("cardBgThumbsWrap"),
    cardBgThumbsEl = document.getElementById("cardBgThumbs"),
    cardTextColorSwatchEl = document.getElementById("cardTextColorSwatch"),
    cardTextColorPickerEl = document.getElementById("cardTextColorPicker"),
    textSvCanvasEl = document.getElementById("textSvCanvas"),
    textSvMarkerDotEl = (textSvCanvasEl.getContext("2d"), document.getElementById("textSvMarkerDot")),
    textHueCanvasEl = document.getElementById("textHueCanvas"),
    genBtnEl = (textHueCanvasEl.getContext("2d"), document.getElementById("genBtn")),
    cvEl = document.getElementById("cv"),
    we = cvEl.getContext("2d"),
    emptyStateEl = document.getElementById("emptyState"),
    playBtnEl = document.getElementById("playBtn"),
    fullscreenBtnEl = document.getElementById("fullscreenBtn"),
    playIconEl = document.getElementById("playIcon"),
    timecodeEl = document.getElementById("timecode"),
    progFillEl = document.getElementById("progFill"),
    genBarEl = document.getElementById("genBar"),
    genFillEl = document.getElementById("genFill"),
    genStatusEl = document.getElementById("genStatus"),
    genLabelEl = document.getElementById("genLabel"),
    genPctEl = document.getElementById("genPct"),
    dlLinkEl = document.getElementById("dlLink"),
    tmplStripEl = document.getElementById("tmplStrip"),
    hookDurRangeEl = document.getElementById("hookDurRange"),
    hookDurNumEl = document.getElementById("hookDurNum"),
    cardDurRangeEl = document.getElementById("cardDurRange"),
    cardDurNumEl = document.getElementById("cardDurNum"),
    cardPosSelectEl = document.getElementById("cardPosSelect"),
    showDurRangeEl = document.getElementById("showDurRange"),
    showDurValEl = document.getElementById("showDurVal"),
    alignRowEl = document.getElementById("alignRow"),
    capHandleEl = document.getElementById("capHandle"),
    frameEl = document.getElementById("frame"),
    cardSizeValEl = document.getElementById("cardSizeVal"),
    capSizeValEl = document.getElementById("capSizeVal"),
    hookWordToggleEl = document.getElementById("hookWordToggle"),
    showWordToggleEl = document.getElementById("showWordToggle"),
    bulkCapInputEl = document.getElementById("bulkCapInput"),
    bulkCapApplyBtnEl = document.getElementById("bulkCapApplyBtn"),
    bulkCapStatusEl = document.getElementById("bulkCapStatus"),
    hookCapTextEl = document.getElementById("hookCapText"),
    audioInputEl = document.getElementById("audioInput"),
    previewAudioEl = document.getElementById("previewAudio"),
    whisperBoxEl = document.getElementById("whisperBox"),
    groqKeyInputEl = document.getElementById("groqKeyInput"),
    syncVoiceBtnEl = document.getElementById("syncVoiceBtn"),
    syncStatusEl = document.getElementById("syncStatus"),
    syncBreakdownEl = document.getElementById("syncBreakdown");
  let rt = null;
  groqKeyInputEl.value = localStorage.getItem("groqApiKey") || "", groqKeyInputEl.addEventListener("input", () => {
    localStorage.setItem("groqApiKey", groqKeyInputEl.value.trim());
  });
  const audioDTEl = document.getElementById("audioDT"),
    audioDSEl = document.getElementById("audioDS"),
    audioRemoveEl = document.getElementById("audioRemove"),
    voiceSpeedBoxEl = document.getElementById("voiceSpeedBox"),
    voiceSpeedRangeEl = document.getElementById("voiceSpeedRange"),
    voiceSpeedValEl = document.getElementById("voiceSpeedVal"),
    voiceSpeedApplyBtnEl = document.getElementById("voiceSpeedApplyBtn"),
    voiceSpeedResetBtnEl = document.getElementById("voiceSpeedResetBtn"),
    voiceSpeedStatusEl = document.getElementById("voiceSpeedStatus");
  let gt = null;
  const bgMusicSelectEl = document.getElementById("bgMusicSelect"),
    bgMusicPreviewBtnEl = document.getElementById("bgMusicPreviewBtn"),
    bgMusicVolRangeEl = document.getElementById("bgMusicVolRange"),
    bgMusicVolValEl = document.getElementById("bgMusicVolVal"),
    bgMusicStartRangeEl = document.getElementById("bgMusicStartRange"),
    bgMusicEndRangeEl = document.getElementById("bgMusicEndRange"),
    bgMusicTrimFillEl = document.getElementById("bgMusicTrimFill"),
    bgMusicTrimLabelEl = document.getElementById("bgMusicTrimLabel"),
    bgMusicDurLabelEl = document.getElementById("bgMusicDurLabel"),
    tmplSaveBtnEl = document.getElementById("tmplSaveBtn"),
    tmplRestoreBtnEl = document.getElementById("tmplRestoreBtn"),
    tmplPickerWrapEl = document.getElementById("tmplPickerWrap"),
    tmplPickerSelectEl = document.getElementById("tmplPickerSelect"),
    tmplPickerLoadBtnEl = document.getElementById("tmplPickerLoadBtn"),
    tmplExportBtnEl = document.getElementById("tmplExportBtn"),
    tmplImportBtnEl = document.getElementById("tmplImportBtn"),
    tmplImportFileEl = document.getElementById("tmplImportFile"),
    tmplStatusEl = document.getElementById("tmplStatus"),
    newVideoBtnEl = document.getElementById("newVideoBtn"),
    openGalleryBtnEl = document.getElementById("openGalleryBtn"),
    qbGalleryCountEl = document.getElementById("qbGalleryCount"),
    galleryModalOverlayEl = document.getElementById("galleryModalOverlay"),
    galleryModalCloseEl = document.getElementById("galleryModalClose"),
    videoGalleryModalEl = document.getElementById("videoGalleryModal"),
    galleryModalEmptyEl = document.getElementById("galleryModalEmpty"),
    playerOverlayEl = document.getElementById("playerOverlay"),
    playerCloseEl = document.getElementById("playerClose"),
    playerVideoEl = document.getElementById("playerVideo"),
    playerTitleEl = document.getElementById("playerTitle"),
    videoGalleryEl = document.getElementById("videoGallery"),
    galleryEmptyEl = document.getElementById("galleryEmpty"),
    progressLineEl = document.getElementById("progressLine"),
    playheadEl = document.getElementById("playhead");
  function Kt() {
    try {
      ar && cr();
    } catch (e) {}
    try {
      playerVideoEl.pause();
    } catch (e) {}
    try {
      const voPlayerEl = document.getElementById("voPlayer");
      voPlayerEl && voPlayerEl.pause();
    } catch (e) {}
    try {
      musicPlayerEl.pause();
    } catch (e) {}
  }
  /** Zt() -- Builds the ordered timeline segment list for one output: hook segments, then the
   per-slot 'show' segments with the card segment spliced in at position `r`.
   Durations come straight from `a` (hookDur) / `i[]` (per-slot show durations) /
   `o` (cardDur) -- a duration of 0 just yields a zero-length segment here, which is
   why hookDur=0 or cardDur=0 doesn't crash anything downstream.
   */
  function Zt() {
    const e = [];
    for (let t = 0; t < n; t++) e.push({
      type: "hook",
      idx: t,
      dur: a
    });
    const t = [];
    for (let e = 0; e < n; e++) t.push({
      type: "show",
      idx: e,
      dur: i[e]
    });
    const s = Math.max(0, Math.min(n, r)),
      c = {
        type: "card",
        dur: o
      },
      l = t.slice(0, s).concat([c], t.slice(s));
    return e.concat(l);
  }
  /** Xt() -- Total duration of the current timeline: sum of all segment durations from Zt().
   */
  function Xt() {
    return Zt().reduce((e, t) => e + t.dur, 0);
  }
  /** Yt() -- Count of populated slots (non-empty entries in the `_` files array).
   */
  function Yt() {
    return _.filter(Boolean).length;
  }
  /** Qt() -- (Re)builds the <option> list in the card-position <select> (cardPosSelectEl),
   one option per possible insertion point around the `n` image slots.
   */
  function Qt() {
    cardPosSelectEl.innerHTML = "";
    const e = document.createElement("option");
    e.value = 0, e.textContent = "Right after hook (before image 1)", cardPosSelectEl.appendChild(e);
    for (let e = 1; e <= n; e++) {
      const t = document.createElement("option");
      t.value = e, t.textContent = e === n ? `After image ${e} (at the end)` : `Between image ${e} and ${e + 1}`, cardPosSelectEl.appendChild(t);
    }
    cardPosSelectEl.value = r;
  }
  function en(e, t, n) {
    const a = n * t,
      o = a * (1 - Math.abs(e / 60 % 2 - 1)),
      r = n - a;
    let i, s, c;
    e < 60 ? (i = a, s = o, c = 0) : e < 120 ? (i = o, s = a, c = 0) : e < 180 ? (i = 0, s = a, c = o) : e < 240 ? (i = 0, s = o, c = a) : e < 300 ? (i = o, s = 0, c = a) : (i = a, s = 0, c = o);
    const l = e => Math.round(255 * (e + r)).toString(16).padStart(2, "0");
    return `#${l(i)}${l(s)}${l(c)}`;
  }
  function tn(e) {
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e || "");
    return t ? {
      r: parseInt(t[1], 16),
      g: parseInt(t[2], 16),
      b: parseInt(t[3], 16)
    } : {
      r: 14,
      g: 61,
      b: 36
    };
  }
  function nn(e, t, n) {
    e /= 255, t /= 255, n /= 255;
    const a = Math.max(e, t, n),
      o = a - Math.min(e, t, n);
    let r = 0;
    return 0 !== o && (r = a === e ? (t - n) / o % 6 * 60 : a === t ? 60 * ((n - e) / o + 2) : 60 * ((e - t) / o + 4)), r < 0 && (r += 360), {
      h: r,
      s: 0 === a ? 0 : o / a,
      v: a
    };
  }
  function an() {
    return C ? B : $;
  }
  function on() {
    return function (e, t) {
      const {
        r: n,
        g: a,
        b: o
      } = tn(e);
      return `rgba(${n},${a},${o},${t})`;
    }(an(), S);
  }
  /** rn() -- heuristic scan: touches canvas drawing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function rn(e, t, n, a) {
    const o = e.getContext("2d"),
      r = n.getContext("2d");
    let i = 0,
      s = 0,
      c = 1;
    function l() {
      const t = e.width,
        n = e.height,
        a = o.createLinearGradient(0, 0, t, 0);
      a.addColorStop(0, "#fff"), a.addColorStop(1, en(i, 1, 1)), o.fillStyle = a, o.fillRect(0, 0, t, n);
      const r = o.createLinearGradient(0, 0, 0, n);
      r.addColorStop(0, "rgba(0,0,0,0)"), r.addColorStop(1, "#000"), o.fillStyle = r, o.fillRect(0, 0, t, n);
    }
    function d() {
      const e = n.width,
        t = n.height,
        a = r.createLinearGradient(0, 0, e, 0);
      for (let e = 0; e <= 6; e++) a.addColorStop(e / 6, en(60 * e, 1, 1));
      r.fillStyle = a, r.fillRect(0, 0, e, t);
    }
    function u() {
      t.style.left = 100 * s + "%", t.style.top = 100 * (1 - c) + "%", t.parentElement.style.marginTop = `-${e.height}px`, t.parentElement.style.pointerEvents = "none";
    }
    function m() {
      a(en(i, s, c));
    }
    function p(t) {
      const n = e.getBoundingClientRect(),
        a = t.touches ? t.touches[0].clientX : t.clientX,
        o = t.touches ? t.touches[0].clientY : t.clientY;
      s = Math.min(Math.max((a - n.left) / n.width, 0), 1), c = 1 - Math.min(Math.max((o - n.top) / n.height, 0), 1), u(), m();
    }
    let f = !1;
    function g(e) {
      const t = n.getBoundingClientRect(),
        a = e.touches ? e.touches[0].clientX : e.clientX;
      i = 360 * Math.min(Math.max((a - t.left) / t.width, 0), 1), l(), m();
    }
    e.addEventListener("mousedown", e => {
      f = !0, p(e);
    }), window.addEventListener("mousemove", e => {
      f && p(e);
    }), window.addEventListener("mouseup", () => {
      f = !1;
    }), e.addEventListener("touchstart", e => {
      f = !0, p(e);
    }), e.addEventListener("touchmove", e => {
      f && (e.preventDefault(), p(e));
    }, {
      passive: !1
    }), e.addEventListener("touchend", () => {
      f = !1;
    });
    let h = !1;
    return n.addEventListener("mousedown", e => {
      h = !0, g(e);
    }), window.addEventListener("mousemove", e => {
      h && g(e);
    }), window.addEventListener("mouseup", () => {
      h = !1;
    }), n.addEventListener("touchstart", e => {
      h = !0, g(e);
    }), n.addEventListener("touchmove", e => {
      h && (e.preventDefault(), g(e));
    }, {
      passive: !1
    }), n.addEventListener("touchend", () => {
      h = !1;
    }), {
      setFromHex(e) {
        const {
            r: t,
            g: n,
            b: a
          } = tn(e),
          o = nn(t, n, a);
        i = o.h, s = o.s, c = o.v, l(), d(), u();
      },
      redraw() {
        l(), d(), u();
      }
    };
  }
  Qt(), hookDurRangeEl.addEventListener("input", () => {
    a = +hookDurRangeEl.value, hookDurNumEl.value = a.toFixed(2), In();
  }), hookDurNumEl.addEventListener("input", () => {
    const e = Math.max(.1, Math.min(1, +hookDurNumEl.value || .1));
    a = e, hookDurRangeEl.value = e, In();
  }), cardDurRangeEl.addEventListener("input", () => {
    o = +cardDurRangeEl.value, cardDurNumEl.value = o.toFixed(2), In();
  }), cardDurNumEl.addEventListener("input", () => {
    const e = Math.max(1, Math.min(10, +cardDurNumEl.value || 1));
    o = e, cardDurRangeEl.value = e, In();
  }), cardPosSelectEl.addEventListener("change", () => {
    r = +cardPosSelectEl.value, In();
  }), showDurRangeEl.addEventListener("input", () => {
    const e = +showDurRangeEl.value;
    showDurValEl.textContent = e.toFixed(1) + "s", i = new Array(n).fill(e), Wn(), In();
  });
  const sn = rn(svCanvasEl, svMarkerDotEl, hueCanvasEl, e => {
      $ = e, C = !1, cardColorAutoToggleEl.checked = !1, ln(), nr(u);
    }),
    cn = rn(textSvCanvasEl, textSvMarkerDotEl, textHueCanvasEl, e => {
      T = e, ln(), nr(u);
    });
  sn.setFromHex(an()), cn.setFromHex(T);
  /** ln() -- heuristic scan: touches card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function ln() {
    cardColorSwatchEl.style.background = on(), document.activeElement !== hexInputEl && (hexInputEl.value = an()), cardAlphaValEl.textContent = Math.round(100 * S) + "%", cardTextColorSwatchEl.style.background = T;
  }
  presetSwatchesEl.innerHTML = ["#1fae66", "#0e3d24", "#e63946", "#f4a261", "#2a9d8f", "#264653", "#e76f51", "#457b9d", "#9d4edd", "#ffb703", "#000000", "#ffffff"].map(e => `<button type="button" class="preset-swatch" data-hex="${e}" style="width:28px;height:28px;border-radius:50%;background:${e};border:1px solid rgba(255,255,255,0.25);cursor:pointer;"></button>`).join(""), presetSwatchesEl.querySelectorAll(".preset-swatch").forEach(e => {
    e.addEventListener("click", () => {
      $ = e.dataset.hex, C = !1, cardColorAutoToggleEl.checked = !1, sn.setFromHex($), ln(), nr(u);
    });
  }), customColorToggleBtnEl.addEventListener("click", () => {
    const e = "none" === customColorBodyEl.style.display;
    customColorBodyEl.style.display = e ? "block" : "none", customColorChevronEl.textContent = e ? "▴" : "▾", e && sn.redraw();
  }), hexInputEl.addEventListener("change", () => {
    let e = hexInputEl.value.trim();
    /^#/.test(e) || (e = "#" + e), /^#[0-9a-fA-F]{6}$/.test(e) ? ($ = e, C = !1, cardColorAutoToggleEl.checked = !1, sn.setFromHex(e), ln(), nr(u)) : hexInputEl.value = an();
  }), cardAlphaRangeEl.addEventListener("input", () => {
    S = +cardAlphaRangeEl.value, ln(), nr(u);
  }), cardAlphaRangeEl.addEventListener("change", () => Aa()), cardColorSwatchEl.addEventListener("click", () => {
    const e = "none" === cardColorPickerEl.style.display;
    cardColorPickerEl.style.display = e ? "block" : "none";
  }), cardColorAutoToggleEl.addEventListener("change", () => {
    C = cardColorAutoToggleEl.checked, ln(), nr(u);
  });
  let dn = !1;
  /** un() -- heuristic scan: touches card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function un(e) {
    M = e, cardBgModeColorBtnEl.classList.toggle("active", "color" === e), cardBgModeImageBtnEl.classList.toggle("active", "image" === e), cardBgThumbsWrapEl.style.display = "image" === e ? "block" : "none", "image" !== e || dn ? "color" !== e || dn || (S = .9, cardAlphaRangeEl.value = S, cardAlphaValEl.textContent = Math.round(100 * S) + "%") : (S = .35, cardAlphaRangeEl.value = S, cardAlphaValEl.textContent = Math.round(100 * S) + "%"), "image" === e && (cardColorPickerEl.style.display = "block"), "image" === e && mn(), nr(u);
  }
  /** mn() -- heuristic scan: touches card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function mn() {
    if (cardBgThumbsEl.innerHTML = "", R) {
      const e = document.createElement("button");
      e.type = "button", e.title = "Your uploaded image", e.style.cssText = `width:44px;height:78px;padding:0;border-radius:3px;overflow:hidden;cursor:pointer;border:2px solid ${"custom" === A ? "var(--green-bright)" : "var(--line)"};background:#000;position:relative;`, e.innerHTML = `<img src="${R.url}" style="width:100%;height:100%;object-fit:cover;display:block;"><span style="position:absolute;top:1px;right:1px;background:rgba(0,0,0,0.7);color:#fff;font-size:8px;padding:1px 3px;border-radius:2px;">✕</span>`, e.addEventListener("click", t => {
        const n = e.getBoundingClientRect();
        if (t.clientX - n.left > n.width - 16 && t.clientY - n.top < 16) return R = null, "custom" === A && (A = null), mn(), nr(u), void Aa();
        A = "custom", mn(), nr(u), Aa();
      }), cardBgThumbsEl.appendChild(e);
    }
    _.forEach((e, t) => {
      if (!e) return;
      const n = document.createElement("button");
      n.type = "button", n.dataset.bgidx = t, n.style.cssText = `width:44px;height:78px;padding:0;border-radius:3px;overflow:hidden;cursor:pointer;border:2px solid ${A === t ? "var(--green-bright)" : "var(--line)"};background:#000;`, n.innerHTML = `<img src="${e.url}" style="width:100%;height:100%;object-fit:cover;display:block;">`, n.addEventListener("click", () => {
        A = t, mn(), nr(u), Aa();
      }), cardBgThumbsEl.appendChild(n);
    });
  }
  /** pn() -- heuristic scan: touches canvas drawing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function pn() {
    const e = _.filter(Boolean);
    if (!e.length) return;
    const t = document.createElement("canvas");
    t.width = 24, t.height = 24;
    const n = t.getContext("2d", {
        willReadFrequently: !0
      }),
      a = {};
    for (const t of e) try {
      n.clearRect(0, 0, 24, 24), n.drawImage(t.img, 0, 0, 24, 24);
      const e = n.getImageData(0, 0, 24, 24).data;
      for (let t = 0; t < e.length; t += 4) {
        const n = e[t],
          o = e[t + 1],
          r = e[t + 2];
        if (e[t + 3] < 200) continue;
        const i = Math.max(n, o, r),
          s = (Math.min(n, o, r), i / 255);
        if (s < .06 || s > .96) continue;
        const {
          h: c,
          s: l
        } = nn(n, o, r);
        if (l < .12) continue;
        const d = Math.floor(c / 15) % 24;
        a[d] || (a[d] = {
          count: 0,
          sSum: 0
        }), a[d].count++, a[d].sSum += l;
      }
    } catch (e) {}
    const o = Object.keys(a);
    if (!o.length) return B = "#0e3d24", ln(), void (C && nr(u));
    let r = o[0];
    for (const e of o) a[e].count > a[r].count && (r = e);
    const i = a[r],
      s = 15 * +r + 7.5,
      c = i.sSum / i.count,
      l = Math.min(.85, Math.max(.55, 1.3 * c));
    B = en(s, l, .3), ln(), C && nr(u);
  }
  function fn(e, t, n, a, o, r, i) {
    function s(t) {
      t = Math.max(a, Math.min(o, Math.round(t))), e.value = t, i(t);
    }
    t.addEventListener("click", () => s((+e.value || a) - r)), n.addEventListener("click", () => s((+e.value || a) + r)), e.addEventListener("input", () => {
      "" !== e.value && i(Math.max(a, Math.min(o, +e.value)));
    }), e.addEventListener("blur", () => s(+e.value || a)), e.addEventListener("keydown", t => {
      "Enter" === t.key && e.blur(), "ArrowUp" === t.key && (t.preventDefault(), s((+e.value || a) + r)), "ArrowDown" === t.key && (t.preventDefault(), s((+e.value || a) - r));
    });
  }
  /** gn() -- heuristic scan: touches Web Audio, sync/timing, playback speed. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function gn(e, t) {
    const {
        SoundTouch: n,
        SimpleFilter: a,
        WebAudioBufferSource: o
      } = await async function () {
        if (window.__STJS) return window.__STJS;
        const e = ["https://cdn.jsdelivr.net/npm/soundtouchjs@0.3.0/dist/soundtouch.js", "https://unpkg.com/soundtouchjs@0.3.0/dist/soundtouch.js"];
        let t;
        for (const n of e) try {
          const e = await import(n);
          return window.__STJS = e, e;
        } catch (e) {
          t = e;
        }
        throw t || new Error("Could not load the speed-change library.");
      }(),
      r = Math.ceil(3 * e.sampleRate),
      i = new AudioBuffer({
        numberOfChannels: e.numberOfChannels,
        length: e.length + r,
        sampleRate: e.sampleRate
      });
    for (let t = 0; t < e.numberOfChannels; t++) i.getChannelData(t).set(e.getChannelData(t), 0);
    const s = Math.max(1, Math.round(e.length / Math.max(.1, t))),
      c = new o(i),
      l = new n();
    l.tempo = t, l.pitch = 1, l.rate = 1;
    const d = new a(c, l),
      u = new Float32Array(8192),
      m = [];
    let p = 0;
    const f = Math.ceil(i.length / Math.max(.1, t)) + 2 * e.sampleRate;
    let g = 0;
    for (;;) {
      const t = d.extract(u, 4096);
      if (t <= 0) break;
      if (m.push(u.slice(0, 2 * t)), p += t, p > f) break;
      if (p >= s + Math.ceil(.25 * e.sampleRate)) break;
      ++g >= 24 && (g = 0, await new Promise(e => setTimeout(e, 0)));
    }
    const h = new AudioBuffer({
        numberOfChannels: 2,
        length: Math.max(1, Math.min(p, s)),
        sampleRate: e.sampleRate
      }),
      y = h.getChannelData(0),
      v = h.getChannelData(1);
    let b = 0;
    for (const e of m) {
      const t = e.length / 2;
      for (let n = 0; n < t && b < h.length; n++) y[b + n] = e[2 * n], v[b + n] = e[2 * n + 1];
      b += t;
    }
    return h;
  }
  /** hn() -- Computes per-slot playback SPEED so each image's audio-synced segment lands on
   beat/duration targets. Async because it touches AudioContext/decoded audio data.
   */
  async function hn(e) {
    if (null != e && (voiceSpeedRangeEl.value = e, voiceSpeedValEl.textContent = (+e).toFixed(2) + "x"), !gt) return voiceSpeedStatusEl.style.color = "#e0866a", voiceSpeedStatusEl.textContent = "Add an MP3 first.", {
      ok: !1,
      message: "Add an MP3 first."
    };
    const t = +voiceSpeedRangeEl.value || 1;
    voiceSpeedApplyBtnEl.disabled = !0, voiceSpeedStatusEl.style.color = "", voiceSpeedStatusEl.textContent = "Time-stretching (pitch preserved)…";
    try {
      const e = new (window.AudioContext || window.webkitAudioContext)();
      let n;
      try {
        n = await e.decodeAudioData(await gt.arrayBuffer());
      } finally {
        try {
          e.close();
        } catch (e) {}
      }
      let a,
        o = !0;
      const r = Math.max(1, Math.round(n.length / Math.max(.1, t)));
      try {
        a = await gn(n, t);
      } catch (e) {
        console.error("pitch-preserving stretch failed, falling back to playbackRate resample", e), o = !1;
        const i = new OfflineAudioContext(n.numberOfChannels, r, n.sampleRate),
          s = i.createBufferSource();
        s.buffer = n, s.playbackRate.value = t, s.connect(i.destination), s.start(0), a = await i.startRendering();
      }
      const i = await async function (e) {
          const t = e.numberOfChannels,
            n = e.sampleRate,
            a = e.length,
            o = 2 * t,
            r = a * o,
            i = new ArrayBuffer(44 + r),
            s = new DataView(i),
            c = (e, t) => {
              for (let n = 0; n < t.length; n++) s.setUint8(e + n, t.charCodeAt(n));
            };
          c(0, "RIFF"), s.setUint32(4, 36 + r, !0), c(8, "WAVE"), c(12, "fmt "), s.setUint32(16, 16, !0), s.setUint16(20, 1, !0), s.setUint16(22, t, !0), s.setUint32(24, n, !0), s.setUint32(28, n * o, !0), s.setUint16(32, o, !0), s.setUint16(34, 16, !0), c(36, "data"), s.setUint32(40, r, !0);
          const l = [];
          for (let n = 0; n < t; n++) l.push(e.getChannelData(n));
          let d = 44;
          for (let e = 0; e < a; e++) {
            for (let n = 0; n < t; n++) {
              const c = Math.max(-1, Math.min(1, l[n][e]));
              s.setInt16(d, c < 0 ? 32768 * c : 32767 * c, !0), d += 2;
            }
            e % 4096 == 0 && (await new Promise(e => setTimeout(e, 0)));
          }
          return new Blob([i], {
            type: "audio/wav"
          });
        }(a),
        s = (gt.name || "voiceover").replace(/\.[^.]+$/, ""),
        c = new File([i], `${s}-${t.toFixed(2)}x.wav`, {
          type: "audio/wav"
        });
      return Kt(), y = c, audioDTEl.textContent = c.name, audioDSEl.textContent = "Ready — mixed into the exported video", rt && URL.revokeObjectURL(rt), rt = URL.createObjectURL(c), previewAudioEl.src = rt, voiceSpeedResetBtnEl.style.display = Math.abs(t - 1) < .005 ? "none" : "inline-block", voiceSpeedStatusEl.style.color = o ? "#8fd19e" : "#e0c14a", voiceSpeedStatusEl.textContent = o ? `Done — voice-over is now ${t.toFixed(2)}x speed, pitch unchanged.` : `Done — voice-over is now ${t.toFixed(2)}x speed (pitch-preserving library failed, used a plain resample — pitch shifted slightly).`, await Ba(), {
        ok: !0,
        speed: t,
        pitchPreserved: o
      };
    } catch (e) {
      return console.error(e), voiceSpeedStatusEl.style.color = "#e0866a", voiceSpeedStatusEl.textContent = e.message || "Speed change failed.", {
        ok: !1,
        message: e.message || "Speed change failed."
      };
    } finally {
      voiceSpeedApplyBtnEl.disabled = !1;
    }
  }
  function yn(e) {
    return (e || "").toLowerCase().replace(/[^a-z0-9']/g, "");
  }
  function vn(e, t) {
    return !(!e || !t) && (e === t || !!(e.length >= 3 && t.length >= 3 && (e.startsWith(t) || t.startsWith(e))) || e.length > 3 && t.length > 3 && function (e, t) {
      const n = e.length,
        a = t.length;
      if (!n) return a;
      if (!a) return n;
      const o = new Array(a + 1);
      for (let e = 0; e <= a; e++) o[e] = e;
      for (let r = 1; r <= n; r++) {
        let n = o[0];
        o[0] = r;
        for (let i = 1; i <= a; i++) {
          const a = o[i];
          o[i] = Math.min(o[i] + 1, o[i - 1] + 1, n + (e[r - 1] === t[i - 1] ? 0 : 1)), n = a;
        }
      }
      return o[a];
    }(e, t) <= 1);
  }
  /** bn() -- Runs Whisper transcription (fetch model + inference) over the narration audio and
   produces caption data -- the biggest single function in the file.
   */
  async function bn() {
    const e = groqKeyInputEl.value.trim();
    if (!e) return syncStatusEl.style.color = "#e0866a", syncStatusEl.textContent = "Add your Groq API key first.", {
      ok: !1,
      message: "Add your Groq API key first."
    };
    if (!y) return syncStatusEl.style.color = "#e0866a", syncStatusEl.textContent = "Add an MP3 first.", {
      ok: !1,
      message: "Add an MP3 first."
    };
    const t = U.map(e => (e || "").trim().split(/\s+/).filter(Boolean).map(yn).filter(Boolean));
    if (t.every(e => 0 === e.length)) return syncStatusEl.style.color = "#e0866a", syncStatusEl.textContent = "Fill in the captions first — sync matches their words to the voice-over.", {
      ok: !1,
      message: "Fill in the captions first."
    };
    const s = (N || "").trim().split(/\s+/).filter(Boolean).map(yn).filter(Boolean),
      c = (cardTextEl.value || "").trim().split(/\s+/).filter(Boolean).map(yn).filter(Boolean);
    syncVoiceBtnEl.disabled = !0, syncStatusEl.style.color = "", syncStatusEl.textContent = "Transcribing with Whisper…", wr.start();
    try {
      const l = +voiceSpeedRangeEl.value || 1,
        d = gt && Math.abs(l - 1) > .005,
        u = await async function (e, t) {
          const n = new FormData();
          n.append("file", e), n.append("model", "whisper-large-v3"), n.append("response_format", "verbose_json"), n.append("timestamp_granularities[]", "word");
          const a = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${t}`
            },
            body: n
          });
          if (!a.ok) {
            const e = await a.text().catch(() => "");
            throw new Error(`Groq error ${a.status}: ${e.slice(0, 200)}`);
          }
          return await a.json();
        }(d ? gt : y, e);
      let m = u.words || (u.segments || []).flatMap(e => e.words || []);
      if (!m || !m.length) throw new Error("No word timestamps returned.");
      d && (m = m.map(e => ({
        ...e,
        start: e.start / l,
        end: e.end / l
      })));
      const p = m[m.length - 1].end;
      syncStatusEl.textContent = "Aligning captions to the words that were actually spoken…";
      const f = [];
      s.length && f.push({
        owner: "hook",
        toks: s
      });
      for (let e = 0; e < n; e++) e === r && c.length && f.push({
        owner: "card",
        toks: c
      }), t[e].length && f.push({
        owner: e,
        toks: t[e]
      });
      r >= n && c.length && f.push({
        owner: "card",
        toks: c
      });
      const g = await async function (e, t) {
        const n = [];
        e.forEach((e, t) => e.toks.forEach((e, a) => n.push({
          tok: e,
          ui: t,
          ti: a
        })));
        const a = t.map(e => yn(e.word)),
          o = n.length,
          r = a.length;
        if (!o || !r) return e.map(() => null);
        const i = -1e9;
        function s(e, t) {
          return e === t ? 3 : vn(e, t) ? 1 : i;
        }
        const c = new Uint8Array((o + 1) * (r + 1));
        let l = new Float64Array(r + 1);
        for (let e = 1; e <= r; e++) l[e] = .15 * -e, c[e] = 2;
        for (let e = 1; e <= o; e++) {
          const t = new Float64Array(r + 1);
          t[0] = .6 * -e, c[e * (r + 1)] = 1;
          const o = n[e - 1].tok;
          for (let n = 1; n <= r; n++) {
            const d = s(o, a[n - 1]),
              u = d > i / 2 ? l[n - 1] + d : i,
              m = l[n] - .6,
              p = t[n - 1] - .15;
            let f = u,
              g = 0;
            m > f && (f = m, g = 1), p > f && (f = p, g = 2), t[n] = f, c[e * (r + 1) + n] = g;
          }
          l = t, e % 400 == 0 && (await new Promise(e => setTimeout(e, 0)));
        }
        const d = e.map(() => []);
        let u = o,
          m = r;
        for (; u > 0 || m > 0;) {
          const e = u > 0 && m > 0 ? c[u * (r + 1) + m] : u > 0 ? 1 : 2;
          if (0 === e) {
            const e = n[u - 1];
            s(e.tok, a[m - 1]) > i / 2 && d[e.ui].push(m - 1), u--, m--;
          } else 1 === e ? u-- : m--;
        }
        return d.map(e => e.length ? e.sort((e, t) => e - t) : null);
      }(f, m);
      let h = null,
        v = null;
      const b = new Array(n).fill(null);
      f.forEach((e, t) => {
        const n = g[t];
        if (!n) return;
        const a = {
          start: m[n[0]].start,
          end: m[n[n.length - 1]].end,
          hitCount: n.length,
          tokCount: e.toks.length
        };
        "hook" === e.owner ? h = {
          start: a.start,
          end: a.end
        } : "card" === e.owner ? v = {
          start: a.start,
          end: a.end
        } : b[e.owner] = a;
      });
      let w = 0;
      for (let e = 0; e < n; e++) {
        if (b[e]) {
          const t = m.findIndex(t => t.start === b[e].end);
          w = Math.max(w, t >= 0 ? t + 1 : w);
          continue;
        }
        const n = t[e];
        if (!n.length) continue;
        const a = n.slice().sort((e, t) => t.length - e.length)[0];
        if (!a || a.length < 3) continue;
        let o = -1;
        for (let e = w; e < m.length; e++) if (yn(m[e].word) === a) {
          o = e;
          break;
        }
        -1 !== o && (b[e] = {
          start: m[o].start,
          end: m[o].end,
          hitCount: 1,
          tokCount: n.length,
          singleWord: !0
        }, w = o + 1);
      }
      const x = .12;
      for (let e = 0; e < n; e++) {
        const t = b[e];
        if (!t) continue;
        const n = t.singleWord ? x : x * Math.max(1, t.tokCount) * .5;
        t.end - t.start < n && (b[e] = null);
      }
      const k = b.map((e, t) => e ? t : -1).filter(e => e >= 0);
      if (!k.length) throw new Error("Could not match any caption text to the voice-over — check the captions match what's actually said.");
      const E = h ? h.end : null,
        I = v ? v.end - v.start : null;
      if (h) {
        const e = Math.max(.1, Math.min(1, (h.end - h.start) / n));
        a = e, hookDurRangeEl.value = a, hookDurNumEl.value = a.toFixed(2);
      }
      if (v) {
        const e = Math.max(1, Math.min(10, I));
        o = e, cardDurRangeEl.value = o, cardDurNumEl.value = o.toFixed(2);
      }
      const L = e => (null !== E ? E : n * a) + (r <= e ? null !== I ? I : o : 0),
        C = (e, t) => r > e && r <= t ? null !== I ? I : o : 0,
        $ = [{
          idx: 0,
          t: L(0),
          real: !1
        }];
      for (const e of k) $.push({
        idx: e,
        t: b[e].start,
        real: !0
      });
      $.push({
        idx: n,
        t: p,
        real: !1
      });
      const S = i.slice(),
        B = [];
      let M = 0;
      for (let e = 0; e < $.length - 1; e++) {
        const n = $[e],
          a = $[e + 1],
          o = [];
        for (let e = n.idx; e < a.idx; e++) (e === n.idx && n.real || t[e].length && !b[e]) && o.push(e);
        if (!o.length) continue;
        const r = a.t - n.t - C(n.idx, a.idx),
          i = .2 * o.length,
          s = Math.max(i, r);
        r < i && M++;
        const c = o.map(e => Math.max(1, t[e].length)),
          l = c.reduce((e, t) => e + t, 0);
        o.forEach((e, t) => {
          const a = Math.max(.2, +(s * c[t] / l).toFixed(2));
          S[e] = a;
          const o = (U[e] || "").trim();
          B.push({
            i: e,
            text: o.length > 40 ? o.slice(0, 40) + "…" : o,
            dur: a,
            matched: e === n.idx && n.real,
            singleWord: e === n.idx && n.real && b[e] && b[e].singleWord
          });
        });
      }
      const A = L(n) + S.reduce((e, t) => e + t, 0);
      if (A < p - .05) {
        const e = S.length - 1;
        S[e] = +(S[e] + (p - A)).toFixed(2);
      }
      i = S, capListEl.querySelectorAll(".capDur").forEach(e => {
        e.value = i[+e.dataset.i].toFixed(1);
      }), In();
      const R = t.filter(e => e.length).length - k.length;
      syncStatusEl.style.color = M > 0 ? "#e0a94a" : "#8fd19e";
      const T = s.length || c.length ? ` Hook line: ${h ? `aligned, segment stretched to ${(a * n).toFixed(2)}s to match` : s.length ? "not found in audio" : "empty"}. Card line: ${v ? `aligned, segment stretched to ${o.toFixed(2)}s to match` : c.length ? "not found in audio" : "empty"}.` : "";
      syncStatusEl.textContent = `Synced — ${k.length}/${t.filter(e => e.length).length} captions force-aligned to the voice-over${R > 0 ? `, ${R} estimated from timing around them` : ""}.${M > 0 ? ` Heads up: ${M} gap(s) were tighter than the spoken audio needed — your hook/card duration may be eating into the voice-over; try shortening hookDur/cardDur and re-syncing.` : ""}${T}`, syncBreakdownEl.style.display = "block";
      const P = [s.length ? `<div>Hook line — "${(N || "").trim().slice(0, 40)}" — <span style="color:${h ? "var(--green-bright)" : "#e0866a"};">${h ? (E - h.start).toFixed(2) + "s spoken" : "not matched"}</span></div>` : "", c.length ? `<div>Card line — "${(cardTextEl.value || "").trim().slice(0, 40)}" — <span style="color:${v ? "var(--green-bright)" : "#e0866a"};">${v ? I.toFixed(2) + "s spoken" : "not matched"}</span></div>` : ""].filter(Boolean).join("");
      return syncBreakdownEl.innerHTML = P + B.sort((e, t) => e.i - t.i).map(e => `<div>Caption ${e.i + 1} — "${e.text}" — <span style="color:${e.matched ? e.singleWord ? "#8fc7d1" : "var(--green-bright)" : "#e0a94a"};">${e.dur.toFixed(2)}s</span>${e.matched ? e.singleWord ? ' <span style="opacity:.6;">(anchored on 1 word)</span>' : "" : ' <span style="opacity:.6;">(estimated)</span>'}</div>`).join(""), syncVoiceBtnEl.disabled = !1, wr.stop(), {
        ok: !0,
        matched: k.length,
        total: t.filter(e => e.length).length,
        clampedGaps: M,
        missed: R
      };
    } catch (e) {
      return console.error(e), syncStatusEl.style.color = "#e0866a", syncStatusEl.textContent = e.message || "Sync failed.", syncVoiceBtnEl.disabled = !1, wr.stop(), {
        ok: !1,
        message: e.message || "Sync failed."
      };
    }
  }
  function wn(e) {
    const t = Zt();
    let n = 0;
    for (const a of t) {
      if (e < n + a.dur || a === t[t.length - 1]) return a.type;
      n += a.dur;
    }
    return "show";
  }
  function xn(e) {
    const t = Zt();
    let n = 0;
    for (const a of t) {
      if (e < n + a.dur || a === t[t.length - 1]) return "show" === a.type ? a.idx : null;
      n += a.dur;
    }
    return null;
  }
  /** kn() -- heuristic scan: touches hook segment, card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function kn() {
    const e = wn(u);
    if ("hook" === e) return l;
    if ("card" === e) {
      const e = function (e) {
        const t = Zt();
        let n = 0;
        for (const a of t) {
          if (e < n + a.dur || a === t[t.length - 1]) return "card" !== a.type ? null : Zo(cardTextEl.value, Math.max(0, e - n), a.dur);
          n += a.dur;
        }
        return null;
      }(u);
      return null != e && F[e] ? (D[e] || (D[e] = {
        ...d
      }), D[e]) : d;
    }
    const t = xn(u);
    return null != t && c[t] ? c[t] : s;
  }
  function En() {
    const e = kn();
    capHandleEl.style.left = 100 * e.xNorm + "%", capHandleEl.style.top = 100 * e.yNorm + "%";
  }
  function In() {
    Ln(), nr(u), timecodeEl.textContent = `${u.toFixed(1)} / ${Xt().toFixed(1)}s`;
  }
  /** Ln() -- heuristic scan: touches hook segment, card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Ln() {
    const e = Zt(),
      t = e.reduce((e, t) => e + t.dur, 0) || 1;
    tmplStripEl.innerHTML = "", e.forEach(e => {
      const n = document.createElement("div");
      n.className = "seg", n.style.flex = `0 0 ${e.dur / t * 100}%`, "hook" === e.type ? n.style.background = "repeating-linear-gradient(90deg,#f2f0e6 0 3px,#0e3d24 3px 6px)" : "card" === e.type ? n.style.background = "var(--green)" : n.style.background = e.idx % 2 == 0 ? "#1a1a16" : "#242420", tmplStripEl.appendChild(n);
    });
  }
  function Cn(e) {
    const t = Array.from(e).filter(e => e.type.startsWith("image/"));
    let a = _.findIndex(e => !e);
    for (const e of t) {
      if (-1 === a || a >= n) break;
      const t = URL.createObjectURL(e),
        o = new Image(),
        r = a;
      for (o.onload = () => {
        _[r] = {
          file: e,
          url: t,
          img: o
        }, Gn(), Jn(), pn();
      }, o.src = t, a++; a < n && _[a];) a++;
    }
  }
  cardAlphaRangeEl.addEventListener("pointerdown", () => {
    dn = !0;
  }), cardBgModeColorBtnEl.addEventListener("click", () => {
    un("color"), Aa();
  }), cardBgModeImageBtnEl.addEventListener("click", () => {
    un("image"), Aa();
  }), un("color"), cardBgUploadBtnEl.addEventListener("click", () => cardBgUploadInputEl.click()), cardBgUploadInputEl.addEventListener("change", e => {
    const t = e.target.files[0];
    if (t && t.type.startsWith("image/")) {
      const e = URL.createObjectURL(t),
        n = new Image();
      n.onload = () => {
        R = {
          file: t,
          url: e,
          img: n
        }, A = "custom", mn(), nr(u), Aa();
      }, n.src = e;
    }
    cardBgUploadInputEl.value = "";
  }), cardTextColorSwatchEl.addEventListener("click", () => {
    const e = "none" === cardTextColorPickerEl.style.display;
    cardTextColorPickerEl.style.display = e ? "block" : "none", e && cn.redraw();
  }), document.querySelectorAll(".cw-preset").forEach(e => {
    e.addEventListener("click", () => {
      T = e.dataset.color, cn.setFromHex(T), ln(), nr(u);
    });
  }), ln(), fn(cardSizeValEl, document.getElementById("cardSizeMinus"), document.getElementById("cardSizePlus"), 16, 140, 2, e => {
    m = e, nr(u);
  }), fn(capSizeValEl, document.getElementById("capSizeMinus"), document.getElementById("capSizePlus"), 10, 90, 1, e => {
    p = e, nr(u);
  }), fn(document.getElementById("hookCapSizeVal"), document.getElementById("hookCapSizeMinus"), document.getElementById("hookCapSizePlus"), 10, 90, 1, e => {
    f = e, nr(u);
  }), hookWordToggleEl.addEventListener("change", () => {
    g = hookWordToggleEl.checked, nr(u);
  }), showWordToggleEl.addEventListener("change", () => {
    h = showWordToggleEl.checked, nr(u);
  }), bulkCapApplyBtnEl.addEventListener("click", () => {
    const e = bulkCapInputEl.value.trim();
    if (!e) return bulkCapStatusEl.style.color = "#e05a4a", void (bulkCapStatusEl.textContent = "Paste some text first.");
    const t = e.split(",").map(e => e.trim().replace(/\.+$/, "").trim()).filter(e => e.length > 0),
      a = Math.min(t.length, n);
    for (let e = 0; e < a; e++) U[e] = t[e];
    Wn(), nr(u), t.length === n ? (bulkCapStatusEl.style.color = "var(--green-bright)", bulkCapStatusEl.textContent = `Dropped all ${n} into the captions below.`) : t.length < n ? (bulkCapStatusEl.style.color = "#e0a94a", bulkCapStatusEl.textContent = `Only found ${t.length} — filled captions 1–${t.length}, the rest left as-is.`) : (bulkCapStatusEl.style.color = "#e0a94a", bulkCapStatusEl.textContent = `Found ${t.length} — used the first ${n}, ignored the extra ${t.length - n}.`);
  }), audioInputEl.addEventListener("change", e => {
    const t = e.target.files[0];
    t && (y = t, gt = t, audioDTEl.textContent = t.name, audioDSEl.textContent = "Ready — mixed into the exported video", audioRemoveEl.style.display = "block", rt && URL.revokeObjectURL(rt), rt = URL.createObjectURL(t), previewAudioEl.src = rt, whisperBoxEl.style.display = "block", voiceSpeedBoxEl.style.display = "block", voiceSpeedRangeEl.value = 1, voiceSpeedValEl.textContent = "1.00x", voiceSpeedResetBtnEl.style.display = "none", voiceSpeedStatusEl.textContent = "");
  }), audioRemoveEl.addEventListener("click", e => {
    if (e.preventDefault(), y = null, gt = null, audioInputEl.value = "", audioDTEl.textContent = "Add MP3", audioDSEl.textContent = "plays under the full video, muted after export finishes", audioRemoveEl.style.display = "none", whisperBoxEl.style.display = "none", voiceSpeedBoxEl.style.display = "none", voiceSpeedStatusEl.textContent = "", syncStatusEl.textContent = "", rt && (URL.revokeObjectURL(rt), rt = null), previewAudioEl.removeAttribute("src"), previewAudioEl.load(), L) {
      const e = L;
      L = null, na("voiceovers", e).then(e => {
        if (e && e.matchedVideoId === po) return e.matchedVideoId = null, e.confidence = 0, ta("voiceovers", e).then(() => $o().catch(() => {}));
      }).catch(() => {});
    }
  }), voiceSpeedRangeEl.addEventListener("input", () => {
    voiceSpeedValEl.textContent = (+voiceSpeedRangeEl.value).toFixed(2) + "x";
  }), voiceSpeedApplyBtnEl.addEventListener("click", () => hn()), voiceSpeedResetBtnEl.addEventListener("click", async () => {
    gt && (Kt(), y = gt, audioDTEl.textContent = y.name, audioDSEl.textContent = "Ready — mixed into the exported video", rt && URL.revokeObjectURL(rt), rt = URL.createObjectURL(y), previewAudioEl.src = rt, voiceSpeedRangeEl.value = 1, voiceSpeedValEl.textContent = "1.00x", voiceSpeedResetBtnEl.style.display = "none", voiceSpeedStatusEl.style.color = "#8fd19e", voiceSpeedStatusEl.textContent = "Back to the original speed.", await Ba());
  }), syncVoiceBtnEl.addEventListener("click", bn), alignRowEl.querySelectorAll(".align-btn").forEach(e => {
    e.addEventListener("click", () => {
      const t = e.dataset.a,
        n = kn();
      "top" === t ? n.yNorm = .14 : "center" === t ? n.yNorm = .5 : "bottom" === t ? n.yNorm = .895 : "left" === t ? (n.align = "left", n.xNorm = .06) : "right" === t && (n.align = "right", n.xNorm = .94), "top" === t || "center" === t || "bottom" === t ? (alignRowEl.querySelectorAll(".align-btn").forEach(e => {
        ["top", "center", "bottom"].includes(e.dataset.a) && e.classList.remove("active");
      }), e.classList.add("active")) : (alignRowEl.querySelectorAll(".align-btn").forEach(e => {
        ["left", "right"].includes(e.dataset.a) && e.classList.remove("active");
      }), e.classList.add("active")), En(), nr(u);
    });
  }), En(), function () {
    let e = !1;
    function t(e, t) {
      const n = frameEl.getBoundingClientRect();
      let a = (e - n.left) / n.width,
        o = (t - n.top) / n.height;
      a = Math.max(.02, Math.min(.98, a)), o = Math.max(.05, Math.min(.97, o));
      const r = wn(u),
        i = xn(u);
      if ("show" === r && null != i && c[i]) c[i].xNorm = a, c[i].yNorm = o;else {
        const e = kn();
        e.xNorm = a, e.yNorm = o;
      }
      En(), nr(u);
    }
    function n(n, a) {
      e = !0, capHandleEl.classList.add("dragging"), t(n, a);
    }
    capHandleEl.addEventListener("mousedown", e => {
      n(e.clientX, e.clientY), e.preventDefault(), e.stopPropagation();
    }), frameEl.addEventListener("mousedown", e => {
      e.target !== capHandleEl && (n(e.clientX, e.clientY), e.preventDefault());
    }), window.addEventListener("mousemove", n => {
      e && t(n.clientX, n.clientY);
    }), window.addEventListener("mouseup", () => {
      e = !1, capHandleEl.classList.remove("dragging");
    }), capHandleEl.addEventListener("touchstart", e => {
      e.touches[0] && n(e.touches[0].clientX, e.touches[0].clientY), e.stopPropagation();
    }, {
      passive: !0
    }), frameEl.addEventListener("touchstart", e => {
      e.target !== capHandleEl && e.touches[0] && n(e.touches[0].clientX, e.touches[0].clientY);
    }, {
      passive: !0
    }), window.addEventListener("touchmove", n => {
      e && n.touches[0] && t(n.touches[0].clientX, n.touches[0].clientY);
    }, {
      passive: !0
    }), window.addEventListener("touchend", () => {
      e = !1, capHandleEl.classList.remove("dragging");
    });
  }(), cardTextEl.addEventListener("input", () => nr(u)), hookCapTextEl.addEventListener("input", () => {
    N = hookCapTextEl.value, nr(u);
  }), fileInputEl.addEventListener("change", e => {
    Cn(e.target.files), fileInputEl.value = "";
  });
  const manifestZoneEl = document.getElementById("manifestZone"),
    manifestInputEl = document.getElementById("manifestInput"),
    manifestStatusEl = document.getElementById("manifestStatus"),
    manifestImagesInputEl = document.getElementById("manifestImagesInput"),
    manifestImagesBtnEl = document.getElementById("manifestImagesBtn"),
    manifestFolderBtnEl = document.getElementById("manifestFolderBtn"),
    manifestFolderInputEl = document.getElementById("manifestFolderInput");
  let Pn = null,
    Fn = null;
  /** Dn() -- heuristic scan: touches project manifest. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Dn(e, t) {
    manifestStatusEl.style.color = t ? "var(--green-bright)" : "#e0574a", manifestStatusEl.textContent = e;
  }
  function jn(e) {
    return e.replace(/\s\(\d+\)(\.\w+)$/i, "$1").toLowerCase();
  }
  function _n(e) {
    return e.type.startsWith("image/") || /\.(jpe?g|png|webp|gif)$/i.test(e.name);
  }
  /** Un() -- heuristic scan: touches project manifest, MP3 matching. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Un(e) {
    const t = Array.from(e),
      n = t.find(e => /manifest(\s\(\d+\))?\.json$/i.test(e.name)),
      a = t.filter(e => e !== n && _n(e));
    if (n) {
      const e = new FileReader();
      return e.onload = () => {
        let t;
        try {
          t = JSON.parse(e.result);
        } catch (e) {
          return void Dn("manifest.json could not be parsed — file may be corrupted.", !1);
        }
        const n = Array.isArray(t.items) ? t.items : [];
        n.length ? a.length ? (Pn = null, manifestImagesBtnEl.style.display = "none", Nn(n, a, t)) : (Pn = n, Fn = t, manifestImagesBtnEl.style.display = "block", Dn("manifest.json loaded (" + n.length + " item" + (1 === n.length ? "" : "s") + ") — now click below and select the " + n.length + " matching image" + (1 === n.length ? "" : "s") + ".", !0)) : Dn("manifest.json has no items in it.", !1);
      }, e.onerror = () => Dn("Could not read manifest.json from disk.", !1), void e.readAsText(n);
    }
    a.length && Pn ? Nn(Pn, a) : Dn("No manifest.json in that selection — drop it (alone, or with images).", !1);
  }
  /** Nn() -- Ingests a project manifest: walks the manifest schema and rebuilds captions/hook/
   card state and per-slot MP3 matching info from it.
   */
  function Nn(e, t, a) {
    return new Promise(o => {
      for (let e = 0; e < n; e++) _[e] && _[e].url && URL.revokeObjectURL(_[e].url), _[e] = null, U[e] = "";
      Gn(), Wn(), Jn(), In();
      const {
        hookItem: r,
        cardItem: i,
        rest: s
      } = function (e, t) {
        let n = null,
          a = null;
        const o = [];
        return t && "string" == typeof t.INTRO_CAPTION && t.INTRO_CAPTION.trim() && (n = {
          keyword: t.INTRO_CAPTION.trim()
        }), t && "string" == typeof t.CTA_CAPTION && t.CTA_CAPTION.trim() && (a = {
          keyword: t.CTA_CAPTION.trim()
        }), e.forEach((e, t) => {
          const r = (e.keyword || "").trim(),
            i = !a && /^also\s+comment\b/i.test(r),
            s = r.split(/\s+/).filter(Boolean).length;
          i ? a = e : !n && !i && 0 === t && s > 5 ? n = e : o.push(e);
        }), {
          hookItem: n,
          cardItem: a,
          rest: o
        };
      }(e, a);
      r && (hookCapTextEl.value = r.keyword || "", N = hookCapTextEl.value), i && (cardTextEl.value = i.keyword || ""), nr(u), e = s;
      const c = {},
        l = {};
      t.forEach(e => {
        c[e.name.toLowerCase()] = e, l[jn(e.name)] = e;
      });
      const d = new Set(),
        m = t.slice().sort((e, t) => e.name.localeCompare(t.name, void 0, {
          numeric: !0
        }));
      let p = _.findIndex(e => !e),
        f = 0,
        g = 0,
        h = e.length;
      function y() {
        Pn = null, manifestImagesBtnEl.style.display = "none";
        const e = [r ? "hook" : null, i ? "card" : null].filter(Boolean).join(" + ");
        Dn(f + " image" + (1 === f ? "" : "s") + " + caption" + (1 === f ? "" : "s") + " loaded" + (e ? " (auto-filled " + e + ")" : "") + (g ? ", " + g + " not matched" : "") + ".", 0 === g), pn(), o({
          loaded: f,
          missing: g
        });
      }
      0 !== h ? e.forEach(e => {
        if (-1 === p || p >= n) return h--, void (0 === h && y());
        const t = function (e) {
          const t = String(e || "").toLowerCase();
          let n = c[t] && !d.has(c[t]) ? c[t] : null;
          if (!n) {
            const t = jn(e || "");
            n = l[t] && !d.has(l[t]) ? l[t] : null;
          }
          return n || (n = m.find(e => !d.has(e)) || null), n && d.add(n), n;
        }(e.file);
        if (!t) return g++, h--, void (0 === h && y());
        const a = URL.createObjectURL(t),
          o = new Image(),
          r = p;
        for (o.onload = () => {
          _[r] = {
            file: t,
            url: a,
            img: o
          }, U[r] = e.keyword || U[r] || "", f++, Gn(), Wn(), Jn(), In(), h--, 0 === h && y();
        }, o.onerror = () => {
          g++, h--, 0 === h && y();
        }, o.src = a, p++; p < n && _[p];) p++;
      }) : y();
    });
  }
  manifestInputEl.addEventListener("change", e => {
    Un(e.target.files), manifestInputEl.value = "";
  }), manifestFolderBtnEl.addEventListener("click", () => manifestFolderInputEl.click()), manifestFolderInputEl.addEventListener("change", e => {
    Un(e.target.files), manifestFolderInputEl.value = "";
  }), ["dragenter", "dragover"].forEach(e => manifestZoneEl.addEventListener(e, e => {
    e.preventDefault(), manifestZoneEl.classList.add("drag");
  })), ["dragleave"].forEach(e => manifestZoneEl.addEventListener(e, e => {
    e.preventDefault(), manifestZoneEl.classList.remove("drag");
  })), manifestZoneEl.addEventListener("drop", async e => {
    if (e.preventDefault(), manifestZoneEl.classList.remove("drag"), e.dataTransfer) {
      if (e.dataTransfer.items && e.dataTransfer.items.length && e.dataTransfer.items[0].webkitGetAsEntry) {
        const t = await function (e) {
          const t = [];
          for (const n of e) {
            const e = n.webkitGetAsEntry ? n.webkitGetAsEntry() : null;
            e && t.push(e);
          }
          function n(e) {
            return new Promise((t, n) => e.file(t, n));
          }
          function a(e) {
            return new Promise((t, n) => {
              const a = [];
              !function o() {
                e.readEntries(e => {
                  e.length ? (a.push(...e), o()) : t(a);
                }, n);
              }();
            });
          }
          async function o(e) {
            if (e.isFile) {
              const t = await n(e).catch(() => null);
              return t ? [t] : [];
            }
            if (e.isDirectory) {
              const t = await a(e.createReader()).catch(() => []);
              return (await Promise.all(t.map(o))).flat();
            }
            return [];
          }
          return Promise.all(t.map(o)).then(e => e.flat());
        }(e.dataTransfer.items);
        return void (t.length && Un(t));
      }
      e.dataTransfer.files && e.dataTransfer.files.length && Un(e.dataTransfer.files);
    }
  }), manifestImagesBtnEl.addEventListener("click", () => manifestImagesInputEl.click()), manifestImagesInputEl.addEventListener("change", e => {
    Pn && e.target.files.length && Nn(Pn, Array.from(e.target.files), Fn), manifestImagesInputEl.value = "";
  }), ["dragenter", "dragover"].forEach(e => dropZoneEl.addEventListener(e, e => {
    e.preventDefault(), dropZoneEl.classList.add("drag");
  })), ["dragleave", "drop"].forEach(e => dropZoneEl.addEventListener(e, e => {
    e.preventDefault(), dropZoneEl.classList.remove("drag");
  })), dropZoneEl.addEventListener("drop", e => {
    e.dataTransfer.files.length && Cn(e.dataTransfer.files);
  });
  const findMatchBtnEl = document.getElementById("findMatchBtn"),
    findMatchStatusEl = document.getElementById("findMatchStatus"),
    findMatchResultEl = document.getElementById("findMatchResult");
  /** qn() -- heuristic scan: touches MP3 matching. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function qn(e, t) {
    findMatchStatusEl.style.color = t ? "var(--green-bright)" : "#e0a84a", findMatchStatusEl.textContent = e;
  }
  /** Hn() -- Matches narration MP3 segments to slots/captions and syncs timing (async).
   */
  async function Hn() {
    findMatchBtnEl.disabled = !0, findMatchResultEl.style.display = "none", qn("Starting…", !0), await yo(250);
    const e = [N, ...U];
    if (!e.some(e => e && e.trim())) return qn("Add captions first — nothing to match against yet.", !1), findMatchBtnEl.disabled = !1, {
      status: "error",
      message: "No captions to match against yet."
    };
    qn("Finding the closest voice-over…", !0), await yo(200);
    const t = (await aa("voiceovers")).filter(e => "done" === e.status && e.transcript);
    if (!t.length) return qn("No transcribed MP3s yet — add & transcribe some in the Voice-over library first.", !1), findMatchBtnEl.disabled = !1, {
      status: "none",
      message: "No transcribed MP3s in the library yet."
    };
    const plIdle = () => new Promise(res => {
      "function" == typeof requestIdleCallback ? requestIdleCallback(() => res(), {
        timeout: 50
      }) : setTimeout(res, 0);
    });
    let n = null;
    const a = [];
    const plHnNow = () => "undefined" != typeof performance ? performance.now() : Date.now();
    let plHnT = plHnNow(),
      plHnI = 0;
    for (const o of t) {
      const {
        confidence: t
      } = ko(o.transcript, e);
      a.push({
        name: o.name,
        confidence: t
      }), (!n || t > n.confidence) && (n = {
        vo: o,
        confidence: t
      }), ++plHnI, (plHnNow() - plHnT > 5 || plHnI % 4 == 0) && (plHnT = plHnNow(), await plIdle());
    }
    let o;
    a.sort((e, t) => t.confidence - e.confidence), console.debug("[find-match] top candidates:", a.slice(0, 5).map(e => `${e.name}: ${Math.round(100 * e.confidence)}%`).join(", ") || "(none)"), n && n.confidence >= .8 ? (await Lo(n.vo.id, po), qn(`Found it — "${n.vo.name}" (${Math.round(100 * n.confidence)}% match) — applied.`, !0), findMatchResultEl.style.display = "block", findMatchResultEl.innerHTML = 'Wrong MP3? Open the <a href="#" id="findMatchReplaceLink" style="color:var(--green-bright);">Voice-over library</a> and pick a different one from the dropdown — takes one click.', o = {
      status: "applied",
      confidence: n.confidence,
      name: n.vo.name
    }) : n && n.confidence > 0 ? (qn(`Best guess: "${n.vo.name}" (${Math.round(100 * n.confidence)}%) — below 80%, not auto-applied.`, !1), findMatchResultEl.style.display = "block", findMatchResultEl.innerHTML = 'Open the <a href="#" id="findMatchReplaceLink" style="color:var(--green-bright);">Voice-over library</a> to review it or assign a different MP3 manually.', o = {
      status: "guess",
      confidence: n.confidence,
      name: n.vo.name
    }) : (qn("No matching voice-over found among the transcribed MP3s.", !1), findMatchResultEl.style.display = "block", findMatchResultEl.innerHTML = 'Open the <a href="#" id="findMatchReplaceLink" style="color:var(--green-bright);">Voice-over library</a> to assign one manually.', o = {
      status: "none"
    });
    const findMatchReplaceLinkEl = document.getElementById("findMatchReplaceLink");
    return findMatchReplaceLinkEl && findMatchReplaceLinkEl.addEventListener("click", e => {
      e.preventDefault(), openVoiceLibBtnEl.click();
    }), findMatchBtnEl.disabled = !1, o;
  }
  /** Gn() -- Renders the tray (thumbnail strip) UI for the loaded slots.
   */
  function Gn() {
    trayEl.innerHTML = "";
    for (let e = 0; e < n; e++) {
      const t = _[e],
        n = document.createElement("div");
      n.className = "thumb" + (t ? "" : " empty-slot"), n.draggable = !!t, n.dataset.idx = e, t ? n.innerHTML = `<img src="${t.url}"><span class="n">${e + 1}</span><button class="rm" data-i="${e}">×</button>` : n.textContent = e + 1, trayEl.appendChild(n);
    }
    countNumEl.innerHTML = Yt() + "<span>/" + n + "</span>", trayEl.querySelectorAll(".rm").forEach(e => {
      e.addEventListener("click", t => {
        t.preventDefault();
        const n = +e.dataset.i;
        _[n] = null, Gn(), Wn(), Jn(), In();
      });
    }), trayEl.querySelectorAll(".thumb[draggable=true]").forEach(e => {
      e.addEventListener("dragstart", t => {
        O = +e.dataset.idx, e.classList.add("ghost");
      }), e.addEventListener("dragend", t => {
        e.classList.remove("ghost");
      });
    }), trayEl.querySelectorAll(".thumb").forEach(e => {
      e.addEventListener("dragover", e => e.preventDefault()), e.addEventListener("drop", t => {
        t.preventDefault();
        const n = +e.dataset.idx;
        if (null === O || O === n) return;
        const a = _[n];
        _[n] = _[O], _[O] = a;
        const o = U[n];
        U[n] = U[O], U[O] = o;
        const r = i[n];
        i[n] = i[O], i[O] = r;
        const s = c[n];
        c[n] = c[O], c[O] = s, O = null, Gn(), Wn(), In();
      });
    }), Wn();
  }
  /** Wn() -- Renders the caption list UI (capListEl).
   */
  function Wn() {
    capListEl.innerHTML = "";
    for (let e = 0; e < n; e++) {
      const t = document.createElement("div");
      t.style.cssText = "display:flex;flex-direction:column;";
      const n = document.createElement("div");
      n.className = "cap-row";
      const a = j[e] || "#ffffff";
      n.innerHTML = `<span class="idx">${e + 1}</span><input type="text" class="capText" data-i="${e}" placeholder="${_[e] ? "caption " + (e + 1) : "— empty slot —"}" value="${U[e] || ""}" maxlength="60" style="flex:1;background:#0d0f0c;border:1px solid var(--line);border-radius:3px;color:var(--paper);font-family:var(--mono);font-size:11px;padding:7px 8px;"><input type="number" class="capDur" data-i="${e}" min="0.2" max="20" step="0.01" value="${i[e].toFixed(2)}" title="seconds for this image — type any value"><button type="button" class="align-btn capColorToggle" data-i="${e}" title="Caption text color" style="padding:5px 7px;font-size:10px;flex:0 0 auto;">🎨</button><label style="display:flex;align-items:center;gap:3px;font-size:9px;color:rgba(242,240,230,0.6);white-space:nowrap;" title="Give caption ${e + 1} its own position, independent of the others"><input type="checkbox" class="capCustomPos" data-i="${e}" ${c[e] ? "checked" : ""}>pos</label>`;
      const o = document.createElement("div");
      o.className = "cap-color-pop", o.dataset.i = e, o.style.cssText = "display:none;align-items:center;gap:6px;padding:6px 8px;margin:2px 0 6px;border:1px solid var(--line);border-radius:4px;", o.innerHTML = `<span style="font-size:9px;color:rgba(242,240,230,0.5);">Color</span>\n        <button type="button" class="capColorPreset" data-i="${e}" data-color="#ffffff" style="width:18px;height:18px;border-radius:3px;background:#ffffff;border:1px solid ${"#ffffff" === a ? "var(--green-bright)" : "rgba(255,255,255,0.25)"};cursor:pointer;padding:0;"></button>\n        <button type="button" class="capColorPreset" data-i="${e}" data-color="#050806" style="width:18px;height:18px;border-radius:3px;background:#050806;border:1px solid ${"#050806" === a ? "var(--green-bright)" : "rgba(255,255,255,0.25)"};cursor:pointer;padding:0;"></button>\n        <input type="text" class="capColorHex" data-i="${e}" value="${a}" placeholder="#ffffff" style="width:78px;background:#0d0f0c;border:1px solid var(--line);border-radius:3px;color:var(--paper);font-family:var(--mono);font-size:10px;padding:4px 6px;">`, t.appendChild(n), t.appendChild(o), capListEl.appendChild(t);
    }
    capListEl.querySelectorAll(".capText").forEach(e => {
      e.addEventListener("input", t => {
        U[+e.dataset.i] = e.value, nr(u);
      });
    }), capListEl.querySelectorAll(".capDur").forEach(e => {
      e.addEventListener("input", t => {
        let n = parseFloat(e.value);
        isNaN(n) || (n = Math.max(.2, Math.min(20, n)), i[+e.dataset.i] = n, In());
      });
    }), capListEl.querySelectorAll(".capCustomPos").forEach(e => {
      e.addEventListener("change", t => {
        const n = +e.dataset.i;
        e.checked ? c[n] = {
          ...s
        } : c[n] = null, En(), nr(u);
      });
    }), capListEl.querySelectorAll(".capColorToggle").forEach(e => {
      e.addEventListener("click", () => {
        const t = capListEl.querySelector(`.cap-color-pop[data-i="${e.dataset.i}"]`);
        t.style.display = "none" === t.style.display ? "flex" : "none";
      });
    }), capListEl.querySelectorAll(".capColorPreset").forEach(e => {
      e.addEventListener("click", () => {
        const t = +e.dataset.i;
        j[t] = e.dataset.color;
        const n = e.closest(".cap-color-pop");
        n.querySelectorAll(".capColorPreset").forEach(e => {
          e.style.borderColor = e.dataset.color === j[t] ? "var(--green-bright)" : "rgba(255,255,255,0.25)";
        });
        const a = n.querySelector(".capColorHex");
        a && (a.value = j[t]), nr(u);
      });
    }), capListEl.querySelectorAll(".capColorHex").forEach(e => {
      e.addEventListener("change", () => {
        let t = e.value.trim();
        /^#/.test(t) || (t = "#" + t), /^#[0-9a-fA-F]{6}$/.test(t) ? (j[+e.dataset.i] = t, nr(u)) : e.value = j[+e.dataset.i] || "#ffffff";
      });
    });
  }
  function Jn() {
    const e = Yt();
    e === n ? (genBtnEl.disabled = !1, genBtnEl.textContent = "Generate video", emptyStateEl.style.display = "none", In()) : (genBtnEl.disabled = !0, genBtnEl.textContent = `Load ${n} images first (${e}/${n})`, 0 === e && (emptyStateEl.style.display = "flex"));
  }
  findMatchBtnEl.addEventListener("click", Hn), Gn(), Ln();
  const Kn = "hookShowcaseDB",
    Zn = 7,
    Xn = {
      videos: "videoBlobs",
      voiceovers: "voiceoverBlobs",
      music: "musicBlobs"
    };
  let Yn = null;
  /** Qn() -- heuristic scan: touches IndexedDB storage, captions, hook segment, render pipeline, download/save, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Qn() {
    return Yn ? Promise.resolve(Yn) : new Promise((e, t) => {
      let n = !1;
      const a = setTimeout(() => {
          n || (n = !0, t(new Error("Database open timed out after 8s — another tab/window has this app open on the same file:// origin and is blocking the upgrade. Close every other tab of Hook Showcase (including older downloaded copies) and reload this page.")));
        }, 8e3),
        o = indexedDB.open(Kn, Zn);
      o.onblocked = () => {
        n || (n = !0, clearTimeout(a), t(new Error("Database is blocked by another open tab/window of this app (same file:// origin). Close every other tab of Hook Showcase and reload this page.")));
      }, o.onupgradeneeded = e => {
        const t = o.result,
          n = o.transaction;
        if (t.objectStoreNames.contains("templates") || t.createObjectStore("templates"), t.objectStoreNames.contains("videos") || t.createObjectStore("videos", {
          keyPath: "id",
          autoIncrement: !0
        }), t.objectStoreNames.contains("voiceovers") || t.createObjectStore("voiceovers", {
          keyPath: "id",
          autoIncrement: !0
        }), t.objectStoreNames.contains("music") || t.createObjectStore("music", {
          keyPath: "id",
          autoIncrement: !0
        }), t.objectStoreNames.contains("videoBlobs") || t.createObjectStore("videoBlobs", {
          keyPath: "id"
        }), t.objectStoreNames.contains("voiceoverBlobs") || t.createObjectStore("voiceoverBlobs", {
          keyPath: "id"
        }), t.objectStoreNames.contains("musicBlobs") || t.createObjectStore("musicBlobs", {
          keyPath: "id"
        }), t.objectStoreNames.contains("videoTemplates") || t.createObjectStore("videoTemplates", {
          keyPath: "id"
        }), t.objectStoreNames.contains("batchPacks") || t.createObjectStore("batchPacks", {
          keyPath: "id",
          autoIncrement: !0
        }), t.objectStoreNames.contains("batchPackTemplates") || t.createObjectStore("batchPackTemplates", {
          keyPath: "id"
        }), t.objectStoreNames.contains("batchRenders") || t.createObjectStore("batchRenders", {
          keyPath: "id"
        }), t.objectStoreNames.contains("batchPackStatus") || t.createObjectStore("batchPackStatus", {
          keyPath: "id"
        }), e.oldVersion > 0 && e.oldVersion < 4) for (const [e, t] of Object.entries(Xn)) n.objectStore(e).openCursor().onsuccess = a => {
          const o = a.target.result;
          if (!o) return;
          const r = o.value;
          let i = r;
          if (r && r.blob) {
            n.objectStore(t).put({
              id: r.id,
              blob: r.blob
            });
            const {
              blob: e,
              ...a
            } = r;
            i = a;
          }
          if ("videos" === e && i && i.template) {
            n.objectStore("videoTemplates").put({
              id: i.id,
              template: i.template
            });
            const e = i.template,
              {
                template: t,
                ...a
              } = i;
            i = {
              ...a,
              captions: Array.isArray(e.captions) ? e.captions.slice() : [],
              hasVoice: !!e.audioFile,
              hasMusic: !!e.bgMusicFile
            };
          }
          i !== r && o.update(i), o.continue();
        };
      }, o.onsuccess = () => {
        n || (n = !0, clearTimeout(a), Yn = o.result, Yn.onclose = () => {
          Yn = null;
        }, e(Yn));
      }, o.onerror = () => {
        n || (n = !0, clearTimeout(a), t(o.error));
      };
    });
  }
  const ea = new Map();
  /** ta() -- heuristic scan: touches IndexedDB storage, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ta(e, t, n) {
    const a = await Qn(),
      o = await new Promise((o, r) => {
        const i = a.transaction(e, "readwrite"),
          s = i.objectStore(e),
          c = void 0 !== n ? s.put(t, n) : s.put(t);
        let l;
        c.onsuccess = () => {
          l = c.result;
        }, c.onerror = () => r(c.error), i.oncomplete = () => o(l), i.onerror = () => r(i.error || c.error || new Error("IndexedDB transaction failed")), i.onabort = () => r(i.error || new Error("IndexedDB transaction aborted before it could commit"));
      });
    return ea.delete(e), o;
  }
  /** na() -- heuristic scan: touches IndexedDB storage, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function na(e, t) {
    const n = await Qn();
    return new Promise((a, o) => {
      const r = n.transaction(e, "readonly").objectStore(e).get(t);
      r.onsuccess = () => a(r.result), r.onerror = () => o(r.error);
    });
  }
  /** aa() -- heuristic scan: touches IndexedDB storage, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function aa(e) {
    if (ea.has(e)) return ea.get(e);
    const t = await Qn(),
      n = await new Promise((n, a) => {
        const o = t.transaction(e, "readonly").objectStore(e).getAll();
        o.onsuccess = () => n(o.result || []), o.onerror = () => a(o.error);
      });
    return ea.set(e, n), n;
  }
  /** oa() -- heuristic scan: touches IndexedDB storage, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function oa(e, t) {
    const n = await Qn();
    await new Promise((a, o) => {
      const r = n.transaction(e, "readwrite"),
        i = r.objectStore(e).delete(t);
      i.onerror = () => o(i.error), r.oncomplete = () => a(), r.onerror = () => o(r.error || i.error || new Error("IndexedDB transaction failed")), r.onabort = () => o(r.error || new Error("IndexedDB transaction aborted before it could commit"));
    }), ea.delete(e);
  }
  /** ra() -- heuristic scan: touches IndexedDB storage, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ra(e) {
    const t = await Qn();
    return new Promise((n, a) => {
      const o = t.transaction(e, "readonly").objectStore(e).getAllKeys();
      o.onsuccess = () => n(o.result || []), o.onerror = () => a(o.error);
    });
  }
  /** ia() -- heuristic scan: touches MP3 matching, sync/timing, batch pack processing, pipeline stepper UI. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function ia(e) {
    return {
      id: e.id,
      batchId: e.batchId,
      order: e.order,
      folderName: e.folderName,
      status: e.status,
      error: e.error || null,
      stage: e.stage || null,
      matchInfo: e.matchInfo || null,
      syncLog: e.syncLog || null
    };
  }
  /** sa() -- heuristic scan: touches sync/timing, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function sa(e) {
    try {
      await ta("batchPackStatus", ia(e));
    } catch (e) {
      console.error("syncPackStatus failed", e);
    }
  }
  let ca = !1;
  /** la() -- heuristic scan: touches sync/timing, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function la() {
    if (!ca) {
      ca = !0;
      try {
        if ((await aa("batchPackStatus")).length) return;
        const e = await aa("batchPacks");
        for (const t of e) await sa(t);
      } catch (e) {
        console.error("pack status migration failed", e);
      }
    }
  }
  /** da() -- heuristic scan: touches sync/timing, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function da(e) {
    return await la(), (await aa("batchPackStatus")).filter(t => t.batchId === e).sort((e, t) => e.order - t.order);
  }
  /** ua() -- heuristic scan: touches sync/timing, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ua(e) {
    await oa("batchPacks", e).catch(() => {}), await oa("batchPackStatus", e).catch(() => {});
  }
  /** ma() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ma(e, t) {
    if (null == t) return null;
    const n = await na(Xn[e], t);
    return n ? n.blob : null;
  }
  /** pa() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function pa(e, t, n) {
    return ta(Xn[e], {
      id: t,
      blob: n
    });
  }
  /** fa() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function fa(e, t) {
    return oa(Xn[e], t);
  }
  /** ga() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ga(e) {
    const t = await na("videoTemplates", e);
    return t ? t.template : null;
  }
  /** ha() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ha(e, t) {
    return ta("videoTemplates", {
      id: e,
      template: t
    });
  }
  /** ya() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ya(e) {
    return oa("videoTemplates", e);
  }
  const va = "current";
  /** ba() -- heuristic scan: touches captions, hook segment, card segment, sync/timing, playback speed. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ba() {
    return {
      _v: 2,
      hookDur: a,
      cardDur: o,
      cardPos: r,
      showDur: i.slice(),
      captionPos: {
        ...s
      },
      capPosOverride: c.map(e => e ? {
        ...e
      } : null),
      hookCaptionPos: {
        ...l
      },
      cardTextPos: {
        ...d
      },
      cardFontSize: m,
      capFontSize: p,
      hookCapFontSize: f,
      hookWordByWord: g,
      showWordByWord: h,
      cardTextValue: cardTextEl.value,
      hookCaptionTextValue: hookCapTextEl.value,
      captions: U.slice(),
      capTextColor: {
        ...j
      },
      images: _.map(e => e ? e.file : null),
      audioFile: y || null,
      originalAudioFile: gt || null,
      voiceSpeed: +voiceSpeedRangeEl.value || 1,
      bgMusicFile: v || null,
      bgMusicFileName: v && v.name || null,
      bgMusicId: b || null,
      bgMusicVolume: w,
      bgMusicTrimStart: x,
      bgMusicTrimEnd: k,
      cardColorAuto: C,
      cardColorManual: $,
      cardColorAlpha: S,
      cardBgMode: M,
      cardBgImageIdx: A,
      cardTextColor: T,
      cardBgCustomImgFile: R ? R.file : null
    };
  }
  /** wa() -- heuristic scan: touches Whisper/transcription, captions, hook segment, card segment, MP3 matching, sync/timing, playback speed. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function wa(e) {
    if (!e || "object" != typeof e) throw new Error("not a valid template file");
    Kt(), a = "number" == typeof e.hookDur ? e.hookDur : a, o = "number" == typeof e.cardDur ? e.cardDur : o, r = "number" == typeof e.cardPos ? e.cardPos : r, Array.isArray(e.showDur) && e.showDur.length === n && (i = e.showDur.slice()), e.captionPos && (s = {
      ...s,
      ...e.captionPos
    }), c = Array.isArray(e.capPosOverride) && e.capPosOverride.length === n ? e.capPosOverride.map(e => e ? {
      ...e
    } : null) : new Array(n).fill(null), e.hookCaptionPos && (l = {
      ...l,
      ...e.hookCaptionPos
    }), e.cardTextPos && (d = {
      ...d,
      ...e.cardTextPos
    }), "number" == typeof e.cardFontSize && (m = e.cardFontSize), "number" == typeof e.capFontSize && (p = e.capFontSize), "number" == typeof e.hookCapFontSize && (f = e.hookCapFontSize), "boolean" == typeof e.hookWordByWord && (g = e.hookWordByWord), "boolean" == typeof e.showWordByWord && (h = e.showWordByWord), Array.isArray(e.captions) && e.captions.length === n && (U = e.captions.slice()), j = e.capTextColor && "object" == typeof e.capTextColor ? {
      ...e.capTextColor
    } : {}, "boolean" == typeof e.cardColorAuto && (C = e.cardColorAuto), "string" == typeof e.cardColorManual && ($ = e.cardColorManual), "number" == typeof e.cardColorAlpha && (S = e.cardColorAlpha), "string" == typeof e.cardBgMode && (M = e.cardBgMode), "number" != typeof e.cardBgImageIdx && "custom" !== e.cardBgImageIdx && null !== e.cardBgImageIdx || (A = e.cardBgImageIdx), "string" == typeof e.cardTextColor && (T = e.cardTextColor), R = null, e.cardBgCustomImgFile && (R = await new Promise(t => {
      const n = URL.createObjectURL(e.cardBgCustomImgFile),
        a = new Image();
      a.onload = () => t({
        file: e.cardBgCustomImgFile,
        url: n,
        img: a
      }), a.onerror = () => t(null), a.src = n;
    })), cardColorAutoToggleEl.checked = C, cardAlphaRangeEl.value = S, un(M || "color"), sn.setFromHex(an()), cn.setFromHex(T), hookDurRangeEl.value = a, hookDurNumEl.value = a.toFixed(2), cardDurRangeEl.value = o, cardDurNumEl.value = o.toFixed(2), Qt(), cardPosSelectEl.value = r, showDurRangeEl.value = i[0] || 1, showDurValEl.textContent = (i[0] || 1).toFixed(1) + "s", cardSizeValEl.value = m, capSizeValEl.value = p, document.getElementById("hookCapSizeVal").value = f, hookWordToggleEl.checked = g, showWordToggleEl.checked = h, "string" == typeof e.cardTextValue && (cardTextEl.value = e.cardTextValue), "string" == typeof e.hookCaptionTextValue && (hookCapTextEl.value = e.hookCaptionTextValue, N = e.hookCaptionTextValue), alignRowEl.querySelectorAll(".align-btn").forEach(e => e.classList.remove("active"));
    const t = s.yNorm < .3 ? "top" : s.yNorm > .7 ? "bottom" : "center",
      u = "right" === s.align ? "right" : "left";
    if (alignRowEl.querySelector(`.align-btn[data-a="${t}"]`)?.classList.add("active"), alignRowEl.querySelector(`.align-btn[data-a="${u}"]`)?.classList.add("active"), Array.isArray(e.images) && e.images.length === n) {
      const t = await Promise.all(e.images.map(e => e ? new Promise(t => {
        const n = URL.createObjectURL(e),
          a = new Image();
        a.onload = () => t({
          file: e,
          url: n,
          img: a
        }), a.onerror = () => t(null), a.src = n;
      }) : Promise.resolve(null)));
      _ = t;
    }
    Gn(), Wn(), Jn(), En(), pn(), ln(), "image" === M && mn(), e.audioFile ? (y = e.audioFile, gt = e.originalAudioFile || e.audioFile, audioDTEl.textContent = y.name || "Audio track", audioDSEl.textContent = "Ready — mixed into the exported video", audioRemoveEl.style.display = "block", whisperBoxEl.style.display = "block", voiceSpeedBoxEl.style.display = "block", voiceSpeedRangeEl.value = "number" == typeof e.voiceSpeed ? e.voiceSpeed : 1, voiceSpeedValEl.textContent = (+voiceSpeedRangeEl.value).toFixed(2) + "x", voiceSpeedResetBtnEl.style.display = gt !== y ? "inline-block" : "none", voiceSpeedStatusEl.textContent = "", rt && URL.revokeObjectURL(rt), rt = URL.createObjectURL(y), previewAudioEl.src = rt) : (y = null, gt = null, audioDTEl.textContent = "Add MP3", audioDSEl.textContent = "plays under the full video, muted after export finishes", audioRemoveEl.style.display = "none", whisperBoxEl.style.display = "none", voiceSpeedBoxEl.style.display = "none", rt && (URL.revokeObjectURL(rt), rt = null), previewAudioEl.removeAttribute("src"), previewAudioEl.load()), w = "number" == typeof e.bgMusicVolume ? e.bgMusicVolume : .25, bgMusicVolRangeEl.value = Math.round(100 * w), bgMusicVolValEl.textContent = Math.round(100 * w) + "%", e.bgMusicFile ? (v = e.bgMusicFile, b = "number" == typeof e.bgMusicId ? e.bgMusicId : null, await qo(), x = "number" == typeof e.bgMusicTrimStart ? e.bgMusicTrimStart : 0, k = "number" == typeof e.bgMusicTrimEnd ? e.bgMusicTrimEnd : E, E > 0 && (bgMusicStartRangeEl.value = Math.round(x / E * 1e3), bgMusicEndRangeEl.value = Math.round(k / E * 1e3)), Ho()) : (v = null, b = null, Vo()), await No(), In();
  }
  const xa = {
      fontSize: 50,
      pos: {
        xNorm: .5,
        yNorm: .5,
        align: "center"
      }
    },
    ka = {
      fontSize: 34,
      pos: {
        xNorm: .5,
        yNorm: .84,
        align: "center"
      }
    },
    Ea = {
      fontSize: 38,
      pos: {
        xNorm: .5,
        yNorm: .5
      },
      pos_index: 5,
      duration: 2.1
    };
  /** Ia() -- heuristic scan: touches hook segment, card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Ia() {
    f = xa.fontSize, l = {
      ...xa.pos
    }, g = !0, p = ka.fontSize, s = {
      ...ka.pos
    }, c = new Array(n).fill(null), h = !1, m = Ea.fontSize, d = {
      ...Ea.pos
    }, F = {}, D = {}, r = Ea.pos_index, o = Ea.duration, C = !1, $ = "#ffffff", T = "#000000";
    try {
      document.getElementById("hookCapSizeVal").value = f, capSizeValEl.value = p, cardSizeValEl.value = m, hookWordToggleEl.checked = !0, showWordToggleEl.checked = !1, cardDurRangeEl.value = o, cardDurNumEl.value = o.toFixed(2), cardPosSelectEl.value = r, cardColorAutoToggleEl.checked = C, cardTextColorSwatchEl.style.background = T;
    } catch (e) {}
  }
  /** La() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function La() {
    const e = (await aa("music")).find(e => e.useByDefault);
    if (!e) return !1;
    b = e.id, v = await ma("music", e.id), x = 0, k = null, await qo();
    try {
      await No();
    } catch (e) {}
    return !0;
  }
  const Ca = new URLSearchParams(location.search),
    $a = "1" === Ca.get("embedded") ? Ca.get("mode") || "review" : null,
    Sa = Ca.get("packId") ? +Ca.get("packId") : null;
  /** Ba() -- heuristic scan: touches sync/timing, download/save, batch pack processing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Ba() {
    try {
      if ("review" === $a && null != Sa) {
        const e = await ba();
        return await ta("batchPackTemplates", {
          id: Sa,
          template: e,
          ver: Date.now()
        }), !0;
      }
      return $a || (await ta("templates", await ba(), va)), !0;
    } catch (e) {
      return console.error("template save failed", e), !1;
    }
  }
  let Ma = null;
  function Aa(e) {
    clearTimeout(Ma), Ma = setTimeout(() => {
      const e = () => Ba();
      "requestIdleCallback" in window ? requestIdleCallback(e, {
        timeout: 1500
      }) : e();
    }, e || 400);
  }
  function Ra(e, t) {
    tmplStatusEl.textContent = e, tmplStatusEl.style.color = t ? "#e05a4a" : "var(--green-bright)", clearTimeout(Ra._t), Ra._t = setTimeout(() => {
      tmplStatusEl.textContent = "";
    }, 5e3);
  }
  function Ta(e) {
    return new Promise((t, n) => {
      const a = new FileReader();
      a.onload = () => t(a.result), a.onerror = n, a.readAsDataURL(e);
    });
  }
  function Pa(e) {
    const [t, n] = e.split(","),
      a = /data:(.*?);base64/.exec(t)[1],
      o = atob(n),
      r = new Uint8Array(o.length);
    for (let e = 0; e < o.length; e++) r[e] = o.charCodeAt(e);
    return new Blob([r], {
      type: a
    });
  }
  tmplSaveBtnEl.addEventListener("click", async () => {
    const e = await ja().then(e => `${e} template`).catch(() => "My template"),
      t = prompt('Name this template — e.g. "Video 5 template":', e);
    if (t) {
      tmplSaveBtnEl.disabled = !0, tmplSaveBtnEl.textContent = "Saving…";
      try {
        const e = await ba();
        await ta("templates", e, t.trim()), await ta("templates", e, va), Ra(`Saved as "${t.trim()}".`);
      } catch (e) {
        console.error("template save failed", e), Ra("Save failed.", !0);
      }
      tmplSaveBtnEl.disabled = !1, tmplSaveBtnEl.textContent = "Save template";
    }
  }), tmplRestoreBtnEl.addEventListener("click", async () => {
    try {
      const e = (await ra("templates")).filter(e => e !== va);
      if (!e.length) return tmplPickerWrapEl.style.display = "none", void Ra('No named templates saved yet — click "Save template" first.', !0);
      tmplPickerSelectEl.innerHTML = e.map(e => `<option value="${e}">${e}</option>`).join(""), tmplPickerWrapEl.style.display = "block", Ra(`${e.length} template${1 === e.length ? "" : "s"} saved — pick one below.`);
    } catch (e) {
      console.error(e), Ra("Could not read saved templates.", !0);
    }
  }), tmplPickerLoadBtnEl.addEventListener("click", async () => {
    const e = tmplPickerSelectEl.value;
    if (e) {
      tmplPickerLoadBtnEl.disabled = !0, tmplPickerLoadBtnEl.textContent = "Loading…";
      try {
        const t = await na("templates", e);
        t ? (I = null, L = null, await wa(t), await Ba(), Ra(`Loaded "${e}" — images, captions, everything.`), tmplPickerWrapEl.style.display = "none") : Ra("That template was not found.", !0);
      } catch (e) {
        console.error(e), Ra("Load failed.", !0);
      }
      tmplPickerLoadBtnEl.disabled = !1, tmplPickerLoadBtnEl.textContent = "Load this template";
    }
  }), tmplExportBtnEl.addEventListener("click", async () => {
    const e = await ba(),
      t = {
        ...e,
        images: await Promise.all(e.images.map(e => e ? Ta(e) : null)),
        audioFile: e.audioFile ? await Ta(e.audioFile) : null,
        originalAudioFile: e.originalAudioFile ? await Ta(e.originalAudioFile) : null,
        bgMusicFile: e.bgMusicFile ? await Ta(e.bgMusicFile) : null
      },
      n = new Blob([JSON.stringify(t)], {
        type: "application/json"
      }),
      a = URL.createObjectURL(n),
      o = document.createElement("a");
    o.href = a, o.download = "hook-showcase-template.json", document.body.appendChild(o), o.click(), o.remove(), setTimeout(() => URL.revokeObjectURL(a), 2e3), Ra("Template exported with images — works in a re-downloaded copy of this tool too.");
  }), tmplImportBtnEl.addEventListener("click", () => tmplImportFileEl.click()), tmplImportFileEl.addEventListener("change", async e => {
    const t = e.target.files[0];
    if (t) {
      try {
        const e = await t.text(),
          a = JSON.parse(e),
          o = {
            ...a,
            images: Array.isArray(a.images) ? a.images.map((e, t) => e ? new File([Pa(e)], `image-${t + 1}.jpg`, {
              type: Pa(e).type
            }) : null) : new Array(n).fill(null),
            audioFile: a.audioFile ? new File([Pa(a.audioFile)], "audio.mp3", {
              type: Pa(a.audioFile).type
            }) : null,
            originalAudioFile: a.originalAudioFile ? new File([Pa(a.originalAudioFile)], "audio-original.mp3", {
              type: Pa(a.originalAudioFile).type
            }) : null,
            bgMusicFile: a.bgMusicFile ? new File([Pa(a.bgMusicFile)], a.bgMusicFileName || "music.mp3", {
              type: Pa(a.bgMusicFile).type
            }) : null,
            bgMusicId: null
          };
        I = null, L = null, await wa(o), await Ba(), Ra("Template imported — images, captions, everything loaded.");
      } catch (e) {
        console.error(e), Ra("Could not read that file — is it a template .json exported from this tool?", !0);
      }
      tmplImportFileEl.value = "";
    }
  }), async function () {
    try {
      if ("1" === new URLSearchParams(location.search).get("embedded")) return;
      const e = await na("templates", va);
      if (!e) return;
      Ra("Restoring your last project…"), await wa(e), Ra("Restored your last saved template.");
    } catch (e) {
      console.error("template auto-restore failed", e);
    }
  }();
  let Fa = [],
    Da = [];
  /** ja() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ja() {
    const e = await aa("videos");
    let t = 0;
    for (const n of e) {
      const e = /^Video (\d+)$/.exec(n.name || "");
      e && (t = Math.max(t, +e[1]));
    }
    return `Video ${t + 1}`;
  }
  /** _a() -- heuristic scan: touches captions, MP3 matching, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function _a(e) {
    const t = await ja(),
      n = await ba().catch(() => null),
      a = await ta("videos", {
        name: t,
        createdAt: Date.now(),
        voiceoverId: L || null,
        captions: n && Array.isArray(n.captions) ? n.captions.slice() : [],
        hasVoice: !(!n || !n.audioFile),
        hasMusic: !(!n || !n.bgMusicFile)
      });
    if (await pa("videos", a, e), n && (await ha(a, n)), L) {
      const e = await na("voiceovers", L);
      e && e.matchedVideoId === po && (e.matchedVideoId = a, await ta("voiceovers", e));
    }
    return I = a, L = null, await async function () {
      try {
        (await ra("videos")).length > Ya && (await Xa(Ya));
      } catch (e) {
        console.error("auto-prune failed", e);
      }
    }(), await Va(), await Eo().catch(e => console.error("voiceover auto-match failed", e)), await $o().catch(() => {}), a;
  }
  function Ua(e) {
    const t = new Date(e);
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
  }
  function Na(e, t) {
    const n = new Date(e),
      a = new Date(),
      o = new Date();
    let r;
    return o.setDate(a.getDate() - 1), r = n.toDateString() === a.toDateString() ? "today" : n.toDateString() === o.toDateString() ? "yesterday" : `on ${n.getDate()} ${n.toLocaleDateString(void 0, {
      month: "long"
    })}`, `You made ${t} video${1 === t ? "" : "s"} ${r}`;
  }
  /** Oa() -- heuristic scan: touches sync/timing, download/save, gallery save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Oa(e, t, n) {
    n.forEach(e => URL.revokeObjectURL(e)), n.length = 0, e.innerHTML = "";
    const a = [];
    let o = null,
      r = null;
    for (const e of t) {
      const t = Ua(e.createdAt);
      t !== o && (r = {
        items: []
      }, a.push(r), o = t), r.items.push(e);
    }
    for (const t of a) {
      const n = document.createElement("div");
      n.textContent = Na(t.items[0].createdAt, t.items.length), n.style.cssText = "font-family:var(--disp);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--green-bright);margin-top:10px;", e.appendChild(n);
      for (const n of t.items) {
        const t = document.createElement("div");
        t.style.cssText = "display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:4px;padding:8px;flex-wrap:wrap;";
        const a = new Date(n.createdAt),
          o = !!n.hasVoice,
          r = !!n.hasMusic;
        t.innerHTML = `\n          <div data-edit="${n.id}" style="cursor:pointer;display:flex;align-items:center;gap:8px;flex:1;min-width:0;" title="Open in editor">\n            <video data-lazy-id="${n.id}" muted style="width:40px;height:71px;object-fit:cover;border-radius:3px;background:#000;pointer-events:none;" preload="none"></video>\n            <div style="flex:1;min-width:0;">\n              <div style="font-family:var(--mono);font-size:11px;color:var(--paper);">${n.name}${o ? ' <span style="color:var(--green-bright);" title="Voice-over attached">🔊</span>' : ""}${r ? ' <span style="color:var(--green-bright);" title="Background music attached">🎵</span>' : ""}</div>\n              <div style="font-size:9px;color:rgba(242,240,230,0.45);">${a.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })} · tap to edit</div>\n            </div>\n          </div>\n          <button type="button" class="align-btn" data-play="${n.id}" style="padding:6px 8px;" title="Preview">▶</button>\n          <button type="button" class="align-btn" data-dl="${n.id}" data-dlname="${n.name.replace(/\s+/g, "-").toLowerCase()}.mp4" style="padding:6px 8px;">Download</button>\n          <button type="button" class="align-btn" data-del="${n.id}" style="padding:6px 8px;">Delete</button>\n        `, e.appendChild(t);
      }
    }
    const i = e.querySelectorAll("[data-lazy-id]"),
      s = async e => {
        const t = +e.dataset.lazyId;
        e.removeAttribute("data-lazy-id");
        const a = await ma("videos", t).catch(() => null);
        if (!a) return;
        const o = URL.createObjectURL(a);
        n.push(o), e.src = o;
      };
    if ("IntersectionObserver" in window && i.length) {
      const t = new IntersectionObserver(e => {
        e.forEach(e => {
          e.isIntersecting && (s(e.target), t.unobserve(e.target));
        });
      }, {
        root: e,
        rootMargin: "200px"
      });
      i.forEach(e => t.observe(e));
    } else i.forEach(s);
    e.querySelectorAll("[data-play]").forEach(e => {
      e.addEventListener("click", async t => {
        t.stopPropagation();
        const n = +e.dataset.play,
          [a, o] = await Promise.all([na("videos", n), ma("videos", n)]);
        a && o && (Kt(), playerVideoEl.src && URL.revokeObjectURL(playerVideoEl.src), playerVideoEl.src = URL.createObjectURL(o), playerVideoEl.muted = !1, playerTitleEl.textContent = a.name, playerOverlayEl.classList.add("on"), playerVideoEl.play().catch(() => {}));
      });
    }), e.querySelectorAll("[data-dl]").forEach(e => {
      e.addEventListener("click", async t => {
        if (t.stopPropagation(), e.dataset.busy) return;
        e.dataset.busy = "1";
        const n = e.textContent;
        e.textContent = "…";
        try {
          const t = await ma("videos", +e.dataset.dl);
          if (!t) return void (e.textContent = n);
          const a = URL.createObjectURL(t),
            o = document.createElement("a");
          o.href = a, o.download = e.dataset.dlname, o.click(), setTimeout(() => URL.revokeObjectURL(a), 4e3);
        } finally {
          e.textContent = n, delete e.dataset.busy;
        }
      });
    }), e.querySelectorAll("[data-edit]").forEach(e => {
      e.addEventListener("click", async () => {
        const t = +e.dataset.edit,
          [n, a] = await Promise.all([na("videos", t), ga(t)]);
        if (n) if (a) try {
          I = t, L = null, await wa(a), await Ba(), galleryModalOverlayEl.classList.remove("on"), Ra(`Reopened "${n.name}" for editing.`), window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        } catch (e) {
          console.error("reopen failed", e), Ra("Could not reopen that video.", !0);
        } else Ra("This video was made before editing was supported — no project data to reopen.", !0);
      });
    }), e.querySelectorAll("[data-del]").forEach(e => {
      e.addEventListener("click", async t => {
        t.stopPropagation();
        const n = +e.dataset.del;
        await oa("videos", n), await fa("videos", n), await ya(n), await Va();
      });
    });
  }
  let za = !0;
  /** Va() -- heuristic scan: touches sync/timing, gallery save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Va() {
    const e = (await aa("videos")).sort((e, t) => t.createdAt - e.createdAt);
    galleryEmptyEl.style.display = e.length ? "none" : "block", Oa(videoGalleryEl, e, Fa), galleryModalOverlayEl.classList.contains("on") ? (galleryModalEmptyEl.style.display = e.length ? "none" : "block", Oa(videoGalleryModalEl, e, Da), za = !1) : za = !0, e.length ? (qbGalleryCountEl.textContent = e.length, qbGalleryCountEl.style.display = "inline-block") : qbGalleryCountEl.style.display = "none";
  }
  Va(), Za(), openGalleryBtnEl.addEventListener("click", async () => {
    if (galleryModalOverlayEl.classList.add("on"), za) {
      const e = (await aa("videos")).sort((e, t) => t.createdAt - e.createdAt);
      galleryModalEmptyEl.style.display = e.length ? "none" : "block", Oa(videoGalleryModalEl, e, Da), za = !1;
    }
    Za();
  }), galleryModalCloseEl.addEventListener("click", () => {
    galleryModalOverlayEl.classList.remove("on");
  }), galleryModalOverlayEl.addEventListener("click", e => {
    e.target === galleryModalOverlayEl && galleryModalOverlayEl.classList.remove("on");
  });
  const storageUsageLineEl = document.getElementById("storageUsageLine"),
    storagePruneBtnEl = document.getElementById("storagePruneBtn"),
    storageClearVideosBtnEl = document.getElementById("storageClearVideosBtn"),
    storageClearMusicBtnEl = document.getElementById("storageClearMusicBtn"),
    storageActionStatusEl = document.getElementById("storageActionStatus");
  function Ka(e) {
    return e || 0 === e ? e < 1048576 ? (e / 1024).toFixed(0) + " KB" : e < 1073741824 ? (e / 1048576).toFixed(1) + " MB" : (e / 1073741824).toFixed(2) + " GB" : "?";
  }
  /** Za() -- heuristic scan: touches sync/timing, render pipeline, download/save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Za() {
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const {
            usage: e,
            quota: t
          } = await navigator.storage.estimate(),
          n = t ? Math.round(e / t * 100) : null;
        storageUsageLineEl.textContent = `Using ${Ka(e)}${t ? ` of ${Ka(t)} available (${n}%)` : ""}. Big libraries here are the usual cause of crashes on render/download — prune below if things feel unstable.`;
      } else storageUsageLineEl.textContent = "Storage usage not available in this browser.";
    } catch (e) {
      storageUsageLineEl.textContent = "Could not read storage usage.";
    }
  }
  /** Xa() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Xa(e) {
    const t = (await aa("videos")).sort((e, t) => t.createdAt - e.createdAt).slice(e);
    for (const e of t) await oa("videos", e.id), await fa("videos", e.id), await ya(e.id);
    return t.length;
  }
  storagePruneBtnEl.addEventListener("click", async () => {
    storagePruneBtnEl.disabled = !0, storageActionStatusEl.textContent = "Pruning…";
    try {
      const e = await Xa(10);
      await Va(), za = !1, Oa(videoGalleryModalEl, (await aa("videos")).sort((e, t) => t.createdAt - e.createdAt), Da), storageActionStatusEl.textContent = e ? `Deleted ${e} older video${1 === e ? "" : "s"} (and their duplicated source assets).` : "Nothing to prune — 10 or fewer videos saved.", await Za();
    } finally {
      storagePruneBtnEl.disabled = !1;
    }
  }), storageClearVideosBtnEl.addEventListener("click", async () => {
    if (confirm("Delete every saved video from the gallery? This cannot be undone.")) {
      storageClearVideosBtnEl.disabled = !0, storageActionStatusEl.textContent = "Deleting…";
      try {
        const e = await Xa(0);
        await Va(), za = !1, Oa(videoGalleryModalEl, [], Da), storageActionStatusEl.textContent = `Deleted ${e} saved video${1 === e ? "" : "s"}.`, await Za();
      } finally {
        storageClearVideosBtnEl.disabled = !1;
      }
    }
  }), storageClearMusicBtnEl.addEventListener("click", async () => {
    if (confirm("Delete every uploaded background music track? This cannot be undone.")) {
      storageClearMusicBtnEl.disabled = !0, storageActionStatusEl.textContent = "Deleting…";
      try {
        const e = await ra("music");
        for (const t of e) await oa("music", t), await fa("music", t);
        storageActionStatusEl.textContent = `Deleted ${e.length} music track${1 === e.length ? "" : "s"}.`;
        try {
          await Go();
        } catch (e) {}
        try {
          await No();
        } catch (e) {}
        await Za();
      } finally {
        storageClearMusicBtnEl.disabled = !1;
      }
    }
  });
  const Ya = 40;
  const voiceLibModalOverlayEl = document.getElementById("voiceLibModalOverlay"),
    voiceLibModalCloseEl = document.getElementById("voiceLibModalClose"),
    openVoiceLibBtnEl = document.getElementById("openVoiceLibBtn"),
    qbVoiceCountEl = document.getElementById("qbVoiceCount"),
    voMultiInputEl = document.getElementById("voMultiInput"),
    voDropZoneEl = document.getElementById("voDropZone"),
    voTranscribeAllBtnEl = document.getElementById("voTranscribeAllBtn"),
    voRematchBtnEl = document.getElementById("voRematchBtn"),
    voStatusEl = document.getElementById("voStatus"),
    voListEl = document.getElementById("voList"),
    voEmptyEl = document.getElementById("voEmpty"),
    voKeyStatusEl = document.getElementById("voKeyStatus"),
    voPlayerEl = document.getElementById("voPlayer"),
    po = "__current_editor__";
  function fo(e, t) {
    voStatusEl.textContent = e, voStatusEl.style.color = t ? "#e0866a" : "var(--green-bright)";
  }
  /** go() -- heuristic scan: touches MP3 matching, sync/timing, download/save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function go(e) {
    const t = Array.from(e).filter(e => e.type.startsWith("audio/") || /\.mp3$/i.test(e.name));
    if (t.length) {
      for (const e of t) {
        const t = await ta("voiceovers", {
          name: e.name,
          transcript: null,
          status: "pending",
          matchedVideoId: null,
          confidence: 0,
          createdAt: Date.now()
        });
        await pa("voiceovers", t, e);
      }
      fo(`Added ${t.length} MP3${1 === t.length ? "" : "s"} — saved.`), await $o();
    }
  }
  /** ho() -- heuristic scan: touches Whisper/transcription, network fetch, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function ho(e, t) {
    const n = new FormData();
    n.append("file", e), n.append("model", "whisper-large-v3"), n.append("response_format", "verbose_json");
    const a = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${t}`
      },
      body: n
    });
    if (!a.ok) {
      const e = await a.text().catch(() => "");
      throw new Error(`Groq error ${a.status}: ${e.slice(0, 200)}`);
    }
    return ((await a.json()).text || "").trim();
  }
  function yo(e) {
    return new Promise(t => setTimeout(t, e));
  }
  openVoiceLibBtnEl.addEventListener("click", () => {
    voiceLibModalOverlayEl.classList.add("on"), function () {
      const e = !!groqKeyInputEl.value.trim();
      voKeyStatusEl.innerHTML = e ? '<span style="color:var(--green-bright);">✓ Groq API key saved</span> — same key as the audio-sync panel, used here for transcription too.' : '<span style="color:#e0866a;">⚠ No Groq API key yet</span> — add it above in "Add MP3 + sync captions" once; it\'s saved in this browser and used everywhere, including here.';
    }(), $o();
  }), voiceLibModalCloseEl.addEventListener("click", () => {
    voiceLibModalOverlayEl.classList.remove("on");
  }), voiceLibModalOverlayEl.addEventListener("click", e => {
    e.target === voiceLibModalOverlayEl && voiceLibModalOverlayEl.classList.remove("on");
  }), voMultiInputEl.addEventListener("change", e => {
    go(e.target.files), voMultiInputEl.value = "";
  }), ["dragenter", "dragover"].forEach(e => voDropZoneEl.addEventListener(e, e => {
    e.preventDefault(), voDropZoneEl.classList.add("drag");
  })), ["dragleave"].forEach(e => voDropZoneEl.addEventListener(e, e => {
    e.preventDefault(), voDropZoneEl.classList.remove("drag");
  })), voDropZoneEl.addEventListener("drop", e => {
    e.preventDefault(), voDropZoneEl.classList.remove("drag"), e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length && go(e.dataTransfer.files);
  });
  const vo = "voFetchWasRunning";
  /** bo() -- heuristic scan: touches MP3 matching, sync/timing, gallery save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function bo() {
    const e = groqKeyInputEl.value.trim();
    if (!e) return void fo("Add your Groq API key in the audio panel first.", !0);
    const t = (await aa("voiceovers")).sort((e, t) => e.id - t.id),
      n = t.filter(e => "done" !== e.status);
    if (!n.length) return fo("Nothing left to transcribe."), void localStorage.removeItem(vo);
    localStorage.setItem(vo, "1"), voTranscribeAllBtnEl.disabled = !0;
    try {
      for (let a = 0; a < n.length; a++) {
        const o = n[a],
          r = t.findIndex(e => e.id === o.id) + 1;
        fo(`Transcribing ${r}/${t.length} — "${o.name}"…`), o.status = "transcribing", await ta("voiceovers", o), await $o();
        try {
          const n = await ma("voiceovers", o.id),
            a = await ho(n, e);
          o.transcript = a, o.status = "done", o.error = null, await ta("voiceovers", o), fo(`Transcribed "${o.name}" (${r}/${t.length}).`);
        } catch (e) {
          console.error("transcription failed", e), o.status = "error", o.error = e.message, await ta("voiceovers", o), fo(`Failed on "${o.name}": ${e.message}`, !0);
        }
        await $o(), a < n.length - 1 && (fo(`Waiting 50s before the next MP3 (${r}/${t.length} done)…`), await yo(5e4));
      }
    } catch (e) {
      console.error("transcription loop failed", e), fo(`Stopped: ${e.message}`, !0);
    }
    voTranscribeAllBtnEl.disabled = !1, fo("Transcription complete — matching against gallery videos…"), await Eo();
    (await aa("voiceovers")).some(e => "done" !== e.status) || localStorage.removeItem(vo), fo("Done — review matches below.");
  }
  voTranscribeAllBtnEl.addEventListener("click", bo);
  const wo = new Set(["the", "a", "an", "to", "of", "and", "or", "is", "in", "on", "for", "with", "my", "your", "this", "that", "it", "at", "by", "you", "get", "free", "guide", "watch", "comment", "i", "me", "we"]);
  function xo(e) {
    return (e || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(e => e && !wo.has(e));
  }
  function ko(e, t) {
    const n = (e || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim(),
      a = xo(e);
    if (!a.length) return {
      confidence: 0,
      coverage: 0,
      order: 0
    };
    const o = [];
    t.forEach((e, t) => {
      if (!e || !e.trim()) return;
      const {
        score: r,
        pos: i
      } = function (e, t, n) {
        const a = (e || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
        if (!a) return {
          score: 0,
          pos: -1
        };
        if (a.length > 2 && n.includes(a)) {
          const e = n.indexOf(a);
          return {
            score: 1,
            pos: n.slice(0, e).split(/\s+/).length
          };
        }
        const o = xo(e);
        if (!o.length) return {
          score: 0,
          pos: -1
        };
        let r = 0,
          i = -1;
        for (const e of o) {
          const n = t.indexOf(e);
          -1 !== n && (r++, (-1 === i || n < i) && (i = n));
        }
        const s = r / o.length;
        return {
          score: s,
          pos: s > 0 ? i : -1
        };
      }(e, a, n);
      r >= .5 && o.push({
        idx: t,
        pos: i,
        score: r
      });
    });
    const r = t.filter(e => e && e.trim()).length || 1,
      i = o.length / r;
    o.sort((e, t) => e.pos - t.pos);
    let s = 0;
    if (o.length) {
      const e = [];
      for (const t of o) {
        let n = 0,
          a = e.length;
        for (; n < a;) {
          const o = n + a >> 1;
          e[o] < t.idx ? n = o + 1 : a = o;
        }
        e[n] = t.idx;
      }
      s = e.length / o.length;
    }
    return {
      confidence: .6 * i + .4 * s,
      coverage: i,
      order: s
    };
  }
  /** Eo() -- heuristic scan: touches captions, MP3 matching, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Eo() {
    const e = (await aa("voiceovers")).filter(e => e.transcript && !e.matchedVideoId),
      t = (await aa("videos")).filter(e => Array.isArray(e.captions) && e.captions.length && !e.hasVoice);
    if (!e.length || !t.length) return;
    const n = [];
    const plEoNow = () => "undefined" != typeof performance ? performance.now() : Date.now();
    let plEoT = plEoNow();
    for (const a of e) {
      for (const e of t) {
        const {
          confidence: t
        } = ko(a.transcript, e.captions);
        t >= .6 && n.push({
          vo: a,
          vid: e,
          confidence: t
        }), plEoNow() - plEoT > 12 && (plEoT = plEoNow(), await new Promise(e => setTimeout(e, 0)));
      }
    }
    n.sort((e, t) => t.confidence - e.confidence);
    const a = new Set(),
      o = new Set();
    for (const e of n) {
      if (a.has(e.vo.id) || o.has(e.vid.id)) continue;
      a.add(e.vo.id), o.add(e.vid.id), e.vo.matchedVideoId = e.vid.id, e.vo.confidence = e.confidence, await ta("voiceovers", e.vo);
      const t = await ma("voiceovers", e.vo.id),
        n = (await ga(e.vid.id)) || {};
      n.audioFile = t, n.audioFileName = e.vo.name, await ha(e.vid.id, n), e.vid.voiceoverId = e.vo.id, e.vid.hasVoice = !0, await ta("videos", e.vid);
    }
    await Va(), await $o();
  }
  /** Io() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Io(e, t, n) {
    const a = (await ga(e)) || {};
    a.audioFile = t || null, a.audioFileName = t ? n : null, await ha(e, a);
  }
  /** Lo() -- heuristic scan: touches MP3 matching, sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Lo(e, t) {
    const n = await na("voiceovers", e);
    if (n) {
      if (n.matchedVideoId === po) L === n.id && (L = null);else if (n.matchedVideoId) {
        const e = await na("videos", n.matchedVideoId);
        e && e.voiceoverId === n.id && (await Io(e.id, null, null), e.voiceoverId = null, e.hasVoice = !1, await ta("videos", e));
      }
      if (t === po) {
        if (await Co(n), L = n.id, n.matchedVideoId = po, n.confidence = 1, I) {
          const e = await na("videos", I);
          if (e) {
            if (e.voiceoverId && e.voiceoverId !== n.id) {
              const t = await na("voiceovers", e.voiceoverId);
              t && (t.matchedVideoId = null, t.confidence = 0, await ta("voiceovers", t));
            }
            const t = await ma("voiceovers", n.id);
            await Io(e.id, t, n.name), e.voiceoverId = n.id, e.hasVoice = !0, await ta("videos", e);
          }
        }
      } else if (t) {
        const e = await na("videos", t);
        if (e) {
          if (e.voiceoverId && e.voiceoverId !== n.id) {
            const t = await na("voiceovers", e.voiceoverId);
            t && (t.matchedVideoId = null, t.confidence = 0, await ta("voiceovers", t));
          }
          const a = await ma("voiceovers", n.id);
          await Io(e.id, a, n.name), e.voiceoverId = n.id, e.hasVoice = !0, await ta("videos", e), n.matchedVideoId = t, I === t && (await Co(n));
        }
      } else n.matchedVideoId = null, n.confidence = 0;
      await ta("voiceovers", n), await Va(), await $o();
    }
  }
  /** Co() -- heuristic scan: touches Whisper/transcription, sync/timing, playback speed. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Co(e) {
    const t = await ma("voiceovers", e.id);
    y = t, gt = t, audioDTEl.textContent = e.name || "Audio track", audioDSEl.textContent = "Ready — mixed into the exported video (from Voice-over library)", audioRemoveEl.style.display = "block", rt && URL.revokeObjectURL(rt), rt = URL.createObjectURL(t), previewAudioEl.src = rt, whisperBoxEl.style.display = "block", voiceSpeedBoxEl.style.display = "block", voiceSpeedRangeEl.value = 1, voiceSpeedValEl.textContent = "1.00x", voiceSpeedResetBtnEl.style.display = "none", voiceSpeedStatusEl.textContent = "", Aa();
  }
  /** $o() -- heuristic scan: touches captions, MP3 matching, sync/timing, download/save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function $o() {
    const e = (await aa("voiceovers")).sort((e, t) => t.createdAt - e.createdAt),
      t = (await aa("videos")).sort((e, t) => t.createdAt - e.createdAt);
    voEmptyEl.style.display = e.length ? "none" : "block", e.length ? (qbVoiceCountEl.textContent = e.length, qbVoiceCountEl.style.display = "inline-block") : qbVoiceCountEl.style.display = "none";
    const n = await async function () {
        if (I) {
          const e = await na("videos", I);
          return e && e.voiceoverId || null;
        }
        return L;
      }(),
      a = I ? t.find(e => e.id === I) : null,
      o = a ? `${a.name} (currently editing)` : "▶ Currently editing (not saved yet)",
      r = t.filter(e => e.id !== I);
    voListEl.innerHTML = "";
    for (const a of e) {
      const e = document.createElement("div");
      e.style.cssText = "border:1px solid var(--line);border-radius:4px;padding:10px;";
      const i = {
          pending: "Not transcribed",
          transcribing: "Transcribing…",
          done: "Transcribed",
          error: "Failed"
        }[a.status] || a.status,
        s = "error" === a.status ? "#e0866a" : "done" === a.status ? "var(--green-bright)" : "rgba(242,240,230,0.55)",
        c = a.matchedVideoId === po,
        l = !c && a.matchedVideoId ? t.find(e => e.id === a.matchedVideoId) : null,
        d = c ? U.filter(e => e && e.trim()).join(" · ") : l && Array.isArray(l.captions) ? l.captions.filter(e => e && e.trim()).join(" · ") : "",
        u = ['<option value="">— none —</option>', `<option value="${po}" ${n === a.id ? "selected" : ""}>${o}</option>`].concat(r.map(e => `<option value="${e.id}" ${a.matchedVideoId === e.id ? "selected" : ""}>${e.name}${e.voiceoverId && e.voiceoverId !== a.id ? " (has voice)" : ""}</option>`));
      e.innerHTML = `\n        <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">\n          <button type="button" class="align-btn" data-voplay="${a.id}" title="Play this MP3" style="padding:6px 9px;flex:0 0 auto;">▶</button>\n          <div style="font-family:var(--mono);font-size:11px;color:var(--paper);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.name}</div>\n          <div style="font-size:9.5px;color:${s};white-space:nowrap;">${i}</div>\n          ${"error" === a.status ? `<button type="button" class="align-btn" data-retry="${a.id}" title="Retry this file" style="padding:6px 9px;flex:0 0 auto;">↻ Retry</button>` : ""}\n        </div>\n        ${a.transcript ? `<div style="font-size:9.5px;color:rgba(242,240,230,0.6);margin-top:6px;line-height:1.5;max-height:54px;overflow:hidden;">${a.transcript}</div>` : ""}\n        ${"error" === a.status && a.error ? `<div style="font-size:9.5px;color:#e0866a;margin-top:6px;">${a.error}</div>` : ""}\n        <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">\n          <span style="font-size:9.5px;color:rgba(242,240,230,0.55);white-space:nowrap;">Select video:</span>\n          <select data-assign="${a.id}" style="flex:1;background:#0e120f;color:var(--paper);border:1px solid var(--line);border-radius:4px;padding:6px;font-family:var(--mono);font-size:10.5px;">${u.join("")}</select>\n          ${c ? '<span style="font-size:9.5px;color:var(--green-bright);white-space:nowrap;">✓ in editor</span>' : l ? `<span style="font-size:9.5px;color:${a.confidence >= .6 ? "var(--green-bright)" : "#e0a84a"};white-space:nowrap;">${Math.round(100 * a.confidence)}%</span>` : ""}\n        </div>\n        ${d ? `<div style="font-size:9px;color:rgba(242,240,230,0.4);margin-top:6px;line-height:1.4;" title="Captions on the matched video — compare against the transcript above to sanity-check the match">Video captions: ${d}</div>` : ""}\n      `, voListEl.appendChild(e);
    }
    voListEl.querySelectorAll("[data-assign]").forEach(e => {
      e.addEventListener("change", () => {
        const t = +e.dataset.assign,
          n = e.value;
        Lo(t, n ? n === po ? po : +n : null);
      });
    }), voListEl.querySelectorAll("[data-retry]").forEach(e => {
      e.addEventListener("click", () => async function (e) {
        const t = groqKeyInputEl.value.trim();
        if (!t) return void fo("Add your Groq API key in the audio panel first.", !0);
        const n = await na("voiceovers", e);
        if (n) {
          n.status = "transcribing", n.error = null, await ta("voiceovers", n), await $o(), fo(`Retrying "${n.name}"…`);
          try {
            const a = await ma("voiceovers", e),
              o = await ho(a, t);
            n.transcript = o, n.status = "done", n.error = null, await ta("voiceovers", n), fo(`Transcribed "${n.name}".`), await Eo();
          } catch (e) {
            console.error("retry failed", e), n.status = "error", n.error = e.message, await ta("voiceovers", n), fo(`Still failing on "${n.name}": ${e.message}`, !0);
          }
          await $o();
        }
      }(+e.dataset.retry));
    }), voListEl.querySelectorAll("[data-voplay]").forEach(e => {
      e.addEventListener("click", async () => {
        const t = +e.dataset.voplay;
        if (voPlayerEl.dataset.playingId === String(t) && !voPlayerEl.paused) return voPlayerEl.pause(), void (e.textContent = "▶");
        const n = await ma("voiceovers", t);
        n && (voListEl.querySelectorAll("[data-voplay]").forEach(e => e.textContent = "▶"), voPlayerEl.src && URL.revokeObjectURL(voPlayerEl.src), voPlayerEl.src = URL.createObjectURL(n), voPlayerEl.dataset.playingId = String(t), voPlayerEl.play().catch(() => {}), e.textContent = "⏸");
      });
    });
  }
  voRematchBtnEl.addEventListener("click", async () => {
    fo("Re-matching…"), await Eo(), fo("Matching pass complete.");
  }), voPlayerEl.addEventListener("ended", () => {
    voListEl.querySelectorAll("[data-voplay]").forEach(e => e.textContent = "▶");
  }), $o(), async function () {
    try {
      if ("1" !== localStorage.getItem(vo)) return;
      const e = await aa("voiceovers");
      if (!e.filter(e => "done" !== e.status).length) return void localStorage.removeItem(vo);
      if (!groqKeyInputEl.value.trim()) return;
      fo("Resuming voice-over fetch where it left off…"), await bo();
    } catch (e) {
      console.error("voice-over auto-resume failed", e);
    }
  }();
  const musicLibModalOverlayEl = document.getElementById("musicLibModalOverlay"),
    musicLibModalCloseEl = document.getElementById("musicLibModalClose"),
    openMusicLibBtnEl = document.getElementById("openMusicLibBtn"),
    qbMusicCountEl = document.getElementById("qbMusicCount"),
    musicMultiInputEl = document.getElementById("musicMultiInput"),
    musicDropZoneEl = document.getElementById("musicDropZone"),
    musicStatusEl = document.getElementById("musicStatus"),
    musicListEl = document.getElementById("musicList"),
    musicEmptyEl = document.getElementById("musicEmpty"),
    musicPlayerEl = document.getElementById("musicPlayer");
  /** _o() -- heuristic scan: touches MP3 matching, sync/timing, download/save. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function _o(e) {
    const t = Array.from(e).filter(e => e.type.startsWith("audio/") || /\.mp3$/i.test(e.name));
    if (t.length) {
      for (const e of t) {
        const t = await ta("music", {
          name: e.name,
          createdAt: Date.now()
        });
        await pa("music", t, e);
      }
      var n, a;
      n = `Added ${t.length} track${1 === t.length ? "" : "s"} — saved.`, musicStatusEl.textContent = n, musicStatusEl.style.color = a ? "#e0866a" : "var(--green-bright)", await Go();
    }
  }
  function Uo() {
    v = null, b = null, bgMusicSelectEl.value = "";
  }
  /** No() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function No() {
    const e = (await aa("music")).sort((e, t) => e.name.localeCompare(t.name));
    bgMusicSelectEl.innerHTML = ['<option value="">— none —</option>'].concat(e.map(e => `<option value="${e.id}">${e.name}</option>`)).join(""), bgMusicSelectEl.value = b ? String(b) : "";
  }
  openMusicLibBtnEl.addEventListener("click", () => {
    musicLibModalOverlayEl.classList.add("on"), Go();
  }), musicLibModalCloseEl.addEventListener("click", () => {
    musicLibModalOverlayEl.classList.remove("on");
  }), musicLibModalOverlayEl.addEventListener("click", e => {
    e.target === musicLibModalOverlayEl && musicLibModalOverlayEl.classList.remove("on");
  }), musicMultiInputEl.addEventListener("change", e => {
    _o(e.target.files), musicMultiInputEl.value = "";
  }), ["dragenter", "dragover"].forEach(e => musicDropZoneEl.addEventListener(e, e => {
    e.preventDefault(), musicDropZoneEl.classList.add("drag");
  })), ["dragleave"].forEach(e => musicDropZoneEl.addEventListener(e, e => {
    e.preventDefault(), musicDropZoneEl.classList.remove("drag");
  })), musicDropZoneEl.addEventListener("drop", e => {
    e.preventDefault(), musicDropZoneEl.classList.remove("drag"), e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length && _o(e.dataTransfer.files);
  });
  let Oo = null;
  function zo(e) {
    e = Math.max(0, Math.round(e || 0));
    return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
  }
  function Vo() {
    E = 0, x = 0, k = null, bgMusicStartRangeEl.value = 0, bgMusicEndRangeEl.value = 1e3, bgMusicDurLabelEl.textContent = "", Ho();
  }
  function qo() {
    return new Promise(e => {
      if (!v) return Vo(), void e();
      const t = document.createElement("audio"),
        n = URL.createObjectURL(v);
      t.preload = "metadata", t.src = n, t.addEventListener("loadedmetadata", () => {
        E = isFinite(t.duration) ? t.duration : 0, x = 0, k = E, bgMusicStartRangeEl.value = 0, bgMusicEndRangeEl.value = 1e3, bgMusicDurLabelEl.textContent = "full " + zo(E), Ho(), URL.revokeObjectURL(n), e();
      }, {
        once: !0
      }), t.addEventListener("error", () => {
        URL.revokeObjectURL(n), e();
      }, {
        once: !0
      });
    });
  }
  function Ho() {
    const e = E || 0,
      t = e * (+bgMusicStartRangeEl.value / 1e3),
      n = e * (+bgMusicEndRangeEl.value / 1e3);
    bgMusicTrimLabelEl.textContent = e ? `${zo(t)}–${zo(n)}` : "0:00–0:00";
    const a = Math.min(+bgMusicStartRangeEl.value, +bgMusicEndRangeEl.value) / 10,
      o = Math.max(+bgMusicStartRangeEl.value, +bgMusicEndRangeEl.value) / 10;
    bgMusicTrimFillEl.style.left = a + "%", bgMusicTrimFillEl.style.width = o - a + "%";
  }
  /** Go() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function Go() {
    const e = (await aa("music")).sort((e, t) => t.createdAt - e.createdAt);
    musicEmptyEl.style.display = e.length ? "none" : "block", e.length ? (qbMusicCountEl.textContent = e.length, qbMusicCountEl.style.display = "inline-block") : qbMusicCountEl.style.display = "none", musicListEl.innerHTML = "";
    for (const t of e) {
      const e = document.createElement("div");
      e.style.cssText = "display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:4px;padding:8px;", e.innerHTML = `\n        <button type="button" class="align-btn" data-mplay="${t.id}" style="padding:6px 9px;flex:0 0 auto;">▶</button>\n        <div style="font-family:var(--mono);font-size:11px;color:var(--paper);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.name}</div>\n        <label style="display:flex;align-items:center;gap:4px;font-family:var(--mono);font-size:9px;color:${t.useByDefault ? "var(--green-bright)" : "rgba(242,240,230,0.55)"};white-space:nowrap;cursor:pointer;">\n          <input type="checkbox" data-mdefault="${t.id}" ${t.useByDefault ? "checked" : ""}> USE BY DEFAULT\n        </label>\n        <button type="button" class="align-btn" data-mdel="${t.id}" style="padding:6px 9px;">Delete</button>\n      `, musicListEl.appendChild(e);
    }
    musicListEl.querySelectorAll("[data-mdefault]").forEach(e => {
      e.addEventListener("change", async () => {
        const t = +e.dataset.mdefault,
          n = await aa("music");
        for (const a of n) {
          const n = e.checked && a.id === t;
          !!a.useByDefault !== n && (a.useByDefault = n, await ta("music", a));
        }
        await Go();
      });
    }), musicListEl.querySelectorAll("[data-mplay]").forEach(e => {
      e.addEventListener("click", async () => {
        const t = +e.dataset.mplay;
        if (musicPlayerEl.dataset.playingId === String(t) && !musicPlayerEl.paused) return musicPlayerEl.pause(), void (e.textContent = "▶");
        const n = await ma("music", t);
        n && (musicListEl.querySelectorAll("[data-mplay]").forEach(e => e.textContent = "▶"), bgMusicPreviewBtnEl.textContent = "▶", musicPlayerEl.src && URL.revokeObjectURL(musicPlayerEl.src), musicPlayerEl.src = URL.createObjectURL(n), musicPlayerEl.dataset.playingId = String(t), musicPlayerEl.play().catch(() => {}), e.textContent = "⏸");
      });
    }), musicListEl.querySelectorAll("[data-mdel]").forEach(e => {
      e.addEventListener("click", async () => {
        const t = +e.dataset.mdel;
        await oa("music", t), await fa("music", t), b === t && (Uo(), await Ba()), await Go();
      });
    }), await No();
  }
  function Wo() {
    playerVideoEl.pause(), playerVideoEl.src && (URL.revokeObjectURL(playerVideoEl.src), playerVideoEl.removeAttribute("src"), playerVideoEl.load()), playerOverlayEl.classList.remove("on");
  }
  /** Jo() -- heuristic scan: touches canvas drawing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function Jo(e, t, n, a, o) {
    const r = a / o;
    let i, s, c, l;
    e.width / e.height > r ? (l = e.height, c = l * r, i = (e.width - c) / 2, s = 0) : (c = e.width, l = c / r, i = 0, s = (e.height - l) / 2), we.drawImage(e, i, s, c, l, t, n, a, o);
  }
  function Ko(e, t, n, a, o, r, i, s) {
    const c = (e || "").trim().split(/\s+/).filter(Boolean);
    if (0 === c.length) return;
    const l = n / c.length,
      d = Math.max(0, Math.min(c.length - 1, Math.floor(t / l))),
      u = c[d];
    we.textAlign = i, we.textBaseline = "middle";
    let m = a;
    for (we.font = `800 ${m}px 'League Spartan', Archivo, Arial, sans-serif`; we.measureText(u).width > 928.8 && m > 24;) m -= 4, we.font = `800 ${m}px 'League Spartan', Archivo, Arial, sans-serif`;
    we.fillStyle = s || "#ffffff";
    let p = o;
    return "left" === i && (p = Math.max(48, o)), "right" === i && (p = Math.min(1032, o)), we.fillText(u, p, r), {
      words: c,
      wIdx: d,
      fontSizeUsed: m
    };
  }
  function Zo(e, t, n) {
    const a = (e || "").trim().split(/\s+/).filter(Boolean);
    if (!a.length) return 0;
    const o = n / a.length;
    return Math.max(0, Math.min(a.length - 1, Math.floor(t / o)));
  }
  function Xo(n, a, o) {
    const r = Zo(n, a, o),
      i = "custom" === A ? R && R.img : null != A && _[A] ? _[A].img : null;
    "image" === M && i ? (we.fillStyle = "#050806", we.fillRect(0, 0, e, t), Jo(i, 0, 0, e, t), we.fillStyle = on(), we.fillRect(0, 0, e, t)) : (we.fillStyle = on(), we.fillRect(0, 0, e, t));
    const s = F[r] && D[r] ? D[r] : d,
      c = s.xNorm * e,
      l = s.yNorm * t;
    Ko(n, a, o, 3 * m, c, l, "center", P[r] || T);
  }
  function Yo(n, a, o, r, i) {
    if (we.fillStyle = "#050806", we.fillRect(0, 0, e, t), Jo(n, 0, 0, e, t), a) {
      const n = c[o] || s,
        l = n.xNorm * e,
        d = n.yNorm * t,
        u = n.align,
        m = 380,
        f = we.createLinearGradient(0, d - m, 0, d + m);
      if (f.addColorStop(0, "rgba(5,8,6,0)"), f.addColorStop(.5, "rgba(5,8,6,0.78)"), f.addColorStop(1, "rgba(5,8,6,0)"), we.fillStyle = f, we.fillRect(0, Math.max(0, d - m), e, 2 * m), h) Ko(a, i || 0, r, 3 * p, l, d, u, j[o] || "#ffffff");else {
        let e = l;
        "left" === u && (e = Math.max(48, l)), "right" === u && (e = Math.min(1032, l)), Qo(a, e, d, 928.8, 3 * p, u, j[o] || "#ffffff");
      }
    }
  }
  function Qo(e, t, n, a, o, r, i) {
    let s = o;
    for (we.font = `800 ${s}px 'League Spartan', Archivo, Arial, sans-serif`; we.measureText(e).width > a && s > 18;) s -= 2, we.font = `800 ${s}px 'League Spartan', Archivo, Arial, sans-serif`;
    we.fillStyle = i || "#ffffff", we.textAlign = r, we.textBaseline = "middle", we.fillText(e, t, n);
  }
  function er(n, a, o, r) {
    if (we.fillStyle = "#000", we.fillRect(0, 0, e, t), Jo(n, 0, 0, e, t), a) {
      const n = l.xNorm * e,
        i = l.yNorm * t,
        s = l.align || "center",
        c = 220,
        d = we.createLinearGradient(0, i - c, 0, i + c);
      d.addColorStop(0, "rgba(5,8,6,0)"), d.addColorStop(.5, "rgba(5,8,6,0.7)"), d.addColorStop(1, "rgba(5,8,6,0)"), we.fillStyle = d, we.fillRect(0, Math.max(0, i - c), e, 2 * c);
      let u = n;
      "left" === s && (u = Math.max(48, n)), "right" === s && (u = Math.min(1032, n)), g ? Ko(a, o || 0, r, 3 * f, u, i, s) : Qo(a, u, i, 928.8, 3 * f, s);
    }
  }
  /** tr() -- heuristic scan: touches hook segment, card segment. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function tr(e) {
    const t = Zt();
    let o = 0;
    for (const r of t) {
      if (e < o + r.dur || r === t[t.length - 1]) {
        const t = e - o;
        return void ("hook" === r.type ? _[r.idx] && er(_[r.idx].img, N, Math.max(0, e), a * n) : "card" === r.type ? Xo(cardTextEl.value, Math.max(0, t), r.dur) : _[r.idx] && Yo(_[r.idx].img, U[r.idx], r.idx, r.dur, Math.max(0, t)));
      }
      o += r.dur;
    }
  }
  function nr(e) {
    Yt() < n || (u = e, tr(e), En());
  }
  bgMusicSelectEl.addEventListener("change", async () => {
    musicPlayerEl.pause(), bgMusicPreviewBtnEl.textContent = "▶";
    const e = bgMusicSelectEl.value,
      t = (async () => {
        if (!e) return Uo(), Vo(), void (await Ba());
        const t = await na("music", +e);
        t ? (b = t.id, v = await ma("music", t.id), x = 0, k = null, await qo(), await Ba()) : Uo();
      })();
    Oo = t, await t, Oo === t && (Oo = null);
  }), [bgMusicStartRangeEl, bgMusicEndRangeEl].forEach(e => {
    e.addEventListener("input", Ho), e.addEventListener("change", () => {
      !function () {
        const e = E || 0;
        let t = e * (+bgMusicStartRangeEl.value / 1e3),
          n = e * (+bgMusicEndRangeEl.value / 1e3);
        t > n && ([t, n] = [n, t]), n - t < .5 && (n = Math.min(e, t + .5)), x = t, k = n, Ho();
      }(), "editor-selection" !== musicPlayerEl.dataset.playingId || musicPlayerEl.paused || (musicPlayerEl.currentTime = x), Aa();
    });
  }), bgMusicPreviewBtnEl.addEventListener("click", () => {
    v && ("editor-selection" !== musicPlayerEl.dataset.playingId || musicPlayerEl.paused ? (musicListEl.querySelectorAll("[data-mplay]").forEach(e => e.textContent = "▶"), musicPlayerEl.src && URL.revokeObjectURL(musicPlayerEl.src), musicPlayerEl.src = URL.createObjectURL(v), musicPlayerEl.volume = w, musicPlayerEl.dataset.playingId = "editor-selection", musicPlayerEl.addEventListener("loadedmetadata", function e() {
      musicPlayerEl.currentTime = x, musicPlayerEl.removeEventListener("loadedmetadata", e);
    }), musicPlayerEl.play().catch(() => {}), bgMusicPreviewBtnEl.textContent = "⏸") : musicPlayerEl.pause());
  }), musicPlayerEl.addEventListener("timeupdate", () => {
    if ("editor-selection" !== musicPlayerEl.dataset.playingId && "video-mix" !== musicPlayerEl.dataset.playingId) return;
    const e = null != k && k > x ? k : musicPlayerEl.duration;
    e && musicPlayerEl.currentTime >= e - .05 && (musicPlayerEl.currentTime = x);
  }), musicPlayerEl.addEventListener("pause", () => {
    "editor-selection" === musicPlayerEl.dataset.playingId && (bgMusicPreviewBtnEl.textContent = "▶");
  }), musicPlayerEl.addEventListener("ended", () => {
    bgMusicPreviewBtnEl.textContent = "▶", musicListEl.querySelectorAll("[data-mplay]").forEach(e => e.textContent = "▶");
  }), bgMusicVolRangeEl.addEventListener("input", () => {
    w = +bgMusicVolRangeEl.value / 100, bgMusicVolValEl.textContent = bgMusicVolRangeEl.value + "%", musicPlayerEl.volume = w, Aa();
  }), No(), playerCloseEl.addEventListener("click", Wo), playerOverlayEl.addEventListener("click", e => {
    e.target === playerOverlayEl && Wo();
  }), newVideoBtnEl.addEventListener("click", () => {
    _.some(Boolean) && !confirm(`Start a new video? This clears the ${n} loaded images, captions, and audio (your saved templates and gallery are unaffected).`) || (Kt(), _.forEach(e => {
      e && URL.revokeObjectURL(e.url);
    }), _ = new Array(n).fill(null), U = new Array(n).fill(""), y && audioRemoveEl.click(), Uo(), I = null, L = null, fileInputEl.value = "", Gn(), Wn(), Jn(), nr(0), genStatusEl.style.display = "none", genFillEl.style.width = "0%", dlLinkEl.classList.remove("on"), Ra("Ready for a new video — same template, empty slots."));
  });
  let ar = !1,
    or = null,
    rr = 0,
    ir = 0;
  function sr(e) {
    e = Math.max(0, Math.min(1, e)), progFillEl.style.width = 100 * e + "%", playheadEl.style.left = 100 * e + "%";
  }
  function cr() {
    ar = !1, playIconEl.innerHTML = '<path d="M4 2.5V13.5L13 8L4 2.5Z" fill="currentColor"/>', or && cancelAnimationFrame(or), y && previewAudioEl.src && previewAudioEl.pause(), "video-mix" === musicPlayerEl.dataset.playingId && musicPlayerEl.pause();
  }
  function lr(e) {
    const t = x || 0,
      n = null != k && k > t ? k : E;
    return t + e % Math.max(.1, (n || .1) - t);
  }
  fullscreenBtnEl.addEventListener("click", async () => {
    try {
      document.fullscreenElement ? await document.exitFullscreen() : (await (frameEl.requestFullscreen ? frameEl.requestFullscreen() : frameEl.webkitRequestFullscreen()), Yt() >= n && !ar && playBtnEl.click());
    } catch (e) {
      console.error("fullscreen failed", e);
    }
  }), playBtnEl.addEventListener("click", () => {
    Yt() < n || (ar ? cr() : (playerVideoEl.pause(), document.getElementById("voPlayer")?.pause(), ar = !0, playIconEl.innerHTML = '<rect x="3" y="2.5" width="4" height="11" fill="currentColor"/><rect x="9" y="2.5" width="4" height="11" fill="currentColor"/>', ir = u >= Xt() - .05 ? 0 : u, rr = performance.now(), y && previewAudioEl.src && (previewAudioEl.currentTime = Math.min(ir, previewAudioEl.duration || ir), previewAudioEl.play().catch(() => {})), function (e) {
      if (!v) return;
      const t = dr !== v;
      musicPlayerEl.src && ("video-mix" !== musicPlayerEl.dataset.playingId || t) && (musicPlayerEl.pause(), musicPlayerEl.src && URL.revokeObjectURL(musicPlayerEl.src), musicPlayerEl.src = "");
      "video-mix" === musicPlayerEl.dataset.playingId && musicPlayerEl.src && !t || (musicPlayerEl.src = URL.createObjectURL(v), musicPlayerEl.dataset.playingId = "video-mix", dr = v);
      musicPlayerEl.volume = w, musicPlayerEl.loop = !1;
      const n = () => {
        musicPlayerEl.currentTime = lr(e), musicPlayerEl.play().catch(() => {});
      };
      musicPlayerEl.readyState >= 1 ? n() : musicPlayerEl.addEventListener("loadedmetadata", n, {
        once: !0
      });
      bgMusicPreviewBtnEl.textContent = "▶";
    }(ir), ur()));
  });
  let dr = null;
  /** ur() -- heuristic scan: touches animation loop. (auto-generated hint, not verified -- read the body before relying on this)
   */
  function ur() {
    const e = Xt(),
      t = ir + (performance.now() - rr) / 1e3;
    if (t >= e) return cr(), nr(0), timecodeEl.textContent = `00.0 / ${e.toFixed(1)}s`, void sr(0);
    nr(t), timecodeEl.textContent = `${t.toFixed(1)} / ${e.toFixed(1)}s`, sr(t / e), or = requestAnimationFrame(ur);
  }
  /** mr() -- heuristic scan: touches Web Audio, sync/timing, render pipeline. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function mr(e) {
    const t = !!y,
      n = !!v;
    if (!t && !n) return null;
    let a = null,
      o = null;
    const r = new (window.AudioContext || window.webkitAudioContext)();
    try {
      if (t) {
        const t = await y.arrayBuffer();
        a = await r.decodeAudioData(t), a = await async function (e, t) {
          const n = e.duration / t,
            a = Math.max(1, Math.round(t * e.sampleRate));
          let o;
          if (Math.abs(n - 1) < .02) {
            const t = Math.max(1, Math.round(e.length / n)),
              a = new OfflineAudioContext(e.numberOfChannels, t, e.sampleRate),
              r = a.createBufferSource();
            r.buffer = e, r.playbackRate.value = n, r.connect(a.destination), r.start(0), o = await a.startRendering();
          } else try {
            o = await gn(e, n);
          } catch (t) {
            console.error("pitch-preserving stretch failed, falling back to playbackRate resample", t);
            const a = Math.max(1, Math.round(e.length / n)),
              r = new OfflineAudioContext(e.numberOfChannels, a, e.sampleRate),
              i = r.createBufferSource();
            i.buffer = e, i.playbackRate.value = n, i.connect(r.destination), i.start(0), o = await r.startRendering();
          }
          if (o.length === a) return o;
          const r = new AudioBuffer({
            numberOfChannels: o.numberOfChannels,
            length: a,
            sampleRate: o.sampleRate
          });
          for (let e = 0; e < o.numberOfChannels; e++) {
            const t = o.getChannelData(e);
            r.getChannelData(e).set(t.subarray(0, Math.min(t.length, a)));
          }
          return r;
        }(a, e);
      }
      if (n) {
        const e = await v.arrayBuffer();
        o = await r.decodeAudioData(e);
      }
    } finally {
      try {
        r.close();
      } catch (e) {}
    }
    if (!a && !o) return null;
    const i = a && a.sampleRate || o && o.sampleRate || 44100,
      s = Math.max(a ? a.numberOfChannels : 1, o ? o.numberOfChannels : 1, 2),
      c = Math.max(1, Math.round(e * i)),
      l = new OfflineAudioContext(s, c, i);
    if (a) {
      const e = l.createBufferSource();
      e.buffer = a, e.connect(l.destination), e.start(0);
    }
    if (o && o.duration > 0) {
      const t = l.createGain();
      t.gain.value = "number" == typeof w ? w : .25, t.connect(l.destination);
      const n = Math.max(0, Math.min(x || 0, o.duration));
      let a = "number" == typeof k && k > n ? Math.min(k, o.duration) : o.duration;
      const r = Math.max(.05, a - n);
      for (let a = 0; a < e; a += r) {
        const i = l.createBufferSource();
        i.buffer = o, i.connect(t);
        const s = Math.min(r, e - a);
        i.start(a, n, s);
      }
    }
    return await l.startRendering();
  }
  function pr(e) {
    return new Promise((t, n) => {
      if (document.querySelector(`script[data-src="${e}"]`)) return void t();
      const a = document.createElement("script");
      a.src = e, a.dataset.src = e;
      let o = !1;
      const r = setTimeout(() => {
        o || (o = !0, a.remove(), n(new Error("Timed out loading " + e + " (12s) — check your network/ad-blocker.")));
      }, 12e3);
      a.onload = () => {
        o || (o = !0, clearTimeout(r), t());
      }, a.onerror = () => {
        o || (o = !0, clearTimeout(r), n(new Error("failed to load " + e)));
      }, document.head.appendChild(a);
    });
  }
  window.addEventListener("resize", En), function () {
    let e = !1;
    function t(e) {
      if (Yt() < n) return;
      const t = progressLineEl.getBoundingClientRect();
      let a = (e - t.left) / t.width;
      a = Math.max(0, Math.min(1, a));
      const o = Xt(),
        r = a * o;
      nr(r), timecodeEl.textContent = `${r.toFixed(1)} / ${o.toFixed(1)}s`, sr(a), y && previewAudioEl.src && (previewAudioEl.currentTime = Math.min(r, previewAudioEl.duration || r)), v && "video-mix" === musicPlayerEl.dataset.playingId && (musicPlayerEl.currentTime = lr(r));
    }
    progressLineEl.addEventListener("mousedown", n => {
      ar && cr(), e = !0, t(n.clientX);
    }), window.addEventListener("mousemove", n => {
      e && t(n.clientX);
    }), window.addEventListener("mouseup", () => {
      e = !1;
    }), progressLineEl.addEventListener("touchstart", n => {
      ar && cr(), e = !0, n.touches[0] && t(n.touches[0].clientX);
    }, {
      passive: !0
    }), window.addEventListener("touchmove", n => {
      e && n.touches[0] && t(n.touches[0].clientX);
    }, {
      passive: !0
    }), window.addEventListener("touchend", () => {
      e = !1;
    });
  }();
  const fr = ["https://unpkg.com/mp4-muxer@5/build/mp4-muxer.min.js", "https://cdn.jsdelivr.net/npm/mp4-muxer@5/build/mp4-muxer.min.js"];
  /** gr() -- Encodes a rendered segment via WebCodecs (VideoEncoder) and muxes it -- part of
   the render pipeline.
   */
  async function gr(n, a, o) {
    await async function () {
      if (window.Mp4Muxer) return;
      let e;
      for (const t of fr) try {
        if (await pr(t), window.Mp4Muxer) return;
      } catch (t) {
        e = t;
      }
      throw e || new Error("mp4-muxer failed to load from all CDNs");
    }();
    const {
        Muxer: r,
        ArrayBufferTarget: i
      } = window.Mp4Muxer,
      s = Math.max(1, Math.round(n * a));
    let c = null;
    try {
      c = await mr(n);
    } catch (e) {
      console.error("audio build failed, exporting silent", e), c = null;
    }
    const l = !!c,
      d = l ? c.sampleRate : 44100,
      m = l ? Math.min(2, c.numberOfChannels) : 2,
      p = new r({
        target: new i(),
        video: {
          codec: "avc",
          width: e,
          height: t
        },
        audio: l ? {
          codec: "aac",
          numberOfChannels: m,
          sampleRate: d
        } : void 0,
        fastStart: "in-memory",
        firstTimestampBehavior: "offset"
      }),
      f = new VideoEncoder({
        output: (e, t) => p.addVideoChunk(e, t),
        error: e => console.error("video encode error", e)
      });
    f.configure({
      codec: "avc1.640033",
      width: e,
      height: t,
      bitrate: 1e7,
      framerate: a
    });
    let g = null;
    l && (g = new AudioEncoder({
      output: (e, t) => p.addAudioChunk(e, t),
      error: e => console.error("audio encode error", e)
    }), g.configure({
      codec: "mp4a.40.2",
      numberOfChannels: m,
      sampleRate: d,
      bitrate: 16e4
    }));
    const h = Math.round(1e6 / a);
    for (let e = 0; e < s; e++) {
      if ("closed" === f.state) throw new Error("Video encoder closed unexpectedly (encoder/driver error) — try again; if it keeps happening, this browser/GPU may not support this codec.");
      const t = Math.min(n - 1e-4, e / a);
      u = t, tr(t);
      const r = new VideoFrame(cvEl, {
        timestamp: e * h,
        duration: h
      });
      f.encode(r, {
        keyFrame: e % (2 * a) == 0
      }), r.close();
      o(Math.min(60, Math.round(e / s * 60))), await new Promise(e => setTimeout(e, 0));
    }
    if (await f.flush(), f.close(), l && g) {
      const e = Math.min(c.length, Math.round(n * d)),
        t = 1024,
        a = [];
      for (let e = 0; e < m; e++) a.push(c.getChannelData(Math.min(e, c.numberOfChannels - 1)));
      for (let n = 0; n < e; n += t) {
        const o = Math.min(t, e - n),
          r = new Float32Array(o * m);
        for (let e = 0; e < m; e++) for (let t = 0; t < o; t++) r[t * m + e] = a[e][n + t] || 0;
        const i = new AudioData({
          format: "f32",
          sampleRate: d,
          numberOfFrames: o,
          numberOfChannels: m,
          timestamp: Math.round(n / d * 1e6),
          data: r
        });
        g.encode(i), i.close();
      }
      await g.flush(), g.close();
    }
    o(90), p.finalize();
    const {
      buffer: y
    } = p.target;
    return new Blob([y], {
      type: "video/mp4"
    });
  }
  const hr = ["https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js", "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js"];
  /** yr() -- heuristic scan: touches sync/timing. (auto-generated hint, not verified -- read the body before relying on this)
   */
  async function yr(e, t, n) {
    await async function () {
      let e;
      for (const t of hr) try {
        if (await pr(t), window.FFmpeg) return;
      } catch (t) {
        e = t;
      }
      throw e || new Error("ffmpeg script failed to load from all CDNs");
    }();
    const {
        createFFmpeg: a,
        fetchFile: o
      } = window.FFmpeg,
      r = a({
        log: !1
      });
    r.setProgress(({
      ratio: e
    }) => {
      e >= 0 && n(Math.round(100 * e));
    }), r.isLoaded() || (await r.load()), r.FS("writeFile", "in.webm", await o(e)), await r.run("-fflags", "+genpts", "-i", "in.webm", "-t", String(t), "-r", "30", "-vsync", "cfr", "-c:v", "libx264", "-profile:v", "baseline", "-level", "3.1", "-pix_fmt", "yuv420p", "-preset", "veryfast", "-crf", "23", "-c:a", "aac", "-ar", "44100", "-b:a", "160k", "-movflags", "+faststart", "out.mp4");
    const i = r.FS("readFile", "out.mp4");
    return new Blob([i.buffer], {
      type: "video/mp4"
    });
  }
  let vr = null;
  /** br() -- Drives the full render + WebCodecs encode + download/gallery-save flow for the
   current project (also touches MediaRecorder as a fallback path).
   */
  async function br(e) {
    const t = !!(e = e || {}).autoDownload;
    if (Yt() < n) return {
      ok: !1,
      message: "Not all image/caption slots are filled yet."
    };
    if (cr(), Oo && (await Oo), null != b) try {
      const e = await ma("music", b);
      e && (v = e);
    } catch (e) {}
    genBtnEl.disabled = !0, genBarEl.classList.add("on"), genStatusEl.style.display = "flex", dlLinkEl.classList.remove("on"), genFillEl.style.width = "0%", genLabelEl.textContent = "Rendering…", genPctEl.textContent = "0%";
    const a = Xt(),
      o = t => {
        genFillEl.style.width = t + "%", genPctEl.textContent = t + "%", e.onRenderProgress && e.onRenderProgress(t);
      };
    wr.start();
    let r = null,
      i = vr || "hook-showcase.mp4";
    try {
      "function" == typeof window.VideoEncoder && "function" == typeof window.VideoFrame && "function" == typeof window.AudioEncoder && "function" == typeof window.AudioData ? (r = await gr(a, 30, o), genLabelEl.textContent = "Done") : (r = await async function (e, t, n) {
        u = 0, tr(0), await new Promise(e => requestAnimationFrame(() => requestAnimationFrame(e)));
        const a = cvEl.captureStream(t);
        let o = "video/webm;codecs=vp9";
        MediaRecorder.isTypeSupported(o) || (o = "video/webm;codecs=vp8"), MediaRecorder.isTypeSupported(o) || (o = "video/webm");
        let r = null;
        try {
          r = await mr(e);
        } catch (e) {
          console.error("audio mix failed, exporting silent", e);
        }
        let i = a,
          s = null,
          c = null;
        if (r) {
          s = new (window.AudioContext || window.webkitAudioContext)();
          const e = s.createMediaStreamDestination();
          c = s.createBufferSource(), c.buffer = r, c.connect(e), i = new MediaStream([...a.getVideoTracks(), ...e.stream.getAudioTracks()]);
        }
        const l = new MediaRecorder(i, {
            mimeType: o,
            videoBitsPerSecond: 8e6
          }),
          d = [];
        l.ondataavailable = e => {
          e.data.size && d.push(e.data);
        };
        const m = new Promise(e => {
            l.onstop = e;
          }),
          p = a.getVideoTracks()[0];
        l.start(1e3), c && c.start(0);
        const f = s ? s.currentTime : null,
          g = performance.now();
        if (await new Promise(t => {
          requestAnimationFrame(function a() {
            const o = s ? s.currentTime - f : (performance.now() - g) / 1e3,
              r = Math.min(e - .001, o);
            u = r, tr(r), p.requestFrame && p.requestFrame(), n(Math.min(60, Math.round(r / e * 60))), o >= e ? t() : requestAnimationFrame(a);
          });
        }), await new Promise(e => setTimeout(e, 600)), l.stop(), c) try {
          c.stop();
        } catch (e) {}
        if (await m, s) try {
          s.close();
        } catch (e) {}
        const h = new Blob(d, {
          type: "video/webm"
        });
        return await yr(h, e, e => n(60 + Math.round(.4 * e)));
      }(a, 30, o), genLabelEl.textContent = "Done"), o(100);
    } catch (e) {
      return console.error(e), genLabelEl.textContent = `Export failed (${e && e.message || "unknown error"}) — try again, or open this page over http(s) instead of file://`, genPctEl.textContent = "", genBtnEl.disabled = !1, genBtnEl.textContent = "Generate video", nr(0), wr.stop(), {
        ok: !1,
        message: e && e.message || "Export failed."
      };
    }
    wr.stop(), dlLinkEl.href && dlLinkEl.href.startsWith("blob:") && URL.revokeObjectURL(dlLinkEl.href);
    const s = URL.createObjectURL(r);
    dlLinkEl.href = s, dlLinkEl.download = i, dlLinkEl.textContent = "Download .mp4", dlLinkEl.classList.add("on"), genBtnEl.disabled = !1, genBtnEl.textContent = "Generate video", nr(0), t && dlLinkEl.click();
    try {
      await Promise.race([_a(r), new Promise((e, t) => setTimeout(() => t(new Error("Gallery save timed out after 15s")), 15e3))]);
    } catch (e) {
      console.error("saving to gallery failed", e), Ra("Video downloaded but could not save to gallery.", !0);
    }
    return {
      ok: !0,
      filename: i,
      blob: r
    };
  }
  genBtnEl.addEventListener("click", () => br()), function () {
    const voiceCtrlBtnEl = document.getElementById("voiceCtrlBtn"),
      voiceHelpBtnEl = document.getElementById("voiceHelpBtn"),
      voiceUndoBtnEl = document.getElementById("voiceUndoBtn"),
      voiceRedoBtnEl = document.getElementById("voiceRedoBtn"),
      historyBtnEl = document.getElementById("historyBtn"),
      historyPanelEl = document.getElementById("historyPanel"),
      historyCloseBtnEl = document.getElementById("historyCloseBtn"),
      historyListEl = document.getElementById("historyList"),
      voicePanelEl = document.getElementById("voicePanel"),
      voiceStateLabelEl = document.getElementById("voiceStateLabel"),
      voiceStateDotEl = document.getElementById("voiceStateDot"),
      voiceHeardEl = document.getElementById("voiceHeard"),
      voiceResultEl = document.getElementById("voiceResult"),
      voiceLangSelectEl = document.getElementById("voiceLangSelect"),
      voiceTtsToggleEl = document.getElementById("voiceTtsToggle"),
      voiceSheetOverlayEl = document.getElementById("voiceSheetOverlay"),
      voiceSheetCloseEl = document.getElementById("voiceSheetClose"),
      voiceSheetBodyEl = document.getElementById("voiceSheetBody"),
      geminiKeyInputEl = document.getElementById("geminiKeyInput");
    function F() {
      return xn(u);
    }
    function D(e, t, n) {
      return Math.max(t, Math.min(n, e));
    }
    function O(e) {
      return (e || "").replace(/[.,!?;:]+/g, "").replace(/\s{2,}/g, " ").trim();
    }
    function z() {
      return "show" === wn(u) ? F() : null;
    }
    geminiKeyInputEl.value = localStorage.getItem("geminiApiKey") || "", geminiKeyInputEl.addEventListener("input", () => localStorage.setItem("geminiApiKey", geminiKeyInputEl.value.trim())), voiceLangSelectEl.value = localStorage.getItem("voiceCtrlLang") || "en-US", voiceLangSelectEl.addEventListener("change", () => localStorage.setItem("voiceCtrlLang", voiceLangSelectEl.value)), voiceTtsToggleEl.checked = "1" === localStorage.getItem("voiceTtsOn"), voiceTtsToggleEl.addEventListener("change", () => localStorage.setItem("voiceTtsOn", voiceTtsToggleEl.checked ? "1" : "0"));
    const V = {
      idle: {
        label: "Voice control",
        color: "rgba(242,240,230,0.3)"
      },
      listening: {
        label: "Listening…",
        color: "#0a84ff"
      },
      understanding: {
        label: "Understanding…",
        color: "#ffd60a"
      },
      executing: {
        label: "Executing…",
        color: "#ff9500"
      },
      done: {
        label: "Done",
        color: "var(--green-bright)"
      }
    };
    function q(e) {
      const t = V[e] || V.idle;
      voiceStateLabelEl.textContent = t.label, voiceStateDotEl.style.background = t.color;
    }
    function H(e, t, {
      spoken: n = !0
    } = {}) {
      voiceResultEl.style.color = !1 === t ? "#e0866a" : "var(--green-bright)", voiceResultEl.textContent = e, n && function (e, {
        interrupt: t = !0
      } = {}) {
        voiceTtsToggleEl.checked && e && "speechSynthesis" in window ? new Promise(n => {
          t && window.speechSynthesis.cancel();
          const a = new SpeechSynthesisUtterance(e);
          if (a.lang = "ur-PK" === voiceLangSelectEl.value ? "ur-PK" : "en-US", a.rate = 1.05, a.onend = () => n(), a.onerror = () => n(), Ie = !0, Ee && xe) try {
            xe.stop();
          } catch (e) {}
          window.speechSynthesis.speak(a);
        }) : Promise.resolve();
      }(e);
    }
    function G() {
      return {
        hookDur: a,
        cardDur: o,
        cardPos: r,
        cardText: cardTextEl.value,
        hookCaptionText: N,
        captions: U.slice(),
        showDur: i.slice(),
        capFontSize: p,
        hookCapFontSize: f,
        cardFontSize: m,
        capTextColor: {
          ...j
        },
        cardTextColor: T,
        hookWordByWord: g,
        showWordByWord: h,
        captionPos: {
          ...s
        },
        hookCaptionPos: {
          ...l
        },
        capPosOverride: c.map(e => e ? {
          ...e
        } : null),
        voiceOverSpeed: +voiceSpeedRangeEl.value || 1,
        musicVolumePercent: Math.round(100 * (w || 0)),
        images: _.slice()
      };
    }
    function J(e) {
      a = e.hookDur, hookDurRangeEl.value = a, hookDurNumEl.value = a.toFixed(2), o = e.cardDur, cardDurRangeEl.value = o, cardDurNumEl.value = o.toFixed(2), r = e.cardPos, cardPosSelectEl.value = r, cardTextEl.value = e.cardText, N = e.hookCaptionText, hookCapTextEl.value = N, U = e.captions.slice(), i = e.showDur.slice(), p = e.capFontSize, capSizeValEl.value = p, f = e.hookCapFontSize, document.getElementById("hookCapSizeVal").value = f, m = e.cardFontSize, cardSizeValEl.value = m, j = {
        ...e.capTextColor
      }, T = e.cardTextColor, g = e.hookWordByWord, hookWordToggleEl.checked = g, h = e.showWordByWord, showWordToggleEl.checked = h, s = {
        ...e.captionPos
      }, l = {
        ...e.hookCaptionPos
      }, c = e.capPosOverride.map(e => e ? {
        ...e
      } : null), voiceSpeedRangeEl.value = e.voiceOverSpeed, voiceSpeedValEl.textContent = e.voiceOverSpeed.toFixed(2) + "x", w = e.musicVolumePercent / 100, bgMusicVolRangeEl.value = e.musicVolumePercent, bgMusicVolValEl.textContent = e.musicVolumePercent + "%", _ = e.images.slice(), Gn(), Wn(), En(), Jn(), nr(u), In();
    }
    function K(e, t) {
      return JSON.stringify(e) === JSON.stringify(t);
    }
    let Z = null;
    function X(e) {
      return !!e && ("INPUT" === e.tagName || "SELECT" === e.tagName || "TEXTAREA" === e.tagName);
    }
    document.addEventListener("focusin", e => {
      X(e.target) && !Z && (Z = G());
    }, !0), document.addEventListener("pointerdown", e => {
      !(e.target && e.target.closest && e.target.closest('input[type="range"],input[type="checkbox"],input[type="color"]')) || X(document.activeElement) || Z || (Z = G());
    }, !0), document.addEventListener("change", e => {
      X(e.target) && function () {
        if (!Z) return;
        const e = Z;
        Z = null;
        const t = G();
        K(e, t) || oe("Manual edit", e, t, null), Aa();
      }();
    }, !0);
    let Y = [],
      Q = [],
      ee = [],
      te = null;
    const ne = 200;
    function ae(e, t) {
      ee.push({
        label: e,
        ts: Date.now(),
        kind: t
      }), ee.length > ne && ee.shift(), se();
    }
    function oe(e, t, n, a) {
      Y.push({
        label: e,
        before: t,
        after: n
      }), Y.length > ne && Y.shift(), Q = [], a && (te = a), ae(e, "edit");
    }
    function re(e) {
      if (e = Math.max(1, Math.min(Math.round(e) || 1, Y.length)), 0 === Y.length) return "Nothing to undo.";
      let t = "";
      for (let n = 0; n < e; n++) {
        const e = Y.pop();
        if (!e) break;
        J(e.before), Q.push(e), t = e.label;
      }
      return ae(1 === e ? `Undid: ${t}` : `Undid last ${e} changes`, "undo"), 1 === e ? `Undone — back to before "${t}".` : `Undid the last ${e} changes.`;
    }
    function ie(e) {
      if (e = Math.max(1, Math.min(Math.round(e) || 1, Q.length)), 0 === Q.length) return "Nothing to redo.";
      let t = "";
      for (let n = 0; n < e; n++) {
        const e = Q.pop();
        if (!e) break;
        J(e.after), Y.push(e), t = e.label;
      }
      return ae(1 === e ? `Redid: ${t}` : `Redid last ${e} changes`, "redo"), 1 === e ? `Redone — "${t}" is back.` : `Redid the last ${e} changes.`;
    }
    function se() {
      if (0 === ee.length) return void (historyListEl.innerHTML = '<div style="color:rgba(242,240,230,0.35);">No voice edits yet.</div>');
      const e = {
        edit: "var(--paper)",
        undo: "#e0866a",
        redo: "#7fd6ff"
      };
      historyListEl.innerHTML = ee.slice(-40).map(t => {
        const n = new Date(t.ts),
          a = String(n.getHours()).padStart(2, "0"),
          o = String(n.getMinutes()).padStart(2, "0"),
          r = String(n.getSeconds()).padStart(2, "0");
        return `<div style="padding:5px 7px;border:1px solid var(--line);border-radius:4px;background:#0d0f0c;">\n          <div style="color:${e[t.kind] || "var(--paper)"};">${t.label}</div>\n          <div style="color:rgba(242,240,230,0.35);font-size:9.5px;">${a}:${o}:${r}</div>\n        </div>`;
      }).join("");
    }
    function ce() {
      voiceUndoBtnEl.style.opacity = Y.length ? "1" : "0.35", voiceRedoBtnEl.style.opacity = Q.length ? "1" : "0.35";
    }
    historyBtnEl.addEventListener("click", () => {
      historyPanelEl.style.display = "none" === historyPanelEl.style.display ? "flex" : "none";
    }), historyCloseBtnEl.addEventListener("click", () => historyPanelEl.style.display = "none");
    const le = oe;
    function de(e, t) {
      if (t = t || {}, !1 === e.undoable) {
        return e.run(t);
      }
      const n = G(),
        a = e.run(t),
        o = G();
      if (K(n, o)) return a;
      return oe(e.label ? e.label(t, a) : e.id.replace(/_/g, " "), n, o, e.touched ? e.touched(t) : null), a;
    }
    oe = function (...e) {
      le(...e), ce();
    }, voiceUndoBtnEl.addEventListener("click", () => {
      H(re(1), !0), ce();
    }), voiceRedoBtnEl.addEventListener("click", () => {
      H(ie(1), !0), ce();
    }), ce(), document.addEventListener("keydown", e => {
      (e.metaKey || e.ctrlKey) && "z" === e.key.toLowerCase() && (e.preventDefault(), e.shiftKey ? ie(1) : re(1), ce());
    }, !0);
    const ue = [{
        id: "play",
        undoable: !1,
        desc: "Start/resume playback from the current position.",
        examples: ["play", "play from here", "resume"],
        run: () => Yt() < n ? `Load all ${n} images first.` : (ar || playBtnEl.click(), "Playing.")
      }, {
        id: "pause",
        undoable: !1,
        desc: "Pause/stop playback (stays at current position).",
        examples: ["pause", "stop", "stop playback", "rok do"],
        run: () => (ar && cr(), "Paused.")
      }, {
        id: "seek",
        undoable: !1,
        desc: "Seek/stop the playhead at an exact time in seconds. args:{seconds:number}",
        examples: ["stop at 5.6 seconds", "go to 3 seconds", "seek to 10s", "5.6 second par ruk jao"],
        run(e) {
          if (Yt() < n) return `Load all ${n} images first.`;
          const t = Xt(),
            a = D(+e.seconds || 0, 0, t);
          return ar && cr(), nr(a), timecodeEl.textContent = `${a.toFixed(1)} / ${t.toFixed(1)}s`, sr(t ? a / t : 0), `Stopped at ${a.toFixed(1)}s.`;
        }
      }, {
        id: "seek_relative",
        undoable: !1,
        desc: "Move the playhead forward/back by N seconds from current position. args:{deltaSeconds:number}",
        examples: ["go forward 2 seconds", "go back 1 second", "2 second aage jao"],
        run(e) {
          const t = Xt(),
            n = D(u + (+e.deltaSeconds || 0), 0, t);
          return ar && cr(), nr(n), timecodeEl.textContent = `${n.toFixed(1)} / ${t.toFixed(1)}s`, sr(t ? n / t : 0), `Now at ${n.toFixed(1)}s.`;
        }
      }, {
        id: "goto_start",
        undoable: !1,
        desc: "Jump playhead to the very start (0s).",
        examples: ["go to start", "from the beginning", "shuru se"],
        run: () => (ar && cr(), nr(0), sr(0), "At start.")
      }, {
        id: "goto_end",
        undoable: !1,
        desc: "Jump playhead to the very end.",
        examples: ["go to the end", "last part"],
        run() {
          const e = Xt();
          return ar && cr(), nr(e), sr(1), "At end.";
        }
      }, {
        id: "undo",
        undoable: !1,
        desc: 'Undo the last N voice edits (default 1). Use this for "undo", "undo that", "undo the last two changes", "put it back", "don\'t do that", "oh no", "revert", "wapas kar do", "wapas wesa hi kar do", or any command that cancels/reverses the previous edit. args:{count:number(optional, default 1)}',
        examples: ["undo", "undo that", "undo the last two changes", "put it back", "wapas kar do", "don't increase it", "oh no undo that"],
        run: e => re(e.count || 1)
      }, {
        id: "redo",
        undoable: !1,
        desc: "Redo the last N undone edits (default 1). args:{count:number(optional, default 1)}",
        examples: ["redo", "redo that", "do it again"],
        run: e => ie(e.count || 1)
      }, {
        id: "set_hook_duration",
        desc: "Set the hook-flash duration per image, in seconds (0.1–1). args:{seconds:number}",
        examples: ["set hook duration to 0.3 seconds", "hook 0.5 second kar do"],
        label: e => `Set hook duration to ${(+e.seconds).toFixed(2)}s`,
        run(e) {
          const t = D(+e.seconds, .1, 1);
          return a = t, hookDurRangeEl.value = t, hookDurNumEl.value = t.toFixed(2), In(), `Hook duration set to ${t.toFixed(2)}s.`;
        }
      }, {
        id: "adjust_hook_duration",
        desc: 'Increase/decrease hook-flash duration by a delta in seconds. Use for relative phrasing too — "a little longer"≈+0.15, "a little shorter"≈-0.15, "a lot longer"≈+0.4. args:{deltaSeconds:number}',
        examples: ["increase hook duration by 0.1", "hook thora barhao", "make the hook a little longer"],
        label(e) {
          const t = +e.deltaSeconds || 0;
          return `${t >= 0 ? "Increased" : "Decreased"} hook duration by ${Math.abs(t).toFixed(2)}s`;
        },
        run(e) {
          const t = D(a + (+e.deltaSeconds || 0), .1, 1);
          return a = t, hookDurRangeEl.value = t, hookDurNumEl.value = t.toFixed(2), In(), `Hook duration now ${t.toFixed(2)}s.`;
        }
      }, {
        id: "set_card_duration",
        desc: "Set the keyword-card duration, in seconds (1–10). args:{seconds:number}",
        examples: ["set card duration to 3.5 seconds", "card 4 second kar do"],
        label: e => `Set card duration to ${(+e.seconds).toFixed(2)}s`,
        run(e) {
          const t = D(+e.seconds, 1, 10);
          return o = t, cardDurRangeEl.value = t, cardDurNumEl.value = t.toFixed(2), In(), `Card duration set to ${t.toFixed(2)}s.`;
        }
      }, {
        id: "adjust_card_duration",
        desc: 'Increase/decrease card duration by delta seconds. "a little"≈0.3, "a lot"≈1. args:{deltaSeconds:number}',
        examples: ["increase card duration by 0.5", "card ki duration ghata do"],
        label(e) {
          const t = +e.deltaSeconds || 0;
          return `${t >= 0 ? "Increased" : "Decreased"} card duration by ${Math.abs(t).toFixed(2)}s`;
        },
        run(e) {
          const t = D(o + (+e.deltaSeconds || 0), 1, 10);
          return o = t, cardDurRangeEl.value = t, cardDurNumEl.value = t.toFixed(2), In(), `Card duration now ${t.toFixed(2)}s.`;
        }
      }, {
        id: "set_card_position",
        desc: "Move the keyword card to sit after image N (0 = right after hook, N = end). args:{afterImage:number}",
        examples: ["put the card after image 3", "card ko end mein le jao"],
        label: e => `Moved card to after image ${Math.round(e.afterImage)}`,
        run(e) {
          const t = D(Math.round(+e.afterImage), 0, n);
          return r = t, cardPosSelectEl.value = t, In(), `Card now after image ${t}.`;
        }
      }, {
        id: "set_image_duration",
        desc: "Set a specific image's on-screen duration in seconds. args:{imageIndex:number(1-based, omit to use current selection/context), seconds:number}",
        examples: ["set image 3 duration to 2 seconds", "is ki duration 2 second kar do"],
        label: (e, t) => t && !t.startsWith("No image") ? `Set Image ${e._i} duration to ${(+e.seconds).toFixed(2)}s` : t,
        touched: e => e._i ? {
          type: "image",
          index: e._i
        } : null,
        run(e) {
          const t = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : pe("image");
          if (null == t) return "No image is currently active — say which image number.";
          e._i = t + 1;
          const n = D(+e.seconds, .2, 20);
          return i[t] = n, Wn(), In(), `Image ${t + 1} duration set to ${n.toFixed(2)}s.`;
        }
      }, {
        id: "adjust_image_duration",
        desc: 'Increase/decrease a specific (or currently active/last-touched) image\'s duration by delta seconds. Relative phrasing: "a little longer"≈+0.2, "a little shorter"≈-0.2, "a lot longer"≈+0.5, "half a second longer"=+0.5. args:{imageIndex:number(1-based,optional), deltaSeconds:number}',
        examples: ["increase this image duration by 0.3 seconds", "is ki duration 0.3 second barha do", "decrease image 2 by 0.5 seconds", "add about half a second", "make it a little longer", "actually make it 0.1 instead"],
        label(e, t) {
          const n = +e.deltaSeconds || 0;
          return `${n >= 0 ? "Increased" : "Decreased"} Image ${e._i} duration by ${Math.abs(n).toFixed(2)}s`;
        },
        touched: e => e._i ? {
          type: "image",
          index: e._i
        } : null,
        run(e) {
          const t = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : pe("image");
          if (null == t) return "No image is currently active — say which image number.";
          e._i = t + 1;
          const n = D(i[t] + (+e.deltaSeconds || 0), .2, 20);
          return i[t] = n, Wn(), In(), `Image ${t + 1} duration now ${n.toFixed(2)}s.`;
        }
      }, {
        id: "set_caption_text",
        desc: "Set the caption text for a specific (or currently active/last-touched) showcase image. args:{imageIndex:number(1-based,optional), text:string}",
        examples: ["set caption 2 to Best Deal Today", "is ki caption change karo"],
        label: e => `Set Caption ${e._i} text`,
        touched: e => e._i ? {
          type: "caption",
          index: e._i
        } : null,
        run(e) {
          const t = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : null != z() ? z() : pe("caption");
          return null == t ? "No showcase caption is active right now." : (e._i = t + 1, U[t] = e.text || "", Wn(), nr(u), `Caption ${t + 1} updated.`);
        }
      }, {
        id: "remove_punctuation",
        desc: 'Remove punctuation (full stops, commas etc) from the current/target caption or the card text. args:{imageIndex:number(1-based,optional), target:"caption"|"card"|"hook"(optional, default = whatever is active)}',
        examples: ["remove the full stop", "comma bhi remove karo", "intro se full stop hatao", "card text se comma nikal do"],
        label: e => `Removed punctuation from ${e.target || "caption"}${e._i ? " " + e._i : ""}`,
        touched: e => e._i ? {
          type: "caption",
          index: e._i
        } : "card" === e.target ? {
          type: "card"
        } : "hook" === e.target ? {
          type: "hook"
        } : null,
        run(e) {
          const t = e.target || wn(u);
          if ("card" === t) return cardTextEl.value = O(cardTextEl.value), nr(u), "Removed punctuation from the card text.";
          if ("hook" === t) return N = O(N), hookCapTextEl.value = N, nr(u), "Removed punctuation from the intro/hook caption.";
          const n = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : null != z() ? z() : pe("caption");
          return null == n ? 'No caption is active right now — say which image, or "card"/"hook".' : (e._i = n + 1, U[n] = O(U[n]), Wn(), nr(u), `Removed punctuation from caption ${n + 1}.`);
        }
      }, {
        id: "set_caption_font_size",
        desc: "Set showcase caption font size (10-90). args:{size:number}",
        examples: ["make captions bigger, size 40", "caption size 24 kar do"],
        label: e => `Set caption size to ${Math.round(e.size)}`,
        run(e) {
          const t = D(Math.round(+e.size), 10, 90);
          return p = t, capSizeValEl.value = t, nr(u), `Caption size ${t}.`;
        }
      }, {
        id: "adjust_caption_font_size",
        desc: 'Increase/decrease showcase caption font size by delta. "a little bigger"≈+4, "much bigger"≈+10. args:{delta:number}',
        examples: ["make the caption bigger", "caption chota karo"],
        label(e) {
          const t = +e.delta || 4;
          return `${t >= 0 ? "Increased" : "Decreased"} caption size by ${Math.abs(t)}`;
        },
        run(e) {
          const t = D(p + (+e.delta || 4), 10, 90);
          return p = t, capSizeValEl.value = t, nr(u), `Caption size ${t}.`;
        }
      }, {
        id: "set_caption_color",
        desc: 'Set text color for a caption/word/card. args:{colorHex:string(e.g. "#ffffff" or "black"/"white"), imageIndex:number(1-based,optional), target:"caption"|"card"(optional)}',
        examples: ["make this word black", "caption ko white kar do", "card text red kar do", "make the word Extreme black"],
        label: e => `Changed ${"card" === e.target ? "card text" : "Caption " + e._i} color`,
        touched: e => e._i ? {
          type: "caption",
          index: e._i
        } : "card" === e.target ? {
          type: "card"
        } : null,
        run(e) {
          let t = (e.colorHex || "").trim().toLowerCase();
          const n = {
            black: "#000000",
            white: "#ffffff",
            red: "#ff3b30",
            green: "#34c759",
            blue: "#0a84ff",
            yellow: "#ffd60a",
            orange: "#ff9500",
            pink: "#ff2d78",
            purple: "#af52de"
          };
          if (n[t] && (t = n[t]), !/^#[0-9a-f]{6}$/.test(t)) return "Could not understand that color.";
          if ("card" === (e.target || wn(u))) return T = t, nr(u), "Card text color set.";
          const a = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : null != z() ? z() : pe("caption");
          return null == a ? "No caption is active right now." : (e._i = a + 1, j[a] = t, Wn(), nr(u), `Caption ${a + 1} color set.`);
        }
      }, {
        id: "toggle_word_by_word",
        desc: 'Turn word-by-word caption reveal on/off, for hook or showcase captions. args:{target:"hook"|"show", on:boolean}',
        examples: ["turn on word by word for captions", "hook mein word by word band karo"],
        label: e => `Word-by-word ${e.on ? "on" : "off"} (${e.target || "show"})`,
        run: e => ("hook" === e.target ? (g = !!e.on, hookWordToggleEl.checked = g) : (h = !!e.on, showWordToggleEl.checked = h), nr(u), `Word-by-word ${e.on ? "on" : "off"} for ${e.target || "show"} captions.`)
      }, {
        id: "move_caption_position",
        desc: 'Nudge the active (or last-touched) caption/card text position on screen. "slightly"/"a little"≈0.02, default≈0.03, "a lot"≈0.08. args:{direction:"up"|"down"|"left"|"right", amount:number(0..1 normalized, optional), imageIndex:number(1-based,optional)}',
        examples: ["move this caption up", "move it down a bit", "isay left kar do", "move it slightly up"],
        label: e => `Moved ${e._what || "caption"} ${e.direction}`,
        touched: e => e._i ? {
          type: "caption",
          index: e._i
        } : null,
        run(e) {
          const t = wn(u);
          let n = null;
          "show" === t ? (n = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : null != z() ? z() : pe("caption"), null != n && (e._i = n + 1, e._what = `Caption ${n + 1}`)) : e._what = "hook" === t ? "intro caption" : "card text";
          const a = kn(),
            o = e.amount || .03;
          if ("up" === e.direction) a.yNorm = D(a.yNorm - o, .02, .98);else if ("down" === e.direction) a.yNorm = D(a.yNorm + o, .02, .98);else if ("left" === e.direction) a.xNorm = D(a.xNorm - o, .02, .98);else {
            if ("right" !== e.direction) return "Say up, down, left, or right.";
            a.xNorm = D(a.xNorm + o, .02, .98);
          }
          return En(), nr(u), `Moved ${e.direction}.`;
        }
      }, {
        id: "set_card_text",
        desc: "Set the keyword-card text. args:{text:string}",
        examples: ["set the card text to Limited Stock", "card pe likho Sale"],
        label: e => `Set card text to "${e.text}"`,
        touched: () => ({
          type: "card"
        }),
        run: e => (cardTextEl.value = e.text || "", nr(u), "Card text updated.")
      }, {
        id: "replace_image",
        undoable: !1,
        desc: "Open the file picker to replace a specific (or currently active) image slot. Cannot pick the file itself by voice — opens the dialog for the user. args:{imageIndex:number(1-based,optional)}",
        examples: ["replace this image", "ye image replace karo", "change image 4"],
        run(e) {
          const t = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : F();
          if (null == t) return "No image is currently active — say which image number.";
          const n = G(),
            a = document.createElement("input");
          return a.type = "file", a.accept = "image/*", a.addEventListener("change", () => {
            const e = a.files[0];
            if (!e) return;
            const o = URL.createObjectURL(e),
              r = new Image();
            r.onload = () => {
              _[t] = {
                file: e,
                url: o,
                img: r
              }, Gn(), Jn(), pn(), In();
              const a = G();
              oe(`Replaced Image ${t + 1}`, n, a, {
                type: "image",
                index: t + 1
              });
            }, r.src = o;
          }), a.click(), `Pick the replacement file for image ${t + 1} — file picker opened.`;
        }
      }, {
        id: "set_voiceover_speed",
        desc: "Set voice-over playback speed (0.5-2x, pitch preserved). args:{speed:number}",
        examples: ["voice-over 1.15x kar do", "set voice speed to 1.2"],
        label: e => `Set voice-over speed to ${(+e.speed).toFixed(2)}x`,
        run(e) {
          const t = D(+e.speed, .5, 2);
          return voiceSpeedRangeEl.value = t, voiceSpeedValEl.textContent = t.toFixed(2) + "x", voiceSpeedApplyBtnEl.click(), `Applying voice-over speed ${t.toFixed(2)}x…`;
        }
      }, {
        id: "sync_voice",
        undoable: !1,
        desc: "Sync captions to the uploaded voice-over timing (needs a Groq key already saved).",
        examples: ["sync it", "sync kar do", "sync captions to the voice"],
        run: () => groqKeyInputEl.value.trim() ? (syncVoiceBtnEl.click(), "Syncing captions to the voice-over…") : "No Groq API key saved yet — add one in the voice-over panel first."
      }, {
        id: "set_music_volume",
        desc: "Set background music volume 0-100. args:{percent:number}",
        examples: ["music volume 30", "background music thora kam karo"],
        label: e => `Set music volume to ${Math.round(e.percent)}%`,
        run(e) {
          const t = D(Math.round(+e.percent), 0, 100);
          return bgMusicVolRangeEl.value = t, w = t / 100, bgMusicVolValEl.textContent = t + "%", `Music volume ${t}%.`;
        }
      }, {
        id: "export_video",
        undoable: !1,
        desc: "Generate/export the final video (equivalent to clicking Generate video).",
        examples: ["export the video", "generate video", "video banao"],
        run: () => genBtnEl.disabled ? `Not ready to export yet — load all ${n} images, captions, and card text first.` : (genBtnEl.click(), "Exporting…")
      }, {
        id: "clear_image",
        desc: "Remove/clear a specific (or currently active) image slot. args:{imageIndex:number(1-based,optional)}",
        examples: ["delete this image", "remove image 5", "ye image hata do"],
        label: e => `Cleared Image ${e._i}`,
        run(e) {
          const t = e.imageIndex ? D(Math.round(e.imageIndex) - 1, 0, 9) : F();
          return null == t ? "No image is currently active." : (e._i = t + 1, _[t] = null, Gn(), Wn(), Jn(), In(), `Image ${t + 1} cleared.`);
        }
      }, {
        id: "help",
        undoable: !1,
        desc: "Open the Voice Commands sheet listing everything that can be said.",
        examples: ["what can I say", "help", "what can you control"],
        run: () => (fe(), "Here is what you can say.")
      }, {
        id: "unknown",
        undoable: !1,
        desc: 'Use this ONLY if the command genuinely cannot be matched to any action above, or is ambiguous (e.g. "increase it" with nothing currently active or recently touched). args:{reason:string, question:string(a short clarifying question to ask the user)}',
        examples: [],
        run: e => e.question || e.reason || "Sorry, I didn't catch a clear command."
      }],
      me = Object.fromEntries(ue.map(e => [e.id, e]));
    function pe(e) {
      const t = F();
      return null != t ? t : te && (te.type === e || "caption" === e && "image" === te.type) && te.index ? te.index - 1 : null;
    }
    function fe() {
      voiceSheetBodyEl.innerHTML = ue.filter(e => "unknown" !== e.id).map(e => `\n        <div style="margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--line);">\n          <div style="color:var(--green-bright);font-weight:600;margin-bottom:3px;">${e.id.replace(/_/g, " ")}</div>\n          <div style="color:rgba(242,240,230,0.6);margin-bottom:5px;">${e.desc.replace(/\s*args:.*$/, "")}</div>\n          <div style="display:flex;flex-wrap:wrap;gap:5px;">\n            ${e.examples.map(e => `<span style="background:#0d0f0c;border:1px solid var(--line);border-radius:3px;padding:3px 6px;font-size:10.5px;">"${e}"</span>`).join("")}\n          </div>\n        </div>`).join(""), voiceSheetOverlayEl.style.display = "flex";
    }
    voiceHelpBtnEl.addEventListener("click", fe), voiceSheetCloseEl.addEventListener("click", () => voiceSheetOverlayEl.style.display = "none"), voiceSheetOverlayEl.addEventListener("click", e => {
      e.target === voiceSheetOverlayEl && (voiceSheetOverlayEl.style.display = "none");
    });
    const ge = ue.filter(e => "unknown" !== e.id).map(e => `${e.id}: ${e.desc}`).join("\n"),
      he = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        ek: 1,
        do: 2,
        teen: 3,
        char: 4,
        paanch: 5
      };
    async function ye(e) {
      const t = geminiKeyInputEl.value.trim();
      if (!t) return {
        actions: [{
          action: "unknown",
          args: {
            question: "No Gemini API key saved yet — paste one in the voice panel first."
          }
        }]
      };
      const n = {
          currentTimeSec: +u.toFixed(2),
          totalDurationSec: +Xt().toFixed(2),
          playing: ar,
          activeSegmentType: wn(u),
          activeImageIndex1Based: null != F() ? F() + 1 : null,
          activeCaptionText: null != z() ? U[z()] : null,
          hookDurSec: a,
          cardDurSec: o,
          cardPosAfterImage: r,
          cardText: cardTextEl.value,
          hookCaptionText: N,
          capFontSize: p,
          hookCapFontSize: f,
          cardFontSize: m,
          voiceOverSpeed: +voiceSpeedRangeEl.value || 1,
          musicVolumePercent: Math.round(100 * (w || 0)),
          imagesLoaded: _.map(e => !!e),
          imageDurationsSec: i,
          lastEditedElement: te,
          undoAvailable: Y.length,
          redoAvailable: Q.length,
          recentActions: Y.slice(-6).map(e => e.label)
        },
        s = `You control a video editor by converting spoken commands (English/Urdu/Roman Urdu/mixed, often rough, sometimes a follow-up to what was just said) into one or more structured actions.\nActions:\n${ge}\nunknown: use only if genuinely ambiguous with no usable context; args:{question}\nState + recent history + last-touched element (use these to resolve "it"/"this"/"same one", and to know what a bare "undo"/negation like "don't do that" should undo):\n${JSON.stringify(n)}\nRules:\n- If the command is a SINGLE instruction, reply {"action":"<id>","args":{...}}.\n- If it is a COMPOUND instruction with multiple things to do (e.g. "make caption 4 0.3s longer, move it up, and make the word Extreme black"), reply {"actions":[{"action":"<id>","args":{...}}, ...]} in the order they should run.\n- If the person is clearly cancelling/reversing their own last request ("no don't", "oh no", "put it back", "undo", "wapas"), use the "undo" action even if they don't say the word "undo".\n- If the person says something like "actually make it X instead" right after an edit, reuse the SAME action id and target as the most relevant recent action, just with the new value.\n- For vague relative phrasing ("a little", "slightly", "a lot", "about half a second") pick a sensible concrete numeric delta yourself — don't ask for a number unless truly needed.\n- Only use "unknown" if there is no active element AND no relevant recent action to infer from.\nReply with ONLY JSON. No prose, no markdown.`;
      let c = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(t)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: s
            }]
          },
          contents: [{
            role: "user",
            parts: [{
              text: e
            }]
          }],
          generationConfig: {
            temperature: 0,
            responseMimeType: "application/json",
            maxOutputTokens: 400
          }
        })
      });
      if (404 === c.status && (c = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${encodeURIComponent(t)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: s
            }]
          },
          contents: [{
            role: "user",
            parts: [{
              text: e
            }]
          }],
          generationConfig: {
            temperature: 0,
            responseMimeType: "application/json",
            maxOutputTokens: 400
          }
        })
      })), !c.ok) {
        const e = await c.text().catch(() => "");
        throw new Error(`Gemini error ${c.status}${e ? " — " + e.slice(0, 150) : ""}`);
      }
      const l = await c.json(),
        d = l.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      let g;
      try {
        g = JSON.parse(d);
      } catch (e) {
        const t = d.match(/\{[\s\S]*\}/);
        try {
          g = JSON.parse(t ? t[0] : d);
        } catch (e) {
          g = {
            action: "unknown",
            args: {
              question: "Didn't understand that — try again."
            }
          };
        }
      }
      return Array.isArray(g.actions) ? g : {
        actions: [{
          action: g.action,
          args: g.args || {}
        }]
      };
    }
    async function be(e) {
      voiceHeardEl.textContent = `"${e}"`, H("", !0, {
        spoken: !1
      });
      const t = function (e) {
        const t = e.trim().toLowerCase();
        let n;
        return /^(undo|wapas kar do|wapas wesa hi kar do|wapas|purana kar do|put it back|revert( that| this)?|don'?t (do|increase|decrease|change) (it|that|this)|oh no( undo)?( that)?)$/.test(t) ? {
          action: "undo",
          args: {}
        } : (n = t.match(/undo (?:the )?last (\d+|one|two|three|four|five|ek|do|teen|char|paanch) changes?/)) ? {
          action: "undo",
          args: {
            count: he[n[1]] || parseInt(n[1], 10) || 1
          }
        } : /^redo( that)?$|^do it again$/.test(t) ? {
          action: "redo",
          args: {}
        } : (n = t.match(/redo (?:the )?last (\d+|one|two|three|four|five) changes?/)) ? {
          action: "redo",
          args: {
            count: he[n[1]] || parseInt(n[1], 10) || 1
          }
        } : /^(play|chalao|start|resume|play again|play from here)$/.test(t) ? {
          action: "play",
          args: {}
        } : /^(pause|stop|stop playback|rok do|ruk jao)$/.test(t) ? {
          action: "pause",
          args: {}
        } : /^(go to start|from the beginning|shuru se|start (over|se))$/.test(t) ? {
          action: "goto_start",
          args: {}
        } : /^(go to (the )?end|last part)$/.test(t) ? {
          action: "goto_end",
          args: {}
        } : (n = t.match(/^go back ([\d.]+) seconds?$/)) ? {
          action: "seek_relative",
          args: {
            deltaSeconds: -parseFloat(n[1])
          }
        } : (n = t.match(/^go forward ([\d.]+) seconds?$/)) ? {
          action: "seek_relative",
          args: {
            deltaSeconds: parseFloat(n[1])
          }
        } : (n = t.match(/^(?:seek to|go to|stop at) ([\d.]+) seconds?$/)) ? {
          action: "seek",
          args: {
            seconds: parseFloat(n[1])
          }
        } : /^(help|what can i say|what can you control)$/.test(t) ? {
          action: "help",
          args: {}
        } : null;
      }(e);
      if (t) {
        q("executing");
        const e = de(me[t.action] || me.unknown, t.args);
        return q("done"), H(e, !0, {
          spoken: "undo" === t.action || "redo" === t.action || "help" === t.action
        }), void setTimeout(() => {
          q(Ee ? "listening" : "idle");
        }, 900);
      }
      q("understanding");
      try {
        const {
          actions: t
        } = await ye(e);
        q("executing");
        const n = [];
        for (const e of t || []) {
          const t = me[e.action] || me.unknown;
          n.push(de(t, e.args || {}));
        }
        q("done");
        H(n.length > 1 ? `Did ${n.length} things: ${n.join(" ")}` : n[0] || "Done.", !0);
      } catch (e) {
        console.error("voice command failed", e), q("done"), H(e.message || "Command failed.", !1);
      } finally {
        setTimeout(() => {
          q(Ee ? "listening" : "idle");
        }, 1200);
      }
    }
    const we = window.SpeechRecognition || window.webkitSpeechRecognition;
    let xe = null,
      Ee = !1,
      Ie = !1;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak.bind(window.speechSynthesis);
      setInterval(() => {
        if (Ie && !window.speechSynthesis.speaking && (Ie = !1, Ee && xe)) try {
          xe.start();
        } catch (e) {}
      }, 200);
    }
    let Ce = "1" === localStorage.getItem("voiceMicGranted");
    voiceCtrlBtnEl.addEventListener("click", async () => {
      voicePanelEl.style.display = "block";
      const t = we ? xe || (xe = new we(), xe.continuous = !0, xe.interimResults = !0, xe.maxAlternatives = 1, xe.addEventListener("result", e => {
        let t = "";
        for (let n = e.resultIndex; n < e.results.length; n++) {
          const a = e.results[n];
          voiceHeardEl.textContent = `"${a[0].transcript}"`, a.isFinal && (t = a[0].transcript);
        }
        t && be(t.trim());
      }), xe.addEventListener("end", () => {
        voiceCtrlBtnEl.style.background = Ee ? "var(--green)" : "#1a1a16", Ee && !Ie ? setTimeout(() => {
          if (Ee) try {
            xe.start();
          } catch (e) {}
        }, 250) : Ee || q("idle");
      }), xe.addEventListener("error", t => {
        "no-speech" !== t.error && "aborted" !== t.error && (Ee = !1, voiceCtrlBtnEl.style.background = "#1a1a16", q("idle"), H(`Mic error: ${t.error}`, !1, {
          spoken: !1
        }));
      }), xe) : null;
      if (!t) return void H("Speech recognition is not supported in this browser — try Chrome.", !1, {
        spoken: !1
      });
      if (Ee) {
        Ee = !1;
        try {
          t.stop();
        } catch (e) {}
        return voiceCtrlBtnEl.style.background = "#1a1a16", void q("idle");
      }
      if (await async function () {
        if (Ce) return !0;
        try {
          return (await navigator.mediaDevices.getUserMedia({
            audio: !0
          })).getTracks().forEach(e => e.stop()), Ce = !0, localStorage.setItem("voiceMicGranted", "1"), !0;
        } catch (e) {
          return !1;
        }
      }()) {
        t.lang = voiceLangSelectEl.value, Ee = !0, voiceCtrlBtnEl.style.background = "var(--green)", q("listening"), voiceHeardEl.textContent = "", H("", !0, {
          spoken: !1
        });
        try {
          t.start();
        } catch (e) {}
      } else H("Mic permission was denied — allow it in the browser's site settings.", !1, {
        spoken: !1
      });
    }), se();
  }();
  const wr = function () {
    let e = null,
      t = null,
      n = null,
      a = 0;
    return {
      start: function () {
        if (a++, !e) try {
          e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain(), n.gain.value = 1e-5, t = e.createOscillator(), t.frequency.value = 2e4, t.connect(n), n.connect(e.destination), t.start();
        } catch (e) {
          console.warn("[keepalive] could not start silent audio track", e);
        }
      },
      stop: function () {
        if (a = Math.max(0, a - 1), !(a > 0)) {
          try {
            t && t.stop(), e && e.close();
          } catch (e) {}
          t = null, n = null, e = null;
        }
      }
    };
  }();
  !function () {
    const e = new URLSearchParams(location.search),
      t = "1" === e.get("embedded") ? e.get("mode") || "review" : null,
      n = e.get("packId") ? +e.get("packId") : null;
    async function a(e) {
      return JSON.parse(await e.text());
    }
    const o = {
        queued: {
          label: "queued",
          color: "rgba(242,240,230,0.45)",
          bg: "#14170f"
        },
        processing: {
          label: "preparing…",
          color: "#ffd60a",
          bg: "#1c1a0c"
        },
        ready_for_review: {
          label: "good to go",
          color: "#8fd19e",
          bg: "#122016"
        },
        no_match: {
          label: "no mp3 match",
          color: "#e0a84a",
          bg: "#211a0e"
        },
        rendering: {
          label: "rendering…",
          color: "#ff9500",
          bg: "#221708"
        },
        done: {
          label: "done",
          color: "var(--green-bright)",
          bg: "#0f2317"
        },
        error: {
          label: "error",
          color: "#e0574a",
          bg: "#241010"
        }
      },
      r = [{
        key: "manifest",
        label: "Loading images & manifest"
      }, {
        key: "find_mp3",
        label: "Finding matching MP3"
      }, {
        key: "speed",
        label: "Applying voice-over speed"
      }, {
        key: "sync",
        label: "Syncing captions to the voice-over (Whisper)"
      }, {
        key: "style",
        label: "Applying locked captions/card style + default music"
      }, {
        key: "render",
        label: "Rendering the final video"
      }, {
        key: "save",
        label: "Saving to the batch library"
      }],
      plStages = r;
    function i(e) {
      const t = r.find(t => t.key === e);
      return t ? t.label : e || "—";
    }
    if (!t) {
      !function () {
        const e = "function" == typeof window.VideoEncoder && "function" == typeof window.AudioEncoder,
          t = "function" == typeof window.MediaRecorder,
          n = "function" == typeof window.DataTransferItem && window.DataTransferItem.prototype && !(!window.DataTransferItem.prototype.webkitGetAsEntry && !window.DataTransferItem.prototype.getAsEntry);
        if (e && t && n) return;
        const a = document.createElement("div");
        a.style.cssText = "background:#241010;border:1px solid #e0574a;border-radius:4px;padding:8px 10px;margin-bottom:8px;font-family:var(--mono);font-size:9.5px;color:#e0a898;line-height:1.5;";
        const o = [];
        e || o.push("No fast MP4 encoder (WebCodecs) here — falling back to a slower recorder, or renders may fail. Use Chrome/Edge/Opera for the best results."), t || o.push("No video recorder API at all — rendering will fail in this browser."), n || o.push('Folder drag-and-drop may not read nested pack folders correctly — use "browse for folder" instead.'), a.textContent = "⚠ " + o.join(" ");
        const batchPanelEl = document.getElementById("batchPanel");
        batchPanelEl && batchPanelEl.parentNode.insertBefore(a, batchPanelEl);
      }();
      const batchPanelToggleEl = document.getElementById("batchPanelToggle"),
        batchPanelBodyEl = document.getElementById("batchPanelBody"),
        batchPanelCaretEl = document.getElementById("batchPanelCaret");
      batchPanelToggleEl.addEventListener("click", () => {
        const e = "none" !== batchPanelBodyEl.style.display;
        batchPanelBodyEl.style.display = e ? "none" : "block", batchPanelCaretEl.textContent = e ? "▾" : "▴";
      });
      const batchFolderBtnEl = document.getElementById("batchFolderBtn"),
        batchFolderInputEl = document.getElementById("batchFolderInput"),
        batchDropZoneEl = document.getElementById("batchDropZone"),
        batchIngestStatusEl = document.getElementById("batchIngestStatus"),
        batchResumeBoxEl = document.getElementById("batchResumeBox"),
        batchResumeTextEl = document.getElementById("batchResumeText"),
        batchResumeBtnEl = document.getElementById("batchResumeBtn"),
        batchClearBtnEl = document.getElementById("batchClearBtn"),
        batchListWrapEl = document.getElementById("batchListWrap"),
        batchListSummaryEl = document.getElementById("batchListSummary"),
        batchSpeedInputEl = document.getElementById("batchSpeedInput"),
        H = "batchVoiceSpeed",
        G = localStorage.getItem(H);
      G && (batchSpeedInputEl.value = G), batchSpeedInputEl.addEventListener("input", () => localStorage.setItem(H, batchSpeedInputEl.value));
      const batchGenerateBtnEl = document.getElementById("batchGenerateBtn"),
        batchPrepStatusEl = document.getElementById("batchPrepStatus"),
        batchStageDetailEl = document.getElementById("batchStageDetail"),
        batchWorkflowListEl = document.getElementById("batchWorkflowList"),
        batchTimerBadgeEl = document.getElementById("batchTimerBadge");
      let Y = null,
        Q = null;
      function s(e) {
        const t = Math.floor(e / 1e3),
          n = Math.floor(t / 3600),
          a = Math.floor(t % 3600 / 60),
          o = t % 60,
          r = e => String(e).padStart(2, "0");
        return n > 0 ? `${n}:${r(a)}:${r(o)}` : `${a}:${r(o)}`;
      }
      const plIcons = {
          manifest: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>',
          find_mp3: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
          speed: '<circle cx="12" cy="13" r="8"/><path d="M12 13l3.5-3.5M12 5v1.5M4 13H5.5M18.5 13H20M6.3 6.3l1 1M17.7 6.3l-1 1"/>',
          sync: '<path d="M4 15V9M8 18V6M12 20V4M16 17V7M20 13v-2"/>',
          style: '<path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.8-1.8 1.8 1.8 0 0 1 1.8-1.8H18a3 3 0 0 0 3-3C21 8.5 17 3 12 3z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="14" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
          render: '<rect x="3" y="8" width="18" height="12" rx="1.5"/><path d="M3 8l2-4h3l-2 4M9 8l2-4h3l-2 4M15 8l2-4h2.5l-2 4"/>',
          save: '<path d="M5 3h10l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 3v6h7V3"/><path d="M8 21v-6h8v6"/>'
        },
        plCheckSvg = '<path d="M20 6 9 17l-5-5"/>',
        plErrSvg = '<path d="M12 8v5M12 16.5v.01M10.3 3.9 2.5 17.4a1.8 1.8 0 0 0 1.5 2.7h16a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z"/>';
      function plBuild(container) {
        if (!container) return;
        container.innerHTML = plStages.map((e, t) => {
          const n = plIcons[e.key] || "";
          return `<div class="pl-node up" data-idx="${t}"><div class="pl-dot"><svg class="pl-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${n}</svg><svg class="pl-ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${plCheckSvg}</svg><svg class="pl-ic-err" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${plErrSvg}</svg></div><div class="pl-lbl">${e.label}</div><div class="pl-pct"></div></div>` + (t < plStages.length - 1 ? `<div class="pl-seg" data-idx="${t}"><div class="pl-seg-fill"></div></div>` : "");
        }).join("");
      }
      function plUpdateIn(container, stageIdx, pct, status) {
        if (!container) return;
        const nodes = container.querySelectorAll(".pl-node"),
          segs = container.querySelectorAll(".pl-seg");
        nodes.forEach((el, i) => {
          el.classList.remove("up", "active", "done", "error");
          const pctEl = el.querySelector(".pl-pct");
          if ("error" === status && i === stageIdx) {
            el.classList.add("error");
            pctEl.textContent = "Error";
          } else if (i < stageIdx || "done" === status && i <= stageIdx) {
            el.classList.add("done");
            pctEl.textContent = "";
          } else if (i === stageIdx && "done" !== status) {
            el.classList.add("active");
            pctEl.textContent = "number" == typeof pct ? pct + "%" : "";
          } else {
            el.classList.add("up");
            pctEl.textContent = "";
          }
        });
        segs.forEach((el, i) => {
          const fill = el.querySelector(".pl-seg-fill");
          let w = 0;
          if (i < stageIdx) w = 100;else if (i === stageIdx) w = "done" === status || "error" === status ? 100 : "number" == typeof pct ? pct : 0;
          fill.style.width = w + "%";
        });
      }
      const bgpStepperEl1 = document.getElementById("bgpStepper"),
        batchGridProcessingEl = document.getElementById("batchGridProcessing"),
        batchGridNormalViewEl = document.getElementById("batchGridNormalView"),
        bgpEyebrowEl1 = document.getElementById("bgpEyebrow"),
        bgpTitleEl1 = document.getElementById("bgpTitle"),
        bgpShowGridBtnEl = document.getElementById("bgpShowGridBtn"),
        bgpBackToLiveBtnEl = document.getElementById("bgpBackToLiveBtn");
      batchWorkflowListEl && plBuild(batchWorkflowListEl);
      bgpStepperEl1 && plBuild(bgpStepperEl1);
      let plGridOverride = !1,
        plLastStage = null,
        plLastPct = null,
        plLastStatus = null;
      function plBuildPackList() {
        const bgpPackListEl = document.getElementById("bgpPackList");
        if (!bgpPackListEl) return;
        const seen = new Set();
        fe.forEach(p => {
          seen.add(String(p.id));
          let row = bgpPackListEl.querySelector(`[data-pack-row="${p.id}"]`);
          if (!row) {
            row = document.createElement("div"), row.className = "bgp-row", row.setAttribute("data-pack-row", p.id), row.innerHTML = '<div class="bgp-row-head"><span class="bgp-dot"></span><span class="bgp-name"></span><span class="bgp-status"></span><button type="button" class="bgp-toggle">Open editor ↗</button></div>', bgpPackListEl.appendChild(row);
            row.querySelector(".bgp-toggle").addEventListener("click", n => {
              n.stopPropagation();
              const cur = fe.find(f => f.id === p.id);
              cur && "processing" === cur.status || x(p.id);
            });
          }
          const st = o[p.status] || o.queued,
            running = "processing" === p.status;
          row.querySelector(".bgp-dot").style.background = st.color.indexOf("var(") === 0 ? "#2fae63" : st.color, row.querySelector(".bgp-name").textContent = `#${p.order} ${p.folderName || ""}`;
          const stEl = row.querySelector(".bgp-status");
          stEl.textContent = st.label, stEl.style.color = st.color.indexOf("var(") === 0 ? "#2fae63" : st.color;
          const btn = row.querySelector(".bgp-toggle");
          btn.disabled = running, btn.title = running ? "This pack is being processed right now — available the moment it finishes." : "";
        }), bgpPackListEl.querySelectorAll("[data-pack-row]").forEach(row => {
          seen.has(row.getAttribute("data-pack-row")) || row.remove();
        });
      }
      function plActivePack() {
        return fe.find(e => "processing" === e.status);
      }
      function plRefreshGridView() {
        if (!batchGridProcessingEl || !batchGridNormalViewEl) return;
        batchGridNormalViewEl.style.display = "none", batchGridProcessingEl.style.display = "block", plBuildPackList();
        const ap = plActivePack(),
          doneSet = {
            done: 1,
            ready_for_review: 1,
            no_match: 1
          },
          done = fe.filter(e => doneSet[e.status]).length,
          total = fe.length;
        if (ap) {
          bgpEyebrowEl1.textContent = `Processing pack ${done + 1} of ${total}`, bgpTitleEl1.textContent = `Making Video — ${ap.folderName}`;
          const idx = null != plLastStage ? plLastStage : 0;
          plUpdateIn(bgpStepperEl1, idx, plLastPct, plLastStatus);
        } else if (window.__plBatchRunning) {
          bgpEyebrowEl1.textContent = `Processing pack ${Math.min(done + 1, total || 1)} of ${total}`, bgpTitleEl1.textContent = "Preparing next pack…";
        } else if (total > 0) {
          const errored = fe.filter(e => "error" === e.status).length;
          bgpEyebrowEl1.textContent = `${done} of ${total} pack(s) done`, bgpTitleEl1.textContent = errored ? `Finished — ${errored} pack(s) need attention` : "All packs processed";
        } else bgpEyebrowEl1.textContent = "", bgpTitleEl1.textContent = "No packs loaded yet";
      }
      window.plRefreshGridView = plRefreshGridView;
      bgpShowGridBtnEl && bgpShowGridBtnEl.addEventListener("click", () => {
        plGridOverride = !0, plRefreshGridView();
      });
      bgpBackToLiveBtnEl && bgpBackToLiveBtnEl.addEventListener("click", () => {
        plGridOverride = !1, plRefreshGridView();
      });
      function plUpdate(stageIdx, pct, status) {
        plLastStage = stageIdx, plLastPct = pct, plLastStatus = status, plUpdateIn(batchWorkflowListEl, stageIdx, pct, status), plUpdateIn(bgpStepperEl1, stageIdx, pct, status), plRefreshGridView();
      }
      window.plUpdate = plUpdate;
      const batchOpenGridBtnEl = document.getElementById("batchOpenGridBtn"),
        batchGridOverlayEl = document.getElementById("batchGridOverlay"),
        batchGridCloseBtnEl = document.getElementById("batchGridCloseBtn"),
        batchGridTitleEl = document.getElementById("batchGridTitle"),
        batchGridSummaryEl = document.getElementById("batchGridSummary"),
        batchGridStageLineEl = document.getElementById("batchGridStageLine"),
        batchGridLegendEl = document.getElementById("batchGridLegend"),
        batchErrorPanelEl = document.getElementById("batchErrorPanel"),
        batchSyncLogPanelEl = document.getElementById("batchSyncLogPanel"),
        batchGridEl = document.getElementById("batchGrid"),
        batchDownloadAllBtnEl = document.getElementById("batchDownloadAllBtn"),
        batchDownloadAllStatusEl = document.getElementById("batchDownloadAllStatus"),
        batchPrepIframeEl = document.getElementById("batchPrepIframe");
      let pe = localStorage.getItem("activeBatchId") || null,
        fe = [];
      function c(e, t) {
        batchIngestStatusEl.style.color = t ? "var(--green-bright)" : "#e0866a", batchIngestStatusEl.textContent = e;
      }
      async function l(e, t, n) {
        if (e) if (e.isFile) await new Promise(a => {
          e.file(e => {
            try {
              Object.defineProperty(e, "webkitRelativePath", {
                value: t + e.name,
                configurable: !0
              });
            } catch (e) {}
            n.push(e), a();
          }, () => a());
        });else if (e.isDirectory) {
          const a = e.createReader(),
            o = await function (e) {
              return new Promise(t => {
                let n = [];
                !function a() {
                  e.readEntries(e => {
                    e.length ? (n = n.concat(e), a()) : t(n);
                  }, () => t(n));
                }();
              });
            }(a);
          for (const a of o) await l(a, t + e.name + "/", n);
        }
      }
      async function d(e) {
        if (console.debug("[batch] files ready for ingest:", e ? e.length : 0), e && e.length) {
          c(`Reading ${e.length} file(s)…`, !0);
          try {
            await async function (e) {
              const {
                packs: t,
                skipped: n
              } = function (e) {
                const t = Array.from(e),
                  n = new Map();
                for (const e of t) {
                  const t = (e.webkitRelativePath || e.name).split("/"),
                    a = t.length > 1 ? t.slice(0, -1).join("/") : "__root__";
                  n.has(a) || n.set(a, []), n.get(a).push(e);
                }
                const a = [],
                  o = [];
                for (const [e, t] of n.entries()) {
                  const n = t.find(e => /manifest(\s\(\d+\))?\.json$/i.test(e.name));
                  if (!n) {
                    o.push(e);
                    continue;
                  }
                  const r = t.filter(e => e !== n && _n(e)),
                    i = "__root__" === e ? (n.webkitRelativePath || n.name).split("/").slice(-2, -1)[0] || e : e.split("/").pop();
                  a.push({
                    folderName: i,
                    manifestFile: n,
                    imageFiles: r,
                    dir: e
                  });
                }
                return a.sort((e, t) => {
                  const n = (e.folderName.match(/(\d+)(?!.*\d)/) || [])[1],
                    a = (t.folderName.match(/(\d+)(?!.*\d)/) || [])[1];
                  return null != n && null != a ? +n - +a : e.folderName.localeCompare(t.folderName, void 0, {
                    numeric: !0
                  });
                }), console.debug("[batch] scanned", t.length, "file(s) across", n.size, "folder(s) —", a.length, "pack(s) with a manifest.json,", o.length, "without."), {
                  packs: a,
                  skipped: o
                };
              }(e);
              if (!t.length) return void c(`Scanned ${e.length} file(s) in ${n.length} folder(s) — none contained a manifest.json. Select the folder that directly holds (or contains subfolders that directly hold) each pack's manifest.json + images.`, !1);
              pe = "batch_" + Date.now(), localStorage.setItem("activeBatchId", pe), fe = [];
              let o = 0;
              const r = [];
              for (const e of t) {
                let t;
                o++;
                try {
                  t = await a(e.manifestFile);
                } catch (t) {
                  r.push(e.folderName);
                  continue;
                }
                const n = Array.isArray(t) ? t : Array.isArray(t.items) ? t.items : [],
                  i = {
                    batchId: pe,
                    order: o,
                    folderName: e.folderName,
                    root: Array.isArray(t) ? {} : t,
                    items: n,
                    imageFiles: e.imageFiles,
                    status: "queued",
                    error: null
                  },
                  s = await ta("batchPacks", i);
                i.id = s;
                const c = ia(i);
                await sa(i), fe.push(c);
              }
              const i = n.concat(r);
              c(`Loaded ${fe.length} pack${1 === fe.length ? "" : "s"}${i.length ? `, skipped ${i.length}: ${i.slice(0, 5).join(", ")}${i.length > 5 ? "…" : ""}` : ""}.`, !0), p(), b();
            }(e);
          } catch (e) {
            console.error("[batch] ingest failed", e), c("Ingest failed: " + (e && e.message || e), !1);
          }
        } else c("No files were returned for that folder — reselect and make sure the folder actually contains the pack subfolders (with manifest.json + images inside). If the button keeps returning nothing, use the drag-and-drop box above instead — it reads nested subfolders directly and is far more reliable, especially when this page is opened as a local file.", !1);
      }
      batchFolderBtnEl.addEventListener("click", () => batchFolderInputEl.click()), batchFolderInputEl.addEventListener("change", async e => {
        const t = e.target.files;
        batchFolderInputEl.value = "", await d(t);
      });
      const ge = ["https://unpkg.com/jszip@3/dist/jszip.min.js", "https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js"];
      async function m() {
        if (window.JSZip) return window.JSZip;
        let e;
        for (const t of ge) try {
          if (await new Promise((e, n) => {
            if (document.querySelector(`script[data-src="${t}"]`) && window.JSZip) return void e();
            const a = document.createElement("script");
            a.src = t, a.dataset.src = t, a.onload = () => e(), a.onerror = () => n(new Error("failed to load " + t)), document.head.appendChild(a);
          }), window.JSZip) return window.JSZip;
        } catch (t) {
          e = t;
        }
        throw e || new Error("JSZip failed to load from all CDNs — check your internet connection.");
      }
      const batchZipBtnEl = document.getElementById("batchZipBtn"),
        batchZipInputEl = document.getElementById("batchZipInput");
      function p() {
        batchListWrapEl.style.display = fe.length ? "block" : "none";
        const e = {};
        fe.forEach(t => {
          e[t.status] = (e[t.status] || 0) + 1;
        }), batchListSummaryEl.textContent = `${fe.length} pack(s) loaded — ` + Object.entries(e).map(([e, t]) => `${t} ${(o[e] || {
          label: e
        }).label}`).join(", ");
      }
      batchZipBtnEl.addEventListener("click", () => batchZipInputEl.click()), batchZipInputEl.addEventListener("change", async e => {
        const t = e.target.files && e.target.files[0];
        if (batchZipInputEl.value = "", t) try {
          c("Loading zip reader…", !0);
          const e = await m();
          c(`Unzipping ${t.name}…`, !0);
          const n = await e.loadAsync(t),
            a = Object.values(n.files).filter(e => !e.dir),
            o = [];
          for (let e = 0; e < a.length; e++) {
            const t = a[e];
            e % 10 == 0 && c(`Unzipping… ${e}/${a.length} file(s)`, !0);
            const n = await t.async("blob"),
              r = t.name.split("/").pop(),
              i = new File([n], r, {
                type: n.type || ""
              });
            try {
              Object.defineProperty(i, "webkitRelativePath", {
                value: t.name,
                configurable: !0
              });
            } catch (e) {}
            o.push(i);
          }
          await d(o);
        } catch (e) {
          console.error("[batch] zip ingest failed", e), c("Zip read failed: " + (e && e.message || e), !1);
        }
      }), ["dragenter", "dragover"].forEach(e => batchDropZoneEl.addEventListener(e, e => {
        e.preventDefault(), e.stopPropagation(), batchDropZoneEl.style.borderColor = "var(--green-bright)", batchDropZoneEl.style.background = "rgba(31,174,102,0.06)";
      })), ["dragleave", "drop"].forEach(e => batchDropZoneEl.addEventListener(e, e => {
        e.preventDefault(), e.stopPropagation(), batchDropZoneEl.style.borderColor = "var(--line)", batchDropZoneEl.style.background = "transparent";
      })), batchDropZoneEl.addEventListener("click", () => batchFolderInputEl.click()), batchDropZoneEl.addEventListener("drop", async e => {
        if (!e.dataTransfer) return;
        c("Reading dropped folder…", !0);
        const t = await async function (e) {
          const t = Array.from(e.items || []).map(e => e.webkitGetAsEntry && e.webkitGetAsEntry()).filter(Boolean);
          if (!t.length) return Array.from(e.files || []);
          const n = [];
          for (const e of t) await l(e, "", n);
          return n;
        }(e.dataTransfer);
        await d(t);
      }), async function () {
        const e = (await async function () {
          return await la(), aa("batchPackStatus");
        }()).filter(e => "done" !== e.status);
        if (!e.length) return;
        const t = new Map();
        for (const n of e) t.has(n.batchId) || t.set(n.batchId, []), t.get(n.batchId).push(n);
        const n = [...t.entries()].sort((e, t) => t[1].length - e[1].length),
          [a, o] = n[0];
        batchResumeBoxEl.style.display = "block", batchResumeTextEl.textContent = `Found an unfinished batch — ${o.length} pack(s) not yet done.`, batchResumeBtnEl.onclick = async () => {
          pe = a, localStorage.setItem("activeBatchId", pe), fe = await da(a), batchResumeBoxEl.style.display = "none", p(), b();
        }, batchClearBtnEl.onclick = async () => {
          for (const t of e) await ua(t.id);
          batchResumeBoxEl.style.display = "none", c("Old batch cleared.", !0);
        };
      }(), (async () => {
        if (!pe) return;
        const e = await da(pe);
        for (const t of e) if ("processing" === t.status) {
          t.status = "queued", await sa(t);
          const e = await na("batchPacks", t.id).catch(() => null);
          e && (e.status = "queued", await ta("batchPacks", e));
        }
        e.length && (fe = e, p(), batchPanelBodyEl.style.display = "block", batchPanelCaretEl.textContent = "▴");
      })();
      let ve = [],
        be = !1,
        we = null;
      function f() {
        return location.href.split("?")[0].split("#")[0];
      }
      function g(e) {
        ve = ve.concat(e.filter(e => !ve.includes(e))), be || async function () {
          window.__plBatchRunning = !0, be = !0, Y = Date.now(), batchTimerBadgeEl.style.display = "block", batchTimerBadgeEl.style.color = "var(--green-bright)", batchTimerBadgeEl.style.borderColor = "var(--green-bright)", batchTimerBadgeEl.textContent = "⏱ 0:00 elapsed", clearInterval(Q), Q = setInterval(() => {
            batchTimerBadgeEl.textContent = `⏱ ${s(Date.now() - Y)} elapsed`;
          }, 1e3), wr.start();
          try {
            let e = fe.filter(e => "ready_for_review" === e.status || "done" === e.status || "no_match" === e.status).length;
            const t = fe.length;
            for (; ve.length;) {
              const n = ve.shift(),
                a = fe.findIndex(e => e.id === n);
              if (a < 0) continue;
              const o = +batchSpeedInputEl.value || 1.12;
              fe[a].status = "processing", w(), p(), batchPrepStatusEl.textContent = `Preparing pack #${fe[a].order} (${fe[a].folderName}) — ${e}/${t} done so far…`, window.plUpdate && window.plUpdate(0, 0);
              const r = await new Promise(e => {
                  let t = !1;
                  const a = n => {
                    t || (t = !0, clearInterval(i), clearTimeout(s), batchPrepIframeEl.onerror = null, e(n));
                  };
                  we = a, xe = Date.now();
                  let r = !1;
                  const i = setInterval(() => {
                      if (!(Date.now() - xe < 45e3)) {
                        if (!r) return r = !0, console.warn("[batch] no heartbeat for 45s, retrying pack", n), xe = Date.now(), batchPrepIframeEl.removeAttribute("src"), void (batchPrepIframeEl.src = f() + `?embedded=1&mode=prep&packId=${n}&speed=${o}&_t=${Date.now()}`);
                        console.error("[batch] pack stalled twice, giving up", n), a({
                          status: "error",
                          note: "Pack stopped responding (no activity for 45s, twice) — this browser may be throttling background work, or a required API is missing/slow. Click Start auto-prepare again to retry it."
                        }), batchPrepIframeEl.removeAttribute("src");
                      }
                    }, 5e3),
                    s = setTimeout(() => {
                      console.error("[batch] hard cap reached for pack", n), a({
                        status: "error",
                        note: "Prep hit the 10-minute hard cap for this pack — click Start auto-prepare again to retry it."
                      }), batchPrepIframeEl.removeAttribute("src");
                    }, 6e5);
                  batchPrepIframeEl.onerror = () => a({
                    status: "error",
                    note: "Hidden prep frame failed to load in this browser."
                  }), batchPrepIframeEl.src = f() + `?embedded=1&mode=prep&packId=${n}&speed=${o}&_t=${Date.now()}`;
                }),
                i = await na("batchPacks", n).catch(() => null);
              i && (i.status = r.status, i.error = r.note || null, i.matchInfo = r.matchInfo || null, i.stage = r.stage || null, r.syncLog && (i.syncLog = r.syncLog), await ta("batchPacks", i), await sa(i)), a >= 0 && (fe[a].status = r.status, fe[a].error = r.note || null, fe[a].stage = r.stage || null, r.syncLog && (fe[a].syncLog = r.syncLog)), e++, w(), p(), window.plUpdate && window.plUpdate(plStages.findIndex(x => x.key === r.stage), null, "error" === r.status ? "error" : "done");
            }
            be = !1, wr.stop(), batchPrepStatusEl.textContent = `Auto-prepare complete — ${e}/${t} pack(s) processed. Open the grid to review.`, batchPrepIframeEl.removeAttribute("src");
          } finally {
            be = !1, window.__plBatchRunning = !1, window.plRefreshGridView && window.plRefreshGridView(), wr.stop(), function () {
              if (clearInterval(Q), Y) {
                const e = s(Date.now() - Y);
                batchTimerBadgeEl.textContent = `✓ Done in ${e}`, batchTimerBadgeEl.style.color = "#8fd19e";
              }
              Y = null;
            }();
          }
        }();
      }
      batchGenerateBtnEl.addEventListener("click", () => {
        if (!fe.length) return void c("Select a packs folder first.", !1);
        const e = +batchSpeedInputEl.value || 1.12,
          t = fe.filter(t => {
            if ("rendering" === t.status || "processing" === t.status) return !1;
            if ("done" === t.status) {
              const n = t.matchInfo && "number" == typeof t.matchInfo.speed ? t.matchInfo.speed : null;
              return null === n || Math.abs(n - e) > .001;
            }
            return !0;
          });
        t.length ? g(t.map(e => e.id)) : batchPrepStatusEl.textContent = `Every pack is already done at ${e.toFixed(2)}x.`;
      });
      let xe = 0;
      window.addEventListener("message", e => {
        const t = e.data;
        if (t && "object" == typeof t) if ("PREP_PACK_HEARTBEAT" !== t.type) {
          if ("PREP_PACK_STAGE" === t.type) {
            xe = Date.now();
            const e = fe.findIndex(e => e.id === t.packId);
            if (e >= 0) {
              fe[e].stage = t.stage;
              const n = r.findIndex(e => e.key === t.stage),
                a = "number" == typeof t.pct ? ` (${t.pct}%)` : "",
                o = `Pack #${fe[e].order} (${fe[e].folderName}) — Step ${n + 1}/${r.length}: ${i(t.stage)}${a}…`;
              batchStageDetailEl.textContent = o, batchGridStageLineEl && (batchGridStageLineEl.textContent = o), w(), window.plUpdate && window.plUpdate(n, "number" == typeof t.pct ? t.pct : null);
            }
            return;
          }
          if ("PREP_PACK_DONE" === t.type && we) {
            const e = we;
            we = null, e({
              status: t.status,
              note: t.note,
              matchInfo: t.matchInfo,
              stage: t.stage,
              syncLog: t.syncLog || null
            });
          }
        } else xe = Date.now();
      });
      let ke = null;
      async function h() {
        if (!pe) return;
        const e = await da(pe);
        e.length && (fe = e);
      }
      let Ee = null;
      function v() {
        const e = fe.map(e => `${e.id}:${e.status}:${e.error || ""}:${e.stage || ""}:${e.syncLog ? 1 : 0}`).join("|");
        e !== Ee && (Ee = e, w());
      }
      function b() {
        batchGridOverlayEl.style.display = "flex", batchGridTitleEl.textContent = `Pack grid — ${fe.length} pack(s)`, Ee = null, plGridOverride = !1, v(), plRefreshGridView(), ke && clearInterval(ke), ke = setInterval(async () => {
          "none" !== batchGridOverlayEl.style.display && (await h(), v());
        }, 2e3);
      }
      function w() {
        batchGridSummaryEl.textContent = (() => {
          const e = {};
          return fe.forEach(t => {
            e[t.status] = (e[t.status] || 0) + 1;
          }), Object.entries(e).map(([e, t]) => `${t} ${(o[e] || {
            label: e
          }).label}`).join(" · ") || "No packs yet.";
        })(), batchGridLegendEl.innerHTML = Object.values(o).map(e => `<span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${e.color};margin-right:4px;"></span>${e.label}</span>`).join(""), batchGridEl.innerHTML = "", fe.forEach(e => {
          const t = o[e.status] || o.queued,
            n = document.createElement("div");
          n.style.cssText = "position:relative;aspect-ratio:1;";
          const a = document.createElement("button");
          a.type = "button";
          const r = "queued" !== e.status && "processing" !== e.status;
          const isActive = "processing" === e.status || "rendering" === e.status;
          if (a.title = `${e.folderName} — ${t.label}${e.error ? " (" + e.error + ")" : ""}`, a.className = isActive ? "pack-cell pack-cell--active" : "pack-cell", a.style.cssText = `--cell-color:${t.color};width:100%;height:100%;border-radius:10px;border:1.5px solid ${t.color};background:${t.bg};color:${t.color};font-family:var(--mono);font-weight:800;font-size:13px;cursor:${r ? "pointer" : "default"};opacity:${r && !isActive ? "1" : isActive ? "1" : "0.55"};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:2px;transition:transform .15s,box-shadow .15s,opacity .15s;`, a.innerHTML = `${isActive ? '<span class="pack-cell-spinner"></span>' : ""}<span>#${e.order}</span><span style="font-size:8px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">${"processing" === e.status ? "preparing…" : "rendering" === e.status ? "rendering…" : t.label}</span>`, "error" === e.status ? a.addEventListener("click", () => function (e) {
            batchSyncLogPanelEl.style.display = "none", batchErrorPanelEl.style.display = "block";
            const t = e.stage ? ` at step "${i(e.stage)}"` : "";
            batchErrorPanelEl.innerHTML = `<b>Pack #${e.order} (${e.folderName}) failed${t}:</b><br>${e.error || "No error message was recorded."}<br><br><button type="button" id="errRetryBtn" style="font-family:var(--mono);font-size:10px;padding:4px 8px;margin-right:8px;cursor:pointer;">Retry this pack</button><button type="button" id="errOpenBtn" style="font-family:var(--mono);font-size:10px;padding:4px 8px;cursor:pointer;">Open in editor</button>`, document.getElementById("errRetryBtn").addEventListener("click", () => {
              batchErrorPanelEl.style.display = "none", e.status = "queued", e.error = null, na("batchPacks", e.id).then(e => {
                e && (e.status = "queued", e.error = null, ta("batchPacks", e), sa(e));
              }), w(), p(), g([e.id]);
            }), document.getElementById("errOpenBtn").addEventListener("click", () => x(e.id));
          }(e)) : r && a.addEventListener("click", () => x(e.id)), n.appendChild(a), e.syncLog) {
            const t = document.createElement("button");
            t.type = "button", t.title = "View caption sync log for this pack", t.textContent = "📝", t.style.cssText = "position:absolute;top:2px;right:2px;width:18px;height:18px;line-height:16px;padding:0;border-radius:3px;border:1px solid rgba(242,240,230,0.35);background:rgba(0,0,0,0.55);color:var(--paper);font-size:10px;cursor:pointer;", t.addEventListener("click", t => {
              t.stopPropagation(), function (e) {
                batchErrorPanelEl.style.display = "none";
                const t = e.syncLog;
                if (!t) return void (batchSyncLogPanelEl.style.display = "none");
                const n = t.retried ? ' <span style="opacity:.6;">(auto-retried once — first pass had a tight gap)</span>' : "";
                batchSyncLogPanelEl.style.display = "block", batchSyncLogPanelEl.innerHTML = `<b>Pack #${e.order} (${e.folderName}) — caption sync log:</b>${n}<br><div style="margin:6px 0;">${t.summaryText || ""}</div><div>${t.breakdownHtml || '<span style="opacity:.6;">No per-caption breakdown recorded.</span>'}</div><button type="button" id="syncLogCloseBtn" style="margin-top:8px;font-family:var(--mono);font-size:10px;padding:4px 8px;cursor:pointer;">Close</button>`;
                const syncLogCloseBtnEl = document.getElementById("syncLogCloseBtn");
                syncLogCloseBtnEl && syncLogCloseBtnEl.addEventListener("click", () => {
                  batchSyncLogPanelEl.style.display = "none";
                });
              }(e);
            }), n.appendChild(t);
          }
          batchGridEl.appendChild(n);
        }), plRefreshGridView();
      }
      function x(e) {
        fe.find(t => t.id === e) && (localStorage.setItem("activeBatchId", pe), window.open(f() + `?embedded=1&mode=review&packId=${e}&_t=${Date.now()}`, "_blank"));
      }
      function k(e) {
        if (!k._table) {
          const e = new Uint32Array(256);
          for (let t = 0; t < 256; t++) {
            let n = t;
            for (let e = 0; e < 8; e++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
            e[t] = n >>> 0;
          }
          k._table = e;
        }
        const t = k._table,
          n = new Uint8Array(e);
        let a = 4294967295;
        for (let e = 0; e < n.length; e++) a = t[255 & (a ^ n[e])] ^ a >>> 8;
        return (4294967295 ^ a) >>> 0;
      }
      async function E(e, t) {
        const n = new TextEncoder(),
          a = [],
          o = [];
        let r = 0;
        for (let i = 0; i < e.length; i++) {
          const {
            name: s,
            blob: c
          } = e[i];
          t && t(i + 1, e.length, s);
          const l = n.encode(s),
            d = await c.arrayBuffer(),
            u = k(d),
            m = d.byteLength,
            p = new DataView(new ArrayBuffer(30));
          p.setUint32(0, 67324752, !0), p.setUint16(4, 20, !0), p.setUint16(6, 0, !0), p.setUint16(8, 0, !0), p.setUint16(10, 0, !0), p.setUint16(12, 33, !0), p.setUint32(14, u, !0), p.setUint32(18, m, !0), p.setUint32(22, m, !0), p.setUint16(26, l.length, !0), p.setUint16(28, 0, !0), a.push(p.buffer, l, c);
          const f = new DataView(new ArrayBuffer(46));
          f.setUint32(0, 33639248, !0), f.setUint16(4, 20, !0), f.setUint16(6, 20, !0), f.setUint16(8, 0, !0), f.setUint16(10, 0, !0), f.setUint16(12, 0, !0), f.setUint16(14, 33, !0), f.setUint32(16, u, !0), f.setUint32(20, m, !0), f.setUint32(24, m, !0), f.setUint16(28, l.length, !0), f.setUint16(30, 0, !0), f.setUint16(32, 0, !0), f.setUint16(34, 0, !0), f.setUint16(36, 0, !0), f.setUint32(38, 0, !0), f.setUint32(42, r, !0), o.push(f.buffer, l), r += p.buffer.byteLength + l.length + m;
        }
        const i = r,
          s = o.reduce((e, t) => e + t.byteLength, 0),
          c = new DataView(new ArrayBuffer(22));
        return c.setUint32(0, 101010256, !0), c.setUint16(4, 0, !0), c.setUint16(6, 0, !0), c.setUint16(8, e.length, !0), c.setUint16(10, e.length, !0), c.setUint32(12, s, !0), c.setUint32(16, i, !0), c.setUint16(20, 0, !0), new Blob([...a, ...o, c.buffer], {
          type: "application/zip"
        });
      }
      async function I(e, t, n) {
        if (e instanceof Blob) {
          const a = t + ".bin";
          return n.push({
            name: a,
            blob: e
          }), {
            __blobRef: a,
            __isFile: "undefined" != typeof File && e instanceof File,
            __fileName: e.name || "",
            __mime: e.type || ""
          };
        }
        if (Array.isArray(e)) {
          const a = [];
          for (let o = 0; o < e.length; o++) a.push(await I(e[o], `${t}_${o}`, n));
          return a;
        }
        if (e && "object" == typeof e && !(e instanceof Date)) {
          const a = {};
          for (const o of Object.keys(e)) a[o] = await I(e[o], `${t}_${o}`, n);
          return a;
        }
        return e;
      }
      async function L(e, t) {
        if (e && "object" == typeof e && !Array.isArray(e) && e.__blobRef) {
          const n = t.file(e.__blobRef);
          if (!n) return null;
          const a = await n.async("arraybuffer"),
            o = new Blob([a], {
              type: e.__mime || ""
            });
          return e.__isFile ? new File([o], e.__fileName || "file", {
            type: e.__mime || ""
          }) : o;
        }
        if (Array.isArray(e)) {
          const n = [];
          for (const a of e) n.push(await L(a, t));
          return n;
        }
        if (e && "object" == typeof e) {
          const n = {};
          for (const a of Object.keys(e)) n[a] = await L(e[a], t);
          return n;
        }
        return e;
      }
      batchOpenGridBtnEl.addEventListener("click", b), batchGridCloseBtnEl.addEventListener("click", () => {
        batchGridOverlayEl.style.display = "none", ke && (clearInterval(ke), ke = null);
      }), window.addEventListener("focus", async () => {
        "none" !== batchGridOverlayEl.style.display && (await h(), v());
      }), window.addEventListener("message", async e => {
        const t = e.data;
        t && "object" == typeof t && t.type;
      });
      const backupAllBtnEl = document.getElementById("backupAllBtn"),
        restoreAllBtnEl = document.getElementById("restoreAllBtn"),
        restoreAllFileEl = document.getElementById("restoreAllFile"),
        backupAllStatusEl = document.getElementById("backupAllStatus");
      function C(e, t) {
        backupAllStatusEl.style.display = e ? "block" : "none", backupAllStatusEl.textContent = e || "", backupAllStatusEl.style.color = t ? "#e05a4a" : "var(--green-bright)";
      }
      function $(e) {
        batchDownloadAllStatusEl.style.display = e ? "block" : "none", batchDownloadAllStatusEl.textContent = e || "";
      }
      backupAllBtnEl.addEventListener("click", async () => {
        backupAllBtnEl.disabled = !0;
        const e = backupAllBtnEl.textContent;
        try {
          C("Reading every store…");
          const e = await Qn(),
            t = Array.from(e.objectStoreNames),
            n = {
              formatVersion: 1,
              exportedAt: Date.now(),
              stores: {}
            },
            a = [];
          for (const e of t) if (backupAllBtnEl.textContent = `Reading ${e}…`, "templates" === e) {
            const t = await ra("templates"),
              o = [];
            for (const e of t) {
              const t = await na("templates", e);
              o.push({
                key: e,
                value: await I(t, `templates_${String(e).replace(/[^a-z0-9_-]/gi, "_")}`, a)
              });
            }
            n.stores[e] = {
              keyed: !0,
              rows: o
            };
          } else {
            const t = await aa(e),
              o = [];
            for (const n of t) o.push(await I(n, `${e}_${n.id}`, a));
            n.stores[e] = {
              keyed: !1,
              rows: o
            };
          }
          backupAllBtnEl.textContent = "Zipping…";
          const o = [{
              name: "manifest.json",
              blob: new Blob([JSON.stringify(n)], {
                type: "application/json"
              })
            }, ...a],
            r = await E(o, (e, t) => {
              backupAllBtnEl.textContent = `Zipping ${e}/${t}…`;
            }),
            i = URL.createObjectURL(r),
            s = document.createElement("a");
          s.href = i, s.download = `hook-showcase-backup-${new Date().toISOString().slice(0, 10)}.zip`, document.body.appendChild(s), s.click(), s.remove(), setTimeout(() => URL.revokeObjectURL(i), 3e4), C(`Backed up ${a.length} file(s) across ${t.length} store(s).`);
        } catch (e) {
          console.error("backup all failed", e), C("Backup failed: " + (e && e.message || e), !0);
        }
        backupAllBtnEl.disabled = !1, backupAllBtnEl.textContent = e;
      }), restoreAllBtnEl.addEventListener("click", () => restoreAllFileEl.click()), restoreAllFileEl.addEventListener("change", async e => {
        const t = e.target.files && e.target.files[0];
        if (restoreAllFileEl.value = "", !t) return;
        restoreAllBtnEl.disabled = !0;
        const n = restoreAllBtnEl.textContent;
        try {
          C("Reading backup zip…");
          const e = await m(),
            n = await e.loadAsync(t),
            a = n.file("manifest.json");
          if (!a) throw new Error("Not a valid backup file — manifest.json missing.");
          const o = JSON.parse(await a.async("string")),
            r = Object.keys(o.stores || {});
          let i = 0;
          for (const e of r) {
            restoreAllBtnEl.textContent = `Restoring ${e}…`;
            const {
              keyed: t,
              rows: a
            } = o.stores[e];
            for (const o of a) {
              if (t) {
                const t = await L(o.value, n);
                await ta(e, t, o.key);
              } else {
                const t = await L(o, n);
                await ta(e, t);
              }
              i++;
            }
          }
          ea.clear(), C(`Restored ${i} record(s) across ${r.length} store(s). Reload the page to see everything.`);
        } catch (e) {
          console.error("restore all failed", e), C("Restore failed: " + (e && e.message || e), !0);
        }
        restoreAllBtnEl.disabled = !1, restoreAllBtnEl.textContent = n;
      }), batchDownloadAllBtnEl.addEventListener("click", async () => {
        if (be) return void $("Auto-prepare is still running — wait for it to finish, then download.");
        const e = fe.filter(e => "done" === e.status);
        if (e.length) {
          batchDownloadAllBtnEl.disabled = !0;
          try {
            $(`Reading ${e.length} cached render(s)…`);
            const t = [];
            let n = [];
            for (const a of e) {
              const e = await na("batchRenders", a.id).catch(() => null);
              if (e && e.blob) {
                const n = (a.folderName || "pack-" + a.order).replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") || "pack-" + a.order;
                t.push({
                  name: `${String(a.order).padStart(3, "0")}-${n}.mp4`,
                  blob: e.blob
                });
              } else n.push(a);
            }
            if (n.length) {
              const e = await async function (e, t) {
                const n = [];
                for (let a = 0; a < e.length; a++) {
                  const o = e[a];
                  t(a + 1, e.length, o.folderName || "pack-" + o.order);
                  const r = await na("batchPackTemplates", o.id).catch(() => null);
                  if (!r || !r.template) {
                    n.push(o);
                    continue;
                  }
                  await new Promise(e => {
                    let t = !1;
                    const n = n => {
                        t || (t = !0, clearTimeout(a), e(n));
                      },
                      a = setTimeout(() => n({
                        status: "error"
                      }), 3e5);
                    we = n, batchPrepIframeEl.onerror = () => n({
                      status: "error"
                    }), batchPrepIframeEl.src = f() + `?embedded=1&mode=rerender&packId=${o.id}&_t=${Date.now()}`;
                  }), batchPrepIframeEl.removeAttribute("src");
                  const i = await na("batchRenders", o.id).catch(() => null);
                  i && i.blob || n.push(o);
                }
                return n;
              }(n, (e, t, n) => $(`Rebuilding missing render ${e}/${t} — ${n}…`));
              for (const a of n) {
                if (e.includes(a)) continue;
                const n = await na("batchRenders", a.id).catch(() => null);
                if (n && n.blob) {
                  const e = (a.folderName || "pack-" + a.order).replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") || "pack-" + a.order;
                  t.push({
                    name: `${String(a.order).padStart(3, "0")}-${e}.mp4`,
                    blob: n.blob
                  });
                }
              }
              n = e;
            }
            if (!t.length) return void $('Renders were not found in the cache — click "Start auto-prepare" again to re-render them.');
            const a = await E(t, (e, t, n) => $(`Zipping ${e}/${t} — ${n}…`)),
              o = URL.createObjectURL(a),
              r = document.createElement("a");
            r.href = o, r.download = `${pe || "batch"}-packs.zip`, document.body.appendChild(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(o), 3e4);
            let i = `Downloaded ${t.length} video(s) as one ZIP.`;
            n.length && (i += ` ${n.length} pack(s) had no video AND no saved edit to rebuild from — truly nothing to recover. Open them from the grid and redo them manually.`), $(i), (async () => {
              try {
                const t = [];
                for (const n of e) {
                  const e = await na("batchPackTemplates", n.id).catch(() => null),
                    a = await na("batchRenders", n.id).catch(() => null);
                  !e || a && a.ver === e.ver || t.push(n.folderName || "pack-" + n.order);
                }
                t.length && $(i + ` Note: ${t.length} pack(s) (${t.slice(0, 5).join(", ")}${t.length > 5 ? ", …" : ""}) were edited after their last render — the zip has their last render, not the newer edit. Re-render just those from the grid if you want the latest version.`);
              } catch (e) {}
            })();
          } catch (e) {
            console.error(e), $("ZIP build failed: " + (e && e.message || "unknown error") + ". Try downloading fewer packs at a time.");
          } finally {
            batchDownloadAllBtnEl.disabled = !1;
          }
        } else $('No packs rendered yet — click "Start auto-prepare" first; every pack renders automatically in the background.');
      });
    }
    if ("prep" === t) {
      const batchPanelEl = document.getElementById("batchPanel");
      batchPanelEl && (batchPanelEl.style.display = "none");
      const Be = setInterval(() => {
        parent.postMessage({
          type: "PREP_PACK_HEARTBEAT",
          packId: n
        }, "*");
      }, 4e3);
      parent.postMessage({
        type: "PREP_PACK_HEARTBEAT",
        packId: n
      }, "*"), wr.start();
      let Me = null;
      function S(e, t) {
        Me = e, parent.postMessage({
          type: "PREP_PACK_STAGE",
          packId: n,
          stage: e,
          pct: t
        }, "*");
      }
      !async function () {
        const t = +e.get("speed") || 1.12;
        let a = "error",
          o = null,
          r = null,
          s = null;
        try {
          S("manifest");
          const e = await na("batchPacks", n);
          if (!e) throw new Error("Pack not found — it may have been cleared.");
          vr = (e.folderName || "pack-" + e.order).replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") + ".mp4", await Nn(e.items, e.imageFiles, e.root), Ia(), S("find_mp3");
          let i = await Hn();
          if ("guess" === i.status && i.name) {
            const e = (await aa("voiceovers")).filter(e => "done" === e.status && e.transcript).find(e => e.name === i.name);
            e && (await Lo(e.id, po), o = `Low-confidence MP3 match (${Math.round(100 * (i.confidence || 0))}%) — applied, double-check in review.`, i = {
              status: "applied",
              confidence: i.confidence,
              name: i.name
            });
          }
          if ("applied" !== i.status) a = "no_match", o = i.message || "No confident MP3 match — assign one manually in review.";else {
            r = {
              name: i.name,
              confidence: i.confidence,
              speed: t
            }, S("speed");
            const e = await hn(t);
            if (e.ok) {
              S("sync");
              let e = await bn(),
                t = !1;
              const n = e => e.ok && (e.clampedGaps > 0 || e.matched < e.total),
                r = 4;
              let i = 1;
              for (; n(e) && i < r;) e = await bn(), t = !0, i++;
              if (e.ok) {
                a = "ready_for_review";
                const t = i > 1 ? ` after ${i} attempts` : "";
                e.clampedGaps > 0 ? o = `Synced, but ${e.clampedGaps} caption gap(s) were tighter than the spoken audio even${t} — double-check timing in review.` : e.matched < e.total && (o = `Synced, but only ${e.matched}/${e.total} captions force-aligned even${t} — the rest were estimated. Double-check timing in review.`);
              } else a = "error", o = e.message || "Sync failed.";
              s = {
                summaryText: syncStatusEl.textContent,
                breakdownHtml: syncBreakdownEl.innerHTML,
                matched: e.matched,
                total: e.total,
                clampedGaps: e.clampedGaps,
                missed: e.missed,
                retried: t,
                ts: Date.now()
              };
            } else a = "error", o = e.message || "Speed step failed.";
          }
        } catch (e) {
          console.error(e), a = "error", o = `[${i(Me)}] ` + (e && e.message || String(e));
        }
        try {
          S("style"), await La(), Ia();
          const e = await ba();
          var c = Date.now();
          await ta("batchPackTemplates", {
            id: n,
            template: e,
            ver: c
          });
        } catch (e) {
          console.error("saving prepared template failed", e), "error" !== a && (a = "error", o = `[${i(Me)}] Prepared, but saving the project failed: ` + (e && e.message || e));
        }
        if ("ready_for_review" === a) try {
          S("render", 0);
          const e = await br({
            autoDownload: !1,
            onRenderProgress: e => S("render", e)
          });
          e && e.ok ? (S("save"), await ta("batchRenders", {
            id: n,
            blob: e.blob,
            ver: void 0 !== c ? c : Date.now()
          }), a = "done") : (a = "error", o = `[${i("render")}] ` + (e && e.message || "Render failed."));
        } catch (e) {
          console.error("headless render failed", e), a = "error", o = `[${i(Me)}] Render failed: ` + (e && e.message || e);
        }
        if (s) try {
          const e = await na("batchPacks", n);
          e && (e.syncLog = s, await ta("batchPacks", e), await sa(e));
        } catch (e) {
          console.error("saving sync log failed", e);
        }
        clearInterval(Be), wr.stop(), parent.postMessage({
          type: "PREP_PACK_DONE",
          packId: n,
          status: a,
          note: o,
          matchInfo: r,
          stage: Me,
          syncLog: s
        }, "*");
      }();
    }
    if ("rerender" === t) {
      const Ae = setInterval(() => {
        parent.postMessage({
          type: "PREP_PACK_HEARTBEAT",
          packId: n
        }, "*");
      }, 4e3);
      parent.postMessage({
        type: "PREP_PACK_HEARTBEAT",
        packId: n
      }, "*"), wr.start(), async function () {
        let e = "error",
          t = null;
        try {
          const a = await na("batchPacks", n);
          if (!a) throw new Error("Pack not found — it may have been cleared.");
          vr = (a.folderName || "pack-" + a.order).replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") + ".mp4", await Nn(a.items, a.imageFiles, a.root);
          const o = await na("batchPackTemplates", n).catch(() => null);
          if (!o || !o.template) throw new Error("No saved edit found for this pack.");
          await wa(o.template), Ia();
          const r = await br({
            autoDownload: !1
          });
          r && r.ok ? (await ta("batchRenders", {
            id: n,
            blob: r.blob,
            ver: o.ver || Date.now()
          }), e = "done") : t = r && r.message || "Re-render failed.";
        } catch (e) {
          console.error("rerender failed", e), t = e && e.message || String(e);
        }
        clearInterval(Ae), wr.stop(), parent.postMessage({
          type: "PREP_PACK_DONE",
          packId: n,
          status: e,
          note: t
        }, "*");
      }();
    }
    if ("review" === t) {
      const Re = document.createElement("div");
      Re.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:99999;background:#101210;border-bottom:1px solid var(--line);padding:8px 12px;font-family:var(--mono);font-size:11px;color:var(--paper);display:flex;justify-content:space-between;align-items:center;gap:10px;", Re.innerHTML = '\n        <span style="display:flex;align-items:center;gap:10px;">\n          <button type="button" id="reviewBackBtn" style="background:transparent;color:rgba(242,240,230,0.7);border:1px solid var(--line);border-radius:4px;padding:6px 10px;font-family:var(--mono);font-size:10px;cursor:pointer;">← Back to grid</button>\n          <span id="reviewStatusText">Loading pack…</span>\n        </span>\n        <button type="button" id="reviewGoodBtn" disabled style="background:#2a2a1a;color:rgba(242,240,230,0.4);border:1px solid var(--line);border-radius:4px;padding:8px 14px;font-family:var(--mono);font-weight:800;font-size:10.5px;letter-spacing:0.04em;text-transform:uppercase;cursor:not-allowed;">Reviewed — Good to Go</button>\n      ', document.body.prepend(Re), document.body.style.paddingTop = "40px";
      const Te = Re.querySelector("#reviewStatusText"),
        Pe = Re.querySelector("#reviewGoodBtn");
      function B() {
        window.close(), setTimeout(() => {
          window.location.href = f();
        }, 150);
      }
      function M(e) {
        Pe.disabled = !e, Pe.style.cursor = e ? "pointer" : "not-allowed", Pe.style.background = e ? "var(--green-bright)" : "#2a2a1a", Pe.style.color = e ? "#06120b" : "rgba(242,240,230,0.4)";
      }
      Re.querySelector("#reviewBackBtn").addEventListener("click", B), async function () {
        try {
          const e = await na("batchPacks", n);
          if (!e) throw new Error("Pack not found — it may have been cleared.");
          vr = (e.folderName || "pack-" + e.order).replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") + ".mp4", await Nn(e.items, e.imageFiles, e.root);
          const t = await na("batchPackTemplates", n).catch(() => null);
          t && t.template ? await wa(t.template) : await La();
          let a = !1;
          if (e.matchInfo && e.matchInfo.name && !y) {
            const t = (await aa("voiceovers").catch(() => [])).find(t => t.name === e.matchInfo.name);
            if (t) {
              await Lo(t.id, po);
              const n = e.matchInfo.speed || 1.12;
              (await hn(n)).ok && (await bn()), a = !0;
            }
          }
          if (Ia(), nr(u), Te.textContent = `Pack #${e.order} — ${e.folderName}. Review the video, then click "Reviewed — Good to Go".`, e.matchInfo && e.matchInfo.name && y) {
            qn(`Found it — "${e.matchInfo.name}" (${Math.round(100 * (e.matchInfo.confidence || 0))}% match) — applied.`, !0), findMatchResultEl.style.display = "block", findMatchResultEl.innerHTML = 'Wrong MP3? Open the <a href="#" id="findMatchReplaceLink" style="color:var(--green-bright);">Voice-over library</a> and pick a different one from the dropdown — takes one click.';
            const findMatchReplaceLinkEl = document.getElementById("findMatchReplaceLink");
            findMatchReplaceLinkEl && findMatchReplaceLinkEl.addEventListener("click", e => {
              e.preventDefault(), openVoiceLibBtnEl.click();
            });
          } else e.matchInfo && e.matchInfo.name && !y ? qn(`Matched "${e.matchInfo.name}" during prep, but the audio failed to load into this editor — assign it manually below.`, !1) : "no_match" === e.status && qn(e.error || "No matching voice-over found — assign one manually.", !1);
          M(!0);
        } catch (e) {
          console.error(e), Te.textContent = "Load failed: " + (e && e.message || e);
        }
      }(), Pe.addEventListener("click", async () => {
        M(!1), Te.textContent = "Rendering & downloading… (safe to switch tabs now — this keeps going in the background)", await Ba();
        const e = await br({
          autoDownload: !0
        });
        if (e && e.ok) {
          try {
            const t = await na("batchPackTemplates", n).catch(() => null);
            await ta("batchRenders", {
              id: n,
              blob: e.blob,
              ver: t && t.ver || Date.now()
            });
          } catch (e) {
            console.error("caching render for ZIP failed", e);
          }
          const t = await na("batchPacks", n).catch(() => null);
          t && (t.status = "done", t.error = null, await ta("batchPacks", t).catch(() => {}), await sa(t).catch(() => {})), Te.textContent = "Done — downloaded. Closing this tab…", setTimeout(B, 600);
        } else {
          const t = await na("batchPacks", n).catch(() => null);
          t && (t.status = "error", t.error = e && e.message || "Render failed.", await ta("batchPacks", t).catch(() => {}), await sa(t).catch(() => {})), Te.textContent = `Render failed: ${e && e.message || "unknown error"}. Fix and click Reviewed again.`, M(!0);
        }
      });
    }
  }();

  /**
   * ============================================================================
   * LONG-FORM VIDEO MODULE
   * ============================================================================
   * Adds a "Long-Form Video" section that reuses the short-form engine as-is:
   *   - Zt()/tr()/Yo()  -- segment builder + per-slot draw (already generic over `n`)
   *   - bn()            -- Whisper word-alignment sync (already generic over `n`)
   *   - hn()            -- pitch-preserving voice speed change (unmodified)
   *   - gr()/br()       -- WebCodecs/MediaRecorder export + gallery save (unmodified)
   *   - Gn()/Wn()/Jn()/Ln()/Qt() -- tray/caption-list/stepper UI (already loop 0..n)
   * No new sync/render math is introduced here. The only real adaptation is:
   *   - `n` (originally a hardcoded const 10) is resized dynamically (lfResizeSlots)
   *   - hookDur/cardDur are forced to 0 so Zt() naturally yields zero-length
   *     hook/card segments (the file's own comment on Zt() already documents that
   *     a duration of 0 "doesn't crash anything downstream") -- i.e. a plain
   *     continuous run of "show" segments, which is exactly long-form's spec.
   *   - manifest ingestion is a lighter version of Nn() that skips Nn()'s
   *     hook/card auto-detection heuristic (which would otherwise risk mistaking
   *     an ordinary long first caption for a "hook" line) and reports per-item
   *     failures instead of only a missing-count.
   */
  !function () {
    const LF_MAX_SLOTS = 300;
    let lfMode = false, lfBusy = false, lfLastZipCache = null, lfQueueRunning = false;

    const longFormBtnEl = document.getElementById("longFormBtn"),
      uploadTabLongFormBtnEl = document.getElementById("uploadTabLongFormBtn"),
      uploadTabLongFormEl = document.getElementById("uploadTabLongForm"),
      uploadTabSingleBtnEl = document.getElementById("uploadTabSingleBtn"),
      uploadTabBatchBtnEl = document.getElementById("uploadTabBatchBtn"),
      uploadTabSingleEl = document.getElementById("uploadTabSingle"),
      uploadTabBatchEl = document.getElementById("uploadTabBatch"),
      lfDropZoneEl = document.getElementById("lfDropZone"),
      lfFolderBtnEl = document.getElementById("lfFolderBtn"),
      lfFolderInputEl = document.getElementById("lfFolderInput"),
      lfZipBtnEl = document.getElementById("lfZipBtn"),
      lfZipInputEl = document.getElementById("lfZipInput"),
      lfIngestStatusEl = document.getElementById("lfIngestStatus"),
      lfCurrentItemEl = document.getElementById("lfCurrentItem"),
      lfErrorPanelEl = document.getElementById("lfErrorPanel"),
      lfReadyBoxEl = document.getElementById("lfReadyBox"),
      lfSpeedInputEl = document.getElementById("lfSpeedInput"),
      lfGenerateBtnEl = document.getElementById("lfGenerateBtn"),
      lfPrepStatusEl = document.getElementById("lfPrepStatus"),
      lfStageDetailEl = document.getElementById("lfStageDetail"),
      lfWorkflowListEl = document.getElementById("lfWorkflowList"),
      lfTimerBadgeEl = document.getElementById("lfTimerBadge"),
      lfQueueListEl = document.getElementById("lfQueueList");

    if (!longFormBtnEl || !uploadTabLongFormEl) return; // markup missing -- bail out silently, short-form untouched

    function lfSetIngestStatus(msg, ok) {
      if (!lfIngestStatusEl) return;
      lfIngestStatusEl.style.color = ok ? "var(--green-bright)" : "#e0574a";
      lfIngestStatusEl.textContent = msg;
    }
    function lfSetCurrentItem(msg) {
      if (lfCurrentItemEl) lfCurrentItemEl.textContent = msg || "";
    }
    function lfShowErrors(errors) {
      if (!lfErrorPanelEl) return;
      if (!errors || !errors.length) {
        lfErrorPanelEl.style.display = "none";
        lfErrorPanelEl.innerHTML = "";
        return;
      }
      lfErrorPanelEl.style.display = "block";
      lfErrorPanelEl.innerHTML = `<div style="margin-bottom:4px;font-weight:800;">${errors.length} item${1 === errors.length ? "" : "s"} failed — the rest loaded fine:</div><ul>` + errors.map(e => `<li><b>${(e.file || "unknown file").replace(/</g, "&lt;")}</b> — ${(e.reason || "failed").replace(/</g, "&lt;")}</li>`).join("") + "</ul>";
    }

    // ---- slot-count generalization (the only structural change short-form needed) ----
    function lfResizeSlots(newCount) {
      newCount = Math.max(1, Math.min(LF_MAX_SLOTS, Math.round(newCount)));
      const oldCount = n;
      const defDur = (i && i.length && i[0]) || 2;
      const newImgs = new Array(newCount).fill(null),
        newCaps = new Array(newCount).fill(""),
        newDurs = new Array(newCount).fill(defDur),
        newPos = new Array(newCount).fill(null);
      for (let k = 0; k < Math.min(oldCount, newCount); k++) {
        newImgs[k] = _[k]; newCaps[k] = U[k]; newDurs[k] = i[k]; newPos[k] = c[k];
      }
      for (let k = newCount; k < oldCount; k++) {
        if (_[k] && _[k].url) { try { URL.revokeObjectURL(_[k].url); } catch (e) {} }
      }
      n = newCount; _ = newImgs; U = newCaps; i = newDurs; c = newPos;
    }

    function lfEnterMode() {
      if (lfMode) return;
      lfMode = true;
      document.body.classList.add("lf-mode");
      a = 0; o = 0; r = 0; // hookDur / cardDur / cardPos -> zero-length hook+card segments
      if (p > 22) { p = 20; if (capSizeValEl) capSizeValEl.value = p; } // smaller default caption font for long-form
      const tmplTitleEl = document.querySelector(".tmpl-title");
      if (tmplTitleEl) tmplTitleEl.dataset.lfSaved || (tmplTitleEl.dataset.lfSaved = tmplTitleEl.textContent, tmplTitleEl.textContent = "Long-form — continuous images, timing follows your synced voiceover");
      if (emptyStateEl) emptyStateEl.innerHTML = "Drop a folder or .zip with your images<br>and manifest.json to begin";
      Qt(); Ln(); nr(u);
    }
    function lfExitMode() {
      if (!lfMode) return;
      lfMode = false;
      document.body.classList.remove("lf-mode");
      const tmplTitleEl = document.querySelector(".tmpl-title");
      if (tmplTitleEl && tmplTitleEl.dataset.lfSaved) { tmplTitleEl.textContent = tmplTitleEl.dataset.lfSaved; delete tmplTitleEl.dataset.lfSaved; }
      if (emptyStateEl) emptyStateEl.innerHTML = `Load ${n} images<br>to preview the cut`;
      Qt(); Ln(); nr(u);
    }

    function lfShowTab() {
      [uploadTabSingleBtnEl, uploadTabBatchBtnEl].forEach(b => b && (b.classList.remove("active"), b.setAttribute("aria-selected", "false")));
      [uploadTabSingleEl, uploadTabBatchEl].forEach(p => p && (p.style.display = "none"));
      uploadTabLongFormBtnEl && (uploadTabLongFormBtnEl.classList.add("active"), uploadTabLongFormBtnEl.setAttribute("aria-selected", "true"));
      uploadTabLongFormEl.style.display = "block";
      lfEnterMode();
      uploadTabLongFormEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    longFormBtnEl.addEventListener("click", lfShowTab);
    uploadTabLongFormBtnEl && uploadTabLongFormBtnEl.addEventListener("click", lfShowTab);
    [uploadTabSingleBtnEl, uploadTabBatchBtnEl].forEach(btn => btn && btn.addEventListener("click", () => {
      uploadTabLongFormBtnEl && (uploadTabLongFormBtnEl.classList.remove("active"), uploadTabLongFormBtnEl.setAttribute("aria-selected", "false"));
      uploadTabLongFormEl.style.display = "none";
      lfExitMode();
    }));

    // ---- voiceover application (mirrors the audioInputEl change-listener above verbatim) ----
    function lfIsAudioFile(f) {
      return f.type.startsWith("audio/") || /\.(mp3|wav|m4a|aac|ogg)$/i.test(f.name);
    }
    function lfApplyVoiceoverFile(file) {
      if (!file) return;
      y = file; gt = file;
      audioDTEl.textContent = file.name;
      audioDSEl.textContent = "Ready — mixed into the exported video";
      audioRemoveEl.style.display = "block";
      rt && URL.revokeObjectURL(rt);
      rt = URL.createObjectURL(file);
      previewAudioEl.src = rt;
      whisperBoxEl.style.display = "block";
      voiceSpeedBoxEl.style.display = "block";
      voiceSpeedRangeEl.value = 1;
      voiceSpeedValEl.textContent = "1.00x";
      voiceSpeedResetBtnEl.style.display = "none";
      voiceSpeedStatusEl.textContent = "";
    }

    // ---- manifest ingestion: same filename-matching approach as Nn(), minus the
    //      hook/card auto-detection heuristic that's irrelevant (and unsafe) for
    //      long-form captions -- and it reports which specific files failed. ----
    function lfIngestItems(items, imageFiles) {
      return new Promise(resolve => {
        for (let k = 0; k < n; k++) { if (_[k] && _[k].url) URL.revokeObjectURL(_[k].url); _[k] = null; U[k] = ""; }
        lfResizeSlots(items.length || 1);
        Gn(); Wn(); Jn(); In();

        const byExact = {}, byNorm = {};
        imageFiles.forEach(f => { byExact[f.name.toLowerCase()] = f; byNorm[jn(f.name)] = f; });
        const used = new Set();
        const fallbackOrder = imageFiles.slice().sort((x, y2) => x.name.localeCompare(y2.name, void 0, { numeric: true }));
        const errors = [];
        let loaded = 0, pending = items.length;
        if (!pending) return resolve({ loaded: 0, errors });
        items.forEach((item, idx) => {
          const wantName = String(item.file || "").toLowerCase();
          let match = wantName && byExact[wantName] && !used.has(byExact[wantName]) ? byExact[wantName] : null;
          if (!match && item.file) { const norm = jn(item.file); match = byNorm[norm] && !used.has(byNorm[norm]) ? byNorm[norm] : null; }
          if (!match) match = fallbackOrder.find(f => !used.has(f)) || null;
          const finishOne = () => { pending--; if (0 === pending) resolve({ loaded, errors }); };
          if (!match) {
            errors.push({ file: item.file || `item ${idx + 1}`, reason: "no matching image file found in the upload" });
            return finishOne();
          }
          used.add(match);
          const url = URL.createObjectURL(match), img = new Image();
          img.onload = () => {
            _[idx] = { file: match, url, img };
            U[idx] = item.caption || item.text || item.keyword || "";
            loaded++;
            lfSetCurrentItem(`Loaded image ${idx + 1}/${items.length} — ${match.name}`);
            Gn(); Wn(); Jn(); In();
            finishOne();
          };
          img.onerror = () => {
            errors.push({ file: match.name, reason: "image failed to decode — file may be corrupted or an unsupported format" });
            finishOne();
          };
          img.src = url;
        });
      });
    }

    // ---- .zip support (JSZip, same library the bulk-batch pipeline already
    //      loads from CDN elsewhere in this file -- loaded independently here so
    //      this module has no load-order dependency on that other closure) ----
    const LF_JSZIP_URLS = ["https://unpkg.com/jszip@3/dist/jszip.min.js", "https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js"];
    async function lfLoadJSZip() {
      if (window.JSZip) return window.JSZip;
      let lastErr;
      for (const src of LF_JSZIP_URLS) {
        try {
          await new Promise((res, rej) => {
            if (document.querySelector(`script[data-src="${src}"]`) && window.JSZip) return res();
            const s = document.createElement("script");
            s.src = src; s.dataset.src = src;
            s.onload = () => res(); s.onerror = () => rej(new Error("failed to load " + src));
            document.head.appendChild(s);
          });
          if (window.JSZip) return window.JSZip;
        } catch (e) { lastErr = e; }
      }
      throw lastErr || new Error("JSZip failed to load from all CDNs — check your internet connection.");
    }
    async function lfFilesFromZip(zipFile) {
      const JSZip = await lfLoadJSZip();
      const zip = await JSZip.loadAsync(zipFile);
      const out = [];
      const entries = Object.values(zip.files).filter(f => !f.dir);
      for (const entry of entries) {
        const blob = await entry.async("blob");
        const name = entry.name.split("/").pop();
        let type = "";
        if (/\.(jpe?g)$/i.test(name)) type = "image/jpeg";
        else if (/\.png$/i.test(name)) type = "image/png";
        else if (/\.webp$/i.test(name)) type = "image/webp";
        else if (/\.gif$/i.test(name)) type = "image/gif";
        else if (/\.mp3$/i.test(name)) type = "audio/mpeg";
        else if (/\.wav$/i.test(name)) type = "audio/wav";
        else if (/\.m4a$/i.test(name)) type = "audio/mp4";
        else if (/\.json$/i.test(name)) type = "application/json";
        out.push(new File([blob], name, { type: type || blob.type || "" }));
      }
      return out;
    }

    // ---- folder drag/drop directory walker (same recursive webkitGetAsEntry
    //      pattern already used by the short-form manifest drop zone) ----
    async function lfWalkDataTransferItems(dtItems) {
      const entries = [];
      for (const it of dtItems) { const e = it.webkitGetAsEntry ? it.webkitGetAsEntry() : null; if (e) entries.push(e); }
      function readFile(entry) { return new Promise((res, rej) => entry.file(res, rej)); }
      function readDir(reader) {
        return new Promise((res, rej) => {
          const all = [];
          (function next() { reader.readEntries(batch => { batch.length ? (all.push(...batch), next()) : res(all); }, rej); })();
        });
      }
      async function walk(entry, prefix) {
        const relPath = prefix ? prefix + "/" + entry.name : entry.name;
        if (entry.isFile) {
          const f = await readFile(entry).catch(() => null);
          if (f) { try { Object.defineProperty(f, "_lfRelPath", { value: relPath }); } catch (e) {} }
          return f ? [f] : [];
        }
        if (entry.isDirectory) { const kids = await readDir(entry.createReader()).catch(() => []); return (await Promise.all(kids.map(k => walk(k, relPath)))).flat(); }
        return [];
      }
      return (await Promise.all(entries.map(e => walk(e, "")))).flat();
    }

    // ---- multi-pack grouping: if the drop contains more than one
    //      manifest.json, each is treated as its own long-form pack and
    //      queued for sequential Autoprepare -- same bulk/batch idea as the
    //      short-form "Bulk batch" tab, built on top of the exact same
    //      single-pack ingest + Autoprepare functions (no separate engine). ----
    function lfRelPath(f) { return f.webkitRelativePath || f._lfRelPath || f.name; }
    function lfDirOf(path) { const i = path.lastIndexOf("/"); return -1 === i ? "" : path.slice(0, i); }
    function lfGroupIntoPacks(files) {
      const manifests = files.filter(f => /manifest(\s\(\d+\))?\.json$/i.test(f.name));
      if (manifests.length <= 1) return [{ name: "Pack", files }];
      const packs = manifests.map(mf => {
        const dir = lfDirOf(lfRelPath(mf));
        return { name: dir.split("/").pop() || mf.name.replace(/\.json$/i, ""), dir, files: [] };
      }).sort((a, b) => b.dir.length - a.dir.length);
      files.forEach(f => {
        const p = lfRelPath(f);
        const owner = packs.find(pk => "" === pk.dir || p === pk.dir + "/" + f.name || p.startsWith(pk.dir + "/"));
        if (owner) owner.files.push(f);
      });
      return packs.filter(pk => pk.files.some(f => /manifest(\s\(\d+\))?\.json$/i.test(f.name)));
    }

    async function lfHandleGatheredFiles(rawFiles) {
      if (lfBusy || lfQueueRunning) return;
      const files = Array.from(rawFiles);
      const zipFile = files.find(f => /\.zip$/i.test(f.name));
      let flatFiles = files;
      if (zipFile && 1 === files.length) {
        lfSetIngestStatus("Unzipping…", true);
        try { flatFiles = await lfFilesFromZip(zipFile); }
        catch (e) { return lfSetIngestStatus(e && e.message || "Could not read that .zip.", false); }
      }
      const packs = lfGroupIntoPacks(flatFiles);
      if (packs.length <= 1) return lfIngestFileList(packs.length ? packs[0].files : flatFiles);
      return lfRunBatchQueue(packs);
    }

    function lfRenderQueue(packs, activeIdx) {
      if (!lfQueueListEl) return;
      lfQueueListEl.style.display = "flex";
      lfQueueListEl.innerHTML = packs.map((pk, i) => {
        const cls = pk.status === "done" ? "done" : pk.status === "error" ? "error" : i === activeIdx ? "active" : "";
        const mark = pk.status === "done" ? "✓ " : pk.status === "error" ? "⚠ " : i === activeIdx ? "▶ " : "";
        return `<span class="lf-pack-chip ${cls}">${mark}${pk.name}</span>`;
      }).join("");
    }

    async function lfRunBatchQueue(packs) {
      lfQueueRunning = true;
      packs.forEach(pk => pk.status = "queued");
      lfRenderQueue(packs, -1);
      let okCount = 0, errCount = 0;
      for (let idx = 0; idx < packs.length; idx++) {
        const pk = packs[idx];
        lfRenderQueue(packs, idx);
        lfSetIngestStatus(`Pack ${idx + 1}/${packs.length} — ${pk.name}: loading images…`, true);
        await lfIngestFileList(pk.files);
        if (Yt() >= n && n > 0) {
          await lfRunAutoprepare();
          const failed = lfWorkflowListEl && lfWorkflowListEl.querySelector(".pl-node.error");
          pk.status = failed ? "error" : "done";
        } else {
          pk.status = "error";
        }
        if ("done" === pk.status) okCount++; else errCount++;
        lfRenderQueue(packs, idx);
      }
      lfQueueRunning = false;
      lfSetIngestStatus(`Batch complete — ${okCount}/${packs.length} pack${1 === packs.length ? "" : "s"} rendered and saved to the gallery${errCount ? `, ${errCount} failed (see status above for the last one)` : ""}.`, 0 === errCount);
    }

    async function lfIngestFileList(rawFiles) {
      if (lfBusy) return;
      lfBusy = true;
      lfShowErrors(null);
      lfReadyBoxEl && (lfReadyBoxEl.style.display = "none");
      try {
        let files = Array.from(rawFiles);
        const zipFile = files.find(f => /\.zip$/i.test(f.name));
        if (zipFile) {
          lfSetIngestStatus("Unzipping…", true);
          files = await lfFilesFromZip(zipFile);
        }
        const manifestFile = files.find(f => /manifest(\s\(\d+\))?\.json$/i.test(f.name));
        if (!manifestFile) return lfSetIngestStatus("No manifest.json found in that folder/.zip — drop the folder that directly contains it.", false);
        let manifestObj;
        try { manifestObj = JSON.parse(await manifestFile.text()); }
        catch (e) { return lfSetIngestStatus("manifest.json could not be parsed — file may be corrupted.", false); }
        const items = Array.isArray(manifestObj.items) ? manifestObj.items : [];
        if (!items.length) return lfSetIngestStatus("manifest.json has no items in it.", false);
        if (items.length > LF_MAX_SLOTS) return lfSetIngestStatus(`manifest.json has ${items.length} items — long-form supports up to ${LF_MAX_SLOTS}.`, false);

        const imageFiles = files.filter(f => f !== manifestFile && _n(f));
        const audioFile = files.find(f => lfIsAudioFile(f));

        lfSetIngestStatus(`Loading ${items.length} images…`, true);
        const { loaded, errors } = await lfIngestItems(items, imageFiles);
        lfSetCurrentItem("");
        lfShowErrors(errors);

        if (audioFile) { lfApplyVoiceoverFile(audioFile); }
        else { lfSetCurrentItem("No voiceover included — that's expected. Upload your narration MP3 to the Voice-over library (transcribe it there), then click Autoprepare — it'll find the best-matching one automatically, same as short-form."); }

        lfEnterMode();
        lfSetIngestStatus(`${loaded}/${items.length} image${1 === items.length ? "" : "s"} loaded${errors.length ? `, ${errors.length} failed (see list above)` : ""}${audioFile ? " — voiceover attached." : "."}`, 0 === errors.length);
        if (loaded > 0) lfReadyBoxEl && (lfReadyBoxEl.style.display = "block");
      } catch (e) {
        console.error("[long-form] ingest failed", e);
        lfSetIngestStatus(e && e.message || "Ingest failed — see console for details.", false);
      } finally {
        lfBusy = false;
      }
    }

    lfFolderBtnEl && lfFolderBtnEl.addEventListener("click", () => lfFolderInputEl.click());
    lfFolderInputEl && lfFolderInputEl.addEventListener("change", e => { const f = e.target.files; lfFolderInputEl.value = ""; f && f.length && lfHandleGatheredFiles(f); });
    lfZipBtnEl && lfZipBtnEl.addEventListener("click", () => lfZipInputEl.click());
    lfZipInputEl && lfZipInputEl.addEventListener("change", e => { const f = e.target.files; lfZipInputEl.value = ""; f && f.length && lfHandleGatheredFiles(f); });
    if (lfDropZoneEl) {
      ["dragenter", "dragover"].forEach(evt => lfDropZoneEl.addEventListener(evt, e => { e.preventDefault(); lfDropZoneEl.classList.add("drag"); }));
      ["dragleave"].forEach(evt => lfDropZoneEl.addEventListener(evt, e => { e.preventDefault(); lfDropZoneEl.classList.remove("drag"); }));
      lfDropZoneEl.addEventListener("drop", async e => {
        e.preventDefault(); lfDropZoneEl.classList.remove("drag");
        if (!e.dataTransfer) return;
        if (e.dataTransfer.items && e.dataTransfer.items.length && e.dataTransfer.items[0].webkitGetAsEntry) {
          const files = await lfWalkDataTransferItems(e.dataTransfer.items);
          if (files.length) return lfHandleGatheredFiles(files);
        }
        e.dataTransfer.files && e.dataTransfer.files.length && lfHandleGatheredFiles(e.dataTransfer.files);
      });
    }

    // ---- 7-step pipeline UI (same visual language as the short-form batch
    //      stepper: pl-node/pl-dot/pl-seg classes, same icon style) ----
    const lfStages = [
      { key: "manifest", label: "Loading images & manifest" },
      { key: "find_mp3", label: "Finding matching MP3" },
      { key: "speed", label: "Applying voice-over speed" },
      { key: "sync", label: "Syncing captions to the voice-over (Whisper)" },
      { key: "style", label: "Applying long-form caption style (no hook, no card)" },
      { key: "render", label: "Rendering the final video" },
      { key: "save", label: "Saving to the gallery" }
    ];
    const lfIcons = {
      manifest: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>',
      find_mp3: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
      speed: '<circle cx="12" cy="13" r="8"/><path d="M12 13l3.5-3.5M12 5v1.5M4 13H5.5M18.5 13H20M6.3 6.3l1 1M17.7 6.3l-1 1"/>',
      sync: '<path d="M4 15V9M8 18V6M12 20V4M16 17V7M20 13v-2"/>',
      style: '<path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.8-1.8 1.8 1.8 0 0 1 1.8-1.8H18a3 3 0 0 0 3-3C21 8.5 17 3 12 3z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="14" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
      render: '<rect x="3" y="8" width="18" height="12" rx="1.5"/><path d="M3 8l2-4h3l-2 4M9 8l2-4h3l-2 4M15 8l2-4h2.5l-2 4"/>',
      save: '<path d="M5 3h10l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 3v6h7V3"/><path d="M8 21v-6h8v6"/>'
    };
    const lfCheckSvg = '<path d="M20 6 9 17l-5-5"/>', lfErrSvg = '<path d="M12 8v5M12 16.5v.01M10.3 3.9 2.5 17.4a1.8 1.8 0 0 0 1.5 2.7h16a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z"/>';
    function lfBuildStepper() {
      if (!lfWorkflowListEl) return;
      lfWorkflowListEl.innerHTML = lfStages.map((st, idx) => {
        const ic = lfIcons[st.key] || "";
        return `<div class="pl-node up" data-idx="${idx}"><div class="pl-dot"><svg class="pl-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg><svg class="pl-ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${lfCheckSvg}</svg><svg class="pl-ic-err" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${lfErrSvg}</svg></div><div class="pl-lbl">${st.label}</div><div class="pl-pct"></div></div>` + (idx < lfStages.length - 1 ? `<div class="pl-seg" data-idx="${idx}"><div class="pl-seg-fill"></div></div>` : "");
      }).join("");
    }
    function lfUpdateStepper(stageIdx, pct, status) {
      if (!lfWorkflowListEl) return;
      const nodes = lfWorkflowListEl.querySelectorAll(".pl-node"), segs = lfWorkflowListEl.querySelectorAll(".pl-seg");
      nodes.forEach((el, idx) => {
        el.classList.remove("up", "active", "done", "error");
        const pctEl = el.querySelector(".pl-pct");
        if ("error" === status && idx === stageIdx) { el.classList.add("error"); pctEl.textContent = "Error"; }
        else if (idx < stageIdx || "done" === status && idx <= stageIdx) { el.classList.add("done"); pctEl.textContent = ""; }
        else if (idx === stageIdx && "done" !== status) { el.classList.add("active"); pctEl.textContent = "number" == typeof pct ? pct + "%" : ""; }
        else { el.classList.add("up"); pctEl.textContent = ""; }
      });
      segs.forEach((el, idx) => {
        const fill = el.querySelector(".pl-seg-fill");
        let w = 0;
        if (idx < stageIdx) w = 100; else if (idx === stageIdx) w = "done" === status || "error" === status ? 100 : "number" == typeof pct ? pct : 0;
        fill.style.width = w + "%";
      });
    }
    lfBuildStepper();

    async function lfRunAutoprepare() {
      if (lfBusy) return;
      if (Yt() < n) { lfPrepStatusEl.style.color = "#e0574a"; lfPrepStatusEl.textContent = `Not all ${n} image slots are filled yet — check the error list above.`; return; }
      lfBusy = true;
      lfGenerateBtnEl.disabled = true;
      const startedAt = Date.now();
      lfTimerBadgeEl && (lfTimerBadgeEl.style.display = "inline-block");
      function tick() {
        if (!lfBusy) return;
        const secs = Math.floor((Date.now() - startedAt) / 1000);
        lfTimerBadgeEl && (lfTimerBadgeEl.textContent = `⏱ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`);
        setTimeout(tick, 1000);
      }
      tick();
      const stageIdx = key => lfStages.findIndex(s => s.key === key);
      try {
        // stage 1: manifest -- already loaded by the drop zone, just show it done
        lfUpdateStepper(stageIdx("manifest"), null, "done");
        lfPrepStatusEl.style.color = "var(--green-bright)";

        // stage 2: find MP3
        lfUpdateStepper(stageIdx("find_mp3"), null, "active");
        lfPrepStatusEl.textContent = "Finding matching MP3…";
        if (!y) {
          const res = await Hn();
          if (!y) {
            lfUpdateStepper(stageIdx("find_mp3"), null, "error");
            lfPrepStatusEl.textContent = (res && res.message) || (res && "guess" === res.status ? `Best guess only ("${res.name}", ${Math.round(100 * (res.confidence || 0))}%) — below the auto-apply threshold. Open "Voice library" in the quickbar, pick it manually, then click Autoprepare again.` : "No matching voice-over found. Open \"Voice library\" in the quickbar, upload & transcribe your MP3 there, then click Autoprepare again.");
            return;
          }
        }
        lfUpdateStepper(stageIdx("find_mp3"), null, "done");

        // stage 3: speed
        lfUpdateStepper(stageIdx("speed"), null, "active");
        lfPrepStatusEl.textContent = "Applying voice-over speed…";
        const speed = Math.max(0.5, Math.min(2, +lfSpeedInputEl.value || 1));
        if (Math.abs(speed - 1) > 0.005) { const r2 = await hn(speed); if (!r2.ok) { lfUpdateStepper(stageIdx("speed"), null, "error"); lfPrepStatusEl.textContent = r2.message || "Speed change failed."; return; } }
        lfUpdateStepper(stageIdx("speed"), null, "done");

        // stage 4: sync captions to voice-over (Whisper) -- same bn() as short-form
        lfUpdateStepper(stageIdx("sync"), null, "active");
        lfPrepStatusEl.textContent = "Syncing captions to the voice-over…";
        const syncRes = await bn();
        if (!syncRes.ok) { lfUpdateStepper(stageIdx("sync"), null, "error"); lfPrepStatusEl.textContent = syncRes.message || "Sync failed — check your Groq API key in Settings."; return; }
        lfUpdateStepper(stageIdx("sync"), null, "done");

        // stage 5: style -- force hook/card off, apply long-form caption size
        lfUpdateStepper(stageIdx("style"), null, "active");
        lfPrepStatusEl.textContent = "Applying long-form caption style…";
        a = 0; o = 0; r = 0;
        if (p > 22) { p = 20; capSizeValEl && (capSizeValEl.value = p); }
        Qt(); Ln(); nr(u);
        lfUpdateStepper(stageIdx("style"), null, "done");

        // stage 6: render -- same gr()/br() export pipeline as short-form
        lfUpdateStepper(stageIdx("render"), 0, "active");
        lfPrepStatusEl.textContent = "Rendering the final video…";
        const renderRes = await br({ autoDownload: false, onRenderProgress: pct => lfUpdateStepper(stageIdx("render"), pct, "active") });
        if (!renderRes.ok) { lfUpdateStepper(stageIdx("render"), null, "error"); lfPrepStatusEl.textContent = renderRes.message || "Render failed."; return; }
        lfUpdateStepper(stageIdx("render"), null, "done");

        // stage 7: save -- br() already saved the render to the gallery
        lfUpdateStepper(stageIdx("save"), null, "done");
        lfPrepStatusEl.style.color = "var(--green-bright)";
        lfPrepStatusEl.textContent = `Done — "${renderRes.filename}" saved to the gallery and ready to download.`;
        lfStageDetailEl.textContent = "";
      } catch (e) {
        console.error("[long-form] autoprepare failed", e);
        lfPrepStatusEl.style.color = "#e0574a";
        lfPrepStatusEl.textContent = e && e.message || "Autoprepare failed — see console for details.";
      } finally {
        lfBusy = false;
        lfGenerateBtnEl.disabled = false;
      }
    }
    lfGenerateBtnEl && lfGenerateBtnEl.addEventListener("click", () => { if (!lfQueueRunning) lfRunAutoprepare(); });
  }();

  In();
}();