import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { ProductDetail } from "@/lib/types"
import { formatNaira } from "@/lib/format"

export function ProductDetailPage({ product }: { product: ProductDetail }) {
  const contactSubject = encodeURIComponent(`Question about ${product.name}`)
  const images = product.images.length ? product.images : product.primary_image ? [{ id: "primary", url: product.primary_image, alt: product.name, is_primary: true, sort_order: 0 }] : []

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#292d25]">
      <header className="border-b border-[#dcd9cf]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="font-serif text-xl tracking-[0.08em]">FRED O</Link>
          <Link href="/shop" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.17em]"><ArrowLeft aria-hidden="true" size={14} /> Back to shop</Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12">
        <section aria-label="Product images" className="grid grid-cols-2 gap-3">
          {images.length ? images.map((image, index) => (
            <div key={image.id} className={`relative aspect-[0.78] overflow-hidden bg-[#e8e4da] ${index === 0 && images.length > 2 ? "col-span-2" : ""}`}>
              <Image src={image.url} alt={image.alt ?? product.name} fill unoptimized priority={index === 0} sizes="(max-width: 1024px) 50vw, 44vw" className="object-cover" />
            </div>
          )) : <div className="col-span-2 flex aspect-[0.9] items-center justify-center bg-[#e8e4da] px-8 text-center font-serif text-2xl text-[#77766a]">{product.name}</div>}
        </section>
        <section className="lg:sticky lg:top-8 lg:self-start lg:py-8">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#77766a]">{product.brand_name ?? "Fred O edit"}{product.category_name ? ` · ${product.category_name}` : ""}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-xl">{formatNaira(product.base_price)}</p>
          <p className={`mt-3 text-xs ${product.stock_status === "out_of_stock" ? "text-[#77766a]" : "text-[#46513f]"}`}>
            {product.stock_status === "out_of_stock" ? "Currently unavailable" : product.stock_status === "low_stock" ? "A few pieces remaining" : "Available now"}
          </p>
          {product.short_description && <p className="mt-6 text-sm leading-6 text-[#64665d]">{product.short_description}</p>}
          {product.description && <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#64665d]">{product.description}</div>}
          {product.variants.length > 0 && (
            <div className="mt-8 border-y border-[#dcd9cf] py-5">
              <h2 className="text-[9px] uppercase tracking-[0.17em]">Available options</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <li key={variant.id} className="border border-[#dcd9cf] px-3 py-2 text-xs">
                    {[variant.color?.name, variant.size?.label].filter(Boolean).join(" / ") || variant.sku}
                    <span className="sr-only">, {variant.stock_status === "out_of_stock" ? "unavailable" : "available"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <a href={`mailto:hello@fredofashion.com?subject=${contactSubject}`} className="mt-8 inline-flex w-full items-center justify-between bg-[#46513f] px-5 py-4 text-[9px] uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#30382e]">
            Enquire about this piece <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <p className="mt-4 text-xs leading-5 text-[#77766a]">For sizing, availability and delivery questions, our Lagos studio would be glad to help.</p>
        </section>
      </div>
      <footer className="border-t border-[#dcd9cf] px-5 py-6 text-center text-[9px] uppercase tracking-[0.16em] text-[#77766a]">© {new Date().getFullYear()} Fred O Fashion & Lifestyle · Lagos, Nigeria</footer>
    </main>
  )
}
