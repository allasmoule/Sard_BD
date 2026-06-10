<?php
// ══════════════════════════════════════════════════
//  SARD BD — Database Configuration
//  cPanel এ এই 4টা জিনিস পরিবর্তন করো
// ══════════════════════════════════════════════════

define('DB_HOST', 'localhost');          // সাধারণত localhost হয়
define('DB_NAME', 'your_db_name');       // cPanel → MySQL Databases → Database name
define('DB_USER', 'your_db_user');       // cPanel → MySQL Databases → Username
define('DB_PASS', 'your_db_password');   // Database user এর password

// ══════════════════════════════════════════════════
//  Admin Password (প্রথম setup এর পর admin panel থেকে change করা যাবে)
// ══════════════════════════════════════════════════
define('DEFAULT_ADMIN_PASS', 'sardbd2025');
