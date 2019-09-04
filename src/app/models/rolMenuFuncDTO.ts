import { Rol } from './rol';
import { Menu } from './menu';
import { Funcionalidad } from './funcionalidad';

export class RolMenuFuncDTO {
    public rol: Rol;
    public lstMenus: Menu[];
    public lstFuncionalidad: Funcionalidad[];
}