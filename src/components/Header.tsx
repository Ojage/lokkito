import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import {
    Menu, X, Twitter, Github, Linkedin
} from 'lucide-react';
import lokkalokkitoLogo from '../assets/images/LogoLoka_Lokkito.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={lokkalokkitoLogo}
                            alt="Lokka Lokkito Logo"
                            className="w-12 h-12 rounded-full"
                        />
                        <span className="text-xl font-semibold text-gray-900">Lokka Lokkito</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Overview</Link>
                        <Link to="/plans" className="text-gray-600 hover:text-gray-900 transition-colors">Plans</Link>
                        <div className="flex items-center space-x-4 ml-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-600 hover:text-gray-900"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-600 hover:text-gray-900"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </nav>

                    {/* Desktop Buttons */}
                    {isAuthenticated ? (
                        <>
                            <span>{user?.name}</span>
                            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</button>
                            <button
                                onClick={() => loginWithRedirect()}
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Try Lokito
                            </button>
                        </div>
                    )}
                </div>


                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        {/* </div> */}

            {/* Mobile Navigation */ }
    {
        isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
                <div className="px-4 py-4 space-y-4">
                    <Link to="/" className="block text-gray-600 hover:text-gray-900">Overview</Link>
                    <Link to="/plans" className="block text-gray-600 hover:text-gray-900">Plans</Link>
                    <div className="flex items-center space-x-4 py-2">
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Linkedin className="w-5 h-5" /></a>
                    </div>
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                        <button className="block w-full text-left text-gray-600 hover:text-gray-900">Sign in</button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="block w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Try Lokito
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        </header >
    );
};

export default Header;
