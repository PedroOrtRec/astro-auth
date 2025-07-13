import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { firebase } from './firebase/config';

const privateRoutes = ['/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(( context, next ) => {

    const isLoggedIn = !!firebase.auth.currentUser;

    context.locals.isLoggedIn = isLoggedIn;

    const user = firebase.auth.currentUser;

    if (user) {
        context.locals.user = {
            email: user.email!,
            name: user.displayName!,
            avatar: user.photoURL ?? '',
            emailVerified: user.emailVerified,
        }
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(context.url.pathname)) {
        return context.redirect('/');
    }

    if (!isLoggedIn && privateRoutes.includes(context.url.pathname)) {
        return context.redirect('/');
    }

    return next();
});
