export interface ILoginPayload {
    email: string,
    password: string,
}

export interface IRegisterPayload {
    name: string,
    email: string,
    phone: string,
    password: string
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    imageUrl: string,
}

export interface IUserPayload {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    password: string,
    avatar: string,
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

export interface ITicketPayload {
    id: string,
    title: string,
    price: number,
    cover: string,
    description: string,
    location: string
}

export interface Transaction {
    id: string;
    user_id: string;
    title: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    finance_role: string;
    transaction_date: string;
    order_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    name: string;
    quantity: number;
    total_price: number;
    channel: string;
    payment_method: string;
    status: string;
    order_date: string;
}