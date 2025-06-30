import React from 'react'
import CurrencyInput from 'react-currency-input-field'

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
                <div className="input-header">
                    <div className="display-toggle">
                        <span className={displayMode === 'dollars' ? 'active' : ''}>$</span>
                        <button
                            className="toggle-switch"
                            onClick={onToggleDisplayMode}
                            aria-label={`Switch to ${displayMode === 'dollars' ? 'percentages' : 'dollars'} mode`}
                        >
                            <div className={`toggle-slider ${displayMode === 'percentages' ? 'active' : ''}`}></div>
                        </button>
                        <span className={displayMode === 'percentages' ? 'active' : ''}>%</span>
                    </div>
                </div>

                <div className="spending-section">
                    {displayMode === 'dollars' && (
                        <div className="spending-total">
                            <div className="input-group total-group">
                                <label>Total Monthly Spending</label>
                                <CurrencyInput
                                    id="total-spending"
                                    name="total-spending"
                                    placeholder="Please enter a number"
                                    defaultValue={userInput.monthlySpending.total}
                                    decimalsLimit={2}
                                    onValueChange={(value) => onSpendingChange('total', value)}
                                    onBlur={(e) => {
                                        // Ensure total is properly set when user finishes typing
                                        const value = e.target.value || '0.00'
                                        onSpendingChange('total', value)
                                    }}
                                    className="currency-input"
                                />
                            </div>
                        </div>
                    )}

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
                            { key: 'otherTransit', label: 'Other Transit' }
                        ].map(({ key, label }) => (
                            <div key={key} className="input-group">
                                <label>{label}</label>
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