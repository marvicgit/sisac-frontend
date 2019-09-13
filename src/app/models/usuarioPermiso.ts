export class UsuarioPermisos {
    public usucod: number;
    public usulog: string;
    public sissig: string;
    public roles: PermisoRol[];
    public funcionalidades: PermisoFuncionalida[];
    public menus: PermisoMenu[];
}

export class PermisoRol {
    public rolsig: string;
    public rolnom: string;
}

export class PermisoFuncionalida {
    public funsig: string;
    public funnom: string;
}

export class PermisoMenu {
    public mensig: string;
    public mennom: string;
}
