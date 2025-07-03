type Card = {
    name: string
    image: string
    cashback: number
    issuer: string
    annualFee: number
    sub: number
    key: string
    baseCashback: number
    categories: {
        [key: string]: {
            cashback: number
            limit: number
            sharesLimit: boolean
            sharedCategories: string[]
        }
    }
}

export default Card