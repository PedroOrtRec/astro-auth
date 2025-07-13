import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const LoginWithGoogle = defineAction({
accept: 'json',
    input: z.any(),
    handler: async (credentials) => {
       
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (!credential) {
            throw new Error('No se pudo obtener las credenciales');
        }

        await signInWithCredential(firebase.auth, credential);

        return { ok: true };
    }
})