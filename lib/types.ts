export type StockStatus = "in_stock" | "low_stock" | "out_of_stock"

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  banner_url: string | null
  description: string | null
  country: string | null
  is_featured: boolean
}

export interface Category {
  id: string
  parent_id: string | null
  name: string
  slug: string
  description: string | null
  image_url: string | null
  banner_url: string | null
  is_featured: boolean
  sort_order: number
}

export interface CategoryWithChildren extends Category {
  children: Category[]
}

export interface ProductImage {
  id: string
  url: string
  alt: string | null
  is_primary: boolean
  sort_order: number
}

export interface Variant {
  id: string
  sku: string
  price: number
  compare_at_price: number | null
  color: { id: string; name: string; hex: string } | null
  size: { id: string; label: string } | null
  available_quantity: number
  stock_status: StockStatus
}

export interface ProductCard {
  id: string
  name: string
  slug: string
  short_description: string | null
  base_price: number
  compare_at_price: number | null
  is_new_arrival: boolean
  is_best_seller: boolean
  is_on_sale: boolean
  brand_name: string | null
  primary_image: string | null
  stock_status: StockStatus
}

export interface ProductDetail extends ProductCard {
  description: string | null
  gender: string | null
  age_group: string | null
  category_name: string | null
  category_slug: string | null
  images: ProductImage[]
  variants: Variant[]
}
