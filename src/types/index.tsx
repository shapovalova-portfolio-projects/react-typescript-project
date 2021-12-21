import { ProjectRoutes } from './router';

export type { ProjectRoutes };
export type Files = { [propName: string]: File | null };
export interface ProjectFile extends File { [propName: string]: any };

export class AppError extends Error {
    code: string;

    constructor(message?: string, code?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); 
        this.name = 'AppError';
        this.code = code || '';
    }
}