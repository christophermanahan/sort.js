class Sort {

	constructor (canvas) {
		this.canvas = canvas;
		this.defaultColor = 'blue';
		this.compareColor = '#333';
		this.swapColor = '#111';
		this.pivotColor = 'red';
		this.sort = "quick";
		this.size = 20;
		this.interval = 100;
		this.animate = 0;
		this.swapCount = 0;
		this.compareCount = 0;
		// //create and shuffle array
		// for (let i = 1; i < this.size + 1; i++) {
		// 	this.arr.push(i);
		// }
		// this.shuffle(this.arr);
		// //create display array
		// for (let i = 0; i < this.size; i++) {
		// 	this.displayArr.push({
		// 		value: this.arr[i],
		// 		color: this.defaultColor
		// 	});
		// }
		//this.animate = this.animate.bind(this);
		this.animateNext = this.animateNext.bind(this);
	}

	/*----------------- FISHER YATES SHUFFLE -----------------*/
	shuffle (arr) {
		let j;
	  for (let i = arr.length; i; i--) {
	    j = Math.floor(Math.random() * i);
	    this.swap(arr, i - 1, j);
	  }
	}

	buildArray () {
		this.arr = [];
		this.displayArr = [];
		this.next = [];
		//create and shuffle array
		for (let i = 1; i < this.size + 1; i++) {
			this.arr.push(i);
		}
		this.shuffle(this.arr);
		//create display array
		for (let i = 0; i < this.size; i++) {
			this.displayArr.push({
				value: this.arr[i],
				color: this.defaultColor
			});
		}
	}

	canvasArray (iSwap, jSwap) {
		let ctx = this.canvas.getContext('2d');
		//clear canvas
		ctx.fillStyle = '#f0f0f0';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  	//draw array elements
  	let yRatio = (this.canvas.height - 50) / this.arr.length,
  			space = this.canvas.width / this.arr.length,
  			width = space / 2,
  			x = space / 4;
  	for (let i = 0; i < this.arr.length; i++) {
  		//set swap animation variables
  		if (i === iSwap) {
  			var iSwapX = x;
  			var iSwapY = yRatio * this.displayArr[i].value;
  		}
  		if (i === jSwap) {
  			var jSwapX = x;
  			var jSwapY = yRatio * this.displayArr[i].value;
  		}
  		this.drawArrayElement(ctx, i, x, yRatio, width);
  		x += space;
  	}
  	//swapping animation loop
  	const animateSwap = () => {
  		//clear array elements
  		ctx.fillStyle = '#f0f0f0';
  		ctx.fillRect(iSwapX - 1, 0, width + 2, this.canvas.height);
  		ctx.fillRect(jSwapX - 1, 0, width + 2, this.canvas.height);
  		//redraw array elements in-between swapping elements
  		let x = (space / 4) + (space * (iSwap + 1));
  		for (let i = iSwap + 1; i < jSwap; i++) {
  			this.drawArrayElement(ctx, i, x, yRatio, width);
	  		x += space;
  		}
  		//redraw swapping elements
  		if (iSwap < jSwap) {
	  		iSwapX += Math.min(pixelDistance, Math.abs(jSwapXStart - iSwapX));
	  		jSwapX -= Math.min(pixelDistance, Math.abs(iSwapXStart - jSwapX));
  		} else {
  			iSwapX -= Math.min(pixelDistance, Math.abs(jSwapXStart - iSwapX));
	  		jSwapX += Math.min(pixelDistance, Math.abs(iSwapXStart - jSwapX));
  		}
  		ctx.fillStyle = this.swapColor;
  		ctx.fillRect(iSwapX, this.canvas.height - iSwapY, width, iSwapY);
  		ctx.fillRect(jSwapX, this.canvas.height - jSwapY, width, jSwapY);
  		//check if animation is complete
  		if (iSwap < jSwap && jSwapX > iSwapXStart) {
  			window.requestAnimationFrame(animateSwap);
  		} else if (iSwap > jSwap && jSwapX < iSwapXStart) {
  			window.requestAnimationFrame(animateSwap);
  		}
  	}
  	//start animation loop
  	if (jSwap) {
  		//increase animation swap speed for more distant elements
  		var pixelDistance = Math.abs(iSwap - jSwap) * 10;
  		var iSwapXStart = iSwapX;
  		var jSwapXStart = jSwapX;
  		window.requestAnimationFrame(animateSwap);
  	}
	}

	drawArrayElement (ctx, i, x, yRatio, width) {
		let y = yRatio * this.displayArr[i].value;
		ctx.fillStyle = this.displayArr[i].color;
		ctx.fillRect(x, this.canvas.height - y, width, y);
	}

	// animate () {
	// 	this.canvasArray();
	// 	window.setInterval(this.animateNext, this.interval);
	// }

	animateNext () {
		if (!this.next.length) {
			this.canvasArray();
			return;
		}

		let next = this.next.shift(),
				animate = next[0],
				i = next[1],
				j = next[2];

		if (animate === 'selectPivot') {
			this.displayArr[i].color = this.pivotColor;
			this.canvasArray();
		} else if (animate === 'unselectPivot') {
			this.displayArr[i].color = this.defaultColor;
			this.canvasArray();
		} else {
			if (animate === 'compare') {
				this.colorSwap(i, j, this.compareColor);
				this.canvasArray();
			}
			if (animate === 'swap') {
				this.canvasArray(i, j);
				this.swap(this.displayArr, i, j);
			}
		}
		this.colorSwap(i, j, this.defaultColor);
	}

	colorSwap (i, j, type) {
		if (this.displayArr[i] && this.displayArr[j]) {
			this.displayArr[i].color = this.displayArr[i].color !== this.pivotColor ? type : this.pivotColor;
			this.displayArr[j].color = this.displayArr[j].color !== this.pivotColor ? type : this.pivotColor;
		}
	}

	displaySwap (arr, i, j) {
		this.swapCount++;
		this.swap(arr, i, j);
		this.next.push(['swap', i, j]);
	}

	swap (arr, i, j) {
		let temp = arr[i];
	  arr[i] = arr[j];
	  arr[j] = temp;
	}

	compare (arr, i, j) {
		this.compareCount++;
		this.next.push(['compare', i, j]);
		return arr[j] < arr[i];
	}

	selectPivot (i) {
		this.next.push(['selectPivot', i]);
	}

	unselectPivot (i) {
		this.next.push(['unselectPivot', i]);
	}

	/*----------------- QUICKSORT -----------------*/
	partition (arr, left, right) {
	  let i, j;
	  //choose random pivot and swap with first element in array partition
	  let pivot = Math.floor(Math.random() * (right - left) + left);
	  this.selectPivot(pivot);
	  if (left !== pivot) this.displaySwap(arr, left, pivot);

	  for (i = left + 1, j = left + 1; j <= right; j++) {
	    if (this.compare(arr, left, j)) {
	    	if (i !== j) this.displaySwap(arr, i, j);
	      i++;
	    }
	  }

	  if (left !== i - 1) this.displaySwap(arr, left, i - 1);
	  this.unselectPivot(i - 1);
	  return i - 1;
	}

	quickSort (arr, left, right) {
		left = left !== undefined ? left : 0;
		right = right !== undefined ? right : arr.length - 1;
	  if (left >= right) return;
	  let pivot = this.partition(arr, left, right);
	  this.quickSort(arr, left, pivot - 1);
	  this.quickSort(arr, pivot + 1, right);
	}

	/*----------------- HEAPSORT -----------------*/
	buildMaxHeap (arr) {
	  arr.heapsize = arr.length - 1;
	  for (let i = Math.floor(arr.length / 2); i > -1; i--) this.maxHeapify(arr, i);
	}

	maxHeapify (arr, i) {
	  let left = 2 * i,
	      right = 2 * i + 1,
	      max = i;

	  if (left <= arr.heapsize && this.compare(arr, left, max)) max = left;
	  if (right <= arr.heapsize && this.compare(arr, right, max)) max = right;
	  if(max !== i) {
	    this.displaySwap(arr, i, max);
	    this.maxHeapify(arr, max);
	  }
	}

	heapSort (arr) {
	  this.buildMaxHeap(arr);
	  for (let i = arr.length - 1; i > 0; i--) {
	    this.displaySwap(arr, 0, i)
	    arr.heapsize--;
	    this.maxHeapify(arr, 0);
	  }
	  return arr;
	}
}

