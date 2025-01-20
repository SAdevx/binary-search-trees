import { Node } from "./node.js";

class Tree {
    #root = null;

    constructor(array){
        this.array = this.getUniqueElements(array);
         console.log(this.array)
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
        return root;
    }

    insert(value){
    }

    deleteItem(value){
    }

    find(value){
    }

    levelOrder(callback){
    }

    inOrder(callback){
    }

    preOrder(callback){
    }

    postOrder(callback){
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
}

export {Tree};