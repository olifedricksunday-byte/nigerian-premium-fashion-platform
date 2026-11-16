import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Menu } from "lucide-react"
import type { CategoryWithChildren, ProductCard } from "@/lib/types"
import { formatNaira } from "@/lib/format"
import { CustomerAccountLink } from "@/components/customer-account-link"

type FashionStorefrontProps = {
  products: ProductCard[]
  categories: CategoryWithChildren[]
}

const editorialCategories = [
  { name: "Women", image: "/images/cat-women.png", note: "Modern heritage" },
  { name: "Men", image: "/images/cat-men.png", note: "Everyday considered" },
  { name: "Kids", image: "/images/cat-kids.png", note: "Made for little lives" },
  { name: "Accessories", image: "/images/cat-accessories.png", note: "The finishing touch" },
]

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <Link href={`/products/${encodeURIComponent(product.slug)}`} className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center font-serif text-xl text-[#77766a]">
            {product.name}
          </div>
        )}
        {product.is_new_arrival && (
          <span className="absolute left-3 top-3 bg-[#f7f5ef] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#30382e]">
            New season
          </span>
        )}
        {product.is_on_sale && (
          <span className="absolute right-3 top-3 bg-[#4e5947] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-white">
            Considered price
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 py-4">
        <div className="min-w-0">
          {product.brand_name && (
            <p className="mb-1 text-[9px] uppercase tracking-[0.19em] text-[#77766a]">{product.brand_name}</p>
          )}
          <h3 className="truncate text-[13px] font-medium tracking-[0.02em] text-[#292d25]">{product.name}</h3>
          <p className="mt-1 text-[12px] text-[#77766a]">
            {product.stock_status === "out_of_stock" ? "Currently unavailable" : "Ready to ship"}
          </p>
        </div>
        <p className="shrink-0 text-[13px] text-[#292d25]">{formatNaira(product.base_price)}</p>
      </div>
      <span className="sr-only">View {product.name} details</span>
    </Link>
  )
}

