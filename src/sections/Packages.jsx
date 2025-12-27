import { useState } from "react";
import { usePackages } from "../context/packages-context";
import PackagePopup from "./PackagePopup";

export default function Packages() {
  const { packagesIsLoading, packages, errorFetchingPackages } = usePackages();
  const [selectedMonths, setSelectedMonths] = useState({});
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleMonthChange = (pkgId, month) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [pkgId]: month,
    }));
  };

  if (packagesIsLoading) return <p>Loading...</p>;
  if (errorFetchingPackages) return <p>حدث خطأ أثناء جلب الباقات ههه</p>;
  if (!packages || packages.length === 0)
    return <p>لا توجد باكدجات متاحة حاليا</p>;

  return (
    <>
      <div className="packages-container grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => {
          const isSpecial = index % 3 === 1;
          const selectedMonth = selectedMonths[pkg.id] || 1;

          return (
            <div
              key={pkg.id}
              className={`package-box p-4 rounded-lg shadow-md transition-transform ${
                isSpecial ? "bg-red-300 lg:-translate-y-6" : "bg-gray-100"
              }`}
            >
              <h2 className="text-lg font-bold">{pkg.name}</h2>
              <p className="text-gray-600">{pkg.short_description}</p>

              <div className="month-selector flex gap-2 my-2">
                {[1, 6, 12].map((month) => (
                  <button
                    key={month}
                    className={`px-3 py-1 rounded ${
                      selectedMonth === month
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleMonthChange(pkg.id, month)}
                  >
                    {month}{" "}
                    {month === 1 ? "شهر" : month === 6 ? "6 شهور" : "12 شهر"}
                  </button>
                ))}
              </div>

              <div className="prices my-2">
                {selectedMonth === 1 && (
                  <div>
                    <p className="line-through text-gray-500">
                      {pkg.one_month_price_before_discount} ج.م
                    </p>
                    <p className="text-green-600 font-bold">
                      {pkg.one_month_price_after_discount} ج.م
                    </p>
                  </div>
                )}
                {selectedMonth === 6 && (
                  <div>
                    <p className="line-through text-gray-500">
                      {pkg.six_month_price_before_discount} ج.م
                    </p>
                    <p className="text-green-600 font-bold">
                      {pkg.six_month_price_after_discount} ج.م
                    </p>
                  </div>
                )}
                {selectedMonth === 12 && (
                  <div>
                    <p className="line-through text-gray-500">
                      {pkg.twelve_month_price_before_discount} ج.م
                    </p>
                    <p className="text-green-600 font-bold">
                      {pkg.twelve_month_price_after_discount} ج.م
                    </p>
                  </div>
                )}
              </div>

              <ul className="descriptions list-disc pl-5 my-2">
                {pkg.descriptions.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>

              <button
                className="subscribe-btn mt-2 w-full bg-blue-600 text-white py-2 rounded"
                onClick={() =>
                  setSelectedPackage({
                    ...pkg,
                    selectedMonth,
                  })
                }
              >
                اشترك في الباقة
              </button>
            </div>
          );
        })}
      </div>

      <PackagePopup
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </>
  );
}
