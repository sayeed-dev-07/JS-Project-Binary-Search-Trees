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
        console.log(this.tree);
        return this.root;
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
    insert(value){
        let data = this.root;
        while(data){
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
            else{
                if (data.right === null) {
                    data.right = new Node(value);
                    return
                }
                data = data.right;
            }
            
            
        }
    }
    deleteItem(value){
        let current = this.root;
        while(current){
            if (value === current.data && current.left === null && current.right === null) {
                current.data = null;
                console.log('success');
                return;
            }else if(value < current.data){
                current = current.left;
            }else if(value > current.data){
                current = current.right;
            }

        }
    }
}

let test = new Tree([1, 2, 3, 4]);
test.buildTree()
// test.prettyPrint();
// test.insert(154);
// test.prettyPrint()
test.deleteItem(3)
test.prettyPrint()




