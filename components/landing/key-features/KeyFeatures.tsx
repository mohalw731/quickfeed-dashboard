"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Check, LucideIcon, Zap } from "lucide-react"
import Link from "next/link";
import { motion } from "framer-motion";

interface MockDataProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const mockData: MockDataProps[] = [
    {
        icon: Zap,
        title: "SoMe på autopilot",
        description: "Slipp manuellt uppdatera din blogg eller LinkedIn regelbundet. Låt en AI-assistent hjälpa dig att växa organiskt - helt automatiskt."
    },
    {
        icon: Zap,
        title: "SoMe på autopilot",
        description: "Slipp manuellt uppdatera din blogg eller LinkedIn regelbundet. Låt en AI-assistent hjälpa dig att växa organiskt - helt automatiskt."
    },
    {
        icon: Zap,
        title: "SoMe på autopilot",
        description: "Slipp manuellt uppdatera din blogg eller LinkedIn regelbundet. Låt en AI-assistent hjälpa dig att växa organiskt - helt automatiskt."
    },
    {
        icon: Zap,
        title: "SoMe på autopilot",
        description: "Slipp manuellt uppdatera din blogg eller LinkedIn regelbundet. Låt en AI-assistent hjälpa dig att växa organiskt - helt automatiskt."
    },
]

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

export default function KeyFeatures() {
    return (
        <motion.div
            id="key-features"
            className="flex md:flex-row flex-col gap-12 justify-between py-16 sm:py-24 px-4 sm:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div variants={itemVariants} className="flex flex-col gap-6 max-w-lg">
                <Badge />
                <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl md:max-w-md">Låt AI-assistenter sköta allt *gäsp* på jobbet 🥱</motion.h1>
                <motion.p variants={itemVariants} className="">ChatGPT skriver endast outputs. Om vi ska vara ärliga så får du bara text av ChatGPT. Den arbetar inte självständigt och ansluter inte till program som är relevanta för dig.</motion.p>
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between max-w-md">
                    <p className="inline-flex gap-1"><Check /> <span>Works in realtime</span></p>
                    <p className="inline-flex gap-1"><Check /> <span>Integrates into your systems</span></p>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Button asChild className="bg-[#343A40] dark:bg-[#E2E2E2] mr-auto rounded-full" >
                        <Link href={"/sign-up"}>
                            Get Started
                            <span className="ml-2"><ArrowRight className="size-4" /></span>
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
                {mockData.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-[#DEE2E6] dark:bg-[#0F0F11] flex flex-col gap-4 p-6 md:max-w-xs rounded-xl"
                    >
                        <h1 className="inline-flex gap-2"><card.icon /> {card.title}</h1>
                        <p>{card.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

const Badge = () => {
    return (
        <div className="border p-2 px-4 gap-2 inline-flex mr-auto rounded-full">
            <h1 className="text-sm">QuickFeed</h1>
        </div>
    )
}