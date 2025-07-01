import React, { useState, useEffect } from 'react'

function ResultsSection({ results }) {
    const [expandedCards, setExpandedCards] = useState(new Set())
    const [showMathCards, setShowMathCards] = useState(new Set())
    const [isMobile, setIsMobile] = useState(false)
    const [mathModalOpen, setMathModalOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)

    // Check if screen is small enough for cards to be stacked
    useEffect(() => {
        const checkScreenSize = () => {
            const grid = document.querySelector('.results-grid')
            if (grid) {
                const computedStyle = window.getComputedStyle(grid)
                const gridTemplateColumns = computedStyle.gridTemplateColumns
                // If grid has only one column, we're in mobile/stacked mode
                setIsMobile(gridTemplateColumns.split(' ').length === 1)
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleCard = (cardName) => {
        if (!isMobile) return // Only allow toggling on mobile
        setExpandedCards(prev => {
            const newSet = new Set(prev)
            if (newSet.has(cardName)) {
                newSet.delete(cardName)
            } else {
                newSet.add(cardName)
            }
            return newSet
        })
    }

    const openMathModal = (card) => {
        setSelectedCard(card)
        setMathModalOpen(true)
    }

    const closeMathModal = () => {
        setMathModalOpen(false)
        setSelectedCard(null)
    }

    const getImageSrc = (imageName) => {
        try {
            // For GitHub Pages, use the base path from the current location
            const basePath = window.location.pathname.includes('/Card-Advisor') ? '/Card-Advisor' : ''
            return `${basePath}/card-images/${imageName}`
        } catch (error) {
            console.log("Error getting image src", error)
            return null
        }
    }

    if (results.length === 0) {
        return (
            <section className="results-section">
                <div className="results-empty">
                    <div className="empty-icon">💳</div>
                    <h2>Ready to Find Your Perfect Card?</h2>
                    <p>Complete the spending and credit information above to see personalized card recommendations.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="results-section">
            <div className="results-header">
                <h2>Your Personalized Recommendations</h2>
                <p>Based on your spending patterns, here are the best cards for you</p>
            </div>

            <div className="results-grid">
                {results.map((card) => {
                    const isExpanded = !isMobile || expandedCards.has(card.name)
                    return (
                        <div key={card.image} className={`card-result ${isExpanded ? 'expanded' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
                            {/* Card Header - Always Visible */}
                            <div className={`card-header ${isMobile ? 'clickable' : ''}`} onClick={() => toggleCard(card.name)}>
                                <div className="card-image-container">
                                    {getImageSrc(card.image) ? (
                                        <img
                                            src={getImageSrc(card.image)}
                                            alt={card.name}
                                            className="card-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <span className="card-fallback" style={{ display: getImageSrc(card.image) ? 'none' : 'block' }}>💳</span>
                                </div>
                                <div className="card-info">
                                    <h3>{card.name}</h3>
                                    <p className="issuer">{card.issuer}</p>
                                </div>
                                <div className="card-rank">
                                    <span className="rank-badge">#{card.rank}</span>
                                </div>
                                {isMobile && (
                                    <div className="expand-button">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Quick Summary - Only show on mobile when collapsed */}
                            {isMobile && (
                                <div className="card-summary">
                                    <div className="summary-earnings">
                                        <div className="summary-item">
                                            <span className="label">First Year</span>
                                            <span className="value">${(card.cashback + parseInt(card.sub)).toFixed(0)}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="label">Ongoing</span>
                                            <span className="value cashback">${card.cashback.toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Expandable Content */}
                            <div className={`card-expandable ${isExpanded ? 'expanded' : ''}`}>
                                <div className="earnings-sections">
                                    {/* First Year Earnings */}
                                    <div className="earnings-section first-year">
                                        <div className="section-header">
                                            <h4>First Year Value</h4>
                                            <span className="section-subtitle">Includes sign-up bonus</span>
                                        </div>
                                        <div className="earnings-amount">
                                            <span className="amount">${(card.cashback + parseInt(card.sub)).toFixed(0)}</span>
                                            <span className="label">Total First Year</span>
                                        </div>
                                        <div className="earnings-breakdown">
                                            <div className="breakdown-item">
                                                <span className="label">Sign-up Bonus</span>
                                                <span className="value bonus">${card.sub}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Annual Cashback</span>
                                                <span className="value cashback">${card.cashback.toFixed(0)}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Annual Fee</span>
                                                <span className="value fee">-${card.annualFee}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ongoing Earnings */}
                                    <div className="earnings-section ongoing">
                                        <div className="section-header">
                                            <h4>Ongoing Value</h4>
                                            <span className="section-subtitle">Year 2+ earnings</span>
                                        </div>
                                        <div className="earnings-amount">
                                            <span className="amount cashback">${(card.cashback - parseFloat(card.annualFee)).toFixed(0)}</span>
                                            <span className="label">Net Annual Value</span>
                                        </div>
                                        <div className="earnings-equation">
                                            <div className="equation-row">
                                                <span className="equation-label">Annual Cashback</span>
                                                <span className="equation-value cashback">+${card.cashback.toFixed(0)}</span>
                                            </div>
                                            <div className="equation-row">
                                                <span className="equation-label">Annual Fee</span>
                                                <span className="equation-value fee">-${card.annualFee}</span>
                                            </div>
                                            <div className="equation-divider"></div>
                                            <div className="equation-row total">
                                                <span className="equation-label">Net Annual Value</span>
                                                <span className="equation-value total">${(card.cashback - parseFloat(card.annualFee)).toFixed(0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button className="apply-button primary">
                                        <span>Apply Now</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button className="details-button secondary" onClick={() => openMathModal(card)}>
                                        <span>See the Math</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="results-footer">
                <div className="disclaimer">
                    <p>💡 <strong>Pro Tip:</strong> {isMobile ? 'Tap on any card to see detailed breakdown.' : 'All cards are fully expanded for easy comparison.'} First year value includes sign-up bonuses minus annual fees.</p>
                </div>
            </div>

            {/* Math Modal */}
            {mathModalOpen && selectedCard && (
                <div className="math-modal-overlay" onClick={closeMathModal}>
                    <div className="math-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="math-modal-header">
                            <div className="modal-card-info">
                                <div className="modal-card-image-container">
                                    {getImageSrc(selectedCard.image) ? (
                                        <img
                                            src={getImageSrc(selectedCard.image)}
                                            alt={selectedCard.name}
                                            className="modal-card-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <span className="modal-card-fallback" style={{ display: getImageSrc(selectedCard.image) ? 'none' : 'block' }}>💳</span>
                                </div>
                                <div className="modal-card-details">
                                    <h3>{selectedCard.name}</h3>
                                    <p className="modal-issuer">{selectedCard.issuer}</p>
                                </div>
                            </div>
                            <button className="modal-close-button" onClick={closeMathModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="math-modal-content">
                            <div className="math-header">
                                <h4>Category Breakdown</h4>
                                <p>How your spending translates to cashback</p>
                            </div>
                            <div className="category-math-grid">
                                {(() => {
                                    // Calculate total cashback to determine significant categories
                                    const totalCashback = Object.values(selectedCard.savingsPerCategory)
                                        .reduce((sum, data) => sum + data.value, 0)

                                    return Object.entries(selectedCard.savingsPerCategory).map(([category, data]) => {
                                        const cashbackPercentage = (data.value / totalCashback) * 100
                                        const isSignificant = cashbackPercentage >= 15 // Highlight if 15% or more of total cashback

                                        return (
                                            <div key={category} className={`category-math-item ${isSignificant ? 'significant' : ''}`}>
                                                {isSignificant && (
                                                    <div className="significant-badge">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                        <span>Major Contributor</span>
                                                    </div>
                                                )}
                                                <div className="category-math-header">
                                                    <span className="category-name">{category}</span>
                                                    <span className="category-cashback">{data.cashback}%</span>
                                                </div>
                                                <div className="category-math-details">
                                                    <div className="math-row">
                                                        <span className="math-label">Spending</span>
                                                        <span className="math-value">${data.categorySpend.toFixed(2)}</span>
                                                    </div>
                                                    <div className="math-row">
                                                        <span className="math-label">Cashback</span>
                                                        <span className="math-value cashback">${data.value.toFixed(2)}</span>
                                                    </div>
                                                    <div className="math-row">
                                                        <span className="math-label">% of Total</span>
                                                        <span className="math-value percentage">{cashbackPercentage.toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ResultsSection 