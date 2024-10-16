
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ColumnRow from "@/components/sections/ColumnRow";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import React from "react";

export default function Home() {
  return (
    <main >
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
