import { headers } from "next/headers"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { auth } from "@/lib/auth"

export async function CustomerAccountLink() {
  const session = await auth.api.getSession({ headers: await headers() })
  const linkClassName =
    "flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] transition-colors hover:text-[#77816c] sm:text-[10px]"

  if (!session?.user) {
    return (
      <nav aria-label="Account" className="flex items-center gap-3 sm:gap-5">
        <Link href="/sign-in" className={linkClassName}>
          Sign in
        </Link>
        <Link href="/sign-up" className={linkClassName}>
          Create account
        </Link>
      </nav>
    )
  }

  return (
    <Link href="/account" className={linkClassName}>
      <span>My account</span>
      <UserRound aria-hidden="true" size={15} strokeWidth={1.3} />
    </Link>
  )
}