/*----------------- DOM EVENTS -----------------*/
window.onload = () => {
	let canvas = document.getElementById('main-canvas');
	canvas.height = window.innerHeight;
	canvas.width = 0.8 * window.innerWidth;
	let sortVis = new Sort(canvas);
	sortVis.buildArray();
	sortVis.canvasArray();
	document.getElementById('quick').onclick = () => {
		sortVis.sort = 'quick';
	}
	document.getElementById('heap').onclick = () => {
		sortVis.sort = 'heap';
	}
	document.getElementById('reset-btn').onclick = () => {
		if (sortVis.animate) window.clearInterval(sortVis.animate);
		sortVis.buildArray();
		sortVis.canvasArray();
	}
	document.getElementById('start-btn').onclick = () => {
		//clear previous visualizations
		sortVis.swapCount = 0;
		sortVis.compareCount = 0;
		if (sortVis.animate) window.clearInterval(sortVis.animate);
		//get interval and sort and begin animation
		let e = document.getElementById("interval");
		let value = e.options[e.selectedIndex].value;
		sortVis.interval = value;
		sortVis.animate = window.setInterval(sortVis.animateNext, sortVis.interval);
		console.log(!!sortVis.animate)
		if (sortVis.sort === 'quick') sortVis.quickSort(sortVis.arr);
		if (sortVis.sort === 'heap') sortVis.heapSort(sortVis.arr);
	}

	// /*----------------- HEAPSORT -----------------*/
	// const buildMaxHeap = (arr) => {
	//   arr.heapsize = arr.length - 1;
	//   for (let i = Math.floor(arr.length/2); i > -1; i--) maxHeapify(arr, i);
	// }

	// const maxHeapify = (arr, i) => {
	//   let left = 2 * i,
	//       right = 2 * i + 1,
	//       max = i;

	//   if (left <= arr.heapsize && sortVis.compare(arr, left, max)) max = left;
	//   if (right <= arr.heapsize && sortVis.compare(arr, right, max)) max = right;
	//   if(max !== i) {
	//     sortVis.displaySwap(arr, i, max);
	//     maxHeapify(arr, max);
	//   }
	// }

	// const heapSort = (arr) => {
	//   buildMaxHeap(arr);
	//   for (let i = arr.length - 1; i > 0; i--) {
	//     sortVis.displaySwap(arr, 0, i)
	//     arr.heapsize--;
	//     maxHeapify(arr, 0);
	//   }
	//   return arr;
	// }
}