/**
 * SARD BD — Website Security Layer
 * Blocks DevTools, right-click, View Source, and console inspection.
 * NOTE: This is a deterrent layer. Server-side protection (PHP, .htaccess)
 *       is the primary security mechanism.
 */
(function(){
  'use strict';

  /* ── 1. Disable Right-Click ── */
  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    return false;
  });

  /* ── 2. Block keyboard shortcuts ── */
  document.addEventListener('keydown', function(e){
    var k = e.key || e.keyCode;
    var ctrl  = e.ctrlKey  || e.metaKey;
    var shift = e.shiftKey;

    // F12
    if(k === 'F12' || k === 123){ e.preventDefault(); return false; }

    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
    if(ctrl && shift && (k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c')){
      e.preventDefault(); return false;
    }

    // Ctrl+U (View Source)
    if(ctrl && (k==='U'||k==='u')){ e.preventDefault(); return false; }

    // Ctrl+S (Save page)
    if(ctrl && (k==='S'||k==='s')){ e.preventDefault(); return false; }

    // Ctrl+P (Print — reveals layout)
    if(ctrl && (k==='P'||k==='p')){ e.preventDefault(); return false; }
  });

  /* ── 3. Detect DevTools open (size-based) ── */
  var devtoolsOpen = false;
  var threshold = 160;

  function checkDevtools(){
    var widthDiff  = window.outerWidth  - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;
    if(widthDiff > threshold || heightDiff > threshold){
      if(!devtoolsOpen){
        devtoolsOpen = true;
        showSecurityOverlay();
      }
    } else {
      if(devtoolsOpen){
        devtoolsOpen = false;
        hideSecurityOverlay();
      }
    }
  }

  // Only run on non-admin pages
  if(window.location.pathname.indexOf('admin') === -1 &&
     window.location.pathname.indexOf('Editor') === -1){
    setInterval(checkDevtools, 1000);
  }

  /* ── 4. Security Overlay ── */
  function showSecurityOverlay(){
    var existing = document.getElementById('sard-sec-overlay');
    if(existing) return;
    var overlay = document.createElement('div');
    overlay.id = 'sard-sec-overlay';
    overlay.style.cssText = [
      'position:fixed','top:0','left:0','width:100%','height:100%',
      'background:rgba(1,62,55,.97)','z-index:999999',
      'display:flex','flex-direction:column',
      'align-items:center','justify-content:center',
      'font-family:Inter,sans-serif'
    ].join(';');
    overlay.innerHTML = [
      '<div style="text-align:center;padding:30px;max-width:400px;">',
        '<div style="font-size:3.5rem;margin-bottom:18px;">🔒</div>',
        '<h2 style="color:#ffefb3;font-size:1.3rem;font-weight:900;margin-bottom:10px;">Access Restricted</h2>',
        '<p style="color:rgba(255,255,255,.65);font-size:.85rem;line-height:1.7;margin-bottom:22px;">',
          'For security reasons, developer tools are disabled on this website. ',
          'Please close DevTools and refresh the page.',
        '</p>',
        '<div style="background:rgba(255,239,179,.12);border:1.5px solid rgba(255,239,179,.25);border-radius:10px;',
          'padding:12px 20px;color:#ffefb3;font-size:.75rem;">',
          '© SARD BD — sardbd.info',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    // Blur content behind
    var main = document.getElementById('mainContent') || document.querySelector('main') || document.body.firstElementChild;
    if(main && main.id !== 'sard-sec-overlay') main.style.filter = 'blur(8px)';
  }

  function hideSecurityOverlay(){
    var overlay = document.getElementById('sard-sec-overlay');
    if(overlay) overlay.remove();
    var main = document.getElementById('mainContent') || document.querySelector('main') || document.body.firstElementChild;
    if(main) main.style.filter = '';
  }

  /* ── 5. Clear console periodically & warn ── */
  var _consoleClear = setInterval(function(){
    try{
      if(typeof console !== 'undefined'){
        console.clear();
        console.log('%c⛔ STOP!', 'color:#dc2626;font-size:2rem;font-weight:900;');
        console.log('%cThis browser feature is for developers only. If someone told you to paste something here, it is a scam and will give them access to your account.', 'color:#374151;font-size:.9rem;');
      }
    } catch(e){}
  }, 3000);

  /* ── 6. Disable text selection on sensitive elements ── */
  // (applied via CSS — see style below)

  /* ── 7. Disable drag ── */
  document.addEventListener('dragstart', function(e){
    if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA'){
      e.preventDefault();
    }
  });

  /* ── 8. Inject protective CSS ── */
  var css = document.createElement('style');
  css.textContent = [
    '::selection{background:rgba(1,62,55,.15);}',
    'img{pointer-events:none;-webkit-user-drag:none;}',
  ].join('\n');
  document.head.appendChild(css);

})();
