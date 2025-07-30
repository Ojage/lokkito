import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Header from '../components/Header';

const PlansPage = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "0 XAF",
            period: "forever",
            description: "Perfect to test the waters",
            features: [
                "Upload up to 3 documents",
                "Basic Pidgin translation",
                "1 voice summary/month",
                "PDF export",
                "Community support"
            ],
            buttonText: "Start for Free",
            popular: false
        },
        {
            name: "Pro",
            price: "11,000 XAF",
            period: "per month",
            description: "For students & researchers",
            features: [
                "Unlimited uploads",
                "Faster Pidgin translation",
                "Unlimited audio summaries",
                "Stream & download summaries",
                "Email support"
            ],
            buttonText: "Start Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom XAF",
            period: "billing",
            description: "For schools, NGOs & organizations",
            features: [
                "All Pro features",
                "Team collaboration tools",
                "Admin dashboard",
                "Priority support",
                "Onboarding & training"
            ],
            buttonText: "Contact Us",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible plans for every need</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">From curious learners to institutions — choose what fits you</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 relative ${plan.popular ? 'ring-2 ring-black' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600 ml-2">{plan.period}</span>
                                    </div>
                                    <p className="text-gray-600">{plan.description}</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular
                                            ? 'bg-black text-white hover:bg-gray-800'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlansPage;
