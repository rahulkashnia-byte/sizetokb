<?php
/**
 * Newsletter read/write for Hostinger (static site + PHP).
 * GET  → returns public/data/newsletter.json
 * POST → { password, data } saves the JSON (password hashed with SHA-256)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$ADMIN_HASH = '1bb6e2376793aa6c033fea9fbcffd38932440095dc58dde8de83bff600d218af';
$dataFile = dirname(__DIR__) . '/data/newsletter.json';

function respond($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  respond(204, new stdClass());
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (!is_file($dataFile)) {
    respond(200, ['version' => 1, 'updatedAt' => gmdate('c'), 'posts' => []]);
  }
  $raw = file_get_contents($dataFile);
  $json = json_decode($raw, true);
  if (!is_array($json)) {
    respond(500, ['ok' => false, 'error' => 'Invalid newsletter.json']);
  }
  echo $raw;
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  respond(400, ['ok' => false, 'error' => 'Invalid JSON']);
}

$password = isset($body['password']) ? (string) $body['password'] : '';
if ($password === '' || hash('sha256', $password) !== $ADMIN_HASH) {
  respond(401, ['ok' => false, 'error' => 'Unauthorized']);
}

$data = isset($body['data']) && is_array($body['data']) ? $body['data'] : null;
if ($data === null || !isset($data['posts']) || !is_array($data['posts'])) {
  respond(400, ['ok' => false, 'error' => 'Missing posts']);
}

$cleanPosts = [];
foreach ($data['posts'] as $p) {
  if (!is_array($p)) continue;
  $title = trim((string) ($p['title'] ?? ''));
  if ($title === '') continue;
  $cleanPosts[] = [
    'id' => (string) ($p['id'] ?? uniqid('p_', true)),
    'slug' => (string) ($p['slug'] ?? ''),
    'title' => $title,
    'excerpt' => (string) ($p['excerpt'] ?? ''),
    'body' => (string) ($p['body'] ?? ''),
    'category' => (string) ($p['category'] ?? 'updates'),
    'published' => !empty($p['published']),
    'ctaLabel' => isset($p['ctaLabel']) ? (string) $p['ctaLabel'] : null,
    'ctaHref' => isset($p['ctaHref']) ? (string) $p['ctaHref'] : null,
    'createdAt' => (string) ($p['createdAt'] ?? gmdate('c')),
    'updatedAt' => (string) ($p['updatedAt'] ?? gmdate('c')),
  ];
}

$out = [
  'version' => 1,
  'updatedAt' => gmdate('c'),
  'posts' => $cleanPosts,
];

$dir = dirname($dataFile);
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
  respond(500, ['ok' => false, 'error' => 'Cannot create data directory']);
}

$encoded = json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if ($encoded === false || file_put_contents($dataFile, $encoded . "\n") === false) {
  respond(500, ['ok' => false, 'error' => 'Write failed — check folder permissions on /data']);
}

respond(200, ['ok' => true, 'count' => count($cleanPosts)]);
