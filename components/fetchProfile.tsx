"use client"
import { useProfileContext } from "@/context/profileContext"
import { useEffect } from "react"

export default function FetchProfile() {
  useEffect(() => {
    try {
  const sessionId = getSessionIdCookie(await cookies());
      fetch("/")
    }

  }, [])
}
