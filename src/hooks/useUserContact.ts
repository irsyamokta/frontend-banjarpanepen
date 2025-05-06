import useSWR from 'swr';
import { getUserByContact } from '../services/userService';

interface ContactInfo {
    phone: string;
    instagram: string;
}

const fetchContact = async (): Promise<ContactInfo> => {
    const data = await getUserByContact();
    const user = data.user?.[0];

    if (!user) {
        throw new Error("Contact info not found");
    }

    return {
        phone: user.phone,
        instagram: user.instagram,
    };
};

const useUserContact = () => {
    const { data, error, isLoading } = useSWR('user-contact', fetchContact);

    return {
        contact: data,
        loading: isLoading,
        error,
    };
};

export default useUserContact;