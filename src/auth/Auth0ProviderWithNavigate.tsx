import { useNavigate } from 'react-router-dom';
import { Auth0Provider, AppState, User } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';

const Auth0ProviderWithNavigate = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    console.log('Auth0ProviderWithNavigate', { domain, clientId, audience });
    const onRedirectCallback = (appState?: AppState, _user?: User) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;
