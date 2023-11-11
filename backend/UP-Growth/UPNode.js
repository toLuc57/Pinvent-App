class UPNode{
    constructor() {
        this.itemID = -1;
        this.count = 1;
        this.nodeUtility = 0; // Initialize nodeUtility as 0 (based on your Java code).
        this.parent = null;
        this.childs = [];
        this.nodeLink = null;
    }

    getChildWithID(name) {
        // For each child node
        for (const child of this.childs) {
            // If the ID(item itself) is the one that we are looking for
            if (child.itemID === name) {
                // Return that node
                return child;
            }
        }
        // If not found, return null
        return null;
    }


    toString(){
        return `(i=${this.itemID} count=${this.count} nu=${this.nodeUtility})`;
    }
}

module.exports = {
    UPNode,
}