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
    title: string;
    content: string;
    writer: string;
    thumbnail: string;
}

export interface IEventPayload {
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    price: string;
    thumbnail: string;
}

export interface IPackagePayload {
    title: string;
    price: string;
    benefit: string;
    thumbnail: string;
}

export interface IGalleryPayload {
    title: string;
    caption: string;
    image: string;
}