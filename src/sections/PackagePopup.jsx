import { useState } from "react";
import { countryCodes } from "../data/countryCodes";
import { BASE_URL } from "../config/api";

export default function PackagePopup({ pkg, onClose }) {
  // حالات النموذج (Form States)
  const [fullname, setFullname] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [callsCode, setCallsCode] = useState("");
  const [callsNumber, setCallsNumber] = useState("");
  const [email, setEmail] = useState("");

  // حالة التحميل
  const [loading, setLoading] = useState(false);

  // مدة الباقة المختارة (من الـ props)
  const selectedMonth = pkg?.selectedMonth || 1;

  // إذا ماكانش في باقة مختارة، ما نعرضش حاجة
  if (!pkg) return null;

  // دالة عرض رسالة تنبيه مؤقتة (Toast بديل بسيط)
  const showToast = (msg) => alert(msg);

  // دالة لتنظيف الإدخال الرقمي والحد من الطول
  const handleNumberInput = (value, setter, maxLength) => {
    const cleaned = value.replace(/\D/g, ""); // إزالة أي غير أرقام
    setter(cleaned.slice(0, maxLength));
  };

  // دالة تفريغ النموذج
  const resetForm = () => {
    setFullname("");
    setWhatsappCode("");
    setWhatsappNumber("");
    setCallsCode("");
    setCallsNumber("");
    setEmail("");
  };

  // معالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الاسم (حقل مطلوب مع minLength في الـ HTML)
    if (!fullname) {
      e.target.reportValidity();
      return;
    }

    // التحقق من اختيار كود البلد للواتساب والمكالمات
    if (!whatsappCode) {
      showToast("يرجى اختيار كود بلد الواتساب.");
      return;
    }
    if (!callsCode) {
      showToast("يرجى اختيار كود بلد المكالمات.");
      return;
    }

    const whatsappDigits = whatsappNumber.length;
    const callsDigits = callsNumber.length;

    // تحقق خاص برقم مصر (يبدأ بـ 01 و10 أرقام)
    if (whatsappCode === "+20") {
      if (whatsappDigits !== 10 || !whatsappNumber.startsWith("1")) {
        showToast("رقم الواتساب المصري يجب أن يبدأ بـ01 ويحتوي على 10 أرقام.");
        return;
      }
    } else if (whatsappDigits < 5) {
      showToast("رقم الواتساب يجب أن يكون 5 أرقام على الأقل.");
      return;
    }

    if (callsCode === "+20") {
      if (callsDigits !== 10 || !callsNumber.startsWith("1")) {
        showToast("رقم المكالمات المصري يجب أن يبدأ بـ01 ويحتوي على 10 أرقام.");
        return;
      }
    } else if (callsDigits < 5) {
      showToast("رقم المكالمات يجب أن يكون 5 أرقام على الأقل.");
      return;
    }

    // تحقق من صحة الإيميل إذا تم إدخاله
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("يرجى إدخال بريد إلكتروني صالح.");
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

    // بدء التحميل
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
        showToast("تم بنجاح! سيتم التواصل معك قريبا");
        resetForm();
        onClose(); // إغلاق البوب أب
      } else {
        showToast("حدث خطأ غير متوقع!");
      }
    } catch (error) {
      // أي خطأ في الشبكة أو السيرفر
      showToast("حدث خطأ غير متوقع!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // دالة مساعدة لحساب السعر حسب المدة المختارة
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
    return { before: 0, after: 0 }; // fallback
  };

  const prices = getPrice(selectedMonth);

  // مكون القائمة المنسدلة المخصصة لاختيار كود البلد
  const CustomCountrySelect = ({ value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCountry = countryCodes.find((c) => c.dial_code === value);

    return (
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border p-3 rounded w-full text-right flex items-center justify-between bg-white"
        >
          <span dir="rtl" className="flex items-center">
            {selectedCountry ? (
              <>
                <img
                  src={`https://flagsapi.com/${selectedCountry.code}/flat/64.png`}
                  alt={selectedCountry.name}
                  className="w-8 h-6 ml-3 inline-block"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {selectedCountry.name} ({value})
              </>
            ) : (
              placeholder
            )}
          </span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {countryCodes.map((c) => (
                <li
                  key={c.code}
                  onClick={() => {
                    onChange(c.dial_code);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-end text-right"
                >
                  <span className="ml-4">
                    {c.name} ({c.dial_code})
                  </span>
                  <img
                    src={`https://flagsapi.com/${c.code}/flat/64.png`}
                    alt={c.name}
                    className="w-8 h-6 inline-block"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* حقل مخفي لضمان عمل الـ required في النموذج */}
        <input type="hidden" value={value || ""} required />
      </div>
    );
  };

  // البحث عن البلد المختار لعرض العلم بجانب حقل الرقم
  const selectedWhatsappCountry = countryCodes.find(
    (c) => c.dial_code === whatsappCode
  );
  const selectedCallsCountry = countryCodes.find(
    (c) => c.dial_code === callsCode
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* عنوان الباقة ووصفها */}
        <h2 className="text-xl font-bold mb-3 text-center">{pkg.name}</h2>
        <p className="text-gray-600 mb-3 text-center">
          {pkg.short_description}
        </p>

        <p className="font-semibold mb-4 text-center">
          مدة الباقة: {selectedMonth}{" "}
          {selectedMonth === 1
            ? "شهر"
            : selectedMonth === 6
            ? "6 شهور"
            : "12 شهر"}
        </p>

        {/* عرض السعر قبل وبعد الخصم */}
        <div className="mb-6 text-center">
          <p className="line-through text-gray-500 text-lg">
            {prices.before} ج.م
          </p>
          <p className="text-green-600 font-bold text-3xl">
            {prices.after} ج.م
          </p>
        </div>

        {/* مميزات الباقة */}
        <ul className="list-disc pr-5 mb-6 space-y-2 text-right">
          {pkg.descriptions.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>

        {/* نموذج الاشتراك */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="الاسم بالكامل"
            value={fullname}
            onChange={(e) => {
              let val = e.target.value.replace(/[0-9]/g, ""); // منع الأرقام
              if (val.length > 30) val = val.slice(0, 30);
              setFullname(val);
            }}
            required
            minLength={8}
            disabled={loading}
            className="border p-3 rounded w-full text-right"
          />

          {/* حقل واتساب */}
          <div className="flex gap-3 items-center">
            <CustomCountrySelect
              value={whatsappCode}
              onChange={setWhatsappCode}
              placeholder="كود البلد"
            />
            {whatsappCode && selectedWhatsappCountry && (
              <img
                src={`https://flagsapi.com/${selectedWhatsappCountry.code}/flat/64.png`}
                alt={selectedWhatsappCountry.name}
                className="w-8 h-6"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
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
              className="border p-3 rounded flex-1 text-right bg-gray-50"
              required
              disabled={!whatsappCode || loading}
            />
          </div>

          {/* حقل المكالمات */}
          <div className="flex gap-3 items-center">
            <CustomCountrySelect
              value={callsCode}
              onChange={setCallsCode}
              placeholder="كود البلد"
            />
            {callsCode && selectedCallsCountry && (
              <img
                src={`https://flagsapi.com/${selectedCallsCountry.code}/flat/64.png`}
                alt={selectedCallsCountry.name}
                className="w-8 h-6"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
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
              className="border p-3 rounded flex-1 text-right bg-gray-50"
              required
              disabled={!callsCode || loading}
            />
          </div>

          {/* البريد الإلكتروني (اختياري) */}
          <input
            type="email"
            placeholder="البريد الإلكتروني (اختياري)"
            value={email}
            onChange={(e) => setEmail(e.target.value.slice(0, 50))}
            disabled={loading}
            className="border p-3 rounded w-full text-right"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 rounded font-semibold transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "جاري الإرسال..." : "اشترك في الباقة"}
          </button>
        </form>

        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          disabled={loading}
          className={`mt-3 w-full py-3 rounded font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
