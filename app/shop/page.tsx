import { ShopPage } from "@/components/shop-page"
import { getProducts, getTopCategories } from "@/lib/catalog"

export const dynamic = "force-dynamic"

type ShopSearchParams = {
  category?: string
  sort?: string
  edit?: string
}

export default async function ShopRoute({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>
}) {
  const params = await searchParams
  const sort = params.sort === "price_asc" || params.sort === "price_desc" ? params.sort : "featured"
  const edit = params.edit === "new" || params.edit === "sale" || params.edit === "best" ? params.edit : undefined
  const [products, categories] = await Promise.all([
    getProducts({
      categorySlug: params.category,
      sort,
      flag: edit,
      limit: 48,
    }),
    getTopCategories(),
  ])

  return <ShopPage products={products} categories={categories} selectedCategory={params.category} sort={sort} edit={edit} />
}
