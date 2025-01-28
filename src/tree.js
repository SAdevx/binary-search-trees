import { Node } from "./node.js";

class Tree {
    #root = null;

    constructor(array){
        this.array = this.getUniqueElements(array);
    }

    buildTree(array){
        let n = array.length;
        if(n === 0) return null;

        let mid = Math.floor((n-1)/2);
        let root = new Node(array[mid]);

        let q = [{node: root, range: [0,n-1]}];
        let frontIndex = 0;
      
        while(frontIndex < q.length){
            let front = q[frontIndex];
            let curr = front.node;
            let [s,e] = front.range;
            let index = s + Math.floor((e-s)/2);
            
            if(s < index){
                let midLeft = s + Math.floor((index-1-s)/2);
                let left = new Node(array[midLeft]);
                curr.left = left;
                q.push({node: left, range: [s, index - 1]});
            }

            if(e > index){
                let midRight = index + 1 + Math.floor((e-index-1)/2);
                let right = new Node(array[midRight]);
                curr.right = right;
                q.push({node: right, range: [index+1,e]});
            }
            frontIndex++;
        }
        this.#root = root;
    }

    insert(value){
        let newNode = new Node(value);
        let curr = this.#root;
        let parent = null;

        if(this.#root === null) return "Pass in array to tree";

        while(curr !== null){
            parent = curr;

            if(curr.data > x){
                curr = curr.left; 
            } else if(curr.data < x) {
                curr = curr.right; 
            } else {
                return "Key already exist";
            }
        }
        
        if(parent.data > value){
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }

    deleteItem(value){
    }

    find(value){
        if(this.#root === null) return null;

        let curr = this.#root;

        while(curr != null){
            if(curr.data > value){
                curr = curr.left;
            } else if(curr.data < value){
                curr = curr.right;
            } else {
                return curr;
            }
        }
        return null;
    }

    levelOrder(callback){
        if(this.#root === null) return;
        let queue = [];
        queue.push(this.#root);

        while(queue.length){
            callback(queue[0].data);
            if(queue[0].left !== null) queue.push(queue[0].left);
            if(queue[0].right !== null) queue.push(queue[0].right);
            queue.shift();
        }
    }

    inOrder(callback){
        const traverse = (node) => {
            if(node == null) return;
      
            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }
        traverse(this.#root);
    }

    preOrder(callback){
        const traverse = (node) => {
            if(node == null) return;
      
            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.#root);
    }

    postOrder(callback){
        const traverse = (node) => {
            if(node == null) return;
      
            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }
        traverse(this.#root);
    }

    height(node){
    }

    depth(node){
    }

    isBalanced(){
    }

    rebalance(){
    }

    getUniqueElements(arr){
        return Array.from(new Set(arr)).sort((a,b) => a - b);
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };  
}

export {Tree};