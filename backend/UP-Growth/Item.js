class Item {
    constructor(name, utility = 0) {
        this.name = name;
        this.utility = utility;
    }

    // Get node utility
    getUtility() {
        return this.utility;
    }

    // Set node utility
    setUtility(utility) {
        this.utility = utility;
    }

    // Get the item name
    getName() {
        return this.name;
    }
}

module.exports = {
    Item
}

