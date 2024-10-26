import Container from "@/components/layout/container/Container";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";

import Faq from "@/components/landing/faq/Faq";
import Hero from "@/components/landing/hero/Hero";
import Pricing from "@/components/landing/pricing/Pricing";
import KeyFeatures from "@/components/landing/key-features/KeyFeatures";
import WidgetShowcase from "@/components/landing/widget-showcase/WidgetShowcase";
import FlippableCards from "@/components/landing/flippable-cards/FlippableCards";
import AiShowcase from "@/components/landing/aishowcase/AiShowcase";

export default function Home() {
  return (
    <main>
      <Container>
        <Navbar />
        <Hero />
        <KeyFeatures />
        <WidgetShowcase />
        <AiShowcase />
        <FlippableCards />
        <Pricing />
        <Faq />
      </Container>
      <Footer />
    </main>
  );
}
