import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAuthSync = () => {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    console.log('useAuthSync', { isAuthenticated, user });      
    useEffect(() => {
        const storeUser = async () => {
            if (isAuthenticated && user) {
                const token = await getAccessTokenSilently();

                const userData = {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                    token,
                };

                localStorage.setItem('lokkalokkito_user', JSON.stringify(userData));
            }
        };

        storeUser();
    }, [isAuthenticated, user, getAccessTokenSilently]);
};
