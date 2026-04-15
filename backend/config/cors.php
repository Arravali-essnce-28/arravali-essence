<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'auth/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*', 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:8000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];