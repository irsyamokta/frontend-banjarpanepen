import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import authService from "../services/authService";
import { ILoginPayload, IUser, IAuthContextType } from "../types/index.d";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

const dummyGuest = {
  id: "404",
  name: "Mas Dewa",
  email: "warasbanget76@gmail.com",
  password: "12345Dewa!",
  phone: "081234567890",
  role: "Visitor",
  imageUrl:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftargethukum.com%2Fmencari-keadilan-bapak-bocah-tewas-di-swp-sampang-tuntut-beber-cctv%2F&psig=AOvVaw2ZyauT98ACCcYFbwQ4_ltG&ust=1758375650732000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMCK8_D55I8DFQAAAAAdAAAAABAv",
};

const fetchUser = async (): Promise<IUser> => {
  return await authService.me();
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, error, mutate, isValidating } = useSWR("/me", fetchUser);

  const login = async (payload: ILoginPayload) => {
    if (
      payload.email === dummyGuest.email &&
      payload.password === dummyGuest.password
    ) {
      const guest: IUser = {
        id: dummyGuest.id,
        name: dummyGuest.name,
        email: dummyGuest.email,
        phone: dummyGuest.phone,
        role: "Visitor",
        imageUrl: dummyGuest.imageUrl,
      };
      mutate(guest, false);
      return guest;
    }

    const res = await authService.login(payload);
    const user = res.data;

    mutate(user, false);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    mutate(undefined, false);
  };

  const checkAuth = async () => {
    await mutate();
  };

  const value = useMemo(
    () => ({
      user: user || null,
      loading: isValidating && !user && !error,
      login,
      logout,
      checkAuth,
    }),
    [user, isValidating, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};
