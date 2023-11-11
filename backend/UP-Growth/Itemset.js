class Itemset {
    constructor(itemset) {
        this.itemset = itemset;
        this.utility = 0;
    }

    // Get the exact utility of this itemset
    getExactUtility() {
        return this.utility;
    }

    // Increase the utility of this itemset
    increaseUtility(utility) {
        this.utility += utility;
    }

    // Get an item at a specific position
    get(pos) {
        return this.itemset[pos];
    }

    // Get the size of the itemset
    size() {
        return this.itemset.length;
    }
}

module.exports = {
    Itemset,
}