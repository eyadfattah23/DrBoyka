import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdArrowRoundBack } from "react-icons/io";
import { TiArrowLeftThick } from "react-icons/ti";

function Arrow({ backgroundColor }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "50%",
        padding: "4px",
      }}
    >
      <IoMdArrowRoundBack style={{ fontSize: "1.1em", color: "black" }} />
    </div>
  );
}

export default Arrow;
