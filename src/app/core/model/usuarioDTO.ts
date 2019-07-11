import { Regras } from './regras';

export class UsuarioDTO {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    enabled?: boolean;
    roles?: Array<Regras>;
}
