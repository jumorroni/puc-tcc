import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FoodListings } from "@/components/FoodListings";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { EducationalTips } from "@/components/EducationalTips";
import { DonationTypes } from "@/components/DonationTypes";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <DonationTypes />
        <FoodListings />
        <ImpactDashboard />
        <EducationalTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
