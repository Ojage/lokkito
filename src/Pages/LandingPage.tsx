import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Play, Star, ChevronRight} from 'lucide-react';
import Header from '../components/Header';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            {/* Hero */}
            <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-8">
                        <Star className="w-4 h-4 mr-2" />
                        Built for Pidgin speakers and researchers
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Your Pidgin-powered <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">research & audio</span> buddy
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Upload your English PDFs or Word files, get instant summaries and translations in Cameroon Pidgin, and listen to them like podcast episodes. Anywhere, anytime.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 flex items-center justify-center"
                        >
                            Try It Now <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                        <button className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                            <Play className="w-5 h-5 mr-2" /> Watch Demo
                        </button>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-2xl border border-gray-100">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="space-y-4 text-left">
                                    <p className="text-gray-800 text-sm">
                                        📄 Upload: Any PDF/Word document
                                    </p>
                                    <p className="text-gray-800 text-sm">
                                        🧠 Translate: Auto-convert to Cameroon Pidgin
                                    </p>
                                    <p className="text-gray-800 text-sm">
                                        🎧 Listen: Get voice/audio summary you fit download or stream
                                    </p>
                                    <p className="text-gray-600 text-xs mt-4">
                                        Powered by Loka-Lokito, your Pidgin-speaking AI don!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
