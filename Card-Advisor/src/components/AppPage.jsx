import React, { useState } from 'react'
import { calculateSingleCard } from '../services/calculateSingleCard'
import Sidebar from './Sidebar'
import SpendingAccordion from './SpendingAccordion'
import CreditsAccordion from './CreditsAccordion'
import ResultsSection from './ResultsSection'

// Helper function to parse currency values that may contain commas
const parseCurrencyValue = (value) => {
    if (!value || value === '') return 0
    // Remove commas and convert to number
    const cleanValue = value.toString().replace(/,/g, '')
    return parseFloat(cleanValue) || 0
}

function AppPage() {
    const [filters, setFilters] = useState({
        cardType: 'all',
        annualFee: 'all',
        creditScore: 'all',
        rewardsType: 'all'
    })

    const [displayMode, setDisplayMode] = useState('dollars') // 'dollars' or 'percentages'
    const [activeAccordion, setActiveAccordion] = useState('spending') // 'spending' or 'credits'

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
            otherTransit: '0.00'
        }
    })

    const [results, setResults] = useState([
        {
            id: 1,
            name: "Chase Freedom Unlimited",
            issuer: "Chase",
            annualFee: 0,
            creditScore: "Good",
            cashback: "$450",
            miles: "N/A",
            rating: 4.8,
            image: "💳"
        },
        {
            id: 2,
            name: "Citi Double Cash",
            issuer: "Citi",
            annualFee: 0,
            creditScore: "Good",
            cashback: "$400",
            miles: "N/A",
            rating: 4.6,
            image: "💳"
        },
        {
            id: 3,
            name: "Amex Gold",
            issuer: "American Express",
            annualFee: 250,
            creditScore: "Excellent",
            cashback: "N/A",
            miles: "60,000",
            rating: 4.9,
            image: "💳"
        }
    ])

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
        console.log("userInput.monthlySpending")
        console.log(userInput.monthlySpending['total'])
        const total = parseCurrencyValue(userInput.monthlySpending['total'])
        console.log(total)

        if (parseCurrencyValue(calculateTotalSpending()) > total) {
            console.log(parseCurrencyValue(calculateTotalSpending()), total)
            alert("The categories are adding up to more than the total spending. Please adjust your spending.")
            return
        }

        // Create categories object with category names as keys
        const categories = {}
        Object.entries(userInput.monthlySpending).forEach(([key, value]) => {
            if (key !== 'total') {
                categories[key] = parseCurrencyValue(value)
            }
        })

        calculateSingleCard({
            total: parseCurrencyValue(userInput.monthlySpending.total),
            categories: categories
        })
        setActiveAccordion('credits')
    }

    const handleCreditsDone = () => {
        // This could trigger the recommendation algorithm
        console.log('All inputs complete, generating recommendations...')
    }

    return (
        <div className="app-page">
            <div className="app-header">
                <div className="container">
                    <h1>Card Advisor</h1>
                    <p>Find your perfect credit card match</p>
                </div>
            </div>

            <div className="app-layout">

                <Sidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <main className="main-content">
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
                    </section>

                    <ResultsSection results={results} />
                </main>
            </div>
        </div>
    )
}

export default AppPage 