import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ColumnRow from "@/components/sections/ColumnRow";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import LandingPageFooter from "@/components/sections/LandingPageFooter";
import Pricing from "@/components/sections/Pricing";
import AboutUs from "@/components/ui/AboutUs";

import React from "react";

export default function Home() {
  return (
    <main>
      <Container>
        <Navbar />
        <Hero />
        <ColumnRow />
        <AboutUs />
        <Pricing />
        <Faq />
      </Container>
      <LandingPageFooter/>
      <Footer />
    </main>
  );
}
