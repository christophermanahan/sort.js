# sort.js
This is a sorting algorithm visualizer that allows the user to control the speed of animation and the number of array elements.

There are animations for bubbleSort, insertionSort, quickSort, mergeSort, and heapSort, and I hope to learn more about hybrid sorting algorithms like timSort and include them for those interested.

A display array of objects containing the value and color information of each array element is built and the next animation is performed at a set interval to mirror the operations performed on the original array.

HTML 5 canvas is used to provide swapping animations that adjust to the user specified interval and redraw the display array objects according to the the next animation as well as provide insight into the currently active subarrays for these algorithms.

Writing this visualizer helped me realize that my original implentation of quickSort was not truly in-place and helped me understand the difficulties and downsides to an in-place merge function!

Also, I <3 neon colors on dark backgrounds.
