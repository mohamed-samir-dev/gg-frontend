import React from 'react';
import HeroSection from '@/components/HeroSection';
import FertilizerCatalog from '@/components/FertilizerCatalog';
import CropAdvisory from '@/components/CropAdvisory';
import WhyChooseUs from '@/components/WhyChooseUs';
import ConsultationCTA from '@/components/ConsultationCTA';
import { getFertilizerProducts } from '@/lib/db';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const fertilizerProducts = await getFertilizerProducts();

  return (
    <div>
      {/* Hero with Banner & Call to Action */}
      <HeroSection />

      {/* Main Fertilizer Products Catalog (Fertilizers Only from DB) */}
      <FertilizerCatalog initialProducts={fertilizerProducts} />

      {/* Recommended Crop Advisory & Fertilizer Program */}
      <CropAdvisory />

      {/* Why Choose Green Line & Customer Testimonials */}
      <WhyChooseUs />

      {/* Farm Consultation & Wholesale Order CTA */}
      <ConsultationCTA />
    </div>
  );
}
