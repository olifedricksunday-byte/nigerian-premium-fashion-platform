import { headers } from "next/headers"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { auth } from "@/lib/auth"

export async function CustomerAccountLink() {
  const session = await auth.api.getSession({ headers: await headers() })
  const href = session?.user ? "/account" : "/sign-in"
  const label = session?.user ? session.user.name || "My account" : "Sign in"

  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] transition-colors hover:text-[#77816c] sm:text-[10px]"
    >
      <span>{label}</span>
      <UserRound aria-hidden="true" size={15} strokeWidth={1.3} />
    </Link>
  )
}
