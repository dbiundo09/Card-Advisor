import data from "../data/data.json";
import Query from "../types/Query";

export const calculateSingleCard = (inputs: Query, card: any = data[0]) => {
    const { categories, total } = inputs;
    const cardCategories = card.categories;
    console.log("Total", total)
    



    for (const category in categories) {
        console.log("Category", category)
        if (!(category in cardCategories)) {
            console.log("Category not in card categories", category)
        }
        else {
            console.log("Category in card categories", category)
        }


    }

    









    
    
}