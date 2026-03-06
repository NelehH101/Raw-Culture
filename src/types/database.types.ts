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

// Lookbook
export type LookbookVolume = {
  id: string;
  title: string;
  vol: string;
  cover_image_path: string;
  description: string | null;
  display_order: number;
  created_at: string | null;
}

export type LookbookImage = {
  id: string;
  volume_id: string;
  image_path: string;
  display_order: number;
  created_at: string | null;
}