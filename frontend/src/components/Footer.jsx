import Container from "./Container";
import { MotionDiv } from "../animations/MotionPresets";
import { FaWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div
      dir="ltr"
      className="text-white pt-8 pb-6 relative overflow-hidden"
      style={{ backgroundColor: "rgba(26, 26, 26, 1)" }}
    >
      <Container>
        <div className="flex justify-between items-center border-b-2 border-white pb-4 flex-col gap-3.5 md:flex-row">
          <div className="order-1 md:order-0">
            <MotionDiv variant="slideXLeft">
              <div className="flex gap-1.5">
                <img src="/images/location.svg" alt="location" />
                <span>Ismailia, Egypt</span>
              </div>
            </MotionDiv>
          </div>

          <div className="order-3 md:order-0">
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

          <div className="order-2 md:order-0">
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
                  <img src="/images/insta.svg" alt="insta" />
                </a>

                <a
                  href="https://wa.me/201272009540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <FaWhatsapp style={{ fontSize: "24px" }} />
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
      </Container>
    </div>
  );
}

export default Footer;
