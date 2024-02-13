
export interface Filtros {
  data: FiltrosDatum[];
}

export interface FiltrosDatum {
  id:         number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  title:       string;
  sub_filtros: SubFiltros;
}

export interface SubFiltros {
  data: SubFiltrosDatum[];
}

export interface SubFiltrosDatum {
  id:         number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  title: string;
  slug: string;
}


