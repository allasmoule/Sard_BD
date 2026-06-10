<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>SARD BD — Database Install</title>
<style>
body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px;background:#f4f6f8;}
.card{background:#fff;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.1);}
h2{color:#013e37;margin-bottom:20px;}
.ok{color:#166534;background:#dcfce7;padding:10px 14px;border-radius:8px;margin:6px 0;font-size:.9rem;}
.err{color:#991b1b;background:#fee2e2;padding:10px 14px;border-radius:8px;margin:6px 0;font-size:.9rem;}
.info{color:#1e40af;background:#dbeafe;padding:10px 14px;border-radius:8px;margin:6px 0;font-size:.9rem;}
.btn{display:inline-block;background:#013e37;color:#ffefb3;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:16px;}
</style>
</head>
<body>
<div class="card">
<h2>🔧 SARD BD — Database Setup</h2>
<?php
require_once 'config.php';

$steps = [];
$allOk = true;

// Step 1: Test connection
try {
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $steps[] = ['ok', '✅ Database connection successful (Host: '.DB_HOST.', DB: '.DB_NAME.')'];
} catch (PDOException $e) {
    $steps[] = ['err', '❌ Connection failed: '.$e->getMessage()];
    $allOk = false;
}

if ($allOk) {
    // Step 2: Create main key-value table
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `sard_data` (
            `data_key`   VARCHAR(100) NOT NULL,
            `data_value` LONGTEXT,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`data_key`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        $steps[] = ['ok', '✅ Table `sard_data` ready'];
    } catch (PDOException $e) {
        $steps[] = ['err', '❌ Table creation failed: '.$e->getMessage()];
        $allOk = false;
    }

    // Step 3: Insert default admin password if not exists
    try {
        $stmt = $pdo->prepare("INSERT IGNORE INTO sard_data (data_key, data_value) VALUES ('sardAdminPass', ?)");
        $stmt->execute([DEFAULT_ADMIN_PASS]);
        $steps[] = ['ok', '✅ Default admin password set: <strong>'.DEFAULT_ADMIN_PASS.'</strong>'];
    } catch (PDOException $e) {
        $steps[] = ['err', '❌ Default data insert failed: '.$e->getMessage()];
    }

    // Step 4: Verify table works
    try {
        $pdo->query("SELECT COUNT(*) FROM sard_data");
        $steps[] = ['ok', '✅ Table verification passed'];
    } catch (PDOException $e) {
        $steps[] = ['err', '❌ Table verification failed: '.$e->getMessage()];
        $allOk = false;
    }
}

foreach ($steps as $s) {
    echo '<div class="'.$s[0].'">'.$s[1].'</div>';
}

if ($allOk) {
    echo '<div class="info" style="margin-top:16px;">🎉 <strong>Setup complete!</strong> এখন এই file টা delete করো: <code>api/install.php</code> (security এর জন্য গুরুত্বপূর্ণ)</div>';
    echo '<a class="btn" href="../admin.html">→ Admin Panel এ যাও</a>';
} else {
    echo '<div class="err" style="margin-top:16px;">⚠️ Setup সম্পূর্ণ হয়নি। <code>api/config.php</code> এ database credentials ঠিক করো।</div>';
}
?>
</div>
</body>
</html>
