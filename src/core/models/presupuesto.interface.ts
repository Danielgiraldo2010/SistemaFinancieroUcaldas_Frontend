export interface Presupuesto {
  id: string;
  programa: string;
  municipio: string;
  cohorte: string;
  numEstudiantes: number;
  valorMatricula: number;
  ingreso: number;
  descuentoVotacion: number;
  descuentos: number;
  ingresoNeto: number;
}
