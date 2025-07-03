import React, { useState, useMemo, useEffect } from 'react'
import data from '../data/data.json'

function ExistingCardsAccordion({
    isActive,
    onToggle,
    userInput,
    onInputChange,
    onDone,
    handleSetSelectedCards
}) {
    const [selectedCards, setSelectedCards] = useState(userInput.existingCards || [])

    // Sync with parent state when userInput changes
    useEffect(() => {
        if (userInput.existingCards) {
            setSelectedCards(userInput.existingCards)
        }
    }, [userInput.existingCards])
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterIssuer, setFilterIssuer] = useState('all')

    // Get unique issuers for filtering
    const issuers = useMemo(() => {
        const uniqueIssuers = [...new Set(data.map(card => card.issuer))]
        return uniqueIssuers.sort()
    }, [])

    // Filter cards based on search term and issuer
    const filteredCards = useMemo(() => {
        return data.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.issuer.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesIssuer = filterIssuer === 'all' || card.issuer === filterIssuer
            return matchesSearch && matchesIssuer
        })
    }, [searchTerm, filterIssuer])

    const toggleCard = (cardName) => {
        setSelectedCards(prev => {
            const newCards = prev.includes(cardName)
                ? prev.filter(name => name !== cardName)
                : [...prev, cardName]

            return newCards
        })
    }

    const removeCard = (cardName) => {
        setSelectedCards(prev => {
            const newCards = prev.filter(name => name !== cardName)

            return newCards
        })
    }

    const handleDone = () => {
        onDone()
    }

    const clearAll = () => {
        setSelectedCards([])
    }

    // Use useEffect to update parent state after render
    useEffect(() => {
        handleSetSelectedCards(selectedCards)
    }, [selectedCards, handleSetSelectedCards])

    const getSelectedCount = () => {
        return selectedCards.length
    }

    const getSelectedCardsData = () => {
        return selectedCards.map(cardName => data.find(card => card.name === cardName)).filter(Boolean)
    }

    return (
        <div className={`accordion ${isActive ? 'active' : ''}`}>
            <div className="accordion-header" onClick={onToggle}>
                <div className="accordion-title">
                    <span className="accordion-icon">💳</span>
                    <h2>Existing Cards</h2>
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
                <div className="existing-cards-section">
                    <div className="existing-cards-header">
                        <h3>Your Existing Cards</h3>
                        <p>Select the cards you currently have to get more personalized recommendations</p>
                        <div className="selected-count">
                            {getSelectedCount()} cards selected
                        </div>
                    </div>

                    {/* Selected Cards Grid */}
                    <div className="selected-cards-grid">
                        {getSelectedCardsData().map((card) => (
                            <div key={card.name} className="selected-card-item">
                                <div className="card-content">
                                    <div className="card-image-container">
                                        {(() => {
                                            try {
                                                const basePath = window.location.pathname.includes('/Card-Advisor') ? '/Card-Advisor' : ''
                                                const imageSrc = `${basePath}/card-images/${card.image}`
                                                return (
                                                    <img
                                                        src={imageSrc}
                                                        alt={card.name}
                                                        className="card-image"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'block';
                                                        }}
                                                    />
                                                )
                                            } catch (error) {
                                                return null
                                            }
                                        })()}
                                        <span className="card-fallback" style={{ display: 'none' }}>💳</span>
                                    </div>

                                    <div className="card-details">
                                        <div className="card-name">{card.name}</div>
                                        <div className="card-issuer">{card.issuer.charAt(0).toUpperCase() + card.issuer.slice(1)}</div>
                                        <div className="card-features">
                                            <span className="feature">
                                                {card.baseCashback}% base
                                            </span>
                                            {card.annualFee === '0' ? (
                                                <span className="feature no-fee">No annual fee</span>
                                            ) : (
                                                <span className="feature fee">${card.annualFee} annual fee</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="remove-card-btn"
                                    onClick={() => removeCard(card.name)}
                                    title="Remove card"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {/* Add Card Button */}
                        <div className="add-card-item" onClick={() => setShowAddModal(true)}>
                            <div className="add-card-content">
                                <div className="add-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </div>
                                <div className="add-text">Add Card</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    {getSelectedCount() > 0 && (
                        <div className="quick-actions">
                            <button
                                className="quick-action-btn"
                                onClick={clearAll}
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    <div className="accordion-actions">
                        <button className="done-button" onClick={handleDone}>
                            Generate Recommendations
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            {showAddModal && (
                <div className="add-card-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="add-card-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Existing Card</h3>
                            <button className="modal-close-button" onClick={() => setShowAddModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-content">
                            {/* Search and Filter */}
                            <div className="search-filter-section">
                                <div className="search-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search cards by name or issuer..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>

                                <div className="filter-dropdown">
                                    <select
                                        value={filterIssuer}
                                        onChange={(e) => setFilterIssuer(e.target.value)}
                                        className="issuer-filter"
                                    >
                                        <option value="all">All Issuers</option>
                                        {issuers.map(issuer => (
                                            <option key={issuer} value={issuer}>
                                                {issuer.charAt(0).toUpperCase() + issuer.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Available Cards Grid */}
                            <div className="modal-cards-grid">
                                {filteredCards
                                    .filter(card => !selectedCards.includes(card.name))
                                    .map((card) => (
                                        <div
                                            key={card.name}
                                            className="modal-card-item"
                                            onClick={() => {
                                                toggleCard(card.name)
                                                setShowAddModal(false)
                                            }}
                                        >
                                            <div className="card-content">
                                                <div className="card-image-container">
                                                    {(() => {
                                                        try {
                                                            const basePath = window.location.pathname.includes('/Card-Advisor') ? '/Card-Advisor' : ''
                                                            const imageSrc = `${basePath}/card-images/${card.image}`
                                                            return (
                                                                <img
                                                                    src={imageSrc}
                                                                    alt={card.name}
                                                                    className="card-image"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.nextSibling.style.display = 'block';
                                                                    }}
                                                                />
                                                            )
                                                        } catch (error) {
                                                            return null
                                                        }
                                                    })()}
                                                    <span className="card-fallback" style={{ display: 'none' }}>💳</span>
                                                </div>

                                                <div className="card-details">
                                                    <div className="card-name">{card.name}</div>
                                                    <div className="card-issuer">{card.issuer.charAt(0).toUpperCase() + card.issuer.slice(1)}</div>
                                                    <div className="card-features">
                                                        <span className="feature">
                                                            {card.baseCashback}% base
                                                        </span>
                                                        {card.annualFee === '0' ? (
                                                            <span className="feature no-fee">No annual fee</span>
                                                        ) : (
                                                            <span className="feature fee">${card.annualFee} annual fee</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExistingCardsAccordion 