import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

// Interface do usuário, ajustando conforme o banco de dados
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  [key: string]: any;
}

// Tipagem do Contexto de Autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (fields: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Provedor do Contexto de Autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do usuário
  const fetchUserData = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      console.error("🔴 Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o estado do usuário
  const refreshUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const sessionUser = data?.session?.user;

      if (sessionUser?.id) {
        await fetchUserData(sessionUser.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("🔴 Error getting session:", error);
      setUser(null);
      setLoading(false);
    }
  };

  // Efeito para buscar os dados do usuário no início e ouvir alterações no estado de autenticação
  useEffect(() => {
    refreshUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      if (sessionUser) {
        fetchUserData(sessionUser.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Função para atualizar os dados do usuário no estado
  const updateUser = (fields: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
