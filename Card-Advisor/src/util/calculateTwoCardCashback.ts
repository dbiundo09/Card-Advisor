import Query from "../types/Query"
import { annualizeSpending } from "./annualizeSpending"
import { calculateCategoryForCard } from "./calculateCategoryForCard";
import MultipleCardReturn from "../types/MultipleCardReturn";


// Calculates the cashback for two cards, with cardA being the existing card and cardB being the new card
const calculateTwoCardCashback = (cardA: any, cardB: any, inputs: Query): MultipleCardReturn => {
    const annualizedSpending = annualizeSpending(inputs);
    const { categories, total } = annualizedSpending;
    console.log("Categories", categories)
    console.log("Card A", cardA)
    console.log("Card B", cardB)
    let totalCategorySpend = 0;
    let overallCashback = 0;
    const savingsPerCategory = {};
    const higherBaseCashbackCard = cardA.categories.baseCashback >= cardB.categories.baseCashback ? cardA : cardB
    const cardAIsHigherBaseCashback = higherBaseCashbackCard === cardA



    for (const category in categories) {
        console.log("Category", category)
        const higherCashbackCard = cardA.categories[category].cashback >= cardB.categories[category].cashback ? cardA : cardB
        const lowerCashbackCard = cardA.categories[category].cashback < cardB.categories[category].cashback ? cardA : cardB
        const cardAIsHigher = higherCashbackCard === cardA
        let totalSpending = categories[category]
        let totalCashbackA = 0
        let totalCashbackB = 0
        const { totalCashback, returnLimit, spendingUsed } = calculateCategoryForCard(higherCashbackCard, category, categories[category])
        totalSpending -= spendingUsed
        if (cardAIsHigher) {
            totalCashbackA += parseFloat(totalCashback)
        } else {
            totalCashbackB += parseFloat(totalCashback)
        }

        if (totalSpending > 0) {
            const { totalCashback, returnLimit, spendingUsed } = calculateCategoryForCard(lowerCashbackCard, category, totalSpending)
            totalSpending -= spendingUsed
            if (!cardAIsHigher) {
                totalCashbackA += parseFloat(totalCashback)
            } else {
                totalCashbackB += parseFloat(totalCashback)
            }
        }

        if (totalSpending > 0) {
            const { totalCashback, returnLimit, spendingUsed } = calculateCategoryForCard(higherBaseCashbackCard, "other", totalSpending)
            totalSpending -= spendingUsed
            if (cardAIsHigherBaseCashback) {
                totalCashbackA += parseFloat(totalCashback)
            } else {
                totalCashbackB += parseFloat(totalCashback)
            }
        }

        totalCategorySpend += (categories[category] - totalSpending)
        overallCashback += totalCashbackA + totalCashbackB
        savingsPerCategory[category] = {
            "cardA": {
                cashback: cardA.categories[category].cashback,
                categorySpend: categories[category] - totalSpending,
                value: totalCashbackA
            },
            "cardB": {
                cashback: cardB.categories[category].cashback,
                categorySpend: categories[category] - totalSpending,
                value: totalCashbackB
            }
        }
        console.log("================ Printing Results For Category", category, "================\n");
        console.log("Total Spending", categories[category] - totalSpending);
        console.log("Card A: ", higherCashbackCard.name, "Cashback Rate", higherCashbackCard.categories[category].cashback);
        console.log("Total Cashback A", totalCashbackA);
        console.log("Card B: ", lowerCashbackCard.name, "Cashback Rate", lowerCashbackCard.categories[category].cashback);
        console.log("Total Cashback B", totalCashbackB);
        console.log("Total Cashback", totalCashbackA + totalCashbackB);
        console.log("Remaining Spending", totalSpending);
        console.log("================================================");
    }

    return {
        cards: [cardA, cardB],
        savingsPerCategory: savingsPerCategory
    }
}


export default calculateTwoCardCashback