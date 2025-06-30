import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate('/app')
    }

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h1>Card Advisor</h1>
                    </div>
                    <nav className="nav">
                        <a href="#home">Home</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#about">About</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Find Your Perfect Credit Card
                        </h1>
                        <p className="hero-subtitle">
                            Get personalized credit card recommendations based on your income, spending habits, and preferences.
                            Save money and earn rewards with the right card for you.
                        </p>
                        <button className="cta-button" onClick={handleGetStarted}>
                            Take me to the app
                        </button>
                    </div>
                    <div className="hero-image">
                        <div className="card-visual">
                            <div className="card-chip"></div>
                            <div className="card-number">**** **** **** 1234</div>
                            <div className="card-info">
                                <span>JOHN DOE</span>
                                <span>12/25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Tell Us About You</h3>
                            <p>Share your income, spending patterns, and preferences to help us understand your financial profile.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>Smart Analysis</h3>
                            <p>Our algorithm analyzes hundreds of credit cards to find the best matches for your specific needs.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h3>Get Recommendations</h3>
                            <p>Receive personalized credit card recommendations with detailed comparisons and benefits.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits">
                <div className="container">
                    <h2 className="section-title">Why Choose Card Advisor?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <h3>💰 Save Money</h3>
                            <p>Find cards with the lowest fees and best interest rates for your situation.</p>
                        </div>
                        <div className="benefit-item">
                            <h3>🎁 Maximize Rewards</h3>
                            <p>Earn more cashback, points, or miles based on your spending categories.</p>
                        </div>
                        <div className="benefit-item">
                            <h3>⚡ Quick & Easy</h3>
                            <p>Get recommendations in minutes, not hours of research.</p>
                        </div>
                        <div className="benefit-item">
                            <h3>🔒 Secure & Private</h3>
                            <p>Your financial information is protected with bank-level security.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Find Your Perfect Card?</h2>
                    <p>Join thousands of users who have found their ideal credit card match.</p>
                    <button className="cta-button large" onClick={handleGetStarted}>
                        Start Your Free Analysis
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 Card Advisor. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage 