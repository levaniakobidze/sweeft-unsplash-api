import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
interface Props {
  children: ReactNode;
}

export interface ContextTypes {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<ContextTypes | null>(null);

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
