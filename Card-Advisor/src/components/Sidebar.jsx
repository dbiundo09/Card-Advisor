import React from 'react'

function Sidebar({ filters, onFilterChange, isOpen }) {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <h3>Filters</h3>

                <div className="filter-section">
                    <label>Card Type</label>
                    <select
                        value={filters.cardType}
                        onChange={(e) => onFilterChange('cardType', e.target.value)}
                    >
                        <option value="all">All Cards</option>
                        <option value="cashback">Cashback</option>
                        <option value="travel">Travel</option>
                        <option value="points">Points</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <div className="filter-section">
                    <label>Annual Fee</label>
                    <select
                        value={filters.annualFee}
                        onChange={(e) => onFilterChange('annualFee', e.target.value)}
                    >
                        <option value="all">Any Fee</option>
                        <option value="0">No Annual Fee</option>
                        <option value="under100">Under $100</option>
                        <option value="under250">Under $250</option>
                        <option value="over250">Over $250</option>
                    </select>
                </div>

                <div className="filter-section">
                    <label>Credit Score</label>
                    <select
                        value={filters.creditScore}
                        onChange={(e) => onFilterChange('creditScore', e.target.value)}
                    >
                        <option value="all">Any Score</option>
                        <option value="excellent">Excellent (750+)</option>
                        <option value="good">Good (700-749)</option>
                        <option value="fair">Fair (650-699)</option>
                        <option value="poor">Poor (300-649)</option>
                    </select>
                </div>

                <div className="filter-section">
                    <label>Rewards Type</label>
                    <select
                        value={filters.rewardsType}
                        onChange={(e) => onFilterChange('rewardsType', e.target.value)}
                    >
                        <option value="all">All Rewards</option>
                        <option value="cashback">Cashback</option>
                        <option value="miles">Miles</option>
                        <option value="points">Points</option>
                    </select>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar 