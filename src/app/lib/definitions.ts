
export interface Categories {
  data: Datum[];
  meta: Meta;
}

export interface SubCategorias {
  data: Datum[];
}

export interface Attributes {
  title:           string;
  createdAt:       string;
  updatedAt:       string;
  publishedAt:     string;
  description:     null;
  sub_categorias?: SubCategorias;
}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}
