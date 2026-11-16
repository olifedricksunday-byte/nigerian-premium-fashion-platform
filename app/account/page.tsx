import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/sign-out-button"
import { auth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "My account | Fred O Fashion & Lifestyle",
  description: "Manage your Fred O customer account.",
}

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#292d25]">
      <header className="border-b border-[#dcd9cf]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="font-serif text-xl tracking-[0.08em]" aria-label="Fred O home">FRED O</Link>
          <SignOutButton />
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[#737568]">Customer account</p>
        <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Hello, {session.user.name || "there"}.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#686b61]">Your Fred O account is ready. Your account details are securely connected to your sign-in.</p>

        <div className="mt-10 grid gap-px border border-[#dcd9cf] bg-[#dcd9cf] sm:grid-cols-2">
          <section className="bg-[#f7f5ef] p-6 sm:p-8" aria-labelledby="account-details-title">
            <h2 id="account-details-title" className="font-serif text-2xl">Account details</h2>
            <dl className="mt-6 flex flex-col gap-5 text-sm">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-[#77766a]">Full name</dt>
                <dd className="mt-1">{session.user.name || "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-[#77766a]">Email address</dt>
                <dd className="mt-1 break-all">{session.user.email}</dd>
              </div>
            </dl>
          </section>
          <section className="bg-[#f7f5ef] p-6 sm:p-8" aria-labelledby="orders-title">
            <h2 id="orders-title" className="font-serif text-2xl">Your orders</h2>
            <p className="mt-4 text-sm leading-6 text-[#686b61]">Order history will appear here when online ordering is connected.</p>
            <Link href="/shop" className="mt-6 inline-flex border-b border-[#46513f] pb-1 text-[9px] uppercase tracking-[0.18em] hover:text-[#77816c]">Explore the collection</Link>
          </section>
        </div>
      </section>
    </main>
  )
}
