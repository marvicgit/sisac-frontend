import { Sistema } from './sistema';
import { Rol } from './rol';
import { Usuario } from './usuario';
import { SisRolFuncionalidadDTO } from './sisRolFuncionalidadDTO';
export class UsuarioSistemaRol {
    public sisrolfun: SisRolFuncionalidadDTO = new SisRolFuncionalidadDTO();
    public sistema: Sistema = new Sistema();
    public usuario: Usuario = new Usuario();
}