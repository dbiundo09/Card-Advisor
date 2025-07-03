import Query from "../types/Query"
import MultipleCardReturn from "../types/MultipleCardReturn"
import Card from "../types/Card"
import { annualizeSpending } from "./annualizeSpending";
import { calculateCategoryForCard } from "./calculateCategoryForCard";


const calculateNCardCashback = (newCard: Card, existingCards: Card[], inputs: Query): MultipleCardReturn => {
    const annualizedSpending = annualizeSpending(inputs);
    const { categories, total } = annualizedSpending;
    let overallTotalCashback = 0
    let newCardTotalCashback = 0
    let savingsPerCategory: { [key: string]: {} } = {}

    // Create deep copies of cards to avoid modifying the original data
    const existingCardsCopy = existingCards.map(card => ({
        ...card,
        categories: Object.keys(card.categories).reduce((acc, category) => {
            acc[category] = { ...card.categories[category] }
            return acc
        }, {})
    }))
    const newCardCopy = {
        ...newCard,
        categories: Object.keys(newCard.categories).reduce((acc, category) => {
            acc[category] = { ...newCard.categories[category] }
            return acc
        }, {})
    }

    console.log("======Comparing Cards=======")
    console.log("New Card", newCardCopy)
    console.log("Existing Cards", existingCardsCopy)
    console.log("======Comparing Cards=======")

    for (const card of [...existingCardsCopy, newCardCopy]) {
        savingsPerCategory[card.name] = {}
    }

    let bestBaseCashback = newCardCopy.baseCashback
    let bestBaseCashbackCard = newCardCopy
    for (const card of existingCardsCopy) {
        if (card.baseCashback > bestBaseCashback) {
            bestBaseCashback = card.baseCashback
            bestBaseCashbackCard = card
        }
    }
    for (const category in categories) {
        const bestCashback: Array<{ cashback: number, card: Card }> = []
        for (const card of existingCardsCopy) {
            const cashback = card.categories[category].cashback
            bestCashback.push({ cashback, card })
        }
        bestCashback.push({ cashback: newCardCopy.categories[category].cashback, card: newCardCopy })
        bestCashback.sort((a, b) => b.cashback - a.cashback)
        let totalSpendForCategory = categories[category]
        let categoryTotalCashback = 0
        while (totalSpendForCategory > 0) {
            const bestCard = bestCashback.shift()
            console.log("Best Card for category", category, bestCard)
            if (bestCard) {
                console.log("Calling calcluate category for card with card", bestCard.card, category, totalSpendForCategory)
                const { totalCashback, returnLimit, spendingUsed } = calculateCategoryForCard(bestCard.card, category, totalSpendForCategory)
                console.log("Spending Used", spendingUsed)
                totalSpendForCategory -= spendingUsed
                console.log("Total Spend For Category", totalSpendForCategory)
                categoryTotalCashback += parseFloat(totalCashback)
                if (bestCard.card.name === newCardCopy.name) {
                    newCardTotalCashback += parseFloat(totalCashback)
                }
                savingsPerCategory[bestCard.card.name][category] = {
                    cashback: bestCard.card.categories[category].cashback,
                    categorySpend: categories[category] - totalSpendForCategory,
                    value: totalCashback
                }
                console.log("ADded savings per category", savingsPerCategory)
                const currentCard = existingCardsCopy.find(card => card.name === bestCard.card.name)
                if (currentCard) {
                    currentCard.categories[category].limit = parseFloat(returnLimit)

                    if (bestCard.card.categories[category].sharesLimit) {
                        const sharedCategories = bestCard.card.categories[category].sharedCategories
                        for (const sharedCategory of sharedCategories) {
                            currentCard.categories[sharedCategory].limit = parseFloat(returnLimit)
                        }
                    }
                }


            } else {
                const baseCashbackReturned = bestBaseCashbackCard.baseCashback / 100 * totalSpendForCategory
                categoryTotalCashback += baseCashbackReturned
                if (bestBaseCashbackCard.name === newCardCopy.name) {
                    newCardTotalCashback += baseCashbackReturned
                }
                savingsPerCategory[bestBaseCashbackCard.name]["other"] = {
                    cashback: bestBaseCashbackCard.baseCashback,
                    categorySpend: (savingsPerCategory[bestBaseCashbackCard.name]["other"]?.categorySpend || 0) + (categories[category] - totalSpendForCategory),
                    value: (savingsPerCategory[bestBaseCashbackCard.name]["other"]?.value || 0) + baseCashbackReturned
                }
                console.log("ADded savings per category", savingsPerCategory)
                totalSpendForCategory = 0

            }
        }
        overallTotalCashback += categoryTotalCashback

    }
    return {
        cards: [newCardCopy, ...existingCardsCopy],
        totalCashback: overallTotalCashback,
        newCardTotalCashback: newCardTotalCashback,
        savingsPerCategory: savingsPerCategory
    }
}


export default calculateNCardCashback;