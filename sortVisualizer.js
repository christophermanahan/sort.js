class Sort {

	constructor (canvas) {
		this.canvas = canvas;
		this.defaultColor = 'blue';
		this.compareColor = '#333';
		this.swapColor = '#111';
		this.pivotColor = 'red';
		this.arr = [];
		this.displayArr = [];
		this.next = [];
		//create and shuffle array
		for (let i = 1; i < 21; i++) {
			this.arr.push(i);
		}
		this.shuffle(this.arr);
		//create display array
		for (let i = 0; i < 20; i++) {
			this.displayArr.push({
				value: this.arr[i],
				color: this.defaultColor
			});
		}
		this.animate = this.animate.bind(this);
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

	canvasArray (iSwap, jSwap) {
		let ctx = this.canvas.getContext('2d');
		//clear canvas
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  	//array elements
  	let yRatio = this.canvas.height / this.arr.length,
  		space = this.canvas.width / this.arr.length,
  		barWidth = space / 2,
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
  		this.drawArrayElement(ctx, i, x, yRatio, barWidth);
  		x += space;
  	}
  	//swapping animation loop
  	const animateSwap = () => {
  		//clear array elements
  		ctx.fillStyle = '#fff';
  		ctx.fillRect(iSwapX - 1, 0, barWidth + 2, this.canvas.height);
  		ctx.fillRect(jSwapX - 1, 0, barWidth + 2, this.canvas.height);
  		//redraw array elements in-between swapping elements
  		let x = (space / 4) + (space * (iSwap + 1));
  		for (let i = iSwap + 1; i < jSwap; i++) {
  			this.drawArrayElement(ctx, i, x, yRatio, barWidth);
	  		x += space;
  		}
  		//redraw swapping elements
  		if (iSwap < jSwap) {
	  		iSwapX += Math.min(150, Math.abs(jSwapXStart - iSwapX));
	  		jSwapX -= Math.min(150, Math.abs(iSwapXStart - jSwapX));
  		} else {
  			iSwapX -= Math.min(150, Math.abs(jSwapXStart - iSwapX));
	  		jSwapX += Math.min(150, Math.abs(iSwapXStart - jSwapX));
  		}
  		ctx.fillStyle = this.swapColor;
  		ctx.fillRect(iSwapX, this.canvas.height - iSwapY, barWidth, iSwapY);
  		ctx.fillRect(jSwapX, this.canvas.height - jSwapY, barWidth, jSwapY);
  		//check if animation is complete
  		if (iSwap < jSwap && jSwapX > iSwapXStart) {
  			window.requestAnimationFrame(animateSwap);
  		} else if (iSwap > jSwap && jSwapX < iSwapXStart) {
  			window.requestAnimationFrame(animateSwap);
  		}
  	}
  	//start animation loop
  	if (jSwap) {
  		var iSwapXStart = iSwapX;
  		var jSwapXStart = jSwapX;
  		window.requestAnimationFrame(animateSwap);
  	}
	}

	drawArrayElement (ctx, i, x, yRatio, barWidth) {
		let y = yRatio * this.displayArr[i].value;
		ctx.fillStyle = this.displayArr[i].color;
		ctx.fillRect(x, this.canvas.height - y, barWidth, y);
	}

	animate () {
		this.canvasArray();
		window.setInterval(this.animateNext, 200);
	}

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
		this.swap(arr, i, j);
		this.next.push(['swap', i, j]);
	}

	swap (arr, i, j) {
		let temp = arr[i];
	  arr[i] = arr[j];
	  arr[j] = temp;
	}

	compare (arr, i, j) {
		this.next.push(['compare', i, j]);
		return arr[j] < arr[i];
	}

	selectPivot (i) {
		this.next.push(['selectPivot', i]);
	}

	unselectPivot (i) {
		this.next.push(['unselectPivot', i]);
	}
}

/*----------------- DOM EVENTS -----------------*/
window.onload = () => {
	let canvas = document.getElementById('main-canvas');
	canvas.height = 0.9 * window.innerHeight;
	canvas.width = 0.9 * window.innerWidth;
	let sortVis = new Sort(canvas);
	sortVis.animate();
	document.getElementById('start-btn').onclick = () => {
		console.log(sortVis.arr);
		heapSort(sortVis.arr);
		console.log(sortVis.arr);
	}

	/*----------------- QUICKSORT -----------------*/
	const partition = (arr, left, right) => {
	  let i, j;
	  //choose random pivot and swap with first element in array partition
	  let pivot = Math.floor(Math.random() * (right - left) + left);
	  sortVis.selectPivot(pivot);
	  if (left !== pivot) sortVis.displaySwap(arr, left, pivot);

	  for (i = left + 1, j = left + 1; j <= right; j++) {
	    if (sortVis.compare(arr, left, j)) {
	    	if (i !== j) sortVis.displaySwap(arr, i, j);
	      i++;
	    }
	  }

	  if (left !== i - 1) sortVis.displaySwap(arr, left, i - 1);
	  sortVis.unselectPivot(i - 1);
	  return i - 1;
	}

	const quickSort = (arr, left, right) => {
		left = left !== undefined ? left : 0;
		right = right !== undefined ? right : arr.length - 1;
	  if (left >= right) return;
	  let pivot = partition(arr, left, right);
	  quickSort(arr, left, pivot - 1);
	  quickSort(arr, pivot + 1, right);
	}

	/*----------------- HEAPSORT -----------------*/
	const buildMaxHeap = (arr) => {
	  arr.heapsize = arr.length - 1;
	  for (let i = Math.floor(arr.length/2); i > -1; i--) maxHeapify(arr, i);
	}

	const maxHeapify = (arr, i) => {
	  let left = 2*i,
	      right = 2*i + 1,
	      max = i,
	      temp;

	  if (left <= arr.heapsize && sortVis.compare(arr, left, max)) max = left;
	  if (right <= arr.heapsize && sortVis.compare(arr, right, max)) max = right;
	  if(max !== i) {
	    sortVis.displaySwap(arr, i, max);
	    maxHeapify(arr, max);
	  }
	}

	const heapSort = (arr) => {
	  let temp;
	  buildMaxHeap(arr);
	  for (let i = arr.length - 1; i > 0; i--) {
	    sortVis.displaySwap(arr, 0, i)
	    arr.heapsize--;
	    maxHeapify(arr, 0)
	  }
	  return arr;
	}
}