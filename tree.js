import mergeSort from "./mergeSort.js";
import Node from "./node.js";

export default class Tree {
    constructor() {
        this.root = null;
    }
    buildTree(array) {
        let newArr = mergeSort(array);
        this.root = this.#buildTreeRecursive(newArr, 0, newArr.length - 1);

    }
    #buildTreeRecursive(arr, start, end) {
        if (start > end) {
            return null;
        }
        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);


        root.left = this.#buildTreeRecursive(arr, start, mid - 1);
        root.right = this.#buildTreeRecursive(arr, mid + 1, end);

        return root;
    }
    prettyPrint() {
        if (!this.root) {
            console.log("Tree is empty. Call buildTree() first.");
            return;
        }
        this.#pretty(this.root);
    }
    #pretty(node, prefix = "", isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.#pretty(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.#pretty(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.data) {
                return current;
            } else
                if (value < current.data) {
                    current = current.left;
                } else if (value > current.data) {
                    current = current.right;
                }
        }
        return 'Not Found'
    }
    insert(value){
        this.#insertInner(value)
        this.#rebalance()
    }
    #insertInner(value, data = this.root) {
        while (data) {
            if (value === data.data) {
                console.log('value already exists!');
                return;
            }
            if (value < data.data) {
                if (data.left === null) {
                    data.left = new Node(value);
                    return
                }
                data = data.left;

            }
            else {
                if (data.right === null) {
                    data.right = new Node(value);
                    return
                }
                data = data.right;
            }

        }

    }
    deleteItem(value) {
        this.root = this.#delete(this.root, value)
        this.#rebalance()
    }
    #delete(root, value) {
        if (!root) {
            return root;
        } else if (value < root.data) {
            root.left = this.#delete(root.left, value)
        } else if (value > root.data) {
            root.right = this.#delete(root.right, value)
        } else {
            // case last node with no left and right nodes 
            if (root.left === null && root.right === null) {
                return null;
            } else if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            } else {
                root.data = this.#min(root);
                root.right = this.#delete(root.right, root.data)
            }
        }
        return root;
    }
    #min(root) {
        root = root.right;
        while (root !== null && root.left !== null) {
            root = root.left;
        }
        return root.data;
    }

    // these codes for re balance the tree after deleteing some values from the tree .

    #rebalance() {
        const nodes = this.#inOrder();
        this.root = this.#buildTreeRecursive(nodes, 0, nodes.length - 1);
    }

    #inOrder(node = this.root, result = []) {
        if (!node) return result;
        this.#inOrder(node.left, result);
        result.push(node.data);
        this.#inOrder(node.right, result);
        return result;
    }

    // level order treversal

    levelOrder(callback = null) {
        try {
            if (!callback) {
                throw new Error('No callback passed !!');
            }
            return this.#levelOrderInner(callback);
        } catch (error) {
            console.error(`Error : ${error.message}` ); 
        }
    }
    #levelOrderInner(callback) {
        if (!this.root) {
            return;
        }
        let result = []
        let queue = []
        queue.push(this.root)
        while (queue.length > 0) {
            let current = queue.shift();

            result.push(callback(current));
            if (current.left) {
                queue.push(current.left)
            }
            if (current.right) {
                queue.push(current.right)
            }

        }
        return result;


    }

    // inorder treversal

    inOrder(callback = null) {
        try {
            if (!callback) {
                throw new Error('No callback passed !!');
            }
            let result = this.#inOrderInner(callback, this.root);
            return result;
        
        } catch (error) {
            console.error(`Error : ${error.message}` ); 
        }
    }
    #inOrderInner(callback, root, arr = []) {
        if (!root) {
            return arr;
        }
        this.#inOrderInner(callback, root.left, arr)
        arr.push(callback(root));
        this.#inOrderInner(callback, root.right, arr)
        return arr;
    }

     // preOrder treversal

    preOrder(callback = null) {
        try {
            if (!callback) {
                throw new Error('No callback passed !!');
            }
            let result = this.#preOrderInner(callback, this.root);
            return result;
        
        } catch (error) {
            console.error(`Error : ${error.message}` ); 
        }
    }
    #preOrderInner(callback, root, arr = []) {
        if (!root) {
            return arr;
        }
        arr.push(callback(root));
        this.#preOrderInner(callback, root.left, arr)
        this.#preOrderInner(callback, root.right, arr)
        return arr;
    }

     // postOrder treversal
    
    postOrder(callback = null) {
        try {
            if (!callback) {
                throw new Error('No callback passed !!');
            }
            let result = this.#postOrderInner(callback, this.root);
            return result;
        
        } catch (error) {
            console.error(`Error : ${error.message}` ); 
        }
    }
    #postOrderInner(callback, root, arr = []) {
        if (!root) {
            return arr;
        }
        
        this.#postOrderInner(callback, root.left, arr)
        this.#postOrderInner(callback, root.right, arr)
        arr.push(callback(root));
        return arr;
    }

    height(value){
        let node = this.find(value);

        if (typeof node === 'string') {
            return 'Node not found in the tree'
        }
        return this.#heightHelper(node)
    }
    #heightHelper(node){
        if (node === null) {
            return -1;
        }
        let left = this.#heightHelper(node.left);
        let right = this.#heightHelper(node.right);
        return 1 +  Math.max(left, right)
    }
    depth(value){
        let node = this.find(value);
        if (typeof node === 'string') {
            return null;
        }
        let current = this.root;
        let count = 0;
        while(current !== node){
            if (node.data < current.data) {
                current = current.left;
                count++;
            }
            else if(node.data > current.data){
                current = current.right;
                count++;
            }
        }
        return count;
    }
    
    

}





// test area 


let test = new Tree();
test.buildTree([1, 2, 4, 5, 3, 40, 5, 12, 10])
test.prettyPrint()
test.insert(1000);
test.insert(-1000);
test.insert(33);
test.insert(400);
test.insert(3332);
test.insert(3400);
test.insert(33332);
console.log('----------------');
test.prettyPrint()
test.deleteItem(-1000)
test.deleteItem(1000);
console.log('------------');
// test.deleteItem(4)
// test.deleteItem(5)
// test.deleteItem(2)
// test.deleteItem(3)

console.log('---------------');
test.prettyPrint()
// console.log(test.find(12));

console.log('---------------');
test.prettyPrint()

console.log('---------------');
function hello(root) {
    root.data = root.data * 2
    return root;
}

// console.log(test.levelOrder(hello));
// console.log(test.preOrder(hello));
// console.log(test.inOrder(hello));
// console.log(test.postOrder(hello));

// console.log(test.root);

console.log(test.height(12));
console.log(test.depth(12));