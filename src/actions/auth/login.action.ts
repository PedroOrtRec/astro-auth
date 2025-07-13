import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const login = defineAction({
accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string(),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ email, password, remember_me }, context) => {

        if (remember_me) {
            context.cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                path: '/',
            });
        } else {
            context.cookies.delete('email', {
                path: '/',
            });
        }

        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email, password);

            return JSON.stringify(user);

        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/invalid-credential') {
                throw new Error('Credenciales incorrectas');
            }

            throw new Error('Auxilio! Algo salió mal');
        }

        
       return true;
    }
})