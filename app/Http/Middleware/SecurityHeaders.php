<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Lewati pemeriksaan keamanan (Helm Baja) jika masih di tahap Development (Lokal)
        // Agar Vite dan React tidak diblokir dan halaman tidak blank putih.
        if (! app()->isProduction()) {
            return $response;
        }

        // 1. Content Security Policy (Helm Utama)
        // Hanya izinkan script dan style dari website kita sendiri.
        // (Ditambah sedikit izin 'unsafe-inline' & 'unsafe-eval' agar React/Vite tetap bisa berjalan normal)
        $csp = "default-src 'self'; " .
               "img-src 'self' data: https: blob:; " .
               "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " .
               "font-src 'self' fonts.gstatic.com; " .
               "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " .
               "connect-src 'self' ws: wss:;"; 
               
        $response->headers->set('Content-Security-Policy', $csp);
        
        // 2. Cegah Clickjacking (Web kita tidak bisa di-embed di iframe web phising)
        $response->headers->set('X-Frame-Options', 'DENY');
        
        // 3. Cegah MIME Sniffing (Mencegah browser ditipu oleh file virus yang menyamar)
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        
        // 4. Referrer Policy (Melindungi jejak URL pengunjung)
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }
}