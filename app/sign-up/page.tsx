import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Create an account | Fred O Fashion & Lifestyle",
  description: "Create a Fred O customer account.",
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/account")

  return <AuthForm mode="sign-up" />
}
