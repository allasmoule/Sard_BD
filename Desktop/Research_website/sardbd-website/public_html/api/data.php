<?php
require_once __DIR__ . '/db.php';
corsHeaders();
header('Content-Type: application/json; charset=utf-8');

$pdo    = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET: একটা key বা সব keys ──
if ($method === 'GET') {
    $key = $_GET['key'] ?? null;
    if ($key) {
        $stmt = $pdo->prepare("SELECT data_value FROM sard_data WHERE data_key = ?");
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        jsonResponse(['success' => true, 'value' => $row ? $row['data_value'] : null]);
    } else {
        // সব data একসাথে পাঠাও (page load sync এর জন্য)
        $stmt = $pdo->query("SELECT data_key, data_value FROM sard_data");
        $rows = $stmt->fetchAll();
        jsonResponse(['success' => true, 'data' => $rows]);
    }
}

// ── POST: save একটা key ──
if ($method === 'POST') {
    $body  = json_decode(file_get_contents('php://input'), true);
    $key   = $body['key']   ?? null;
    $value = $body['value'] ?? null;

    if (!$key) {
        jsonResponse(['success' => false, 'error' => 'Key required'], 400);
    }

    $stmt = $pdo->prepare(
        "INSERT INTO sard_data (data_key, data_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE data_value = ?, updated_at = CURRENT_TIMESTAMP"
    );
    $stmt->execute([$key, $value, $value]);
    jsonResponse(['success' => true]);
}

// ── DELETE: একটা key মুছো ──
if ($method === 'DELETE') {
    $key = $_GET['key'] ?? null;
    if ($key) {
        $stmt = $pdo->prepare("DELETE FROM sard_data WHERE data_key = ?");
        $stmt->execute([$key]);
    }
    jsonResponse(['success' => true]);
}

jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
