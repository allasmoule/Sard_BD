<?php
require_once __DIR__ . '/config.php';

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}

function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function corsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    // localhost development এবং production domain allow
    $allowed = [ALLOWED_ORIGIN, 'http://localhost', 'http://localhost:3000', 'http://127.0.0.1'];
    if (in_array($origin, $allowed)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } elseif (empty($origin)) {
        // Direct server request (cPanel git deploy, etc.)
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    }
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-SARD-Token');
    header('Access-Control-Allow-Credentials: true');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/* ── API Token Validation ── */
function requireToken() {
    $token = $_SERVER['HTTP_X_SARD_TOKEN']
          ?? $_GET['_t']
          ?? (json_decode(file_get_contents('php://input'), true)['_token'] ?? '');
    if ($token !== API_SECRET) {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Forbidden']);
        exit;
    }
}

/* ── Simple rate limiter (file-based) ── */
function rateLimit($id = 'global', $max = 60, $window = 60) {
    $dir  = sys_get_temp_dir() . '/sardbd_rl/';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $file = $dir . md5($id) . '.txt';
    $now  = time();
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count'=>0,'start'=>$now];
    if ($now - $data['start'] > $window) { $data = ['count'=>0,'start'=>$now]; }
    $data['count']++;
    file_put_contents($file, json_encode($data));
    if ($data['count'] > $max) {
        http_response_code(429);
        echo json_encode(['success'=>false,'error'=>'Too many requests. Try again later.']);
        exit;
    }
}
