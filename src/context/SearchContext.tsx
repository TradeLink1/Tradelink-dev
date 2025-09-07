import { createContext, useContext, useState } from "react";

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  results: any[];
  setResults: (value: any[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, setResults, loading, setLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
