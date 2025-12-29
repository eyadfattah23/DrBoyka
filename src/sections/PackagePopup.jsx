import { useState } from "react";
import { countryCodes } from "../data/countryCodes";
import { BASE_URL } from "../config/api";
import Container from "../components/Container";
import { IoMdCheckmark } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Select, { components } from "react-select";
import { FaWhatsapp } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

export default function PackagePopup({ pkg, onClose }) {
  // ======== حالات النموذج ========
  const [fullname, setFullname] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [callsCode, setCallsCode] = useState("");
  const [callsNumber, setCallsNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ======== معلومات الباقة ========
  const selectedMonth = pkg?.selectedMonth || 1;

  // لو مفيش باقة، متعرضش حاجة
  if (!pkg) return null;

  // تنظيف الإدخال الرقمي والحد من الطول
  const handleNumberInput = (value, setter, maxLength) => {
    const cleaned = value.replace(/\D/g, "");
    setter(cleaned.slice(0, maxLength));
  };

  // تفريغ النموذج
  const resetForm = () => {
    setFullname("");
    setWhatsappCode("");
    setWhatsappNumber("");
    setCallsCode("");
    setCallsNumber("");
    setEmail("");
  };

  // حساب السعر حسب المدة المختارة
  const getPrice = (month) => {
    if (month === 1)
      return {
        before: pkg.one_month_price_before_discount,
        after: pkg.one_month_price_after_discount,
      };
    if (month === 6)
      return {
        before: pkg.six_month_price_before_discount,
        after: pkg.six_month_price_after_discount,
      };
    if (month === 12)
      return {
        before: pkg.twelve_month_price_before_discount,
        after: pkg.twelve_month_price_after_discount,
      };
    return { before: 0, after: 0 };
  };

  const prices = getPrice(selectedMonth);

  // ======== معالجة إرسال النموذج ========
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الاسم
    if (!fullname) {
      e.target.reportValidity();
      return;
    }

    // التحقق من اختيار كود البلد
    if (!whatsappCode) {
      toast.error("يرجى اختيار كود البلد!");
      return;
    }
    if (!callsCode) {
      toast.error("يرجى اختيار كود البلد!");
      return;
    }

    const whatsappDigits = whatsappNumber.length;
    const callsDigits = callsNumber.length;

    // تحقق خاص برقم مصر (يبدأ بـ 01 و10 أرقام)
    if (whatsappCode === "+20") {
      if (whatsappDigits !== 10 || !whatsappNumber.startsWith("1")) {
        toast.error("رقم الواتساب المصري يجب أن يبدأ بـ 1 ويتكون من 10 أرقام!");
        return;
      }
    } else if (whatsappDigits < 5) {
      toast.error("رقم الواتساب يجب أن يتكون من 5 أرقام على الأقل!");
      return;
    }

    if (callsCode === "+20") {
      if (callsDigits !== 10 || !callsNumber.startsWith("1")) {
        toast.error(
          "رقم المكالمات المصري يجب أن يبدأ بـ 1 ويتكون من 10 أرقام!"
        );
        return;
      }
    } else if (callsDigits < 5) {
      toast.error("رقم المكالمات يجب أن يتكون من 5 أرقام على الأقل!");
      return;
    }

    // تحقق من صحة الإيميل إذا تم إدخاله
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("يرجى إدخال بريد إلكتروني صالح");
      return;
    }

    // تجميع البيانات للإرسال
    const data = {
      package: pkg.id,
      duration: selectedMonth === 1 ? "1_month" : `${selectedMonth}_months`,
      fullname,
      whatsapp_phone_number: whatsappCode + whatsappNumber,
      calls_phone_number: callsCode + callsNumber,
      email: email || "",
    };

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/subscriptions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("تم بنجاح وسيتم التواصل معك قريبا!");
        resetForm();
        onClose();
        window.lenis.scrollTo(0, {
          duration: 0.5,
        });
      } else {
        toast.error("حدث خطأ غير متوقع!");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ======== إعدادات React Select ========

  // تحضير خيارات البلدان
  const countryOptions = countryCodes.map((c) => ({
    value: c.dial_code,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`https://flagsapi.com/${c.code}/flat/32.png`}
          alt={c.name}
          className="w-7 h-5 object-contain"
        />
        <span>{c.dial_code}</span>
      </div>
    ),
    code: c.code,
  }));

  // تنسيقات React Select المخصصة
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "100px",
      borderRadius: "0.5rem",
      border: "none",
      backgroundColor: "rgba(243,243,243,1)",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      borderRadius: "0.5rem",
      maxHeight: "200px",
      overflow: "auto",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflow: "auto",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(205,233,78,0.2)" : "white",
      color: "black",
    }),
  };

  // مكون SingleValue المخصص لعرض placeholder لو مفيش اختيار
  const SingleValue = ({ children, ...props }) => {
    if (!props.getValue().length) {
      return (
        <span className="text-gray-400">{props.selectProps.placeholder}</span>
      );
    }
    return (
      <components.SingleValue {...props}>{children}</components.SingleValue>
    );
  };

  // ======== الـ JSX ========
  return (
    <div
      className="pt-8 pb-9 xl:pt-20 xl:pb-24 bg-white"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,.35),
            rgba(255,255,255,.35)
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,.45),
            rgba(255,255,255,.2),
            rgba(255,255,255,.05)
          ),
          url('/images/lines.png')
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="relative w-full xl:w-[85%] mx-auto">
          <div className="relative bg-white rounded-3xl p-8 z-10 w-full shadow-2xl">
            {/* العنوان */}
            <h2 className="font-semibold text-xl mb-1.5">بيانات الاشتراك</h2>
            <p
              className="font-medium text-sm mb-6"
              style={{ color: "rgba(102, 102, 102, 1)" }}
            >
              برجاء إدخال البيانات بدقة لنتواصل معك
            </p>

            <div className="flex gap-8 lg:flex-row flex-col">
              {/* ======== قسم عرض تفاصيل الباقة ======== */}
              <div
                className="text-white p-6 pb-10 rounded-3xl min-h-full relative overflow-hidden lg:w-[40%]"
                style={{ background: "rgba(26, 26, 26, 1)" }}
              >
                {/* صور الخلفية الديكورية */}
                <img
                  src="/images/serv-5.png"
                  alt="light"
                  className="absolute w-400 -top-30 -right-30"
                />
                <img
                  src="/images/hero-left-ellipse.png"
                  alt="light"
                  className="absolute w-400 -bottom-30 -left-30"
                />

                {/* عنوان ووصف الباقة */}
                <h2 className="text-2xl font-semibold mb-3">{pkg.name}</h2>
                <p className="mb-8" style={{ color: "rgba(230, 230, 230, 1)" }}>
                  {pkg.short_description}
                </p>

                {/* مميزات الباقة */}
                {pkg.descriptions.length !== 0 && (
                  <ul className="space-y-3 pl-2 mb-8">
                    {pkg.descriptions.map((desc, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div
                          className="w-5 h-5 rounded-full shrink-0 flex justify-center items-center mt-0.5"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                          }}
                        >
                          <IoMdCheckmark />
                        </div>
                        <span className="font-medium">{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* مدة الاشتراك */}
                <p
                  className="font-semibold mb-3 pt-7"
                  style={{ borderTop: "1px solid rgba(153, 153, 153, 1)" }}
                >
                  مدة الاشتراك:{" "}
                  {selectedMonth === 1
                    ? "شهر"
                    : selectedMonth === 6
                    ? "6 شهور"
                    : "12 شهر"}
                </p>

                {/* السعر بعد الخصم */}
                <p className="font-bold text-2xl">{prices.after} جنيه</p>
              </div>

              {/* ======== قسم نموذج الاشتراك ======== */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 flex-1"
              >
                {/* حقل الاسم */}
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-semibold">
                    الاسم بالكامل
                    <span className="text-red-500 mr-0.5">*</span>
                  </label>

                  <div className="relative">
                    <FiUser
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="الاسم بالكامل"
                      value={fullname}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[0-9]/g, "");
                        if (val.length > 30) val = val.slice(0, 30);
                        setFullname(val);
                      }}
                      required
                      minLength={8}
                      disabled={loading}
                      className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50"
                      style={{ background: "rgba(243, 243, 243, 1)" }}
                    />
                  </div>
                </div>

                {/* حقل رقم الواتساب */}
                <div className="flex gap-3 items-start flex-col sm:flex-row sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                  {/* كود الدولة */}
                  <div className="flex-1 flex flex-col w-full">
                    <label className="block mb-1.5 text-sm font-semibold text-right">
                      كود الدولة
                      <span className="text-red-500 mr-0.5">*</span>
                    </label>
                    <Select
                      value={
                        whatsappCode
                          ? countryOptions.find((o) => o.value === whatsappCode)
                          : null
                      }
                      onChange={(option) => setWhatsappCode(option.value)}
                      options={countryOptions}
                      placeholder="كود الدولة"
                      styles={customStyles}
                      menuPosition="fixed"
                      menuPlacement="auto"
                      isSearchable={false}
                      formatOptionLabel={(option) => (
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagsapi.com/${option.code}/flat/32.png`}
                            alt=""
                            className="w-7 h-5 object-contain"
                          />
                          <span>{option.value}</span>
                        </div>
                      )}
                      components={{ SingleValue }}
                    />
                  </div>

                  {/* رقم الواتساب */}
                  <div className="w-full sm:w-[70%] md:w-[75%] lg:w-[65%] flex flex-col">
                    <label className="block mb-1.5 text-sm font-semibold text-right">
                      رقم الواتساب
                      <span className="text-red-500 mr-0.5">*</span>
                    </label>
                    <div className="relative h-full">
                      <FaWhatsapp
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="رقم الواتساب"
                        value={whatsappNumber}
                        onChange={(e) =>
                          handleNumberInput(
                            e.target.value,
                            setWhatsappNumber,
                            whatsappCode === "+20" ? 10 : 15
                          )
                        }
                        required
                        disabled={!whatsappCode || loading}
                        className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none bg-gray-100 placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50 h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* حقل رقم المكالمات */}
                <div className="flex gap-3 items-start flex-col sm:flex-row sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                  {/* كود الدولة */}
                  <div className="flex-1 flex flex-col w-full">
                    <label className="block mb-1.5 text-sm font-semibold text-right">
                      كود الدولة
                      <span className="text-red-500 mr-0.5">*</span>
                    </label>
                    <Select
                      value={
                        callsCode
                          ? countryOptions.find((o) => o.value === callsCode)
                          : null
                      }
                      onChange={(option) => setCallsCode(option.value)}
                      options={countryOptions}
                      placeholder="كود الدولة"
                      styles={customStyles}
                      menuPosition="fixed"
                      menuPlacement="auto"
                      isSearchable={false}
                      formatOptionLabel={(option) => (
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagsapi.com/${option.code}/flat/32.png`}
                            alt=""
                            className="w-7 h-5 object-contain"
                          />
                          <span>{option.value}</span>
                        </div>
                      )}
                      components={{ SingleValue }}
                    />
                  </div>

                  {/* رقم المكالمات */}
                  <div className="w-full sm:w-[70%] md:w-[75%] lg:w-[65%] flex flex-col">
                    <label className="block mb-1.5 text-sm font-semibold text-right">
                      رقم المكالمات
                      <span className="text-red-500 mr-0.5">*</span>
                    </label>
                    <div className="relative h-full">
                      <CiMobile1
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="رقم المكالمات"
                        value={callsNumber}
                        onChange={(e) =>
                          handleNumberInput(
                            e.target.value,
                            setCallsNumber,
                            callsCode === "+20" ? 10 : 15
                          )
                        }
                        required
                        disabled={!callsCode || loading}
                        className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none bg-gray-100 placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50 h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* البريد الإلكتروني (اختياري) */}
                <div className="w-full sm:pt-0 pt-2.5 border-gray-300 border-t-2 border-dotted sm:border-none">
                  <label className="block mb-1.5 text-sm font-semibold">
                    البريد الإلكتروني
                    <span className="text-gray-400 font-normal text-xs mr-0.5">
                      (اختياري)
                    </span>
                  </label>

                  <div className="relative">
                    <CiMail
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 50))}
                      disabled={loading}
                      className="w-full text-right pr-10 pl-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 disabled:opacity-60 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(205,233,78,0.45)] focus:bg-gray-50"
                      style={{ background: "rgba(243, 243, 243, 1)" }}
                    />
                  </div>
                </div>

                {/* زر إرسال النموذج */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-8 w-full py-4 rounded-2xl text-lg font-bold transition duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {loading ? "جاري الإرسال ..." : "إتمام طلب الاشتراك"}
                </button>

                {/* ملاحظة الخصوصية */}
                <p className="text-center text-sm">
                  نحن نحترم خصوصيتك، بياناتك في أمان تام.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
