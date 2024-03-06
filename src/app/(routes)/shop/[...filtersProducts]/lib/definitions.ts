interface Image {
  data: DataImage;
}

interface DataImage {
  id: string | number;
  attributes: AttImage;
}

interface AttImage {
  name: string;
  width: number;
  height: number;
  url: string;
  formats: FormatsImg;
}

interface FormatsImg {
  large: Format;
  medium: Format;
  small: Format;
}

interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Products {
  data: DatumProduct[];
  meta: Meta;
}

export interface Product {
  data: DatumProduct;
}

export interface DatumProduct {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  title: string;
  description: string;
  price: number;
  stock: number;
  descuento: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  marca: string;
  image: Image;
  subsub_categorie: SubsubCategorie;
}

export interface SubsubCategorie {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  slug: string;
  sub_categoria: subCategoria;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

///////////////////////////

interface DataImage {
  id: string | number;
  attributes: AttImage;
}

interface AttImage {
  name: string;
  width: number;
  height: number;
  url: string;
  formats: FormatsImg;
}

interface FormatsImg {
  large: Format;
  medium: Format;
  small: Format;
}

interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Products {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  title: string;
  description: string;
  price: number;
  stock: number;
  descuento: string;
  slug: string;
  marca: string;
  image: Image;
  subsub_categorie: SubsubCategorie;
}

export interface SubsubCategorie {
  data: Data;
}

interface subCategoria {
  data: {
    id: number;
    attributes: {
      slug: string;
      title: string;
    };
  };
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  slug: string;
  title: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

///////////////////////////

export interface Filtros {
  data: FiltrosDatum[];
}

export interface FiltrosDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  title: string;
  sub_filtros: SubFiltros;
}

export interface SubFiltros {
  data: SubFiltrosDatum[];
}

export interface SubFiltrosDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  title: string;
  slug: string;
}
