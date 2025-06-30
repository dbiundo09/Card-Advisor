import React from 'react'
import CurrencyInput from 'react-currency-input-field'

function CreditsAccordion({
    isActive,
    onToggle,
    userInput,
    onInputChange,
    onDone
}) {
    return (
        <div className={`accordion ${isActive ? 'active' : ''}`}>
            <div className="accordion-header" onClick={onToggle}>
                <div className="accordion-title">
                    <span className="accordion-icon">📊</span>
                    <h2>Credits</h2>
                </div>
                <div className="accordion-status">
                    {isActive ? (
                        <span className="status-active">Active</span>
                    ) : (
                        <span className="status-pending">Pending</span>
                    )}
                </div>
            </div>

            <div className="accordion-content">
                <div className="credits-section">
                    <div className="input-grid">
                        <div className="input-group">
                            <label>Annual Income</label>
                            <CurrencyInput
                                id="annual-income"
                                name="annual-income"
                                placeholder="Please enter a number"
                                defaultValue={userInput.income}
                                decimalsLimit={2}
                                onValueChange={(value) => onInputChange('income', value)}
                                className="currency-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>Credit Score</label>
                            <input
                                type="number"
                                placeholder="750"
                                min="300"
                                max="850"
                                value={userInput.creditScore}
                                onChange={(e) => onInputChange('creditScore', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="accordion-actions">
                        <button className="done-button" onClick={onDone}>
                            Generate Recommendations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditsAccordion 