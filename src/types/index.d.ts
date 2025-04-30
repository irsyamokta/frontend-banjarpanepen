export interface ILoginPayload {
    email: string,
    password: string,
}

export interface IRegisterPayload {
    name: string,
    email: string,
    password: string
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    imageUrl: string;
}

export interface IAuthContextType {
    user: User | null;
    loading: boolean;
    login: (payload: ILoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}