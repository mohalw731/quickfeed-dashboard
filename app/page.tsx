import Container from "@/components/layout/container/Container";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";

import Faq from "@/components/landing/faq/Faq";
import Hero from "@/components/landing/hero/Hero";
import Pricing from "@/components/landing/pricing/Pricing";
import KeyFeatures from "@/components/landing/key-features/KeyFeatures";

import React from "react";


export default function Home() {
  return (
    <main>
      <Container>
        <Navbar />
        <Hero />
        <KeyFeatures />
        <Pricing />
        <Faq />
      </Container>
      <Footer />
    </main>
  );
}
