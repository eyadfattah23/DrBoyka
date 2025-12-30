import { FaArrowCircleLeft, FaWhatsapp } from "react-icons/fa";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { TiArrowLeftThick } from "react-icons/ti";
import Arrow from "../components/arrow.jsx";
import { MotionDiv } from "../animations/motionPresets.jsx";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-166.25 flex items-end"
      style={{
        backgroundColor: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/hero-right-ellipse.png"
        alt="hero-right-ellipse"
        className="absolute  left-0 bottom-40 xl:-left-60 xl:-bottom-50 z-0"
      />
      <Container className="relative pt-14 xl:py-30">
        {/* النص على الشمال */}
        <MotionDiv variant="scaleZ">
          <div className="flex flex-col text-center xl:text-right z-10 relative">
            <div
              className="text-blue-600 font-semibold mb-4 w-fit p-4 rounded-4xl flex items-center justify-center gap-2 xl:mx-0 mx-auto"
              style={{
                background: "rgba(217, 250, 43, 0.18)",
                color: "var(--color-primary)",
              }}
            >
              <span>ابدأ رحلتك دلوقتي!</span>
              <img
                src="/images/flag.png"
                alt="Rocket"
                className="w-9 scale-x-[-1]"
              />
            </div>
            <p
              className="text-white text-3xl md:text-4xl xl:text-5xl font-bold mb-4 mx-auto xl:mx-0 max-w-140 xl:max-w-180"
              style={{ lineHeight: "140%" }}
            >
              من أول ما تدخل الموقع
              <br />
              إنت كده بدأت رحلة التغيير للأحسن في جسمك وصحتك
            </p>
            <p
              className="mb-10 text-xl font-medium"
              style={{ color: "rgba(230, 230, 230, 1)" }}
            >
              اشترك حالاً وارمي الكسل على جنب - في أقل من شهر هتشوف نتايج تخليك
              فخور بنفسك!
            </p>

            <div className="flex items-center flex-row flex-wrap justify-center xl:justify-start gap-4">
              <Button
                text="احجز باقتك الان"
                leftComponent={
                  <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                }
                className="text-black w-53 py-4 font-bold hidden lg:flex"
                onClick={() =>
                  window.lenis.scrollTo(`#packages`, {
                    duration: 1.5,
                    offset: -86,
                  })
                }
              />
              <Button
                text="احجز باقتك الان"
                leftComponent={
                  <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                }
                className="text-black w-53 py-4 font-bold flex lg:hidden"
                onClick={() =>
                  window.lenis.scrollTo(`#packages`, {
                    duration: 1.5,
                    offset: -62,
                  })
                }
              />
              <Button
                text="استفسر علي الواتساب"
                leftComponent={
                  <FaWhatsapp
                    style={{
                      fontSize: "1.5em",
                      color: "rgba(109, 109, 109, 1)",
                    }}
                  />
                }
                className="text-black w-53 py-4 font-bold "
              />
            </div>
          </div>
        </MotionDiv>

        {/* البوكس اللي شايل الصورتين */}
        <MotionDiv
          variant="fade"
          visibleOverride={{ transition: { duration: 2 } }}
        >
          <div className="relative mt-10 xl:absolute xl:left-0 xl:bottom-0 xl:mt-0 w-full xl:w-auto flex justify-center xl:justify-end xl:ml-12">
            <div className="relative w-full max-w-md sm:max-w-xl xl:max-w-none">
              <img
                src="/images/hero.png"
                alt="Hero Image"
                className="relative z-30 w-full"
              />
              <img
                src="/images/hero-2.png"
                alt="Hero Overlay"
                className="absolute bottom-0 left-0 z-20 w-[90%]"
              />
            </div>
          </div>
        </MotionDiv>
      </Container>
    </section>
  );
}
