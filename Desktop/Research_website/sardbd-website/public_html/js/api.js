/**
 * SARD BD — Server Sync Layer
 * localStorage এর data MySQL এ sync করে।
 * সব page এ include করতে হবে।
 */
(function () {
  'use strict';

  // API token — config.php এর API_SECRET এর সাথে match করতে হবে
  var SARD_TOKEN = 'sardbd_s3cr3t_2026_!xK9';

  var API_URL = (function () {
    var base = window.location.href.replace(/\/[^/]*$/, '/');
    return base + 'api/data.php';
  })();

  /* ── Synchronous XHR দিয়ে server থেকে সব data আনো ── */
  function syncFromServer() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', API_URL, false); // synchronous
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // GET এ token optional (sensitive keys filtered server-side)
      xhr.setRequestHeader('X-SARD-Token', SARD_TOKEN);
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
      console.warn('SARD API: server sync skipped, using localStorage.', e.message);
    }
  }

  /* ── Server এ data save করো (async, fire-and-forget) ── */
  function saveToServer(key, value) {
    try {
      var body = { key: key, value: value, _token: SARD_TOKEN };
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-SARD-Token': SARD_TOKEN
        },
        body: JSON.stringify(body),
        keepalive: true
      }).catch(function () {/* silent */});
    } catch (e) {/* silent */}
  }

  /* ── Global expose ── */
  window.sardSaveToServer = saveToServer;
  window._SARD_TOKEN = SARD_TOKEN; // upload.php এর জন্য

  /* ── Page load এ sync চালাও ── */
  syncFromServer();

})();
