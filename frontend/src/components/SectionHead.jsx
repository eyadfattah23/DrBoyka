import { MotionDiv } from "../animations/MotionPresets";

function SectionHead({ titleColor, titleText, descColor, descText }) {
  return (
    <MotionDiv
      variant="slideXLeft"
      overrideProps={{ viewport: { once: true, amount: 0.8 } }}
    >
      <div className="text-center">
        <h2
          style={{ color: titleColor, fontWeight: "700" }}
          className="text-4xl mb-6"
        >
          {titleText}
        </h2>
        <p
          style={{
            color: descColor,
            lineHeight: "1.5rem",
          }}
          className="w-full sm:w-9/12 md:w-9/14 lg:w-9/16 xl:w-9/22 mx-auto mb-14 text-xl"
        >
          {descText}
        </p>
      </div>
    </MotionDiv>
  );
}

export default SectionHead;
