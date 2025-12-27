import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/api";

const PackagesContext = createContext(null);

export function PackagesProvider({ children }) {
  const [packagesIsLoading, setPackagesIsLoading] = useState(false);
  const [packages, setPackages] = useState(null);
  const [errorFetchingPackages, setErrorFetchingPackages] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPackagesIsLoading(true);
    setErrorFetchingPackages(false);

    fetch(`${BASE_URL}/api/packages`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setPackages(data);
        console.log("Packages:", data);
      })
      .catch(() => {
        setErrorFetchingPackages(true);
      })
      .finally(() => {
        setPackagesIsLoading(false);
      });
  }, []);

  return (
    <PackagesContext.Provider
      value={{
        packagesIsLoading,
        packages,
        errorFetchingPackages,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePackages() {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error("usePackages must be used inside PackagesProvider");
  }

  return context;
}
