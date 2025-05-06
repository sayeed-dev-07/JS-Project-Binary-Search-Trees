import Tree from "./tree.js";

import randomArr from "./random.js";

function printArr(node){
    return node;
}


let arr = randomArr();

let test = new Tree();
test.buildTree(arr);
test.isBalanced();

console.log('Printing level Order : ');
console.log(test.levelOrder(printArr));
console.log('Printing pre Order : ');
console.log(test.preOrder(printArr));
console.log('Printing in Order : ');
console.log(test.inOrder(printArr));
console.log('Printing post Order : ');
console.log(test.postOrder(printArr));

test.insert(5);
test.insert(15);
test.insert(35);
test.insert(534);
test.insert(5323);
test.insert(5332);
test.insert(5333);

test.prettyPrint()
test.isBalanced()
test.rebalance()
test.prettyPrint()
test.isBalanced()


console.log('Printing level Order : ');
console.log(test.levelOrder(printArr));
console.log('Printing pre Order : ');
console.log(test.preOrder(printArr));
console.log('Printing in Order : ');
console.log(test.inOrder(printArr));
console.log('Printing post Order : ');
console.log(test.postOrder(printArr));