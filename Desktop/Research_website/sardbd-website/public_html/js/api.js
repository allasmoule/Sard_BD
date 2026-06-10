/**
 * SARD BD — Server Sync Layer
 * localStorage এর data MySQL এ sync করে।
 * সব page এ include করতে হবে।
 */
(function () {
  'use strict';

  var API_URL = (function () {
    var base = window.location.href.replace(/\/[^/]*$/, '/');
    // যদি /admin.html বা /Editor.html থেকে call হয়
    return base + 'api/data.php';
  })();

  /* ── Synchronous XHR দিয়ে server থেকে সব data আনো ── */
  function syncFromServer() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', API_URL, false); // false = synchronous
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(null);
      if (xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        if (json && json.success && Array.isArray(json.data)) {
          json.data.forEach(function (row) {
            if (row.data_key && row.data_value !== null) {
              localStorage.setItem(row.data_key, row.data_value);
            }
          });
        }
      }
    } catch (e) {
      // API না থাকলে localStorage fallback এ চলবে
      console.warn('SARD API: server sync skipped, using localStorage.', e.message);
    }
  }

  /* ── Server এ data save করো (async, fire-and-forget) ── */
  function saveToServer(key, value) {
    try {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key, value: value }),
        keepalive: true
      }).catch(function () {/* silent */});
    } catch (e) {/* silent */}
  }

  /* ── Global expose ── */
  window.sardSaveToServer = saveToServer;

  /* ── Page load এ sync চালাও ── */
  syncFromServer();

})();
