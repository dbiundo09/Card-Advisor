import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

// Category descriptions for tooltips
const categoryDescriptions = {
    gasStations: "Gas stations, fuel purchases, and convenience store items at gas stations",
    restaurants: "Dining out at restaurants, cafes, fast food, and food delivery services",
    supermarkets: "Traditional grocery stores like Kroger, Safeway, Whole Foods, etc.",
    onlineGrocery: "Online grocery delivery services like Instacart, Amazon Fresh, etc.",
    otherOnlineRetail: "Online shopping excluding Amazon (e.g., Target.com, Walmart.com)",
    amazon: "All purchases made on Amazon.com and Amazon Prime",
    drugStores: "Pharmacies like CVS, Walgreens, Rite Aid, and drug store purchases",
    wholesaleClubs: "Warehouse clubs like Costco, Sam's Club, BJ's Wholesale",
    airfare: "Airline tickets, flight bookings, and air travel expenses",
    hotels: "Hotel stays, accommodations, and lodging expenses",
    vehicleRentals: "Car rentals, truck rentals, and vehicle rental services",
    movieEntertainment: "Movie theaters, concerts, sporting events, and entertainment venues",
    streaming: "Streaming services like Netflix, Hulu, Spotify, Apple Music, etc.",
    otherTransit: "Public transportation, rideshares, parking, tolls, and transit expenses",
    rent: "Rent payments, mortgage payments, and housing costs",
    other: "All other expenses not covered by the categories above"
}

function SpendingAccordion({
    isActive,
    onToggle,
    displayMode,
    onToggleDisplayMode,
    userInput,
    onSpendingChange,
    onSpendingInputChange,
    getDisplayValue,
    getPlaceholder,
    onDone
}) {
    const [activeTooltip, setActiveTooltip] = useState(null)

    const showTooltip = (category) => {
        setActiveTooltip(category)
    }

    const hideTooltip = () => {
        setActiveTooltip(null)
    }

    return (
        <div className={`accordion ${isActive ? 'active' : ''}`}>
            <div className="accordion-header" onClick={onToggle}>
                <div className="accordion-title">
                    <span className="accordion-icon">💰</span>
                    <h2>Monthly Spending</h2>
                </div>
                <div className="accordion-status">
                    {isActive ? (
                        <span className="status-active">Active</span>
                    ) : (
                        <span className="status-complete">Complete</span>
                    )}
                </div>
            </div>

            <div className="accordion-content">
                <div className="spending-section">
                    <div className="spending-total">
                        <div className="input-group total-group">
                            <label>Total Monthly Spending</label>
                            <div className="total-display">
                                ${userInput.monthlySpending.total}
                            </div>
                        </div>
                    </div>

                    <div className="spending-grid">
                        {[
                            { key: 'gasStations', label: 'Gas Stations' },
                            { key: 'restaurants', label: 'Restaurants' },
                            { key: 'supermarkets', label: 'Supermarkets' },
                            { key: 'onlineGrocery', label: 'Online Grocery' },
                            { key: 'otherOnlineRetail', label: 'Other Online Retail' },
                            { key: 'amazon', label: 'Amazon' },
                            { key: 'drugStores', label: 'Drug Stores' },
                            { key: 'wholesaleClubs', label: 'Wholesale Clubs' },
                            { key: 'airfare', label: 'Airfare' },
                            { key: 'hotels', label: 'Hotels' },
                            { key: 'vehicleRentals', label: 'Vehicle Rentals' },
                            { key: 'movieEntertainment', label: 'Movie & Entertainment' },
                            { key: 'streaming', label: 'Streaming' },
                            { key: 'otherTransit', label: 'Other Transit' },
                            { key: 'rent', label: 'Rent' },
                            { key: 'other', label: 'Other' }
                        ].map(({ key, label }) => (
                            <div key={key} className="input-group">
                                <div className="label-container">
                                    <label>{label}</label>
                                    <div
                                        className="info-icon"
                                        onMouseEnter={() => showTooltip(key)}
                                        onMouseLeave={hideTooltip}
                                        onClick={() => showTooltip(activeTooltip === key ? null : key)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                            <line x1="12" y1="9" x2="12" y2="13" />
                                            <circle cx="12" cy="17" r="1" />
                                        </svg>
                                        {activeTooltip === key && (
                                            <div className="tooltip">
                                                {categoryDescriptions[key]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {displayMode === 'dollars' ? (
                                    <CurrencyInput
                                        id={key}
                                        name={key}
                                        placeholder="Please enter a number"
                                        defaultValue={userInput.monthlySpending[key]}
                                        decimalsLimit={2}
                                        onValueChange={(value) => onSpendingInputChange(key, value)}
                                        className="currency-input"
                                    />
                                ) : (
                                    <input
                                        type="number"
                                        placeholder={getPlaceholder(key)}
                                        value={getDisplayValue(key)}
                                        onChange={(e) => onSpendingInputChange(key, e.target.value)}
                                        onBlur={(e) => {
                                            // Ensure total is recalculated when user finishes typing
                                            const value = e.target.value || '0'
                                            onSpendingInputChange(key, value)
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="accordion-actions">
                        <button className="done-button" onClick={onDone}>
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpendingAccordion 