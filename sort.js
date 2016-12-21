/*------------- SORTING ALGORITHMS -------------*/

/*------------- QUICKSORT -------------*/
const quickSort = (arr) => {
  if (arr.length === 0) return arr;
  let part = partition(arr);
  arr = part[0];
  let pivot = part[1];
  return quickSort(arr.slice(0, pivot)).concat(arr[pivot], quickSort(arr.slice(pivot + 1)));
}

const partition = (arr) => {
  let temp, i, j;
  
  //choose random pivot and swap with first element in array
  let pivot = Math.floor(Math.random() * arr.length);
  temp = arr[0];
  arr[0] = arr[pivot];
  arr[pivot] = temp;
  
  for (i = 1, j = 1; j < arr.length; j++) {
    if (arr[j] < arr[0]) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
    }
  }
  
  temp = arr[0];
  arr[0] = arr[i - 1];
  arr[i - 1] = temp;
  return [arr, i - 1];
}

console.log(quickSort([5,8,6,4,2,1,7,20,3,9,45,10,11,100,12]));

/*------------- MERGESORT -------------*/

const mergeSort = (arr) => {

}

const merge = (arr1, arr2) => {

}

/*------------- HEAPSORT -------------*/
const heapSort = (arr) => {
  let temp;
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    temp = arr[i];
    arr[i] = arr[0];
    arr[0] = temp;
    arr.heapsize--;
    maxHeapify(arr, 0)
  }
  return arr;
}

const maxHeapify = (arr, i) => {
  let left = 2*i,
      right = 2*i + 1,
      max = i,
      temp;

  if (left <= arr.heapsize && arr[left] > arr[max]) max = left;
  if (right <= arr.heapsize && arr[right] > arr[max]) max = right;
  if(max !== i) {
    temp = arr[max];
    arr[max] = arr[i];
    arr[i] = temp;
    maxHeapify(arr, max);
  }
}

const buildMaxHeap = (arr) => {
  arr.heapsize = arr.length - 1;
  for (let i = Math.floor(arr.length/2); i > -1; i--) maxHeapify(arr, i);
}

console.log(heapSort([9,3,2,1,4,10,14,15,8,7]));