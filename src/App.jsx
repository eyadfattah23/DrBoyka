import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PackagesProvider } from "./context/packages-context";
import "./index.css";
import Faq from "./sections/Faq";
import Hero from "./sections/Hero";
import Packages from "./sections/Packages";
import Services from "./sections/Services";
import Video from "./sections/Video";
import Who from "./sections/Who";
import PackagePopup from "./sections/PackagePopup";

function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <PackagesProvider>
      <div style={{ backgroundColor: "var(--color-bg)", position: "relative" }}>
        <Header />

        {/* لو فيه باقة مختارة، اعرض PackagePopup بس */}
        {selectedPackage ? (
          <PackagePopup
            pkg={selectedPackage}
            onClose={() => setSelectedPackage(null)}
          />
        ) : (
          // لو مفيش باقة مختارة، اعرض المحتوى العادي
          <>
            <Hero />
            <img
              src="/images/hero-right-ellipse.png"
              alt="hero-right-ellipse"
              className="absolute -top-30 -right-30 lg:-top-100 lg:-right-120 z-0"
            />
            <Services />
            <Video />
            <Who />
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              quod distinctio aut illum recusandae vitae enim sit cumque qui
              nihil magnam tempore eligendi adipisci iusto quasi porro velit,
              est excepturi?
            </div>
            <Packages onSelectPackage={setSelectedPackage} />
            <Faq />
          </>
        )}

        <Footer />
      </div>
    </PackagesProvider>
  );
}

export default App;
