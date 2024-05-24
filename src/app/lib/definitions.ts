//CATEGORIAS  and SUBCATEGORIAS

export interface Categories {
  data: Datum[];
  meta: Meta;
}

export interface SubCategorie {
  data: Datum;
  meta: Meta;
}

export interface SubCategorias {
  data: Datum[];
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: null;
  slug: string;
  url_image: URLImage;
  sub_categorias?: SubCategorias;
}
// Generated by https://quicktype.io

export interface Subcategories {
  data: SubcategoriesData;
  meta: Meta;
}

export interface SubcategoriesData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  slug: string;
  subsub_categories: SubsubCategories;
  url_image: URLImage;
}

export interface SubsubCategories {
  data: Datum[];
}

export interface URLImage {
  data: URLImageData;
}

export interface URLImageData {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Large;
  small: Large;
  medium: Large;
  large: Large;
}

export interface Large {
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

//

export interface Me {
  id: number;
  username: string;
  email: string;
  carrito: {
    id: number;
    cart_items: CartItem[];
  };
  cliente?: Client;
}

export interface Client {
  id: number | string;
  addresInfo: {};
  personalInfo: {};
}

export interface ProdCart {
  id: number;
  title: string;
  stock: number;
  price: number;
  image?: {
    formats: Formats;
  };
}

export interface CartItem {
  id: number;
  cantidad: number;
  subtotal: number;
  producto: ProdCart;
}
