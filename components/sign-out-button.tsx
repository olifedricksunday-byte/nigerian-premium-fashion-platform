"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function SignOutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSignOut() {
    setPending(true)
    setError(false)

    try {
      const result = await authClient.signOut()
      if (result.error) {
        setError(true)
        return
      }
      router.replace("/")
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={pending}
        className="text-[9px] uppercase tracking-[0.18em] text-[#46513f] underline decoration-[#9a9b8f] underline-offset-4 hover:text-[#77816c] disabled:opacity-60"
      >
        {pending ? "Signing out…" : "Sign out"}
      </button>
      {error && <span role="status" className="text-xs text-[#9a3c30]">Could not sign out. Try again.</span>}
    </div>
  )
}
