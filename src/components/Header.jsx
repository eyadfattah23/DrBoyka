import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "./Container";
import Button from "./Button";
import Arrow from "./arrow";
import { BiBorderRadius } from "react-icons/bi";

export default function Header({ selectedPackage, setSelectedPackage }) {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "الرئيسية", id: "home" },
    { label: "الخدمات", id: "services" },
    { label: "التحولات", id: "transformations" },
    { label: "الباقات", id: "packages" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const ACTIVE_OFFSET = 300;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;

      let currentSection = null;

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) return;

        const top = section.offsetTop - ACTIVE_OFFSET;
        const bottom = section.offsetTop + section.offsetHeight - ACTIVE_OFFSET;

        if (scrollPosition >= top && scrollPosition < bottom) {
          currentSection = link.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [selectedPackage]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-none"
      }`}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f5ffb8 100%)",
          zIndex: 0,
        }}
      />
      <div
        className="relative z-10"
        style={{
          background: !isScrolled ? "rgba(26, 26, 26, 0.2)" : "transparent",
          backdropFilter: !isScrolled ? "blur(4px)" : "none",
          transition: "background 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        <Container>
          <div className="flex items-center flex-row-reverse lg:flex-row justify-between py-4">
            {/* Logo */}
            <div
              className="text-2xl relative overflow-hidden"
              style={{
                fontFamily: "Bruno Ace SC",
              }}
            >
              <span
                className="inline-block"
                style={{
                  color: isScrolled
                    ? "rgb(178, 202, 60)"
                    : "var(--color-primary)",
                  animation: "waveLoop 10s ease-in-out infinite",
                  animationDelay: "0.4s",
                }}
              >
                a
              </span>
              <span
                className="inline-block"
                style={{
                  color: isScrolled
                    ? "rgb(178, 202, 60)"
                    : "var(--color-primary)",
                  animation: "waveLoop 10s ease-in-out infinite",
                  animationDelay: "0.3s",
                }}
              >
                k
              </span>
              <span
                className="inline-block"
                style={{
                  color: isScrolled
                    ? "rgb(178, 202, 60)"
                    : "var(--color-primary)",
                  animation: "waveLoop 10s ease-in-out infinite",
                  animationDelay: "0.2s",
                }}
              >
                y
              </span>
              <span
                className="inline-block"
                style={{
                  color: isScrolled ? "" : "#ffffff",
                  animation: "waveLoop 10s ease-in-out infinite",
                  animationDelay: "0.1s",
                }}
              >
                o
              </span>
              <span
                className="inline-block"
                style={{
                  color: isScrolled ? "" : "#ffffff",
                  animation: "waveLoop 10s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              >
                B
              </span>

              <style jsx>{`
                @keyframes waveLoop {
                  0% {
                    transform: translateY(0px) scale(1);
                  }
                  2.5% {
                    transform: translateY(-5px) scale(1.1);
                  }
                  5% {
                    transform: translateY(0px) scale(1);
                  }
                  100% {
                    transform: translateY(0px) scale(1);
                  }
                }
              `}</style>
            </div>

            {/* Nav links - desktop */}
            {selectedPackage ? (
              ""
            ) : (
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <div
                      key={link.label}
                      onClick={() =>
                        window.lenis.scrollTo(`#${link.id}`, {
                          duration: 1.5,
                          offset: -86,
                        })
                      }
                      className="transition-all duration-300 cursor-pointer px-4"
                      style={{
                        color:
                          isScrolled && isActive
                            ? "rgb(178, 202, 60)"
                            : isScrolled && !isActive
                            ? "black"
                            : !isScrolled && isActive
                            ? "var(--color-primary)"
                            : "white",
                        fontWeight: isActive ? "700" : "600",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {link.label}
                    </div>
                  );
                })}
              </nav>
            )}

            {/* Button - desktop */}
            {selectedPackage ? (
              <div className="hidden lg:block">
                <Button
                  text="العودة للرئيسية"
                  leftComponent={
                    <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                  }
                  animateLeft="slide"
                  className="text-black w-44 py-3.5 font-bold"
                  onClick={() => setSelectedPackage(null)}
                />
              </div>
            ) : (
              <div className="hidden lg:block">
                <Button
                  text="اشترك الآن"
                  leftComponent={
                    <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                  }
                  animateLeft="slide"
                  className="text-black w-44 py-3.5 font-bold"
                  onClick={() =>
                    window.lenis.scrollTo(`#packages`, {
                      duration: 1.5,
                      offset: -86,
                    })
                  }
                />
              </div>
            )}

            {/* Burger icon */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-2xl transition-all duration-300"
              style={{ color: isScrolled ? "" : "white" }}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`
            lg:hidden overflow-hidden transition-all duration-300
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <nav className="flex flex-col gap-6 py-6">
              {selectedPackage ? (
                ""
              ) : (
                <>
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <div
                        key={link.label}
                        onClick={() => {
                          window.lenis.scrollTo(`#${link.id}`, {
                            duration: 1.5,
                            offset: -392.5,
                          });
                          setOpen(false);
                        }}
                        className="transition-all duration-300 px-4 py-1 rounded-full"
                        style={{
                          color:
                            isScrolled && isActive
                              ? "rgb(178, 202, 60)"
                              : isScrolled && !isActive
                              ? "black"
                              : !isScrolled && isActive
                              ? "var(--color-primary)"
                              : "white",
                          fontWeight: isActive ? "700" : "500",
                          fontSize: isActive ? "18px" : "16px",
                        }}
                      >
                        {link.label}
                      </div>
                    );
                  })}
                </>
              )}

              {selectedPackage ? (
                <Button
                  text="العودة للرئيسية"
                  leftComponent={
                    <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                  }
                  animateLeft="slide"
                  className="text-black w-full sm:w-60 py-3.5 font-medium"
                  style={{ borderRadius: "0.4rem" }}
                  onClick={() => {
                    setSelectedPackage(null);
                    setOpen(false);
                  }}
                />
              ) : (
                <Button
                  text="اشترك الآن"
                  leftComponent={
                    <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                  }
                  animateLeft="slide"
                  className="text-black w-full sm:w-60 py-3.5 font-medium"
                  style={{ borderRadius: "0.4rem" }}
                  onClick={() => {
                    window.lenis.scrollTo(`#packages`, {
                      duration: 1.5,
                      offset: -355,
                    });
                    setOpen(!open);
                  }}
                />
              )}
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}
