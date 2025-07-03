import React, { useState, useEffect, useRef, useCallback } from 'react'
import { calculateSingleCard } from '../services/calculateSingleCard'
import Sidebar from './Sidebar'
import SpendingAccordion from './SpendingAccordion'
import CreditsAccordion from './CreditsAccordion'
import ExistingCardsAccordion from './ExistingCardsAccordion'
import ResultsSection from './ResultsSection'
import UserTypeModal from './UserTypeModal'
import data from '../data/data.json'
import calculateTwoCardCashback from '../util/calculateTwoCardCashback'
import calculateNCardCashback from '../util/calculateNCardCashback'

// Helper function to parse currency values that may contain commas
const parseCurrencyValue = (value) => {
    if (!value || value === '') return 0
    // Remove commas and convert to number
    const cleanValue = value.toString().replace(/,/g, '')
    return parseFloat(cleanValue) || 0
}

function AppPage() {
    const [showUserTypeModal, setShowUserTypeModal] = useState(false)
    const [showTopCardModal, setShowTopCardModal] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedCards, setSelectedCards] = useState([])
    const resultsSectionRef = useRef(null)

    const [filters, setFilters] = useState({
        cardType: 'all',
        annualFee: 'all',
        creditScore: 'all',
        rewardsType: 'all'
    })

    const [displayMode, setDisplayMode] = useState('dollars') // 'dollars' or 'percentages'
    const [activeAccordion, setActiveAccordion] = useState('spending') // 'spending', 'credits', or 'existingCards'

    const [userInput, setUserInput] = useState({
        income: '',
        creditScore: '',
        monthlySpending: {
            total: '0.00',
            gasStations: '0.00',
            restaurants: '0.00',
            supermarkets: '0.00',
            onlineGrocery: '0.00',
            otherOnlineRetail: '0.00',
            amazon: '0.00',
            drugStores: '0.00',
            wholesaleClubs: '0.00',
            airfare: '0.00',
            hotels: '0.00',
            vehicleRentals: '0.00',
            movieEntertainment: '0.00',
            streaming: '0.00',
            otherTransit: '0.00',
            rent: '0.00',
            other: '0.00'
        }
    })

    const [results, setResults] = useState([])

    // Show modal when component mounts
    useEffect(() => {
        setShowUserTypeModal(true)
    }, [])

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const handleInputChange = (field, value) => {
        setUserInput(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSetSelectedCards = useCallback((cards) => {
        console.log("Setting selected cards", cards)
        setSelectedCards(cards)
        // Also update userInput.existingCards to keep them in sync
        setUserInput(prev => ({
            ...prev,
            existingCards: cards
        }))
    }, [])

    const handleSpendingChange = (category, value) => {
        setUserInput(prev => {
            const newMonthlySpending = {
                ...prev.monthlySpending,
                [category]: value || '0.00'

            }

            return {
                ...prev,
                monthlySpending: newMonthlySpending
            }
        })
    }

    const calculateTotalSpending = () => {
        const spendingValues = Object.entries(userInput.monthlySpending)
            .filter(([key]) => key !== 'total')
            .map(([, value]) => parseCurrencyValue(value))
        return spendingValues.reduce((acc, curr) => acc + curr, 0).toFixed(2)
    }

    // Update total spending whenever individual categories change
    useEffect(() => {
        const newTotal = calculateTotalSpending()
        setUserInput(prev => ({
            ...prev,
            monthlySpending: {
                ...prev.monthlySpending,
                total: newTotal
            }
        }))
    }, [userInput.monthlySpending.gasStations, userInput.monthlySpending.restaurants,
    userInput.monthlySpending.supermarkets, userInput.monthlySpending.onlineGrocery,
    userInput.monthlySpending.otherOnlineRetail, userInput.monthlySpending.amazon,
    userInput.monthlySpending.drugStores, userInput.monthlySpending.wholesaleClubs,
    userInput.monthlySpending.airfare, userInput.monthlySpending.hotels,
    userInput.monthlySpending.vehicleRentals, userInput.monthlySpending.movieEntertainment,
    userInput.monthlySpending.streaming, userInput.monthlySpending.otherTransit,
    userInput.monthlySpending.rent, userInput.monthlySpending.other])

    const toggleDisplayMode = () => {
        setDisplayMode(prev => prev === 'dollars' ? 'percentages' : 'dollars')
    }

    const getDisplayValue = (category) => {
        const value = parseCurrencyValue(userInput.monthlySpending[category])
        const total = parseCurrencyValue(userInput.monthlySpending.total) || 1

        if (displayMode === 'percentages') {
            return ((value / total) * 100).toFixed(1)
        }
        return value.toFixed(2)
    }

    const getPlaceholder = (category) => {
        if (displayMode === 'percentages') {
            const value = parseCurrencyValue(userInput.monthlySpending[category])
            const total = parseCurrencyValue(userInput.monthlySpending.total) || 1
            return `${((value / total) * 100).toFixed(1)}%`
        }
        return `$${userInput.monthlySpending[category] || '0.00'}`
    }

    const handleSpendingInputChange = (category, value) => {
        if (displayMode === 'percentages') {
            // Convert percentage back to dollar amount
            const total = parseCurrencyValue(userInput.monthlySpending.total)
            const dollarAmount = (parseFloat(value) / 100) * total
            handleSpendingChange(category, dollarAmount.toFixed(2))
        } else {
            handleSpendingChange(category, value)
        }
    }

    const handleSpendingDone = () => {

        setActiveAccordion('credits')
    }

    const handleCreditsDone = () => {
        setActiveAccordion('existingCards')
    }

    const handleExistingCardsDone = () => {
        setResults([]);
        const total = parseCurrencyValue(userInput.monthlySpending['total'])
        const tempArray = []

        // Create categories object with category names as keys
        const categories = {}
        Object.entries(userInput.monthlySpending).forEach(([key, value]) => {
            if (key !== 'total') {
                categories[key] = parseCurrencyValue(value)
            }
        })

        // Use selectedCards state instead of userInput.existingCards
        const existingCardNames = selectedCards
        for (let i = 0; i < 10; i++) {
            console.log("=".repeat(i))
        }
        const localData = data
        const existingCardData = data.filter(card => existingCardNames.includes(card.name))
        const availableCards = data.filter(card => !existingCardNames.includes(card.name))

        for (const card of availableCards) {
            const nCardResult = calculateNCardCashback(card, existingCardData, { total: total, categories: categories })
            console.log("N Card Result", nCardResult)
            const cardResult = nCardResult.cards[0]
            cardResult["totalCashback"] = nCardResult.totalCashback
            cardResult["savingsPerCategory"] = nCardResult.savingsPerCategory
            cardResult["newCardTotalCashback"] = nCardResult.newCardTotalCashback
            tempArray.push(cardResult)
        }
        tempArray.sort((a, b) => {
            const aNetCashback = b.totalCashback - parseFloat(b.annualFee)
            const bNetCashback = a.totalCashback - parseFloat(a.annualFee)

            // Primary sort: by net cashback (ongoing value)
            if (aNetCashback !== bNetCashback) {
                return aNetCashback - bNetCashback
            }

            // Secondary sort: by sign-up bonus minus annual fee (first year value)
            const aFirstYear = parseFloat(a.sub) - parseFloat(a.annualFee)
            const bFirstYear = parseFloat(b.sub) - parseFloat(b.annualFee)
            return bFirstYear - aFirstYear
        })
        let currentRank = 1;
        let prevCashback = tempArray[0]?.totalCashback - parseFloat(tempArray[0]?.annualFee);
        let prevFirstYear = parseFloat(tempArray[0]?.sub) - parseFloat(tempArray[0]?.annualFee);

        for (const result of tempArray) {
            const currentCashback = result.totalCashback - parseFloat(result.annualFee);
            const currentFirstYear = parseFloat(result.sub) - parseFloat(result.annualFee);
            if (currentCashback === prevCashback && currentFirstYear === prevFirstYear) {
                result.rank = currentRank;
            } else {
                currentRank++;
                result.rank = currentRank;
                prevCashback = currentCashback;
            }
        }
        console.log("Return Values", tempArray)
        setResults(tempArray)



        // Show top card modal immediately
        setShowTopCardModal(true)
    }

    return (
        <div className="app-page">
            <UserTypeModal
                isOpen={showUserTypeModal}
                onClose={() => setShowUserTypeModal(false)}
            />

            {/* Top Card Modal */}
            {showTopCardModal && results.length > 0 && (
                <div className="top-card-modal-overlay" onClick={() => setShowTopCardModal(false)}>
                    <div className="top-card-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="top-card-modal-header">
                            <div className="top-card-badge">
                                <span className="rank-number">#1</span>
                                <span className="rank-label">Top Pick</span>
                            </div>
                            <button className="modal-close-button" onClick={() => setShowTopCardModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="top-card-content">
                            <div className="top-card-image-container">
                                {(() => {
                                    try {
                                        const basePath = window.location.pathname.includes('/Card-Advisor') ? '/Card-Advisor' : ''
                                        const imageSrc = `${basePath}/card-images/${results[0].image}`
                                        return (
                                            <img
                                                src={imageSrc}
                                                alt={results[0].name}
                                                className="top-card-image"
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
                                <span className="top-card-fallback" style={{ display: 'none' }}>💳</span>
                            </div>

                            <div className="top-card-details">
                                <h2>{results[0].name}</h2>
                                <p className="top-card-issuer">{results[0].issuer}</p>

                                <div className="top-card-earnings">
                                    <div className="top-card-earning-item">
                                        <span className="earning-label">First Year Value</span>
                                        <span className="earning-amount">${(results[0].totalCashback + parseInt(results[0].sub)).toFixed(0)}</span>
                                        <span className="earning-breakdown">Sign-up bonus + annual cashback</span>
                                    </div>
                                    <div className="top-card-earning-item">
                                        <span className="earning-label">Ongoing Value</span>
                                        <span className="earning-amount cashback">${(results[0].totalCashback - parseFloat(results[0].annualFee)).toFixed(0)}</span>
                                        <span className="earning-breakdown">Annual cashback - annual fee</span>
                                    </div>
                                </div>

                                <div className="top-card-actions">
                                    <button className="apply-button primary">
                                        <span>Apply Now</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button className="see-other-options-button secondary" onClick={() => {
                                        setShowTopCardModal(false)
                                        // Scroll to results section after modal closes
                                        setTimeout(() => {
                                            resultsSectionRef.current?.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start'
                                            })
                                        }, 300)
                                    }}>
                                        <span>See Other Options</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="app-header">
                <div className="container">
                    <h1>Card Advisor</h1>
                    <p>Find your perfect credit card match</p>
                </div>
            </div>

            <div className="app-layout">
                {/* Sidebar Toggle Button */}
                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label={sidebarOpen ? 'Hide filters' : 'Show filters'}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 4h18M3 12h18M3 20h18" />
                    </svg>
                    <span>{sidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
                </button>

                <Sidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    isOpen={sidebarOpen}
                />

                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <section className="accordion-section">
                        <SpendingAccordion
                            isActive={activeAccordion === 'spending'}
                            onToggle={() => setActiveAccordion('spending')}
                            displayMode={displayMode}
                            onToggleDisplayMode={toggleDisplayMode}
                            userInput={userInput}
                            onSpendingChange={handleSpendingChange}
                            onSpendingInputChange={handleSpendingInputChange}
                            getDisplayValue={getDisplayValue}
                            getPlaceholder={getPlaceholder}
                            onDone={handleSpendingDone}
                        />

                        <CreditsAccordion
                            isActive={activeAccordion === 'credits'}
                            onToggle={() => setActiveAccordion('credits')}
                            userInput={userInput}
                            onInputChange={handleInputChange}
                            onDone={handleCreditsDone}
                        />

                        <ExistingCardsAccordion
                            isActive={activeAccordion === 'existingCards'}
                            onToggle={() => setActiveAccordion('existingCards')}
                            handleSetSelectedCards={handleSetSelectedCards}
                            userInput={userInput}
                            onInputChange={handleInputChange}
                            onDone={handleExistingCardsDone}
                        />
                    </section>

                    <div ref={resultsSectionRef}>
                        <ResultsSection results={results} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AppPage 