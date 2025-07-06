export interface ILoginPayload {
    email: string,
    password: string,
}

export interface IRegisterPayload {
    name: string,
    email: string,
    password: string
    passwordConfirmation: string,
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: "ADMIN" | "USER",
    imageUrl: string,
}

export interface IAuthContextType {
    user: User | null,
    loading: boolean,
    login: (payload: ILoginPayload) => Promise<void>,
    logout: () => Promise<void>,
    checkAuth: () => Promise<void>,
}

export interface IArticlePayload {
    id: string,
    title: string,
    content: string,
    writer: string,
    thumbnail: string,
    created_at: string,
    updated_at: string,
}

export interface IEventPayload {
    id: string,
    title: string,
    description: string,
    date: string,
    time: string,
    place: string,
    price: number,
    thumbnail: string,
}

export interface IPackagePayload {
    id: string,
    title: string,
    price: number,
    benefit: string,
    thumbnail: string,
}

export interface IGalleryPayload {
    id: string,
    title: string,
    caption: string,
    image: string,
}

export interface ITourPayload {
    id: string,
    title: string,
    about: string,
    location: string,
    operational: string,
    start: string,
    end: string,
    facility: string,
    maps?: string,
    price: number,
    thumbnail: string,
}

export interface ISettingPayload {
    id: string,
    name: string,
    category: string,
}