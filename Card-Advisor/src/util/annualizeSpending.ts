import Query from "../types/Query";

export const annualizeSpending = (inputs: Query): Query => {
    const { categories, total } = inputs;
    const annualizedSpending: { [key: string]: number } = {};
    for (const category in categories) {
        annualizedSpending[category] = categories[category] * 12;
    }
    return { categories: annualizedSpending, total: total * 12 };
}