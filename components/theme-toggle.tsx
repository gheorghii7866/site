"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render after mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">🌞</span>
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <span className="text-xs">🌙</span>
    </div>
  )
}

export default ThemeToggle; 