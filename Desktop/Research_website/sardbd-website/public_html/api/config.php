<?php
// ══════════════════════════════════════════════════
//  SARD BD — Database Configuration
//  cPanel এ DB_PASS এবং API_SECRET পরিবর্তন করো
// ══════════════════════════════════════════════════

define('DB_HOST', 'localhost');
define('DB_NAME', 'sardbdin_sardbd');
define('DB_USER', 'sardbdin_sarduser');
define('DB_PASS', 'your_db_password');        // ← আপনার DB password

// ══════════════════════════════════════════════════
//  API Secret Key — js/api.js এর সাথে match করতে হবে
//  এটা একটা random string — কাউকে দেবেন না
// ══════════════════════════════════════════════════
define('API_SECRET', 'sardbd_s3cr3t_2026_!xK9');  // ← চাইলে নিজের key দিন

// ══════════════════════════════════════════════════
//  Allowed Origin — আপনার domain
// ══════════════════════════════════════════════════
define('ALLOWED_ORIGIN', 'https://sardbd.info');

// ══════════════════════════════════════════════════
//  Admin Password (hashed — admin panel থেকে change করা যাবে)
// ══════════════════════════════════════════════════
define('DEFAULT_ADMIN_PASS', 'sardbd2025');
