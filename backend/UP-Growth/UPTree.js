const {UPNode} = require('./UPNode.js');

class UPTree{

    constructor(){
        // List of items in the header table
        this.headerList = null;

        // Flag that indicates if the tree has more than one path
        this.hasMoreThanOnePath = false;

        // List of pairs (item, Utility) of the header table
        this.mapItemNodes = new Map();

        // Root of the tree
        this.root = new UPNode(); // null node

        // Map that indicates the last node for each item using the node links
        // Key: item, Value: an FP tree node (added by Philippe)
        this.mapItemLastNode = new Map();
    }

    /**
	 * Method for adding a transaction to the up-tree (for the initial
	 * construction of the UP-Tree).
	 * 
	 * @param transaction    reorganised transaction
	 * @param RTU   reorganised transaction utility
	 */
    addTransaction(transaction, RTU){
        let currentNode = this.root;
        let i = 0;
        let RemainingUtility = 0;
        const size = transaction.length;

        // For each item in the transaction
        for (i = 0; i < size; i++) {
            for (let k = i + 1; k < transaction.length; k++) {
                // Remaining utility is calculated as the sum of utilities of all
                // items behind the current one
                RemainingUtility += transaction[k].getUtility();
            }

            const item = transaction[i].getName();
            // let itm = parseInt(item);
            // Look if there is a node already in the FP-Tree

            let child = currentNode.getChildWithID(item);

            if (child === null) {                
                const nodeUtility = RTU - RemainingUtility;
                // Node utility = previous + (RTU - utility of descendent items)
                RemainingUtility = 0; // Reset RemainingUtility for the next item

                // There is no node, we create a new one
                currentNode = this.insertNewNode(currentNode, item, nodeUtility);
                
            } else {
                // There is a node already, we update it
                const currentNU = child.nodeUtility; // Current node utility
                // Node utility = previous + (RTU - utility of descendent items)
                const nodeUtility = currentNU + (RTU - RemainingUtility);
                RemainingUtility = 0; // Reset RemainingUtility for the next item
                child.count++;
                child.nodeUtility = nodeUtility;
                currentNode = child;
            }
        }
    }

    /**
	 * Add a transaction to the UP-Tree (for a local UP-Tree)
	 * @param localPath the path to be inserted
	 * @param pathUtility the path utility
	 * @param pathCount the path count
	 * @param mapMinimumItemUtility the map storing minimum item utility
	 */
    addLocalTransaction(localPath, pathUtility, mapMinimumItemUtility, pathCount) {
        let currentLocalNode = this.root;
        let i = 0;
        let RemainingUtility = 0;
        const size = localPath.length;
    
        // For each item in the transaction
        for (i = 0; i < size; i++) {
            for (let k = i + 1; k < localPath.length; k++) {
                const search = localPath[k];
                // Remaining utility is calculated as the sum of utilities of all
                // items behind the current one
                RemainingUtility += mapMinimumItemUtility.get(search) * pathCount;
            }
            const item = localPath[i];
    
            // Look if there is a node already in the UP-Tree
            const child = currentLocalNode.getChildWithID(item);

            if (child === null) {
                const nodeUtility = pathUtility - RemainingUtility;
                
                
                // Node utility = previous + (RTU - utility of
                // descendant items)
                RemainingUtility = 0; // Reset RU for the next item
    
                // There is no node, we create a new one
                currentLocalNode = this.insertNewNode(currentLocalNode, item, nodeUtility);                
            } else {
                // There is a node already, we update it
                const currentNU = child.nodeUtility; // Current node utility
                // Node utility = previous + (RTU - utility of
                // descendant items)
                const nodeUtility = currentNU + (pathUtility - RemainingUtility);
                RemainingUtility = 0;
                child.count++;
                child.nodeUtility = nodeUtility;
                currentLocalNode = child;
            }
        }
    }

    /**
	 * Insert a new node in the UP-Tree as child of a parent node
	 * @param currentlocalNode the parent node
	 * @param item the item in the new node
	 * @param nodeUtility the node utility of the new node
	 * @return the new node
	 */
    insertNewNode(currentLocalNode, item, nodeUtility) {
        // Create the new node
        let newNode = new UPNode();
        newNode.itemID = item;
        newNode.nodeUtility = nodeUtility;
        newNode.count = 1;
        newNode.parent = currentLocalNode;
    
        // Link the new node to its parent
        currentLocalNode.childs.push(newNode);
    
        // Check if more than one path
        if (!this.hasMoreThanOnePath && currentLocalNode.childs.length > 1) {
            this.hasMoreThanOnePath = true;
        }
    
        // Update the header table.
        // Check if there is already a node with this id in the header table
        let localHeaderNode = this.mapItemNodes.get(item);
        if (localHeaderNode === undefined) { // There is not
            this.mapItemNodes.set(item, newNode);
            this.mapItemLastNode.set(item, newNode);
        } else { // There is
            // Find the last node with this id.
            // Get the latest node in the tree with this item
            let lastNode = this.mapItemLastNode.get(item);
            // Add the new node to the node link of the last node
            lastNode.nodeLink = newNode;
    
            // Finally, set the new node as the last node
            this.mapItemLastNode.set(item, newNode);
        }
    
        // Return this node as the current node for the next loop iteration
        return newNode;
    }
    /**
	 * Method for creating the list of items in the header table, in descending
	 * order of TWU or path utility.
	 * 
	 * @param mapItemToEstimatedUtility
	 *            the Utilities of each item (key: item value: TWU or path
	 *            utility)
	 */
    createHeaderList(mapItemToEstimatedUtility) {
        // Create an array to store the header list with
        // all the items stored in the map received as a parameter
        this.headerList = Array.from(this.mapItemNodes.keys());
        // Sort the header table by decreasing order of utility
        this.headerList.sort((id1, id2) => {
            // Compare the Utility
            let compare = mapItemToEstimatedUtility[id2] - mapItemToEstimatedUtility[id1];
            // If the same utility, check the lexical ordering
            if (compare === 0) {
                return id1 - id2;
            }
            // Otherwise, use the utility
            return compare;
        });
    }

    toString(indent, node) {
        if(indent === undefined || node === undefined){
            return `HEADER TABLE: ${this.getMapItemNodes()}\n`
            + `hasMoreThanOnePath: ${this.hasMoreThanOnePath}\n`
            + this.toString("", this.root);
        }
        let output = indent + node.toString() + "\n";
        let childsOutput = "";
        for (let i = 0; i < node.childs.length; i++) {
            childsOutput += this.toString(indent + " ", node.childs[i]);
        }
        return output + childsOutput;
    }
    
    getMapItemNodes(){
        let buffer = "{";
        for(const [key, value] of this.mapItemNodes){
            buffer += `${key}=${value.toString()}, `;
        }
        buffer += "}";
        return buffer;
    }
}

module.exports = {
    UPTree,
}