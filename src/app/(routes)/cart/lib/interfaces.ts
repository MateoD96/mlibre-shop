export interface BuyItem {
  data: {
    id: number;
    attributes: {
      cantidad: number;
      subtotal: number;
    };
  };
}

export interface AddresData {
  barrio: string;
  calle: string;
  dep: string;
  location: string;
  namecomplete: string;
  numero: string;
  refDir: string;
  tel: string;
  tipoCalle: string;
}

export interface CheckData {
  addresData: AddresData;
}
