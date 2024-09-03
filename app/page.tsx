import ColumnRow from "@/modules/landing/ColumnRow";
import Hero from "@/modules/landing/Hero";
import Pricing from "@/modules/landing/Pricing";
import Container from "@/components/Container";
import Footer from "@/modules/layout/Footer";
import Navbar from "@/modules/layout/Navbar";
import React from "react";

export default function Home() {
  return (
    <main>
      <Container>
        <Navbar />
        <Hero />
        <ColumnRow />
        <Pricing />
      </Container>
      <Footer />
    </main>
  );
}
