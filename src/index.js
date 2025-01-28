import { Tree } from "./tree.js";

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.buildTree(test.array);
test.preOrder(console.log);