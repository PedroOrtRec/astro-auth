// src/middleware.local.ts no funciona por el nombre del archivo, se debe llamar middleware.ts, este archivo solo es de ejemplo

import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(( context, next ) => {

    const authHeader = context.request.headers.get('authorization') ?? '';
    console.log('authHeader', authHeader);

    if (privateRoutes.includes(context.url.pathname)) {

        return checkLocalAuth(authHeader, next);
       
    }
    
    return next();
});


const checkLocalAuth = ( authHeaaders: string, next: MiddlewareNext) => {

    if (authHeaaders) {
       
        const authValue = authHeaaders.split(' ').at(-1) ?? 'user:pass';
        const decodedValue = atob(authValue).split(':');

        const [user, password] = decodedValue;

        if (user === 'admin' && password === 'admin') {
            return next();
        }
    }

    return new Response('Auth necesaria', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"'
        }
    })
}