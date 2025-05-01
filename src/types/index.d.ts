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

export interface IArticlePayload {
    id: string;
    title: string;
    content: string;
    writer: string;
    thumbnail: string;
}

export interface IEventPayload {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    price: number;
    thumbnail: string;
}

export interface IPackagePayload {
    id: string;
    title: string;
    price: number;
    benefit: string;
    thumbnail: string;
}

export interface IGalleryPayload {
    id: string;
    title: string;
    caption: string;
    image: string;
}