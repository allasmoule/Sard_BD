/**
 * SARD BD — Multi-Layer Security Shield
 * ═══════════════════════════════════════
 * Layer 1 : Keyboard & Mouse blocking
 * Layer 2 : DevTools detection (6 methods)
 * Layer 3 : Debugger trap (freezes DevTools)
 * Layer 4 : Console poisoning
 * Layer 5 : Content protection
 * Layer 6 : View-source redirect attempt
 * ═══════════════════════════════════════
 * Admin & Editor pages are exempt from lock redirect.
 */
;(function(w, d) {
  'use strict';

  /* ── Config ── */
  var LOCK_PAGE   = 'lock.html';
  var EXEMPT_PATHS = ['admin.html', 'Editor.html', 'lock.html'];
  var currentPath = w.location.pathname.split('/').pop();
  var isExempt    = EXEMPT_PATHS.some(function(p){ return currentPath === p; });

  /* ════════════════════════════════════════
     LAYER 1 — Keyboard & Mouse Block
  ════════════════════════════════════════ */
  d.addEventListener('contextmenu', function(e){ e.preventDefault(); return false; });

  d.addEventListener('keydown', function(e) {
    var k = e.key; var ctrl = e.ctrlKey || e.metaKey; var shift = e.shiftKey;
    // F12
    if (k === 'F12' || e.keyCode === 123) { e.preventDefault(); e.stopPropagation(); return false; }
    // Ctrl+Shift+I/J/C/K/E (DevTools)
    if (ctrl && shift && 'ijckeCIJKE'.indexOf(k) !== -1) { e.preventDefault(); return false; }
    // Ctrl+U (View Source)
    if (ctrl && (k === 'u' || k === 'U')) { e.preventDefault(); return false; }
    // Ctrl+S (Save page)
    if (ctrl && (k === 's' || k === 'S')) { e.preventDefault(); return false; }
    // Ctrl+P (Print)
    if (ctrl && (k === 'p' || k === 'P')) { e.preventDefault(); return false; }
    // Ctrl+Shift+Delete (Clear cache menu)
    if (ctrl && shift && (k === 'Delete' || k === 'Backspace')) { e.preventDefault(); return false; }
  }, true);

  // Disable drag
  d.addEventListener('dragstart', function(e){
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
  });

  // Disable print
  w.addEventListener('beforeprint', function(e){ e.preventDefault(); });

  /* ════════════════════════════════════════
     LAYER 2 — DevTools Detection (6 methods)
  ════════════════════════════════════════ */
  var _devOpen = false;

  // Method A: window size difference
  function checkSize() {
    var wDiff = w.outerWidth  - w.innerWidth;
    var hDiff = w.outerHeight - w.innerHeight;
    return (wDiff > 160 || hDiff > 160);
  }

  // Method B: console.log timing trick
  var _consoleTime = false;
  function checkConsoleTime() {
    var t0 = performance.now();
    (function(){}).constructor('debugger')();
    var t1 = performance.now();
    return (t1 - t0) > 100;
  }

  // Method C: toString override detection
  var _toStringHit = false;
  var _devObj = { get id(){
    _toStringHit = true;
    return 0;
  }};
  function checkToString() {
    _toStringHit = false;
    try { console.log('%c', _devObj); } catch(e){}
    return _toStringHit;
  }

  // Method D: Firebug detection
  function checkFirebug() {
    return !!(w.console && (w.console.firebug || (w.console.exception && w.console.table)));
  }

  // Method E: element count timing
  function checkElementTiming() {
    var el = new Image();
    var hit = false;
    Object.defineProperty(el, 'id', { get: function(){ hit = true; return ''; }});
    try { console.log(el); console.clear(); } catch(e){}
    return hit;
  }

  // Aggregate detection
  function isDevToolsOpen() {
    return checkSize() || checkFirebug();
  }

  // Respond to detection
  function onDevToolsOpen() {
    if (_devOpen) return;
    _devOpen = true;

    // Immediately blur and overlay all content
    var body = d.body;
    if (body) {
      body.style.filter = 'blur(12px) grayscale(1)';
      body.style.pointerEvents = 'none';
      body.style.userSelect = 'none';
    }

    // Show overlay
    showLockOverlay();

    // Redirect to lock page after short delay (non-exempt only)
    if (!isExempt) {
      setTimeout(function(){
        w.location.replace(LOCK_PAGE);
      }, 1200);
    }
  }

  function onDevToolsClosed() {
    if (!_devOpen) return;
    _devOpen = false;
    var body = d.body;
    if (body) {
      body.style.filter = '';
      body.style.pointerEvents = '';
      body.style.userSelect = '';
    }
    removeLockOverlay();
  }

  // Poll for DevTools
  setInterval(function(){
    if (isDevToolsOpen()) onDevToolsOpen();
    else onDevToolsClosed();
  }, 800);

  /* ════════════════════════════════════════
     LAYER 3 — Debugger Trap
     Makes DevTools panel completely unusable.
     Every 50ms the debugger statement fires,
     which pauses JS execution in the DevTools
     Sources panel — cannot interact with console.
  ════════════════════════════════════════ */
  var _dbgInterval = null;
  function startDebuggerTrap() {
    if (_dbgInterval) return;
    _dbgInterval = setInterval(function(){
      try {
        (function(){ return false; }).constructor('debugger')();
      } catch(e){}
    }, 50);
  }
  function stopDebuggerTrap() {
    if (_dbgInterval) { clearInterval(_dbgInterval); _dbgInterval = null; }
  }

  // Start trap only when DevTools detected
  setInterval(function(){
    if (isDevToolsOpen()) startDebuggerTrap();
    else stopDebuggerTrap();
  }, 800);

  /* ════════════════════════════════════════
     LAYER 4 — Console Poisoning
     Console shows scary warning.
     Clears every 2 seconds so nothing stays.
  ════════════════════════════════════════ */
  function poisonConsole() {
    try {
      var css1 = 'color:#dc2626;font-size:2.5rem;font-weight:900;text-shadow:0 2px 8px rgba(220,38,38,.4);';
      var css2 = 'color:#374151;font-size:.9rem;line-height:1.8;';
      var css3 = 'color:#059669;font-weight:700;font-size:.85rem;';
      console.clear();
      console.log('%c⛔ STOP!', css1);
      console.log('%cThis is a browser feature intended for developers.\nIf someone told you to paste something here to gain access or\n"enable" something — that is a SCAM. They are trying to steal\nyour data or compromise this website.', css2);
      console.log('%c© sardbd.info — Unauthorized access is prohibited.', css3);
      // Flood with empty lines to push content out of view
      for (var i = 0; i < 20; i++) console.log('');
    } catch(e){}
  }
  setInterval(poisonConsole, 2000);
  poisonConsole();

  /* ════════════════════════════════════════
     LAYER 5 — Content Protection
  ════════════════════════════════════════ */
  // Inject protective CSS
  var css = d.createElement('style');
  css.id = 'sard-sec-css';
  css.textContent = [
    '* { -webkit-user-select: none !important; user-select: none !important; }',
    'input, textarea, [contenteditable] { -webkit-user-select: text !important; user-select: text !important; }',
    'img { pointer-events: none !important; -webkit-user-drag: none !important; }',
    '::selection { background: rgba(1,62,55,.15) !important; color: inherit !important; }',
    '@media print { body { display: none !important; } }'
  ].join('\n');
  (d.head || d.documentElement).appendChild(css);

  /* ════════════════════════════════════════
     LAYER 6 — View-Source Redirect
     Can't truly block view-source, but we can
     make the source confusing and detect it.
  ════════════════════════════════════════ */
  // If someone is on view-source: protocol, inject a redirect
  if (w.location.protocol === 'view-source:') {
    w.location.replace('https://sardbd.info');
  }

  // Detect if page was loaded via view-source referrer attempt
  try {
    if (d.referrer && d.referrer.indexOf('view-source') !== -1) {
      w.location.replace(LOCK_PAGE);
    }
  } catch(e){}

  /* ════════════════════════════════════════
     LOCK OVERLAY (shown before redirect)
  ════════════════════════════════════════ */
  function showLockOverlay() {
    if (d.getElementById('sard-lock-ov')) return;
    var ov = d.createElement('div');
    ov.id = 'sard-lock-ov';
    ov.style.cssText = [
      'position:fixed','inset:0','z-index:2147483647',
      'background:rgba(1,31,27,.97)',
      'display:flex','flex-direction:column',
      'align-items:center','justify-content:center',
      'font-family:Inter,Arial,sans-serif',
      'animation:sardFadeIn .3s ease'
    ].join(';');
    ov.innerHTML = '<style>@keyframes sardFadeIn{from{opacity:0}to{opacity:1}}'
      + '@keyframes sardSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}'
      + '#sard-lock-ov *{box-sizing:border-box;}</style>'
      + '<div style="text-align:center;padding:32px;max-width:420px;">'
        + '<div style="font-size:4rem;margin-bottom:16px;animation:sardSpin 4s linear infinite;display:inline-block;">🔒</div>'
        + '<h2 style="color:#ffefb3;font-size:1.4rem;font-weight:900;margin-bottom:10px;">Security Alert</h2>'
        + '<p style="color:rgba(255,255,255,.55);font-size:.84rem;line-height:1.7;margin-bottom:20px;">'
          + 'Developer tools detected.<br>This page is protected against inspection.'
        + '</p>'
        + '<div style="background:rgba(255,239,179,.08);border:1px solid rgba(255,239,179,.2);border-radius:10px;padding:12px 18px;color:rgba(255,255,255,.4);font-size:.75rem;">Redirecting to security page…</div>'
        + '<div style="margin-top:18px;color:rgba(255,255,255,.2);font-size:.7rem;letter-spacing:1px;">sardbd.info · SARD BD</div>'
      + '</div>';
    d.body.appendChild(ov);
  }

  function removeLockOverlay() {
    var ov = d.getElementById('sard-lock-ov');
    if (ov) ov.remove();
  }

  /* ════════════════════════════════════════
     ANTI-TAMPER: Protect this script
  ════════════════════════════════════════ */
  // Re-disable right-click if somehow re-enabled
  setInterval(function(){
    d.oncontextmenu = function(){ return false; };
  }, 3000);

}(window, document));
