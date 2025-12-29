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
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import Transformations from "./sections/Transformations";
import { ToastContainer } from "react-toastify";

function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    window.lenis.scrollTo(0, {
      duration: 0.5,
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-left"
        rtl={true}
        theme="colored"
      />
      <PackagesProvider>
        <div
          style={{ backgroundColor: "var(--color-bg)", position: "relative" }}
        >
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
              <Hero /> {/* واخد id main */}
              <img
                src="/images/hero-right-ellipse.png"
                alt="hero-right-ellipse"
                className="absolute -top-30 -right-30 lg:-top-100 lg:-right-120 z-0"
              />
              <Services /> {/* واخد id services */}
              <Video />
              <Who />
              <Transformations />
              {/* واخد id packages*/}
              <Packages onSelectPackage={setSelectedPackage} />
              <Faq />
            </>
          )}

          <Footer />
        </div>
      </PackagesProvider>
    </>
  );
}

export default App;
