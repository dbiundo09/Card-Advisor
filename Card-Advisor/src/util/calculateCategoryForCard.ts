export const calculateCategoryForCard = (card: any, category: string, spend: number) => {
    const { categories } = card
    const categoryData = categories[category]
    const { cashback, limit } = categoryData


    let totalCashback = parseFloat(cashback) / 100 * spend
    let returnLimit = "0"
    let spendingUsed = spend
    if (limit === "-1") {
        returnLimit = "-1"
    } else {
        if (spend >= parseFloat(limit)) {
            totalCashback = parseFloat(cashback) / 100 * parseFloat(limit)
            spendingUsed = parseFloat(limit)
            returnLimit = "0"
        } else {
            spendingUsed = spend
            returnLimit = (parseFloat(limit) - spend).toString()
        }
    }

    return {
        totalCashback: totalCashback.toFixed(2),
        returnLimit: returnLimit,
        spendingUsed: spendingUsed,
    }





}