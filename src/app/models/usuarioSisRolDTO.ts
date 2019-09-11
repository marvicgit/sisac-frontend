import { Usuario } from './usuario';
import { Rol } from './rol';

export class UsuarioSisRolDTO {
	public usuario: Usuario = null;
	public rol: Rol = null;
	public siscod: number;
	public usureg: string;
}