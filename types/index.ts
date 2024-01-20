export type Product = {
  name: string;
  productQty: string;
  images: string;
};

export type Live = {
  title: string;
  description: string;
  thumbnailUrl: string;
  dateStart: Date;
  dateEnd: Date;
  products: string;
};

export type ParsedLiveProduct = {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  name: string;
  images: Array<string>;
  productQty: number;
};
