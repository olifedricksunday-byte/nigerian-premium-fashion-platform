import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail-page"
import { getProductBySlug } from "@/lib/catalog"

export const dynamic = "force-dynamic"

type ProductRouteProps = {
  params: Promise<{ slug: string }>
}

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return <ProductDetailPage product={product} />
}
