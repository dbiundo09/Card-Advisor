import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

// Credit preference categories with icons and descriptions
const creditPreferences = {
    travel: {
        title: "Travel & Airlines",
        icon: "✈️",
        preferences: [
            { id: "travelCredit", label: "Travel Credit", description: "Annual travel statement credits used on any travel related purchases", easyToUse: true },
            { id: "airlineIncidentals", label: "Airline Incidental Credits", description: "Baggage, food, seat fees" },
            { id: "precheck", label: "TSA PreCheck Credit", description: "Fast security screening", easyToUse: true },
            { id: "globalEntry", label: "Global Entry Credit", description: "International travel expedited", easyToUse: true },
            { id: "nexus", label: "NEXUS Credit", description: "US-Canada border expedited" },
            { id: "clearPlus", label: "CLEAR Plus", description: "Biometric security screening" }
        ]
    },
    dining: {
        title: "Dining & Entertainment",
        icon: "🍽️",
        preferences: [
            { id: "resy", label: "Resy Dining Credits", description: "Restaurant reservation credits" },
            { id: "doordash", label: "DoorDash Credits", description: "Food delivery service", easyToUse: true },
            { id: "grubhub", label: "Grubhub Credits", description: "Food delivery service", easyToUse: true },
            { id: "dunkin", label: "Dunkin' Credits", description: "Coffee and food credits", easyToUse: true },
            { id: "stubhub", label: "StubHub Credits", description: "Event ticket credits" },
            { id: "digitalEntertainment", label: "Digital Entertainment", description: "General streaming and media credits", easyToUse: true },
            { id: "appleTV/music", label: "Apple TV/Music", description: "Apple entertainment services", easyToUse: true },
            { id: "dashpass", label: "DashPass Membership", description: "DoorDash premium service", easyToUse: true },
            { id: "disney", label: "Disney Credits", description: "Disney theme park and resorts" },
        ]
    },
    shopping: {
        title: "Shopping & Retail",
        icon: "🛍️",
        preferences: [
            { id: "saks", label: "Saks Fifth Avenue", description: "Luxury department store credits" },
            { id: "walmart+", label: "Walmart+ Membership", description: "Walmart shopping benefits", easyToUse: true },
        ]
    },
    transportation: {
        title: "Transportation & Rides",
        icon: "🚗",
        preferences: [
            { id: "uber", label: "Uber Credits", description: "Ride-sharing service credits", easyToUse: true },
            { id: "lyft", label: "Lyft Credits", description: "Ride-sharing service credits", easyToUse: true }
        ]
    },
    lifestyle: {
        title: "Lifestyle & Wellness",
        icon: "🏃",
        preferences: [
            { id: "peloton", label: "Peloton Credits", description: "Fitness equipment and classes", easyToUse: true },
        ]
    },
    hotels: {
        title: "Hotels & Stays",
        icon: "🏨",
        preferences: [
            { id: "ihg", label: "IHG Hotel Credits", description: "InterContinental Hotels Group" },
            { id: "theEdit", label: "The Edit by Chase", description: "Premium hotel and resort benefits curated by Chase" },
            { id: "amexHotelCollection", label: "Hotel Collection Benefits", description: "Premium hotel and resort benefits curated by American Expressk" },
            { id: "fhr", label: "Fine Hotels & Resorts", description: "5-star hotel benefits curated by American Express" },

        ]
    }
}

function CreditsAccordion({
    isActive,
    onToggle,
    userInput,
    onInputChange,
    onDone
}) {
    const [selectedPreferences, setSelectedPreferences] = useState(userInput.creditPreferences || {})
    const [activeCategory, setActiveCategory] = useState('travel')

    const togglePreference = (preferenceId) => {
        setSelectedPreferences(prev => ({
            ...prev,
            [preferenceId]: !prev[preferenceId]
        }))
    }

    const handleDone = () => {
        onInputChange('creditPreferences', selectedPreferences)
        onDone()
    }

    const getSelectedCount = () => {
        return Object.values(selectedPreferences).filter(Boolean).length
    }

    const getTotalPreferences = () => {
        return Object.values(creditPreferences).reduce((total, category) => {
            return total + category.preferences.length
        }, 0)
    }

    return (
        <div className={`accordion ${isActive ? 'active' : ''}`}>
            <div className="accordion-header" onClick={onToggle}>
                <div className="accordion-title">
                    <span className="accordion-icon">📊</span>
                    <h2>Credits & Benefits</h2>
                </div>
                <div className="accordion-status">
                    {isActive ? (
                        <span className="status-active">Active</span>
                    ) : (
                        <span className="status-pending">
                            {getSelectedCount() > 0 ? `${getSelectedCount()} selected` : 'Pending'}
                        </span>
                    )}
                </div>
            </div>

            <div className="accordion-content">
                <div className="credits-section">

                    {/* Credit Preferences */}
                    <div className="credit-preferences">
                        <div className="preferences-header">
                            <h3>What Benefits Matter to You?</h3>
                            <p>Only select the benefits that you already use or are planning to use in the future</p>
                            <div className="selected-count">
                                {getSelectedCount()} of {getTotalPreferences()} benefits selected
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="category-tabs">
                            {Object.entries(creditPreferences).map(([key, category]) => (
                                <button
                                    key={key}
                                    className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(key)}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-title">{category.title}</span>
                                    <span className="category-count">
                                        {category.preferences.filter(pref => selectedPreferences[pref.id]).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Preferences Grid */}
                        <div className="preferences-grid">
                            {creditPreferences[activeCategory].preferences.map((preference) => (
                                <div
                                    key={preference.id}
                                    className={`preference-item ${selectedPreferences[preference.id] ? 'selected' : ''} ${preference.easyToUse ? 'easy-to-use' : ''}`}
                                    onClick={() => togglePreference(preference.id)}
                                >
                                    {preference.easyToUse && (
                                        <div className="easy-to-use-badge">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                            </svg>
                                            <span>Easy to Use</span>
                                        </div>
                                    )}
                                    <div className="preference-checkbox">
                                        <div className={`checkbox ${selectedPreferences[preference.id] ? 'checked' : ''}`}>
                                            {selectedPreferences[preference.id] && (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="preference-content">
                                        <div className="preference-label">{preference.label}</div>
                                        <div className="preference-description">{preference.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <button
                                className="quick-action-btn"
                                onClick={() => setSelectedPreferences({})}
                            >
                                Clear All
                            </button>
                            <button
                                className="quick-action-btn"
                                onClick={() => {
                                    const allPreferences = {}
                                    Object.values(creditPreferences).forEach(category => {
                                        category.preferences.forEach(pref => {
                                            allPreferences[pref.id] = true
                                        })
                                    })
                                    setSelectedPreferences(allPreferences)
                                }}
                            >
                                Select All
                            </button>
                        </div>
                    </div>

                    <div className="accordion-actions">
                        <button className="done-button" onClick={handleDone}>
                            Generate Recommendations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditsAccordion 