export interface GetInfoCardsResponse {
  data: InfoCards[];
}

export interface InfoCards {
  mes: string;
  clientes: number;
  ventasTotales: number;
  montoTotal: string;
  cashback: Cashback;
}

export interface Cashback {
  acumulado: string;
  facturas: Factura[];
}

export interface Factura {
  fecha: string;
  monto: string;
}
