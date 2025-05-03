import Node from "./node.js";
import mergeSort from "./mergeSort.js";

export default class Tree{
    constructor(arr){
        this.arr = arr;
        this.root = null;
    }
    buildTree(arr){
        let newArr = mergeSort(arr) ;
        return newArr
    }

}

let test = new Tree();
console.log(test.buildTree([4, 4, 4, 2, 2, 4]));