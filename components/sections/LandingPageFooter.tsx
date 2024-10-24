"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Textarea } from "../ui/textarea"
import { useState, useEffect } from "react"
import axios from "axios"
import { Linkedin, Loader2 } from "lucide-react"

interface FormDataProps {
    organisation: string;
    name: string;
    email: string;
    message: string;
};

const inputValues = [
    { name: "organisation", placeholder: "Organisation", type: "text", maxLength: 30 },
    { name: "name", placeholder: "Name", type: "text", maxLength: 20 },
    { name: "email", placeholder: "JohnDoe@gmail.com", type: "email", maxLength: 40 },
];

const COOLDOWN_TIME = 120;

export default function LandingPageFooter() {
    const [formData, setFormData] = useState<FormDataProps>({
        organisation: "",
        name: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [messageLength, setMessageLength] = useState(0);
    const [cooldownTime, setCooldownTime] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldownTime > 0) {
            timer = setInterval(() => {
                setCooldownTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [cooldownTime]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData: FormDataProps) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'message') {
            setMessageLength(value.length);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cooldownTime > 0) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await axios.post('/api/sendEmail', formData);

            setSubmitStatus('success');
            setFormData({ organisation: "", name: "", email: "", message: "" });
            setCooldownTime(COOLDOWN_TIME);
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setMessageLength(0);
        }
    };

    return (
        <footer className="w-full border-t border-neutral-700 py-24">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-evenly px-4 gap-16 md:gap-0">
                <div className="text-white md:text-5xl text-4xl font-bold">Quick<span className="text-blue-500 font-normal">Feed</span></div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-white text-4xl ">Socials</h3>
                    <Link href={"#"} className="text-slate-300 text-xl text-center md:text-left hover:underline" >LinkedIn</Link>
                </div>

                <div className="w-full md:w-auto">
                    <div className="flex max-w-md mx-auto flex-col gap-4">
                        <h3 className="text-4xl text-white text-center md:text-left">Contact us</h3>
                        <p className="text-slate-300 md:text-xl text-base text-center md:text-left">Get in touch with us today—our team is ready to assist you with any questions or support you need. Let`s connect!</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
                        {inputValues.map((inp, index) => (
                            <Input
                                key={index}
                                name={inp.name}
                                value={formData[inp.name as keyof FormDataProps]}
                                onChange={handleChange}
                                className="bg-[#202020] rounded-full border-neutral-800 p-7 text-white placeholder-gray-400"
                                placeholder={inp.placeholder}
                                type={inp.type}
                                maxLength={inp.maxLength}
                                disabled={cooldownTime > 0}
                                required
                            />
                        ))}
                        <div className="relative">
                            <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="bg-[#202020] rounded-2xl no-scrollbar text-white border-neutral-800 pr-12 h-40 resize-none"
                                placeholder="Message"
                                disabled={cooldownTime > 0}
                                maxLength={500}
                                required
                            />
                            <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                                {500 - messageLength}
                            </span>
                        </div>

                        <Button
                            type="submit"
                            className="rounded-full text-black bg-neutral-300 hover:bg-neutral-400 disabled:opacity-50"
                            disabled={isSubmitting || cooldownTime > 0}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> :
                                cooldownTime > 0 ? `Wait ${cooldownTime}s` : 'Send'}
                        </Button>
                        {submitStatus === 'success' && (
                            <p className="text-green-500 text-center" role="status" aria-live="polite">Message sent successfully!</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-center" role="alert" aria-live="assertive">Failed to send message. If the issue persists you can contact us directly at blablabla@quickfeed.com.</p>
                        )}
                    </form>
                </div>
            </div>
        </footer>
    )
}