import { Rol } from './rol';
import { Menu } from './menu';

export class RolMenuDTO {
    public siscod: number;
    public rol: Rol;
    public lstMenus: Menu[];
}