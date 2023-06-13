export class UsuarioData {
  constructor(
    public id: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public password: string,
    public estado: boolean,
    public token: string,
    public codigoClienteNG : number,
    public codigoClienteNM : number,
  ) { };


}
