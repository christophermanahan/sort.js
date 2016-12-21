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