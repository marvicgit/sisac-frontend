import { Sistema } from './sistema';
import { Rol } from './rol';
import { Funcionalidad } from './funcionalidad';
export class SisRolFuncionalidadDTO {
    public sisrolfuncod: number;
    public sistema: Sistema;
    public rol: Rol;
    public funcionalidad: Funcionalidad;
}