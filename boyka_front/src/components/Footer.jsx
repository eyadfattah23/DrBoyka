import Container from "./Container";
import { MotionDiv } from "../animations/MotionPresets";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";

function Footer() {
  return (
    <div dir="ltr" className="text-white pt-8 pb-8 relative overflow-hidden">
      <img
        src="/images/hero-left-ellipse.png"
        alt="ellipse"
        className="absolute -top-40 -right-120 z-50 hidden md:block"
      />

      <Container className="relative">
        <div className="flex justify-between items-center border-b-2 border-white pb-6 flex-col gap-3.5 md:flex-row">
          <div className="order-1 md:order-0">
            <MotionDiv variant="slideXLeft">
              <div className="flex gap-1.5">
                <img src="/images/location.svg" alt="location" />
                <span>Ismailia, Egypt</span>
              </div>
            </MotionDiv>
          </div>

          <div className="order-3 md:order-0 z-60 relative">
            <MotionDiv
              variant="scaleFade"
              visibleOverride={{ transition: { delay: 0.4, duration: 1 } }}
            >
              © {new Date().getFullYear()}{" "}
              <a
                href="https://wa.me/201272009540"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)" }}
                className="cursor-pointer"
              >
                Boyka
              </a>
              . All Rights Reserved.
            </MotionDiv>
          </div>

          <div
            className="order-2 md:order-0 relative z-60"
            style={{ color: "var(--color-primary)", fontSize: "23.5px" }}
          >
            <MotionDiv
              variant="slideXRight"
              visibleOverride={{ transition: { delay: 0.2, duration: 0.8 } }}
            >
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/___boykaa__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://wa.me/201272009540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="https://www.facebook.com/youssef.abd.alhamed.455440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img src="/images/face.svg" alt="face" />
                </a>
              </div>
            </MotionDiv>
          </div>
        </div>

        <div className="relative z-60">
          <MotionDiv
            variant="scaleFade"
            visibleOverride={{ transition: { delay: 0.2, duration: 1 } }}
          >
            <div className="pt-6 relative w-fit mx-auto md:mx-0">
              <h3 className="mb-5 lg:mb-3 text-[14.65px] lg:text-[14px] flex items-center gap-1">
                <TfiWorld
                  style={{ fontSize: "17px" }}
                  className="hidden lg:block"
                />
                This Website is Designed and Developed by
              </h3>

              <div
                className="flex gap-4 lg:gap-8 flex-col lg:flex-row items-center md:items-start"
                style={{ fontSize: "13px" }}
              >
                <div className="flex items-center gap-2">
                  <p className="w-58.75 lg:w-auto text-[13.7px] lg:text-inherit">
                    Mahmoud Ali Taha (UI/UX Designer)
                  </p>
                  <div
                    className="flex items-center gap-1 lg:gap-0.5 text-[25px] lg:text-[21px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <a
                      href="https://wa.me/201141578409"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mahmoud-ali-ui-ux/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <img
                        src="/images/linked.svg"
                        alt="linked"
                        className="w-6 lg:w-5"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="w-58.75 lg:w-auto text-[13.5px] lg:text-inherit">
                    Hussain Saeed (Frontend Developer)
                  </p>
                  <div
                    className="flex items-center gap-1 lg:gap-0.5 text-[25px] lg:text-[21px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <a
                      href="https://wa.me/201061157513"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/hussain-saeed-266055355/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <img
                        src="/images/linked.svg"
                        alt="linked"
                        className="w-6 lg:w-5"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="w-58.75 lg:w-auto">
                    Eyad Abdalfatah (Backend Developer)
                  </p>
                  <div
                    className="flex items-center gap-1 lg:gap-0.5 text-[25px] lg:text-[21px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <a
                      href="https://wa.me/201060587558"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/eyad-fattah/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <img
                        src="/images/linked.svg"
                        alt="linked"
                        className="w-6 lg:w-5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
