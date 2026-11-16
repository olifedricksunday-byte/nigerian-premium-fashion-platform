import { FashionStorefront } from "@/components/fashion-storefront"
import { getProducts, getTopCategories } from "@/lib/catalog"

export const dynamic = "force-dynamic"

export default async function Page() {
  const [products, categories] = await Promise.all([
    getProducts({ flag: "featured", limit: 8 }),
    getTopCategories(),
  ])

  return <FashionStorefront products={products} categories={categories} />
}
