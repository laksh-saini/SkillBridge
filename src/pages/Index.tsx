import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Skillbridge - Resume Analyzer for College Students</title>
        <meta 
          name="description" 
          content="Bridge the gap between coursework and career-ready skills. Skillbridge helps college students analyze and improve their resumes with personalized insights." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
