
memory = require('./memory')
// hello world

class Array {
    constructor() {
        this.length = 0;
        this.capacity = 0;
        // allocate returns the starting position of the memory slots
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        // push to the end, need to get to the last index(length) if it is larger than the size capacity, then you must resize. 
        // set the value to the index
        
        if (this.length >= this._capacity) {
            this._resize((this.length+1)*Array.SIZE_RATIO);
        }
        // set this new value to the end of the array at length, NOT capacity, capacity is larger than length, then you must now set length +1
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        // allocate returns the starting position of the memory slots
        this.ptr = memory.allocate(size);
        
        // if this.ptr is null, that means we have no more memory slots
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }

        // copy copies your original array and places it in slots with more emptly slots behind it
        memory.copy(this.ptr,oldPtr,this.length);

        // remove the old array in the previous slots to free space
        memory.free(oldPtr);

        // set the new capacity size
        this._capacity = size;
    }

    get(index) {

        // if the index is less than 0 or longer than the length of the current array, then it is invalid
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        // get the index value
        return memory.get(this.ptr+index);
    }

    pop() {

        // if the length is 0, then there is nothing in the memory space to remove
        if (this.length == 0) {
            throw new Error('Index error');
        }

        // grab the value at this last point in the array.
        const value = memory.get(this.ptr + this.length-1);

        // reduce the length
        this.length--;

        // return the value
        return value
    }

    insert(index,value) {

        // if the index is less than 0 or longer than the length of the current array, then it is invalid
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // ensure that the array hasn't reached or surpased capacity
        if (this.length >= this._capacity) {
            this._resize((this.length+1)*Array.SIZE_RATIO);
        }
        // copy the original array
        memory.copy(this.ptr + index + 1,this.ptr + index,this.length-index);
        // add the value to the array - if we resized, then this array is at new memory locations.
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        // if the index is less than 0 or longer than the length of the current array, then it is invalid
        if (index < 0 || index >= this.length) {
            throw new Error ('Index error');
        }
        // copy the array from start to index, and specify the length
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        // remove one from length
        this.length--;
    }
}
Array.SIZE_RATIO = 3;