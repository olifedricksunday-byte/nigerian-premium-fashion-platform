import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f5ef] px-6 text-center text-[#292d25]">
      <p className="text-[9px] uppercase tracking-[0.22em] text-[#77766a]">Fred O · Lagos</p>
      <h1 className="mt-5 font-serif text-6xl tracking-[-0.05em]">Not found.</h1>
      <p className="mt-4 max-w-sm text-sm leading-6 text-[#77766a]">This page may have moved, or the piece is no longer in our edit.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-5">
        <Link href="/" className="inline-flex items-center gap-2 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.16em]"><ArrowLeft aria-hidden="true" size={14} /> Home</Link>
        <Link href="/shop" className="inline-flex items-center gap-2 border-b border-[#46513f] pb-2 text-[9px] uppercase tracking-[0.16em]">Explore the edit <ArrowRight aria-hidden="true" size={14} /></Link>
      </div>
    </main>
  )
}
