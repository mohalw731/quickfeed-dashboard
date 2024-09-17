import ColumnRow from "@/components/landing/ColumnRow";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function Home() {
  return (
    <main className="bg-slate-100">
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
