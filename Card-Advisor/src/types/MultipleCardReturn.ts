type MultipleCardReturn = {
    totalCashback: number
    newCardTotalCashback: number
    cards: {
        name: string
        image: string
        cashback: number
        issuer: string
        annualFee: number
        sub: number
        key: string
    }[]
    savingsPerCategory: {
        [key: string]: {
            [cardKey: string]: {
                cashback: number
                categorySpend: number
                value: number
            }
        }
    }

}

export default MultipleCardReturn
