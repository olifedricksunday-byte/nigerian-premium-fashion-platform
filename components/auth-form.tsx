"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { authClient } from "@/lib/auth-client"

type AuthFormProps = {
  mode: "sign-in" | "sign-up"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const isSignUp = mode === "sign-up"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    setMessage("")
    setPending(true)

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setMessage(isSignUp ? "We couldn’t create your account. Check your details and try again." : "Those sign-in details didn’t match. Please try again.")
        return
      }

      router.replace("/account")
      router.refresh()
    } catch {
      setMessage("We couldn’t complete that request. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-[#f7f5ef] text-[#292d25] lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#46513f] lg:block" aria-label="Fred O fashion editorial">
        <Image
          src="/images/hero-main.png"
          alt="Fred O seasonal fashion campaign"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252a21]/70 via-transparent to-[#252a21]/10" />
        <div className="absolute left-12 top-10 text-[#f7f5ef]">
          <p className="font-serif text-2xl tracking-[0.08em]">FRED O</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.28em]">Fashion & Lifestyle</p>
        </div>
        <div className="absolute bottom-14 left-12 max-w-md text-[#f7f5ef]">
          <p className="text-[10px] uppercase tracking-[0.24em]">A wardrobe with a point of view</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05]">Rooted in good taste.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#f7f5ef]/80">A considered edit of Nigerian fashion and everyday living.</p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[420px]">
          <Link href="/" className="inline-block font-serif text-xl tracking-[0.08em] lg:hidden" aria-label="Fred O home">
            FRED O
          </Link>
          <p className="mt-10 text-[9px] uppercase tracking-[0.24em] text-[#737568] lg:mt-0">Customer account</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.03em] text-[#30382e]">
            {isSignUp ? "Make room for good things." : "Welcome back."}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#686b61]">
            {isSignUp
              ? "Create an account to keep your Fred O details together."
              : "Sign in to visit your Fred O customer account."}
          </p>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.16em] text-[#4b5145]">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="h-12 border border-[#d6d4ca] bg-transparent px-3 text-sm outline-none transition-colors focus:border-[#46513f] focus:ring-1 focus:ring-[#46513f]"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.16em] text-[#4b5145]">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="h-12 border border-[#d6d4ca] bg-transparent px-3 text-sm outline-none transition-colors focus:border-[#46513f] focus:ring-1 focus:ring-[#46513f]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[10px] uppercase tracking-[0.16em] text-[#4b5145]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={12}
                maxLength={128}
                className="h-12 border border-[#d6d4ca] bg-transparent px-3 text-sm outline-none transition-colors focus:border-[#46513f] focus:ring-1 focus:ring-[#46513f]"
              />
              {isSignUp && <p className="text-xs text-[#77766a]">Use at least 12 characters.</p>}
            </div>
            {message && <p role="alert" className="text-sm text-[#9a3c30]">{message}</p>}
            <button
              type="submit"
              disabled={pending}
              className="mt-1 flex h-12 items-center justify-center bg-[#46513f] px-5 text-[10px] uppercase tracking-[0.2em] text-[#f7f5ef] transition-colors hover:bg-[#384234] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-sm text-[#686b61]">
            {isSignUp ? "Already have an account?" : "New to Fred O?"}{" "}
            <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="underline decoration-[#8b8e81] underline-offset-4 hover:text-[#46513f]">
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <Link href="/" className="mt-10 inline-block text-[9px] uppercase tracking-[0.18em] text-[#77766a] hover:text-[#30382e]">
            Back to the collection
          </Link>
        </div>
      </section>
    </main>
  )
}
