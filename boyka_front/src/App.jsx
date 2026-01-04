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

  const [usdRate, setUsdRate] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/EGP");
        const data = await res.json();

        if (!data?.rates?.USD) {
          throw new Error("USD rate not found");
        }

        setUsdRate(data.rates.USD);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRate();
  }, []);

  const convertToUSD = (egpAmount) => {
    if (!usdRate) return;
    return (Number(egpAmount) * usdRate).toFixed(2);
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
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
  }, [selectedPackage]);

  return (
    <>
      <ToastContainer position="top-left" rtl={true} theme="colored" />
      <PackagesProvider>
        <div
          style={{
            background: selectedPackage
              ? "linear-gradient(220deg, rgba(217, 252, 35, 1) 0%, rgba(245, 255, 180, 50%) 60%, rgba(255, 255, 255, 1) 100%)"
              : "var(--color-bg)",
            position: "relative",
          }}
        >
          <Header
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />

          {selectedPackage ? (
            <PackagePopup
              pkg={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              convertToUSD={convertToUSD}
              usdRate={usdRate}
            />
          ) : (
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
              <Transformations />
              <Packages
                onSelectPackage={setSelectedPackage}
                convertToUSD={convertToUSD}
                usdRate={usdRate}
              />
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

// testing merge
