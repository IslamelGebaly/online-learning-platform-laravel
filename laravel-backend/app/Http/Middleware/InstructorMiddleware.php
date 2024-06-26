<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class InstructorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|null)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|null
     */
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->user()->hasRole(Role::where("name","instructor")->first())) {
            abort(403, 'Unauthorized action.'); // Or redirect to an error page
        }

        return $next($request);
    }
}
