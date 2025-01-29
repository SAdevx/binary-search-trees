import { Tree } from "./tree.js";

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
test.buildTree(test.array);

test.prettyPrint(test.getRoot());
console.log(test.isBalanced(test.getRoot()));

test.insert(320);
test.insert(400);
test.insert(386);
test.insert(200);
test.insert(119);

test.prettyPrint(test.getRoot());
console.log(test.isBalanced(test.getRoot()));

if(!test.isBalanced(test.getRoot())) test.rebalance();
console.log(test.isBalanced(test.getRoot()));
test.prettyPrint(test.getRoot());

console.log(test.height(test.getRoot().left.left.right));
console.log(test.depth(test.getRoot().left.left.right));

console.log("Preorder");
test.preOrder(console.log);

console.log("Inorder");
test.inOrder(console.log);

console.log("Postorder");
test.postOrder(console.log);

console.log("LevelOrder");
test.levelOrder(console.log);

console.log(test.find(1));