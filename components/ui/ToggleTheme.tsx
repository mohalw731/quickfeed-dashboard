'use client'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    if (!mounted) return null

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-1 transition-all duration-300 shadow-inner overflow-hidden"
            whileTap={{ scale: 0.97 }}
            aria-label="Toggle theme"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-indigo-900 dark:to-indigo-800 opacity-70 transition-opacity duration-300"
                animate={{
                    opacity: theme === "light" ? 0.7 : 0,
                }}
            />
            <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg flex items-center justify-center"
                animate={{
                    x: theme === "light" ? 0 : 32,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <motion.div
                    animate={{
                        rotate: theme === "light" ? 0 : 360,
                        scale: theme === "light" ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {theme === "light" ? (
                        <Sun className="h-4 w-4 text-amber-500" />
                    ) : (
                        <Moon className="h-4 w-4 text-blue-200" />
                    )}
                </motion.div>
            </motion.div>
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.1)",
                }}
            />
        </motion.button>
    )
}