const swap = (arr, i, j) => {
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const compare = (arr, i, j) => {
  return arr[j] < arr[i];
}

/*------------- SORTING ALGORITHMS -------------*/

/*------------- QUICKSORT -------------*/
const quickSort = (arr, left, right) => {
  left = left !== undefined ? left : 0;
  right = right !== undefined ? right : arr.length - 1;
  if (left >= right) return;
  let pivot = partition(arr, left, right);
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);
}

const partition = (arr, left, right) => {
  let i, j;
  //choose random pivot and swap with first element in array partition
  let pivot = Math.floor(Math.random() * (right - left) + left);
  swap(arr, left, pivot);

  for (i = left + 1, j = left + 1; j <= right; j++) {
    if (compare(arr, left, j)) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, left, i - 1);
  return i - 1;
}

//console.log(quickSort([17, 16, 14, 2, 19, 13, 3, 9, 4, 7, 10, 5, 6, 11, 18, 20, 8, 1, 15, 12]));

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

//console.log(heapSort([9,3,2,1,4,10,14,15,8,7]));