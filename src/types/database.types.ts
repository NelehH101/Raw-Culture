export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number | null;
  image_url: string | null;
  category_id: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

export type Category = {
  id: string;
  name: string;
  // add other category fields as needed
}