import { createContext, useContext, useState } from "react";

type Seller = {
  _id: string;
  storeName: string;
  email: string;
  phone: string;
  description: string;
  businessCategory: string;
  storeLogo: string;
  location: {
    city: string;
    state: string;
  };
};

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  results: Seller[];
  loading: boolean;
  searchSellers: (q: string) => Promise<void>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔍 fetch sellers
  const searchSellers = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/sellers/search?q=${q}`); // ✅ changed query -> q
      const data = await res.json();
      setResults(data.sellers || []); // ✅ use sellers array
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, loading, searchSellers }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
