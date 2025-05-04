import Node from "./node.js";
import mergeSort from "./mergeSort.js";

export default class Tree {
    constructor(arr) {
        this.arr = mergeSort(arr);
        this.root = null;
        this.tree = []
    }

    buildTree() {
        this.root = this.#buildTreeRecursion(this.arr, 0, this.arr.length - 1);
        // console.log(this.tree);
        // return this.root;
    }

    #buildTreeRecursion(arr, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);

        this.tree.push(root.data)

        root.left = this.#buildTreeRecursion(arr, start, mid - 1);
        root.right = this.#buildTreeRecursion(arr, mid + 1, end);

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
    insert(value) {
        let data = this.root;
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
    deleteItem(value){
        this.root = this.#delete(this.root, value)
    }
    #min(root) {
        let current = root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    
    #delete(root, value) {
        if (!root) {
            return root;
        }
        
        if (value < root.data) {
            root.left = this.#delete(root.left, value);
        } else if (value > root.data) {
            root.right = this.#delete(root.right, value);
        } else {
            // Node with only one child or no child
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            
            // Node with two children: get inorder successor (smallest in right subtree)
            root.data = this.#min(root.right);
            
            // Delete the inorder successor
            root.right = this.#delete(root.right, root.data);
        }
        
        return root;  // This was missing
    }
    
    

}

let arr = [1, 3, 4, 5, 6, 6];
let test = new Tree(arr);
test.buildTree();
test.prettyPrint();

test.insert(100)
test.prettyPrint()
test.deleteItem(1);
test.buildTree()
test.prettyPrint()


// test.print()

