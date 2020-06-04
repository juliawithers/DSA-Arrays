// Assignment: 

// 1) Implement an Array class from scratch: 
// Walk through each step of implementing an array. Don't rush through this by copying and pasting the code samples. After you've walked through it and you understand the code of the Array class, hide the sample code and try writing the Array class from scratch using the memory module here for allocating memory.

const memory = require('./memory')

class Array {
    // create length, capacity, and start
    constructor(){
        this.length = 0; //currently array is at length 0
        this.capacity = 0; //capcity is currently 0
        this.ptr = memory.allocate(this.length) //start point for length 0 array
    }

    // push
    push(value) {
        // ensure the length does not exceed capacity
        if (this.length >= this.capacity) {
            // resize if necessary
            this._resize((this.length + 1)*Array.SIZE_RATIO);
        }
        
        // memory.set, push sends to end of array
        memory.set(this.ptr+this.length,value)
        this.length++;
    }

    // resize
    _resize(size) {
        // we use allocate for the memory resizing 
        // get old ptr and new ptr
        let oldPtr = this.ptr;
        this.ptr = memory.allocate(this.length)
        // if new ptr is null it means we are out of memory
        if (this.ptr === null) {
            throw new Error('no more memory')
        }
        // FORGOT - Copy old array
        memory.copy(this.ptr,oldPtr,this.length)
        // free up the old memory space
        memory.free(oldPtr);
        // set the new capacity size
        this.capacity = size;
    }

    // get
    get(index) {
        // ensure that the index is valid
        if(index<0 || index >=this.length) {
            throw new Error('index error')
        }
        // return the value form memory
        memory.get(this.ptr+index)
    }

    // insert
    insert(index,value) {
        // verify valid index
        if(index<0 || index >=this.length) {
            throw new Error('index error')
        }
        // ensure that the length hasn't exceeded capacity
        if(this.length>=this.capacity) {
            // resize if necessary    
            this._resize((this.length+1)*Array.SIZE_RATIO)
        }
        
        // copy the original array - copy sets the original array to new slots and size
        memory.copy(this.ptr+this.length+1,this.ptr+index,this.length-index);
        // insert the value to newly set array
        memory.set(this.ptr+index,value);
        // add to length
        this.length++;
    }

    // pop()
    pop() {
        // check that length isn't equal to 0
        if (this.length === 0) {
            throw new Error('Index error') 
        }
        // grab the value at that point
        const value = memory.get(this.ptr+this.length-1)
        // reduce the length
        this.length--;
        // return the value - why return it?
        return value 
    }

    // remove
    remove(index) {
        // ensure the current index is valid
        if(index<0 || index >=this.length) {
            throw new Error('index error')
        }
        // copy the original array - copy sets the original array to new slots and size
        memory.copy(this.ptr+index, this.ptr+index+1, this.length-index-1);
        // reduce length
        this.length--;
    }
}

Array.SIZE_RATIO = 3;

function main(){
    console.log('main ran')
      Array.SIZE_RATIO = 3;
  
      // Create an instance of the Array class
      let arr = new Array();
  
      // Add an item to the array
      arr.push(3);
      // arr.push(5);
      // arr.push(15);
      // arr.push(19);
      // arr.push(45);
      // arr.push(10);
  
      console.log(arr);
  }
  main()
  // module.exports = Array;

