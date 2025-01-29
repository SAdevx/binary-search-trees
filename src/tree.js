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

        while(curr != null){
            parent = curr;

            if(curr.data > value){
                curr = curr.left; 
            } else if(curr.data < value) {
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
        const deleteNode = (root, value) => {
            if(this.#root === null) return null;
    
            if(value < root.data){
                root.left  = deleteNode(root.left,value);
            }
            else if(value > root.data){
                root.right = deleteNode(root.right,value);
            } 
            else {
                if(root.left == null && root.right == null){
                    root = null;
                } else if(root.left == null){
                    root = root.right;
                } else if(root.right == null){
                    root = root.left;
                } else {
                    let tmpNode = findMinNode(root.right);
                    root.data = tmpNode.data;
                    root.right = deleteNode(root.right,tmpNode.data);
                }
            } 
            return root; 
        }
        this.#root = deleteNode(this.#root, value);
    }

    findMinNode(node){
        let parent = null;

        while(node != null){
            parent = node;
            node = node.left;
        }
        return parent;
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
        if(this.#root == null) return;
        let queue = [];
        queue.push(this.#root);

        while(queue.length){
            callback(queue[0].data);
            if(queue[0].left != null) queue.push(queue[0].left);
            if(queue[0].right != null) queue.push(queue[0].right);
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
        if(node == null) return -1;

        return Math.max(this.height(node.left),this.height(node.right))+1;
    }

    depth(node){
        if(node == null) return null;

        let depth = 0;
        let queue = [];
        queue.push(this.#root);

        while(queue.length){
            let n = queue.length
            for(let i = 0; i < n; i++){
                let currNode = queue.shift();

                if(currNode === node)
                    return depth;
            
                if(currNode.left != null)
                    queue.push(currNode.left);
    
                if(currNode.right != null)
                    queue.push(currNode.right);
            }
            depth++;
        }
        return depth;
    }

    isBalanced(root){
        if(root == null){
            return true;
        }

        let rootLeft  = this.height(root.left); 
        let rootRight = this.height(root.right); 

        if(Math.abs(rootLeft-rootRight) > 1) return false;

        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance(){
        let tmpArr = [];

        const traverse = (node) => {
            if(node == null) return 

            traverse(node.left);
            tmpArr.push(node.data);
            traverse(node.right);
        }
        traverse(this.#root);
        this.buildTree(tmpArr);
    }

    getUniqueElements(arr){
        return Array.from(new Set(arr)).sort((a,b) => a - b);
    }

    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right != null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left != null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    getRoot(){
        return this.#root;
    }
}

export {Tree};