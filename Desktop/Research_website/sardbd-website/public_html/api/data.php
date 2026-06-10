<?php
require_once __DIR__ . '/db.php';
corsHeaders();
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

// ── Rate limit: max 120 requests/minute per IP ──
rateLimit($_SERVER['REMOTE_ADDR'] ?? 'unknown', 120, 60);

// ── GET: Token NOT required (public read — page sync needs it)
//    But sensitive keys are filtered out
if ($method === 'GET') {
    $pdo = getDB();
    $key = $_GET['key'] ?? null;

    // Sensitive keys — never expose via GET without token
    $sensitiveKeys = ['sardAdminPass', 'sardEditorAccounts'];
    $hasToken = (($_SERVER['HTTP_X_SARD_TOKEN'] ?? '') === API_SECRET);

    if ($key) {
        if (in_array($key, $sensitiveKeys) && !$hasToken) {
            jsonResponse(['success' => false, 'error' => 'Forbidden'], 403);
        }
        $stmt = $pdo->prepare("SELECT data_value FROM sard_data WHERE data_key = ?");
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        jsonResponse(['success' => true, 'value' => $row ? $row['data_value'] : null]);
    } else {
        // Return all rows but strip sensitive keys for unauthenticated requests
        $stmt = $pdo->query("SELECT data_key, data_value FROM sard_data");
        $rows = $stmt->fetchAll();
        if (!$hasToken) {
            $rows = array_filter($rows, function($r) use ($sensitiveKeys) {
                return !in_array($r['data_key'], $sensitiveKeys);
            });
            $rows = array_values($rows);
        }
        jsonResponse(['success' => true, 'data' => $rows]);
    }
}

// ── POST & DELETE: Token REQUIRED ──
if ($method === 'POST') {
    requireToken();
    $pdo  = getDB();
    $body = json_decode(file_get_contents('php://input'), true);
    $key  = $body['key']   ?? null;
    $value = $body['value'] ?? null;

    if (!$key) {
        jsonResponse(['success' => false, 'error' => 'Key required'], 400);
    }

    // Max value size: 5MB
    if (strlen((string)$value) > 5 * 1024 * 1024) {
        jsonResponse(['success' => false, 'error' => 'Value too large (max 5MB)'], 413);
    }

    $stmt = $pdo->prepare(
        "INSERT INTO sard_data (data_key, data_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE data_value = ?, updated_at = CURRENT_TIMESTAMP"
    );
    $stmt->execute([$key, $value, $value]);
    jsonResponse(['success' => true]);
}

if ($method === 'DELETE') {
    requireToken();
    $pdo = getDB();
    $key = $_GET['key'] ?? null;
    if ($key) {
        $stmt = $pdo->prepare("DELETE FROM sard_data WHERE data_key = ?");
        $stmt->execute([$key]);
    }
    jsonResponse(['success' => true]);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
