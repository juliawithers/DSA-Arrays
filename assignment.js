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
  
// 2) Expore the push() method
      // Add an item to the array
      arr.push(3);
// length, capacity and memory address @ [3]:
// length: 1, capacity: 3, memory address: 0,1,2
      arr.push(5);
      arr.push(15);
      arr.push(19);
      arr.push(45);
      arr.push(10);
      console.log(arr)
// length, capacity and memory address @ [3,5,15,19,45,10]:
// length: 6, capacity: 12, memory address: 12,13,14,15,16,17

// The array gets resized initially at the very first push, to size (1* 3)=3, as soon as the array reaches size/length 4 it tries to push onto an array that is (this.length = 3). when it fails the logic check, the array is resized and copied to a new location with capacity 12. when resizing, the head/start position is seat to index 12 in allocate. so the new memory index is starting at index 12. it is length 6 by the end of the pushes so it will be from i =12 to i=17

// 3) Exploring the pop() method
      arr.pop();
      arr.pop();
      arr.pop();  
      console.log(arr)
// length, capacity and memory address @ [3,5,15,-,-,-]:
// length: 3, capacity: 12, memory address: 12,13,14,15,16,17]

// pop() essentially resets the length of the array to one less. it doesn't remove the item, it's just empty space. 


// 4) understanding more about how arrays work
    console.log(arr[0]) //prints 3
    arr = []; //empties the array

    arr.push('tauhida') //fills the array with 'tauhida'. I don't understand the question "can I explain the result." this is literally how the array function operates...
    console.log(arr);
    // what is the purpose of the _resize() function in your Array class. 
    // _resize function is to copy original array, exdtend capacity size, and move the array to somewhere that can handle the new capacity size. 
  }
  main()

// 5) URLify a string 
// A common mistake users make when they type in an URL is to put spaces between words or letters. A solution that developers can use to solve this problem is to replace any spaces with a %20. Write a method that takes in a string and replaces all its empty spaces with a %20. Your algorithm can only make 1 pass through the string. Examples of input and output for this problem can be

// Input: tauhida parveen

// Output: tauhida%20parveen

// Input: www.thinkful.com /tauh ida parv een

// Output: www.thinkful.com%20/tauh%20ida%20parv%20een
function urlify(string){
    let arrOut = [];
    let start = 0;
    for (let i=0;i<=string.length; i++){
      if (string[i] === ' '){
        arrOut.push(string.substring(start,i))
        arrOut.push('%20')
        start = i+1;
        
      }
      else if (i === string.length) {
        arrOut.push(string.substring(start,i))
      }
    }
  
    return arrOut.join('')
  }
  
  
  console.log(urlify('www.thinkful.com /tauh ida parv een'))

// 6) Filtering an array
// Imagine you have an array of numbers. Write an algorithm to remove all numbers less than 5 from the array. DO NOT use Array's built-in .filter() method here; write the algorithm from scratch.

function filterArr(arr){
    let arrOut = [];
    for (let i=0; i<arr.length; i++) {
      if (arr[i] >= 5) {
        arrOut.push(arr[i])
      } 
    }
    return arrOut
  }
  // let test = [3,4,5,6,7,8,9,10];
  let test = [6,3,7,2,77,3,5];
  console.log(filterArr(test))

// 7) Max sum in the array
// You are given an array containing positive and negative integers. Write an algorithm which will find the largest sum in a continuous sequence.

// Input: [4, 6, -3, 5, -2, 1]
// Output: 12

function largestSum(arr){
    let currentSum = 0;
    let oldSum = 0;
    let highest
    for (let i=0;i<arr.length; i++){
      currentSum+= arr[i]
      if (currentSum > oldSum) {
        highest = currentSum
        oldSum = currentSum;
      }
    }
    return highest
  }
  
  let input = [4, 6, -3, 5, -2, 1];
  console.log(largestSum(input))


// 8) Merge arrays
// Imagine you have 2 arrays which have already been sorted. Write an algorithm to merge the 2 arrays into a single array, which should also be sorted.

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
function mergeArrays(arr1, arr2){
    let arrOut = [];
    let i = 0;
    let j = 0;
  
    while (i<arr1.length && j<arr2.length){
      if (arr1[i]<arr2[j]) {
          arrOut.push(arr1[i])
          i++
      }
      else if (arr1[i]===arr2[j]) {
        arrOut.push(arr1[i])
        arrOut.push(arr2[j])
        i++
        j++
      }
      else if (arr1[i]>arr2[j]) {
        arrOut.push(arr2[j])
        j++
      }
    }
    while (i<arr1.length){
      arrOut.push(arr1[i])
      i++
    }
    while (j<arr2.length){
      arrOut.push(arr2[j])
      j++
    }
    return arrOut
  }
  
  let input1 = [1, 3, 6, 8, 11];
  let input2 = [2, 3, 5, 8, 9, 10];
  
  console.log(mergeArrays(input1, input2))


