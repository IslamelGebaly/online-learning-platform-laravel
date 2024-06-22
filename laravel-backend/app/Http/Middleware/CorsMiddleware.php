<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $allowedOrigins = [
            'http://localhost:3000', // Replace with your React app's origin
            // ... other allowed origins
        ];

        if (in_array($request->header('Origin'), $allowedOrigins)) {
            $headers = [
                'Access-Control-Allow-Origin' => $request->header('Origin'),
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers' => 'Content-Type, X-Auth-Token, Origin',
            ];

                 // Check for preflight request (OPTIONS method)
            if ($request->isMethod('OPTIONS')) {
                $headers['Access-Control-Allow-Max-Age'] = 60 * 60 * 24; // Allow CORS headers for 24 hours
                    // Return a 200 OK response with CORS headers
                return response('', 200, $headers);
            }

            return $next($request)
            ->header('Access-Control-Allow-Headers', $headers['Access-Control-Allow-Headers'])
            ->header('Access-Control-Allow-Origin', $headers['Access-Control-Allow-Origin'])
            ->header('Access-Control-Allow-Methods', $headers['Access-Control-Allow-Methods']);
        }

        return response('Unauthorized', 401);
    }
}
