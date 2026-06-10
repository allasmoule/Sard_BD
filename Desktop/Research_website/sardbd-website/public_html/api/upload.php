<?php
require_once __DIR__ . '/db.php';
corsHeaders();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'POST only'], 405);
}

// Token required for upload
requireToken();
rateLimit(($_SERVER['REMOTE_ADDR'] ?? 'x').'_upload', 10, 60); // max 10 uploads/min per IP

// Allowed types
$allowed_ext  = ['pdf', 'doc', 'docx'];
$allowed_mime = ['application/pdf', 'application/msword',
                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
$max_size = 15 * 1024 * 1024; // 15 MB

if (!isset($_FILES['manuscript']) || $_FILES['manuscript']['error'] !== UPLOAD_ERR_OK) {
    $codes = [1=>'File too large (server limit)',2=>'File too large',3=>'Partial upload',4=>'No file sent',6=>'No temp folder',7=>'Write failed'];
    $err = $_FILES['manuscript']['error'] ?? 4;
    jsonResponse(['success' => false, 'error' => $codes[$err] ?? 'Upload failed (code '.$err.')'], 400);
}

$file     = $_FILES['manuscript'];
$origName = basename($file['name']);
$ext      = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
$mime     = mime_content_type($file['tmp_name']);
$size     = $file['size'];

// Validate
if (!in_array($ext, $allowed_ext)) {
    jsonResponse(['success' => false, 'error' => 'Only PDF, DOC, DOCX files are allowed.'], 400);
}
if (!in_array($mime, $allowed_mime) && !str_contains($mime, 'word') && !str_contains($mime, 'pdf')) {
    jsonResponse(['success' => false, 'error' => 'Invalid file type detected.'], 400);
}
if ($size > $max_size) {
    jsonResponse(['success' => false, 'error' => 'File too large. Maximum 15 MB allowed.'], 400);
}

// Upload directory
$uploadDir = __DIR__ . '/../uploads/manuscripts/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Unique filename
$safeOrig = preg_replace('/[^a-zA-Z0-9._-]/', '_', pathinfo($origName, PATHINFO_FILENAME));
$newName  = date('Ymd_His') . '_' . substr(md5(uniqid()), 0, 6) . '_' . $safeOrig . '.' . $ext;
$destPath = $uploadDir . $newName;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    jsonResponse(['success' => false, 'error' => 'Could not save file. Check folder permissions.'], 500);
}

// Return public URL
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host     = $_SERVER['HTTP_HOST'];
$fileUrl  = $protocol . '://' . $host . '/uploads/manuscripts/' . $newName;

jsonResponse([
    'success'  => true,
    'url'      => $fileUrl,
    'filename' => $newName,
    'origName' => $origName,
    'size'     => $size,
    'ext'      => $ext
]);