//  9) Remove characters
// Write an algorithm that deletes given characters from a string. For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny" and the characters to be removed are "aeiou", the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". Do not use Javascript's filter, split, or join methods.

// Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
// Output: 'Bttl f th Vwls: Hw vs. Grzny'

function removeChars(string,chars) {
    let arrOut = [];
    let i = 0;
  
    while(i < string.length){
      for(let j=0;j<chars.length;j++){
        if (chars[j]===string[i]){
            arrOut.push('')
            i++
          } 
        }
  
      arrOut.push(string[i])
      i++
    }
    return arrOut.join('')
  }
  
  let inputStr = 'Battle of the Vowels: Hawaii vs. Grozny';
  let charsToRemove = 'aeiou';
  
  console.log(removeChars(inputStr,charsToRemove))


// 10) Products
// Given an array of numbers, write an algorithm to find out the products of every other number except the number at each index.

// Input:[1, 3, 9, 4]
// Output:[108, 36, 12, 27]

function someProducts(arr){
    let arrOut = [];
    let ind = 0;
    while (ind < arr.length){
      let product=1;
      for (let i=0; i<arr.length; i++){
        if (arr[ind]!== arr[i]){
          product = arr[i]*product
        }
      } 
      arrOut.push(product)
      ind++;
      
    }
    return arrOut
  }
  let input = [1, 3, 9, 4];
  // Output:[108, 36, 12, 27]
  console.log(someProducts(input))

// 11) 2D array
// Write an algorithm which searches through a 2D array, and whenever it finds a 0 should set the entire row and column to 0.

// Input:
// [[1,0,1,1,0],
// [0,1,1,1,0],
// [1,1,1,1,1],
// [1,0,1,1,1],
// [1,1,1,1,1]];

// Output:
// [[0,0,0,0,0],
// [0,0,0,0,0],
// [0,0,1,1,0],
// [0,0,0,0,0],
// [0,0,1,1,0]];

function arrayReplace(arr) {
    let arrOut = [];
    let arrIs = [];
    let arrJs = [];
    for (let i=0; i<arr.length; i++){
      
      for (let j=0; j<arr[0].length; j++){
        if(arr[i][j]===0){
          arrIs.push(i);
          arrJs.push(j);
        }
        // maybe make note of every i and j index that is 0 then at the end of the loops, create a new 
      }
    }
    console.log(arrIs)
    console.log(arrJs)
    
    for(let is=0; is< arrIs.length; is++){
      for (let i=0; i<arr[0].length; i++){
        // rows
        arr[arrIs[is]][i]=0;
      }
    }
    for (let js=0;js<arrJs.length; js++){
      for (let j=0; j<arr.length; j++){
        arr[j][arrJs[js]] = 0  
      }
    }
    return arr
  }
  
  let input = [
  [1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]];
  
  // output: 
  // [
  // [0,0,0,0,0],
  // [0,0,0,0,0],
  // [0,0,1,1,0],
  // [0,0,0,0,0],
  // [0,0,1,1,0]];
  console.log(arrayReplace(input))

// 12) String rotation
// Given 2 strings, str1 and str2, write a program that checks if str2 is a rotation of str1.

// Input: amazon, azonma
// Output: False

// Input: amazon, azonam
// Output: true

function stringRot(str1,str2){
    // find all possible combinations and check if the str2 is one of them
    let arrTemp = []
    let i = 1;
    let newString = ''; 
  
    for(let i=0; i<str1.length; i++){
      for(let j=0; j<str1.length; j++){
        newString+= str1[(i+j)%str1.length]
      }
      arrTemp.push(newString)
      newString = '';
    }
    console.log(arrTemp)
  
    for (let i=0; i<arrTemp.length; i++){
      if (arrTemp[i]=== str2){
        return true
      }
    }
    return false
  }
  
  input1 = 'amazon';
  input2 = 'azonma'; //false
  input3 = 'azonam'; //true
  
  console.log(stringRot(input1, input3))
