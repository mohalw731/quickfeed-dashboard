import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ColumnRow from "@/components/sections/ColumnRow";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import OurClients from "@/components/sections/OurClients";
import Pricing from "@/components/sections/Pricing";
import QuickFeedSection from "@/components/sections/QuickFeedSection";
import React from "react";

export default function Home() {
  return (
    <main >
      <Container>
        <Navbar />
        <Hero />
        <ColumnRow />
        <QuickFeedSection />
        <Pricing />
        <OurClients />
        <Faq /> 
      </Container>
      <Footer />
    </main>
  );
}
