type Query = {
    total: number,
    categories: {
        [key: string]: number
    }
}

export default Query;