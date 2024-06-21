<?php

return [

/*
| Default CORS Configuration
|
| Here you may define your default CORS configuration. By default,
| all origins are allowed which is not recommended in production.
|
*/

'defaults' => [
    'origins' => [
        'http://localhost:3000'
    ],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'allowed_origins_patterns' => [],
    'max_age' => 60 * 60 * 24, // Allow CORS headers for 24 hours
    'exposed_headers' => [],
    'supports_credentials' => true,
],

/*
| Routes with CORS Configuration
|
| Here you may define specific CORS configuration for particular routes.
|
*/

'routes' => [
    [
        'path' => '/api/*',
        'config' => [
            'allowed_origins' => ['*'], // Or specific origins for specific routes
            'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],
            'allowed_headers' => ['Content-Type', 'X-Auth-Token', 'Origin'],
        ],
    ],
],

];
