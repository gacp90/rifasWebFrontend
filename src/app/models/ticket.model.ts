import { _img, Rifa } from "./rifas.model";

export interface _pagos{
    descripcion: string,
    monto: number,
    fecha?: Date,
    name?: string,
    _id?: string
}

export class Ticket{

    constructor(

        public numero: string,
        public monto: number,
        public nombre: string,
        public telefono: string,
        public cedula: string,
        public direccion: string,
        public ruta: any,
        public rifa: Rifa,
        public estado: string,
        public vendedor: any,
        public pagos: _pagos[],
        public nota: string,
        public status: boolean,
        public disponible: boolean,
        public ganador: boolean,
        public img: _img[],
        public total?: number,
        public _id?: string,
        public tid?: string,

    ){}

}