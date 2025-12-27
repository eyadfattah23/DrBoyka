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

function App() {
  return (
    <PackagesProvider>
      <div style={{ backgroundColor: "var(--color-bg)", position: "relative" }}>
        <Header />
        <Hero />
        <img
          src="/images/hero-right-ellipse.png"
          alt="hero-right-ellipse"
          className="absolute -top-30 -right-30 lg:-top-100 lg:-right-120 z-0"
        />
        <Services />
        <Video />
        <Who />
        <Packages />
        <Faq />
        <Footer />
      </div>
    </PackagesProvider>
  );
}

export default App;
