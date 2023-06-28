export class UsuarioCreate {
  constructor(
    public nombre: string,
    public apellidos: string,
    public email: string,
    public password: string,
    public estado: boolean,
    public codigoClienteNG : number,
    public codigoClienteNM : number,
    public admin : boolean
  ) { }
}
