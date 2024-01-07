const fs = require('fs-extra');
const {Item} = require('./Item.js');
const {Itemset} = require('./Itemset.js');
const {UPTree} = require('./UPTree.js');

class AlgoUPGrowth {

    constructor() {
        this.maxMemory = 0; // the maximum memory usage
        this.startTimestamp = 0; // the time the algorithm started
        this.endTimestamp = 0; // the time the algorithm terminated
        this.huiCount = 0; // the number of HUIs generated
        this.phuisCount = 0; // the number of PHUIs generated
        this.mapMinimumItemUtility = new Map(); // map for minimum node utility during DLU strategy
        this.writer = null; // writer to write the output file
        this.phuis = []; // structure to store potential HUIs
        this.DEBUG = false; // to activate debug mode
    }

    /**
	 * Method to run the algorithm
	 * 
	 * @param input path to an input file
	 * @param output  path for writing the output file
	 * @param minUtility  the minimum utility threshold
	 * @throws IOException  exception if error while reading or writing the file
	 */
    async runAlgorithm(input, output, minUtility) {
        this.maxMemory = 0;

        this.startTimestamp = Date.now();

        this.writer = fs.createWriteStream(output);

        // We create a map to store the TWU of each item
        const mapItemToTWU = new Map();

        // ******************************************
        // First database scan to calculate the TWU of each item.
        let myInput = null;
        let thisLine;
        try {
            myInput = fs.readFileSync(input, 'utf8').split('\n');
            for (let i = 0; i < myInput.length; i++) {
                thisLine = myInput[i];
                // if the line is a comment, is empty or is a kind of metadata
                if (thisLine.trim() === '' || thisLine.charAt(0) === '#' || thisLine.charAt(0) === '%' || thisLine.charAt(0) === '@') {
                    continue;
                }

                const split = thisLine.split(':');
                const items = split[0].split(' ');
                const transactionUtility = parseInt(split[1]);

                for (let j = 0; j < items.length; j++) {
                    const item = parseInt(items[j]);
                    const twu = mapItemToTWU.get(item) || 0;
                    mapItemToTWU.set(item, twu + transactionUtility);
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        // ******************************************
        // Second database scan: generate revised transactions and global UP-Tree.
        // Calculate the minimum utility of each item (required by the DLU strategy).
        this.mapMinimumItemUtility = new Map();
        
        try {
            let tree = new UPTree();

            myInput = fs.readFileSync(input, 'utf8').split('\n');
            
            for (let i = 0; i < myInput.length; i++) {
                thisLine = myInput[i];
                if (thisLine.trim() === '' || thisLine.charAt(0) === '#' || thisLine.charAt(0) === '%' || thisLine.charAt(0) === '@') {
                    continue;
                }

                const split = thisLine.split(':');
                const items = split[0].split(' ');
                const utilityValues = split[2].split(' ');

                let remainingUtility = 0;
                const revisedTransaction = [];

                for (let j = 0; j < items.length; j++) {
                    const itm = parseInt(items[j]);
                    const utility = parseInt(utilityValues[j]);

                    if (mapItemToTWU.get(itm) >= minUtility) {
                        revisedTransaction.push(new Item(itm, utility));
                        remainingUtility += utility;

                        let minItemUtil = this.mapMinimumItemUtility.get(itm);

                        if (minItemUtil === undefined || minItemUtil >= utility) {
                            this.mapMinimumItemUtility.set(itm, utility);
                        }
                    }
                }

                revisedTransaction.sort((o1, o2) => this.compareItemsDesc(o1.name, o2.name, mapItemToTWU));

                tree.addTransaction(revisedTransaction, remainingUtility);
            }

            tree.createHeaderList(mapItemToTWU);

            if (this.DEBUG) {
                console.log("GLOBAL TREE" + "\nmapITEM-TWU : " 
                + JSON.stringify(Object.fromEntries(mapItemToTWU))
                + "\nmapITEM-MINUTIL : " 
                + JSON.stringify(Object.fromEntries(this.mapMinimumItemUtility))
                + "\n" + tree.toString());
            }

            this.upgrowth(tree, minUtility, []);

            this.checkMemory();

        } catch (error) {
            console.error(error);
        }

        this.phuisCount = this.phuis.length;

        // ******************************************
        // Third database scan: calculate the exact utility of each PHUI and output those that are HUIs.
        
        this.phuis.sort((a, b) => a.size() - b.size());

        try {
            myInput = fs.readFileSync(input, 'utf8').split('\n');

            for (let i = 0; i < myInput.length; i++) {
                thisLine = myInput[i];
                if (thisLine.trim() === '' || thisLine.charAt(0) === '#' || thisLine.charAt(0) === '%' || thisLine.charAt(0) === '@') {
                    continue;
                }

                const split = thisLine.split(':');
                const items = split[0].split(' ');
                const utilityValues = split[2].split(' ');

                const revisedTransaction = [];

                for (let j = 0; j < items.length; j++) {
                    const item = parseInt(items[j]);
                    const utility = parseInt(utilityValues[j]);

                    if (mapItemToTWU.get(item) >= minUtility) {
                        revisedTransaction.push(new Item(item, utility));
                    }
                }

                revisedTransaction.sort((o1, o2) => o1.name - o2.name);

                for (const itemset of this.phuis) {
                    if (itemset.size() > revisedTransaction.length) {
                        break;
                    }
                    this.updateExactUtility(revisedTransaction, itemset);
                }
            }
        } catch (error) {
            console.error(error);
        }

        for (const itemset of this.phuis) {
            if (itemset.getExactUtility() >= minUtility) {                
                this.writeOut(itemset);
            }
        }

        this.checkMemory();

        this.endTimestamp = Date.now();

        this.phuis = [];
        this.mapMinimumItemUtility = null;
        this.writer.close();
    }

    /**
	 * Method to run the algorithm
	 * 
	 * @param transactions path to an input array
	 * @param minUtility  the minimum utility threshold
	 * @throws IOException  exception if error while reading or writing the file
	 */
    async runAlgorithmDB(transactions, minUtility){
        this.maxMemory = 0;
    
        this.startTimestamp = Date.now();

        // We create a map to store the TWU of each item
        const mapItemToTWU = new Map();

        const data = transactions;

        // ******************************************
        // First database scan to calculate the TWU of each item.
        try {
            for(let i = 0; i < data.length; i++) {
                const transaction = data[i];
                const thisProducts = transaction["details"];
                const transactionUtility = parseFloat(transaction.total);
    
                for (let j = 0; j < thisProducts.length; j++) {
                    const item = parseInt(thisProducts[j].product_id);
                    const twu = mapItemToTWU.get(item) || 0;
                    mapItemToTWU.set(item, twu + transactionUtility);
                }
            }    
        } catch (err) {
            console.log(err);
        }

        // ******************************************
        // Second database scan: generate revised transactions and global UP-Tree.
        // Calculate the minimum utility of each item (required by the DLU strategy).
        this.mapMinimumItemUtility = new Map();

        try {
            let tree = new UPTree();
            for (let i = 0; i < data.length; i++) {
                const transaction = data[i];
                const thisProducts = transaction["details"];

                let remainingUtility = 0;
                const revisedTransaction = [];
    
                for (let j = 0; j < thisProducts.length; j++) {
                    const itm = parseInt(thisProducts[j].product_id);
                    const utility = parseFloat(thisProducts[j].price);
                    
                    if (mapItemToTWU.get(itm) >= minUtility) {
                        revisedTransaction.push(new Item(itm, utility));
                        remainingUtility += utility;

                        let minItemUtil = this.mapMinimumItemUtility.get(itm);

                        if (minItemUtil === undefined || minItemUtil >= utility) {
                            this.mapMinimumItemUtility.set(itm, utility);
                        }
                    }
                }
                revisedTransaction.sort((o1, o2) => this.compareItemsDesc(o1.name, o2.name, mapItemToTWU));

                tree.addTransaction(revisedTransaction, remainingUtility);
            }

            tree.createHeaderList(mapItemToTWU);

            if (this.DEBUG) {
                console.log("GLOBAL TREE" + "\nmapITEM-TWU : " 
                + JSON.stringify(Object.fromEntries(mapItemToTWU))
                + "\nmapITEM-MINUTIL : " 
                + JSON.stringify(Object.fromEntries(this.mapMinimumItemUtility))
                + "\n" + tree.toString());
            }

            this.upgrowth(tree, minUtility, []);

            this.checkMemory();

        } catch (error) {
            console.error(error);
        }
        
        this.phuisCount = this.phuis.length;

        // ******************************************
        // Third database scan: calculate the exact utility of each PHUI and output those that are HUIs.

        this.phuis.sort((a, b) => a.size() - b.size());

        try {
            for (let i = 0; i < data.length; i++) {
                const transaction = data[i];
                const thisProducts = transaction["details"];

                const revisedTransaction = [];
    
                for (let j = 0; j < thisProducts.length; j++) {
                    const item = parseInt(thisProducts[j].product_id);
                    const utility = parseFloat(thisProducts[j].price);
                    
                    if (mapItemToTWU.get(item) >= minUtility) {
                        revisedTransaction.push(new Item(item, utility));
                    }
                }

                revisedTransaction.sort((o1, o2) => o1.name - o2.name);

                for (const itemset of this.phuis) {
                    if (itemset.size() > revisedTransaction.length) {
                        break;
                    }
                    this.updateExactUtility(revisedTransaction, itemset);
                }
            }
        } catch (error) {
            console.error(error);
        }

        const HUIs = [];
        for (const itemset of this.phuis) {
            if (itemset.getExactUtility() >= minUtility) {
                HUIs.push(itemset);
            }
        }

        this.checkMemory();

        this.endTimestamp = Date.now();

        this.phuis = [];
        this.mapMinimumItemUtility = null;
        return HUIs;
    }

    compareItemsDesc(item1, item2, mapItemEstimatedUtility) {
        const utility1 = mapItemEstimatedUtility.get(item1);
        const utility2 = mapItemEstimatedUtility.get(item2);
    
        // if the same, use the lexical order otherwise use the TWU
        if (utility1 === utility2) {
            return item1 - item2; 
        }
    
        return utility2 - utility1;
    }
    
    /**
	 * Mine UP Tree recursively
	 * 
	 * @param tree UPTree to mine
	 * @param minUtility minimum utility threshold
	 * @param prefix the prefix itemset
	 */
    upgrowth(tree, minUtility, prefix) {
        // For each item in the header table list of the tree in reverse order.
        for (let i = tree.headerList.length - 1; i >= 0; i--) {
            // Get the item
            const item = tree.headerList[i];
    
            // ===== CREATE THE LOCAL TREE =====
            const localTree = this.createLocalTree(minUtility, tree, item);
            // NEXT LINE IS FOR DEBUGGING:
            if (this.DEBUG) {
                console.log(`LOCAL TREE for projection by: ${prefix.length ? '[' + prefix.join(',') + ']' + ',' : ''}${item}\n${localTree.toString()}`);
            }
    
            // ===== CALCULATE SUM OF ITEM NODE UTILITY =====
            // Take node from the bottom of the header table
            let pathCPB = tree.mapItemNodes.get(item);
            let pathCPBUtility = 0;
            while (pathCPB) {
                // Sum of items node utility
                pathCPBUtility += pathCPB.nodeUtility;
                pathCPB = pathCPB.nodeLink;
            }
    
            // If path utility of 'item' in the header table is greater than minUtility,
            // then 'item' is a PHUI (Potential high utility itemset)
            if (pathCPBUtility >= minUtility) {
                // Create the itemset by appending the item to the current prefix
                // This gives us a PHUI
                const newPrefix = prefix ? [...prefix, item] : [item];
    
                // Save the PHUI
                this.savePHUI(newPrefix);
    
                // Make a recursive call to the UPGrowth procedure to explore
                // other itemsets that are extensions of the current PHUI
                if (localTree.headerList.length > 0) {
                    this.upgrowth(localTree, minUtility, newPrefix);
                }
            }
        }
    }
    
    createLocalTree(minUtility, tree, item) {
        // === Construct conditional pattern base ===
        // It is a subdatabase which consists of the set of prefix paths
        const prefixPaths = [];
        let path = tree.mapItemNodes.get(item);
    
        // Map to store path utility of local items in CPB
        const itemPathUtility = new Map();
        while (path !== null) {
            // Get the Node Utiliy of the item
            const nodeUtility = path.nodeUtility;
            // If the path is not just the root node
            if (path.parent.itemID !== -1) {
                // Create the prefix path
                const prefixPath = [];
                // Add this node.
                prefixPath.push(path); // NOTE: We add it just to keep its utility,
                // actually it should not be part of the prefixPath
    
                // Recursively add all the parents of this node.
                let parentNode = path.parent;
                while (parentNode.itemID !== -1) {
                    prefixPath.push(parentNode);
    
                    // Path Utility
                    let pu = itemPathUtility.get(parentNode.itemID);
                    pu = pu === undefined ? nodeUtility : pu + nodeUtility;
    
                    itemPathUtility.set(parentNode.itemID, pu);
                    parentNode = parentNode.parent;
                }
                // Add the path to the list of prefix paths
                prefixPaths.push(prefixPath);
            }
            // Look for the next prefix path
            path = path.nodeLink;
        }
    
        if (this.DEBUG) {
            console.log("\n\n\nPREFIX PATHS:");
            for (const prefixPath of prefixPaths) {
                for (const node of prefixPath) {
                    console.log("    " + node.toString());
                }
                console.log("    --");
            }
        }
    
        // Calculate the Utility of each item in the prefix path
        const localTree = new UPTree();
    
        // For each prefix path
        for (const prefixPath of prefixPaths) {
            // The Utility of the prefix path is the node utility of its first node.
            const pathCount = prefixPath[0].count;
            let pathUtility = prefixPath[0].nodeUtility;
    
            const localPath = [];
            // For each node in the prefix path,
            // except the first one, we count the frequency
            for (let j = 1; j < prefixPath.length; j++) {
                let itemValue = 0; // It stores the multiplication of minimum item utility and path count
                // For each node in the prefix path
                const node = prefixPath[j];
    
                // Here is DLU Strategy #################
                // Check whether the local item is promising or not
                if (itemPathUtility.get(node.itemID) >= minUtility) {
                    localPath.push(node.itemID);
                } else { // If the item is unpromising, then we recalculate path utility
                    const minItemUtility = this.mapMinimumItemUtility.get(node.itemID);
                    itemValue = minItemUtility * pathCount;
                }
                pathUtility = pathUtility - itemValue;
            }
            if (this.DEBUG) {
                console.log("  Path utility after DGU, DGN, DLU: " + pathUtility);
            }
    
            // Reorganize the local path in descending order of path utility
            localPath.sort((o1, o2) => {
                // Compare the TWU of the items
                return this.compareItemsDesc(o1, o2, itemPathUtility);
            });

            // Create a tree for the conditional pattern base
            localTree.addLocalTransaction(localPath, pathUtility, this.mapMinimumItemUtility, pathCount);
        }
    
        // Create the local header table for the tree item - CPB
        localTree.createHeaderList(itemPathUtility);
        return localTree;
    }

    /**
	 * Save a PHUI in the list of PHUIs
	 * @param itemset the itemset
	 */
    savePHUI(itemset) {
        // Create an itemset object and store it in the list of PHUIs
        const itemsetObj = new Itemset(itemset);
        // Sort the itemset by lexical order to calculate its exact utility faster later on.
        itemset.sort((a, b) => a - b);
        // Add the itemset to the list of PHUIs
        this.phuis.push(itemsetObj);
    }
    
    /**
	 * Update the exact utility of an itemset given a transaction
	 * It assumes that itemsets are sorted according to the lexical order.
	 * @param itemset1 the first itemset
	 * @param itemset2 the second itemset
	 * @return true if the first itemset contains the second itemset
	 */
    updateExactUtility(transaction, itemset) {
        let utility = 0;
        
        for (let i = 0; i < itemset.size(); i++) {
            const itemI = itemset.get(i);
            let itemFound = false;
            
            for (let j = 0; j < transaction.length; j++) {
                const itemJ = transaction[j];
                if (itemJ.name === itemI) {
                    utility += itemJ.utility;
                    itemFound = true;
                    break;
                } else if (itemJ.name > itemI) {
                    // If the current item in the transaction is larger than
                    // the current item in the itemset, stop due to lexical order.
                    return;
                }
            }
            
            // If an item was not found in the transaction, stop processing.
            if (!itemFound) {
                return;
            }
        }
        
        // If all items were found, increase the utility of the itemset.
        itemset.increaseUtility(utility);
    }
    
    /** 
	 * Write a HUI to the output file
	 * @param HUI
	 * @param utility
	 * @throws IOException
	 */
    writeOut(HUI) {
        this.huiCount++; // increase the number of high utility itemsets found
        
        // Create a string buffer
        let buffer = "";
        // Append each item
        for (let i = 0; i < HUI.size(); i++) {
            buffer += HUI.get(i) + " ";
        }
        buffer += "#UTIL: " + HUI.getExactUtility();
    
        // write to file
        this.writer.write(buffer + '\n');
    }    

    checkMemory(){

    }

    printStats(){
        const used = process.memoryUsage(); 
        console.log(`=============  UP-GROWTH ALGORITHM - STATS =============`);
        console.log(`PHUIs (candidates) count: ${this.phuisCount}`);
        console.log(`Total time ~ ${this.endTimestamp - this.startTimestamp} ms`);
        console.log(`Memory usage: ${Math.round(used.rss / 1024 / 1024)}MB`);
        console.log(`HUIs count : ${this.huiCount}`);
        console.log(`===================================================`);
    }

    extendedEuclid(a, b){
        
    }
}

module.exports = {
    AlgoUPGrowth,
}