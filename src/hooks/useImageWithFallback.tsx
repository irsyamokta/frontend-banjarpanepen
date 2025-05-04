import { useState, useEffect } from 'react';
import { LuImageOff, LuWifiOff } from 'react-icons/lu';

const useImageWithFallback = (thumbnail: string, title: string, isGallery: boolean = false) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isImageError, setIsImageError] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleImageError = () => {
        setIsImageError(true);
    };

    const getImageContent = () => {
        if (!thumbnail || isImageError) {
            return (
                <div
                    className={`w-full h-full flex items-center justify-center ${isGallery ? 'bg-gray-100 shadow-lg border p-10' : 'bg-gray-100'}`}
                >
                    <LuImageOff size={50} />
                </div>
            );
        }

        if (!isOnline) {
            return (
                <div
                    className={`w-full h-full flex items-center justify-center ${isGallery ? 'bg-gray-100 shadow-lg border p-10' : 'bg-gray-100'}`}
                >
                    <LuWifiOff size={50} />
                </div>
            );
        }

        return (
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
                onError={handleImageError}
            />
        );
    };

    return getImageContent();
};

export default useImageWithFallback;