export function FashionStorefront({ products, categories }: FashionStorefrontProps) {
  const featuredProducts = products.slice(0, 8)
  const categoryNames = new Set(categories.map((category) => category.name.toLowerCase()))
  const availableCategories = editorialCategories.filter((category) =>
    categoryNames.has(category.name.toLowerCase()),
  )
  const categoryCards = (availableCategories.length ? availableCategories : editorialCategories).map((category) => ({
    ...category,
    slug: categories.find((item) => item.name.toLowerCase() === category.name.toLowerCase())?.slug,
  }))

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#292d25]">
      <div className="flex min-h-8 items-center justify-center bg-[#46513f] px-4 py-2 text-center text-[9px] uppercase tracking-[0.2em] text-[#f7f5ef] sm:text-[10px]">
        Thoughtfully chosen. Made to be lived in. &nbsp; · &nbsp; Complimentary delivery over ₦150,000
      </div>

      <header className="relative z-10 border-b border-[#dcd9cf] bg-[#f7f5ef]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <details className="group relative lg:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center" aria-label="Open navigation">
              <Menu aria-hidden="true" size={20} strokeWidth={1.3} />
            </summary>
            <nav className="absolute left-0 top-12 flex w-56 flex-col gap-4 border border-[#dcd9cf] bg-[#f7f5ef] p-5 text-[10px] uppercase tracking-[0.17em] shadow-lg">
              <a href="#collections">Collections</a>
              <Link href="/shop">Shop the edit</Link>
              <a href="#story">Our point of view</a>
            </nav>
          </details>
          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.16em] lg:flex">
            <a className="transition-colors hover:text-[#77816c]" href="#collections">Collections</a>
            <Link className="transition-colors hover:text-[#77816c]" href="/shop">The edit</Link>
            <a className="transition-colors hover:text-[#77816c]" href="#story">Our story</a>
          </nav>
          <Link href="#top" className="absolute left-1/2 -translate-x-1/2 text-center" aria-label="Fred O Fashion & Lifestyle home">
            <span className="block font-serif text-[19px] leading-none tracking-[0.08em] sm:text-[23px]">FRED O</span>
            <span className="mt-1 block text-[7px] uppercase tracking-[0.28em] text-[#77766a] sm:text-[8px]">Fashion & Lifestyle</span>
          </Link>
          <CustomerAccountLink />
        </div>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[570px] max-w-[1600px] overflow-hidden bg-[#e8e4da] lg:min-h-[min(720px,75vw)] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-[1] flex flex-col items-start justify-center px-7 py-14 sm:px-12 lg:px-[12%] lg:py-20">
          <p className="mb-6 text-[9px] uppercase tracking-[0.24em] text-[#616a56] sm:text-[10px]">Lagos · Est. with intention</p>
          <h1 className="max-w-[560px] font-serif text-[clamp(3rem,7vw,6.2rem)] leading-[0.94] tracking-[-0.045em] text-[#30382e]">
            A wardrobe<br />with a <em className="font-normal">point of view.</em>
          </h1>
          <p className="mt-7 max-w-[350px] text-[13px] leading-6 text-[#5f6259] sm:text-sm">
            A considered edit of Nigerian fashion and everyday living. Discover pieces made to feel like you, only more so.
          </p>
          <a href="#shop" className="mt-8 inline-flex items-center gap-3 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.2em] text-[#30382e] transition-all hover:gap-5">
            Discover the collection <ArrowRight aria-hidden="true" size={15} strokeWidth={1.3} />
          </a>
          <a href="#collections" className="mt-14 hidden items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#77766a] lg:flex">
            Scroll to explore <ArrowDown aria-hidden="true" size={13} strokeWidth={1.3} />
          </a>
        </div>
        <div className="relative min-h-[340px] sm:min-h-[480px] lg:min-h-full">
          <Image src="/images/hero-main.png" alt="Fred O seasonal fashion campaign" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-center" />
          <div className="absolute bottom-5 right-5 bg-[#f7f5ef]/90 px-4 py-3 text-right backdrop-blur-sm sm:bottom-8 sm:right-8">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#77766a]">The new season</p>
            <p className="mt-1 font-serif text-lg text-[#30382e]">Rooted in good taste</p>
          </div>
        </div>
      </section>

      <section id="collections" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[#77766a]">Find your expression</p>
            <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">Explore the collections</h2>
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-[#77766a] sm:block">01 — 04</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categoryCards.map((category, index) => (
            <Link key={category.name} href={category.slug ? `/shop?category=${encodeURIComponent(category.slug)}` : "/shop"} className="group">
              <div className="relative aspect-[0.78] overflow-hidden bg-[#e8e4da]">
                <Image src={category.image} alt={`${category.name} fashion collection`} fill sizes="(max-width: 640px) 48vw, 24vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 bg-[#f7f5ef]/90 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#46513f]">0{index + 1}</span>
              </div>
              <div className="flex items-center justify-between gap-2 py-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl">{category.name}</h3>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#77766a]">{category.note}</p>
                </div>
                <ArrowUpRight aria-hidden="true" className="shrink-0 text-[#77766a] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} strokeWidth={1.3} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="shop" className="bg-[#eeece4]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mb-9 flex items-end justify-between gap-4 sm:mb-12">
            <div>
              <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[#77766a]">A few things we love</p>
              <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">The considered edit</h2>
            </div>
            <span className="pb-1 text-[9px] uppercase tracking-[0.14em] text-[#77766a]">{featuredProducts.length} pieces</span>
          </div>
          {featuredProducts.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
              {featuredProducts.map((product) => <ProductTile key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="border-y border-[#dcd9cf] py-16 text-center">
              <p className="font-serif text-2xl">The next edit is on its way.</p>
              <p className="mt-3 text-sm text-[#77766a]">Please check back soon or get in touch with our team.</p>
              <a className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]" href="mailto:hello@fredofashion.com">Contact the studio <ArrowRight aria-hidden="true" size={14} /></a>
            </div>
          )}
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.83fr] lg:items-center lg:gap-20 lg:px-12">
        <div className="relative aspect-[1.28] overflow-hidden bg-[#e8e4da]">
          <Image src="/images/editorial-campaign.png" alt="An editorial moment from the Fred O campaign" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
        </div>
        <div className="py-2 lg:py-10">
          <p className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#77766a]">A little about us</p>
          <h2 className="max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">Good style is personal. Ours begins at home.</h2>
          <p className="mt-6 max-w-lg text-[13px] leading-7 text-[#64665d] sm:text-sm">
            Fred O brings together the designers, makers and independent labels shaping how we dress and live in Nigeria. Thoughtful pieces, a local point of view, and room for your own.
          </p>
          <a href="mailto:hello@fredofashion.com" className="mt-8 inline-flex items-center gap-3 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.19em]">
            A note to the studio <ArrowRight aria-hidden="true" size={15} strokeWidth={1.3} />
          </a>
        </div>
      </section>

      <section className="border-y border-[#dcd9cf] bg-[#e9e6dc]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-12 lg:px-12">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#77766a]">Stay in good company</p>
            <h2 className="mt-2 font-serif text-2xl">A little Fred O in your inbox.</h2>
          </div>
          <a href="mailto:hello@fredofashion.com?subject=Join%20the%20Fred%20O%20list" className="inline-flex items-center justify-between gap-8 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.17em] sm:min-w-64">
            Write to us to join <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.3} />
          </a>
        </div>
      </section>

      <footer className="bg-[#30382e] text-[#f7f5ef]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <p className="font-serif text-2xl tracking-[0.08em]">FRED O</p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.24em] text-[#d1d0c6]">Fashion & Lifestyle · Lagos, Nigeria</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.16em] text-[#e2e0d6]">
            <a href="#collections" className="hover:text-white">Collections</a>
            <Link href="/shop" className="hover:text-white">The edit</Link>
            <a href="mailto:hello@fredofashion.com" className="hover:text-white">Contact</a>
          </nav>
          <p className="text-[9px] tracking-[0.08em] text-[#c3c4b9]">© {new Date().getFullYear()} Fred O. Made with intention.</p>
        </div>
      </footer>
    </main>
  )
}
