import { Sistema } from './sistema';
import { Rol } from './rol';
import { Usuario } from './usuario';
export class UsuarioSistemaRolDTO {
	public ususisrolcod: number;
    public sistema: Sistema = new Sistema();
	public rol: Rol = new Rol();
	public usuario: Usuario = new Usuario();
}