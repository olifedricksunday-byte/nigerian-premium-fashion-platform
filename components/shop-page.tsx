import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { CategoryWithChildren, ProductCard } from "@/lib/types"
import { formatNaira } from "@/lib/format"

type ShopPageProps = {
  products: ProductCard[]
  categories: CategoryWithChildren[]
  selectedCategory?: string
  sort: string
  edit?: string
}

export function ShopPage({ products, categories, selectedCategory, sort, edit }: ShopPageProps) {
  const selectedName = categories.find((category) => category.slug === selectedCategory)?.name

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#292d25]">
      <header className="border-b border-[#dcd9cf]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="font-serif text-xl tracking-[0.08em]">FRED O</Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.17em]"><ArrowLeft aria-hidden="true" size={14} /> Home</Link>
        </div>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[#77766a]">Fred O · Shop</p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{selectedName ?? (edit === "new" ? "New arrivals" : edit === "sale" ? "The special edit" : edit === "best" ? "Most loved" : "The considered edit")}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77766a]">A thoughtful collection of fashion and lifestyle, selected for the way we live now.</p>
          </div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#77766a]">{products.length} {products.length === 1 ? "piece" : "pieces"}</p>
        </div>
        <div className="mt-8 border-y border-[#dcd9cf] py-4">
          <nav aria-label="Shop categories" className="flex flex-wrap gap-x-5 gap-y-3">
            <Link href="/shop" className={`text-[9px] uppercase tracking-[0.14em] ${!selectedCategory ? "text-[#30382e]" : "text-[#77766a]"}`}>All pieces</Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/shop?category=${encodeURIComponent(category.slug)}`} className={`text-[9px] uppercase tracking-[0.14em] ${selectedCategory === category.slug ? "text-[#30382e]" : "text-[#77766a]"}`}>
                {category.name}
              </Link>
            ))}
          </nav>
          <form action="/shop" method="get" className="mt-4 flex flex-wrap items-center gap-3">
            {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
            {edit && <input type="hidden" name="edit" value={edit} />}
            <label htmlFor="sort" className="text-[9px] uppercase tracking-[0.15em] text-[#77766a]">Sort by</label>
            <select id="sort" name="sort" defaultValue={sort} className="border border-[#dcd9cf] bg-transparent px-3 py-2 text-xs text-[#30382e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46513f]">
              <option value="featured">Featured</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
            <button className="border border-[#46513f] px-4 py-2 text-[9px] uppercase tracking-[0.15em] transition-colors hover:bg-[#46513f] hover:text-white" type="submit">Apply</button>
          </form>
        </div>
        {products.length ? (
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${encodeURIComponent(product.slug)}`} className="group min-w-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
                  {product.primary_image ? <Image src={product.primary_image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /> : <div className="flex h-full items-center justify-center px-5 text-center font-serif text-xl text-[#77766a]">{product.name}</div>}
                  {product.is_new_arrival && <span className="absolute left-3 top-3 bg-[#f7f5ef] px-3 py-1 text-[9px] uppercase tracking-[0.16em]">New season</span>}
                </div>
                <div className="flex items-start justify-between gap-3 py-4">
                  <div className="min-w-0">
                    {product.brand_name && <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#77766a]">{product.brand_name}</p>}
                    <h2 className="truncate text-[13px] font-medium">{product.name}</h2>
                    <p className="mt-1 text-[11px] text-[#77766a]">{product.stock_status === "out_of_stock" ? "Currently unavailable" : "Ready to ship"}</p>
                  </div>
                  <span className="shrink-0 text-[13px]">{formatNaira(product.base_price)}</span>
                </div>
                <span className="sr-only">View {product.name} details</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 border-y border-[#dcd9cf] py-16 text-center">
            <p className="font-serif text-2xl">No pieces in this edit just yet.</p>
            <p className="mt-3 text-sm text-[#77766a]">Try another collection or get in touch with our studio.</p>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.17em]">Back to Fred O <ArrowUpRight aria-hidden="true" size={14} /></Link>
          </div>
        )}
      </section>
      <footer className="border-t border-[#dcd9cf] px-5 py-6 text-center text-[9px] uppercase tracking-[0.16em] text-[#77766a]">© {new Date().getFullYear()} Fred O Fashion & Lifestyle · Lagos, Nigeria</footer>
    </main>
  )
}
