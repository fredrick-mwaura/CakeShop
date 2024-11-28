<?php
$distPath = __DIR__ . '/dist';
$requestUri = $_SERVER['REQUEST_URI'];
$file = $distPath . $requestUri;

// Serve static files if they exist
if (file_exists($file) && !is_dir($file)) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    
    // Set correct MIME types
    switch ($ext) {
        case 'js':
            header('Content-Type: application/javascript');
            break;
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
        case 'html':
            header('Content-Type: text/html');
            break;
        default:
            header('Content-Type: text/plain');
    }

    readfile($file);
    exit;
}

// Serve the main index.html for any other requests (SPA behavior)
$indexHtml = "$distPath/index.html";
if (file_exists($indexHtml)) {
    echo file_get_contents($indexHtml);
} else {
    http_response_code(404);
    echo "<h1>404 Not Found imepatikana</h1>";
}
