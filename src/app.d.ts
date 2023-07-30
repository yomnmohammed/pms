// See https://kit.svelte.dev/docs/types#app

type Status = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/lucia').Auth;
		type UserAttributes = {
			username: string;
			role: 'ADMIN' | 'STUDENT' | 'TEACHER';
		};
	}
}

export {};
