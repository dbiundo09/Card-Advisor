import Query from "../types/Query";
import { CardResult } from "../types/CardResult";
import { annualizeSpending } from "../util/annualizeSpending";
import { calculateCategoryForCard } from "../util/calculateCategoryForCard";

export const calculateSingleCard = (inputs: Query, card: any = null) => {
    const annualizedSpending = annualizeSpending(inputs);
    const { categories, total } = annualizedSpending;
    const cardCategories = card.categories;
    const isCashback = card.cashback;
    const baseCashback = card.baseCashback;
    const sharedLimits: { [key: string]: number } = {};
    const savingsPerCategory = {};

    let totalCashback = 0;
    let totalCategorySpend = 0;
    if (isCashback) {
        for (const category in categories) {
            if (!(category in cardCategories)) {
                continue;
            }
            const correspondingCardCategory = cardCategories[category];
            let categorySpend = categories[category];
            let limit = parseFloat(correspondingCardCategory["limit"]);
            if ("limit" in sharedLimits) {
                limit = sharedLimits[category];
            }
            if (limit !== -1 && categorySpend > limit) {
                categorySpend = limit;
                limit = 0;
            } else if (limit !== -1) {
                limit = limit - categorySpend;
            }
            totalCategorySpend += categorySpend;
            const cashbackValue = parseFloat(correspondingCardCategory["cashback"]) / 100 * categorySpend;
            savingsPerCategory[category] = {
                cashback: parseFloat(correspondingCardCategory["cashback"]),
                categorySpend: categorySpend,
                value: cashbackValue
            }





            totalCashback += cashbackValue;


            if ("sharesLimit" in correspondingCardCategory && correspondingCardCategory["sharesLimit"] === "true") {
                const sharedCategories = correspondingCardCategory["sharedCategories"];
                for (const sharedCategory of sharedCategories) {
                    sharedLimits[sharedCategory] = limit;
                    console.log("Resetting limit for shared category", sharedCategory, limit)
                }
            }
        }

        const otherSpend = total - totalCategorySpend;
        const otherCashback = parseFloat(baseCashback) / 100 * otherSpend;
        totalCashback += otherCashback;
        return {
            name: card.name,
            image: card.image,
            cashback: totalCashback,
            issuer: card.issuer,
            annualFee: card.annualFee,
            sub: card.sub,
            key: card.image,
            savingsPerCategory: savingsPerCategory
        }
    }













}


