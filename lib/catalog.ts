import { createClient } from "@/lib/supabase/server"
import type {
  Brand,
  Category,
  CategoryWithChildren,
  ProductCard,
  ProductDetail,
  StockStatus,
  Variant,
} from "@/lib/types"

/** Roll a list of variant stock statuses up to a single product-level status. */
function rollupStatus(statuses: StockStatus[]): StockStatus {
  if (statuses.some((s) => s === "in_stock")) return "in_stock"
  if (statuses.some((s) => s === "low_stock")) return "low_stock"
  return "out_of_stock"
}

const PRODUCT_CARD_SELECT = `
  id, name, slug, short_description, base_price, compare_at_price,
  is_new_arrival, is_best_seller, is_on_sale,
  brands ( name ),
  product_images ( url, is_primary, sort_order ),
  product_variants (
    id,
    inventory ( total_quantity, reserved_quantity, low_stock_threshold )
  )
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toStockStatus(inv: any): StockStatus {
  if (!inv) return "out_of_stock"
  const available = Math.max((inv.total_quantity ?? 0) - (inv.reserved_quantity ?? 0), 0)
  if (available <= 0) return "out_of_stock"
  if (available <= (inv.low_stock_threshold ?? 5)) return "low_stock"
  return "in_stock"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProductCard(row: any): ProductCard {
  const images = (row.product_images ?? []).slice().sort(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any, b: any) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0) || a.sort_order - b.sort_order,
  )
  const statuses: StockStatus[] = (row.product_variants ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (v: any) => toStockStatus(Array.isArray(v.inventory) ? v.inventory[0] : v.inventory),
  )
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    short_description: row.short_description,
    base_price: Number(row.base_price),
    compare_at_price: row.compare_at_price != null ? Number(row.compare_at_price) : null,
    is_new_arrival: row.is_new_arrival,
    is_best_seller: row.is_best_seller,
    is_on_sale: row.is_on_sale,
    brand_name: row.brands?.name ?? null,
    primary_image: images[0]?.url ?? null,
    stock_status: statuses.length ? rollupStatus(statuses) : "out_of_stock",
  }
}

interface ProductFilters {
  categorySlug?: string
  brandSlug?: string
  flag?: "new" | "best" | "sale" | "featured"
  limit?: number
  sort?: "featured" | "newest" | "price_asc" | "price_desc"
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductCard[]> {
  const supabase = await createClient()
  let query = supabase.from("products").select(PRODUCT_CARD_SELECT).eq("status", "active")

  if (filters.flag === "new") query = query.eq("is_new_arrival", true)
  if (filters.flag === "best") query = query.eq("is_best_seller", true)
  if (filters.flag === "sale") query = query.eq("is_on_sale", true)
  if (filters.flag === "featured") query = query.eq("is_featured", true)

  if (filters.brandSlug) {
    const { data: brand } = await supabase.from("brands").select("id").eq("slug", filters.brandSlug).single()
    if (brand) query = query.eq("brand_id", brand.id)
  }

  if (filters.categorySlug) {
    // include the category and any of its direct children
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categorySlug)
      .single()
    if (cat) {
      const { data: children } = await supabase.from("categories").select("id").eq("parent_id", cat.id)
      const ids = [cat.id, ...(children ?? []).map((c) => c.id)]
      query = query.in("category_id", ids)
    }
  }

  switch (filters.sort) {
    case "price_asc":
      query = query.order("base_price", { ascending: true })
      break
    case "price_desc":
      query = query.order("base_price", { ascending: false })
      break
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    default:
      query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false })
  }

  if (filters.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  if (error) {
    console.log("[v0] getProducts error:", error.message)
    return []
  }
  return (data ?? []).map(mapProductCard)
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
  if (error) {
    console.log("[v0] getFeaturedBrands error:", error.message)
    return []
  }
  return data as Brand[]
}

export async function getTopCategories(): Promise<CategoryWithChildren[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
  if (error) {
    console.log("[v0] getTopCategories error:", error.message)
    return []
  }
  const all = (data ?? []) as Category[]
  const parents = all.filter((c) => c.parent_id === null)
  return parents.map((p) => ({ ...p, children: all.filter((c) => c.parent_id === p.id) }))
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithChildren | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()
  if (error || !data) return null
  const { data: children } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", data.id)
    .order("sort_order")
  return { ...(data as Category), children: (children ?? []) as Category[] }
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, slug, description, short_description, base_price, compare_at_price,
      gender, age_group, is_new_arrival, is_best_seller, is_on_sale,
      brands ( name ),
      categories ( name, slug ),
      product_images ( id, url, alt, is_primary, sort_order ),
      product_variants (
        id, sku, price, compare_at_price, status,
        product_colors ( id, name, hex ),
        product_sizes ( id, label ),
        inventory ( total_quantity, reserved_quantity, low_stock_threshold )
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  if (error || !data) {
    if (error) console.log("[v0] getProductBySlug error:", error.message)
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images = ((data as any).product_images ?? [])
    .slice()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0) || a.sort_order - b.sort_order)

  const variants: Variant[] = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((data as any).product_variants ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((v: any) => v.status === "active")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((v: any) => {
        const inv = Array.isArray(v.inventory) ? v.inventory[0] : v.inventory
        const available = Math.max((inv?.total_quantity ?? 0) - (inv?.reserved_quantity ?? 0), 0)
        return {
          id: v.id,
          sku: v.sku,
          price: Number(v.price),
          compare_at_price: v.compare_at_price != null ? Number(v.compare_at_price) : null,
          color: v.product_colors
            ? { id: v.product_colors.id, name: v.product_colors.name, hex: v.product_colors.hex }
            : null,
          size: v.product_sizes ? { id: v.product_sizes.id, label: v.product_sizes.label } : null,
          available_quantity: available,
          stock_status: toStockStatus(inv),
        }
      })

  const statuses = variants.map((v) => v.stock_status)

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    short_description: data.short_description,
    base_price: Number(data.base_price),
    compare_at_price: data.compare_at_price != null ? Number(data.compare_at_price) : null,
    is_new_arrival: data.is_new_arrival,
    is_best_seller: data.is_best_seller,
    is_on_sale: data.is_on_sale,
    gender: data.gender,
    age_group: data.age_group,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    brand_name: (data as any).brands?.name ?? null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category_name: (data as any).categories?.name ?? null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category_slug: (data as any).categories?.slug ?? null,
    primary_image: images[0]?.url ?? null,
    images,
    variants,
    stock_status: statuses.length ? rollupStatus(statuses) : "out_of_stock",
  }
}
