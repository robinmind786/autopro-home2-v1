'use strict'
// Product Slider
class PSlider {
	constructor(pSlider) {
		this.pSlider = document.querySelector(pSlider);
		this.pPrev = this.pSlider.querySelectorAll('.pSlider__prev');
		this.pNext = this.pSlider.querySelectorAll('.pSlider__next');
		this.pItems = this.pSlider.querySelectorAll('.pSlider__item');
		this.pDots = this.pSlider.querySelector('.pSlider__dots');

		this.pCurrentItem = 0;
		this.pMaxItem = this.pItems.length;

		this.init();

		this.pNext.forEach(el => {
			el.addEventListener('click', this.pNextSlide.bind(this));
		});

		this.pPrev.forEach(el => {
			el.addEventListener('click', this.pPrevSlide.bind(this));
		});

		this.pDots.addEventListener('click', this.pSlideByDot.bind(this));
	}

	init() {
		this.goToP(0);
		this.pCreateDots();
		this.pDotActive(0);
	}

	pCreateDots() {
		this.pItems.forEach((item, index) => {
			const dotImg = item.querySelector('img');
			this.pDots.insertAdjacentHTML('beforeend', `
	            <div class="offers__dots--item pSlider__dots--item" data-slide="${index}">
	                <a href="javascript:void(0)" class="pSlider__dots--effect">
	                    <img 
	                    width="656" 
	                    height="360" 
	                    src="${dotImg.src}"
	                    alt="${dotImg.atl}" 
	                    srcset="${dotImg.src} 656w, ${dotImg.src} 600w" 
	                    sizes="(max-width: 656px) 100vw, 656px"
	                    draggable="false">
	                </a>
	            </div>
			`);
		});
	}

	pDotActive(index) {
		this.pSlider.querySelectorAll('.pSlider__dots--item')
			.forEach(dot => {
				dot.classList.remove('active');
			});

		this.pSlider.querySelector(`.pSlider__dots--item[data-slide="${index}"]`)
			.classList.add('active');
	}

	goToP(index) {
		for(let i = 0; i < this.pItems.length; i++) {
			this.pItems[i].style.display = 'none';
			this.pItems[index].style.display = 'block';
		};
	}

	pPrevSlide() {
		if(this.pCurrentItem == 0) {
			this.pCurrentItem = this.pMaxItem - 1;
		} else {
			this.pCurrentItem--;
		}

		this.goToP(this.pCurrentItem);
		this.pDotActive(this.pCurrentItem);
	}

	pNextSlide() {
		if(this.pCurrentItem == this.pMaxItem - 1) {
			this.pCurrentItem = 0;
		} else {
			this.pCurrentItem++;
		}

		this.goToP(this.pCurrentItem);
		this.pDotActive(this.pCurrentItem);
	}

	pSlideByDot(e) {
		e.preventDefault();
		if(e.target.parentNode.parentNode.classList.contains('pSlider__dots--item')) {
			const {slide} = e.target.parentNode.parentNode.dataset;
			if(!slide) return;
			this.goToP(slide);
			this.pDotActive(slide);
		}
	}
}

// News Slider
class NCarousel {
	constructor(nSlider) {
		this.nSlider = document.querySelector(nSlider);
		this.nContainer = this.nSlider.querySelector('.news__slider--content');
		this.nPrev = this.nSlider.querySelector('.news__controller--prev');
		this.nNext = this.nSlider.querySelector('.news__controller--next');
		this.nItems = this.nSlider.querySelectorAll('.news__item');

		this.interval = 10000;

		this.nSliderId;
		this.isDragging = false;
		this.startPos = 0;
		this.currentTranslate = 0;
		this.prevTranslate = 0;
		this.index = 0;

		this.nSliderWidth = this.nItems[0].clientWidth;

		this.#init();
	}

	#init() {
		this.firstClone = this.nItems[0].cloneNode(true);
		this.lastClone = this.nItems[this.nItems.length - 1].cloneNode(true);

		this.firstClone.id = 'first-clone';
		this.lastClone.id = 'last-clone';

		this.nContainer.append(this.firstClone);
		this.nContainer.prepend(this.lastClone);

		this.nItems.forEach((slide, index) => {
			const img = slide.querySelector('img');
			img.addEventListener('dragstart', (e) => e.preventDefault());

			const anchos = slide.querySelectorAll('a');
			anchos.forEach(el => {
				el.addEventListener('click', (e) => e.preventDefault());
			})
		});

		this.nSlider.oncontextmenu = function(e) {
		  e.preventDefault();
		  e.stopPropagation();
		  return false;
		};

		this.nContainer.addEventListener('transitionend', this.#ntransitionend.bind(this));
		this.nSlider.addEventListener('mouseenter', this.#clearInterval.bind(this));
		this.nSlider.addEventListener('mouseleave', this.#nSlideStart.bind(this));

		['mousedown', 'touchstart'].forEach(ev => this.nSlider.addEventListener(ev, this.#nTouchStart.bind(this)));
		['mouseup', 'mouseleave', 'touchend'].forEach(ev => this.nSlider.addEventListener(ev, this.#nTouchEnd.bind(this)));
		['mousemove', 'touchmove'].forEach(ev => this.nSlider.addEventListener(ev, this.#nTouchMove.bind(this)))
		
		this.nPrev.addEventListener('click', this.#nSlideMoveToPrev.bind(this));
		this.nNext.addEventListener('click', this.#nSlideMoveToNext.bind(this));

		this.#nSlideStart();
	}

	#nSlideStart() {
		this.nSliderId = setInterval(() => {
			this.#nSlideMoveToNext();
		}, this.interval);
	}

	#getSlides() {
		return this.nSlider.querySelectorAll('.news__item');
	}

	#ntransitionend() {
		this.nItems = this.#getSlides();
		if(this.nItems[this.index].id == this.firstClone.id) {
			this.nContainer.style.transition = 'none';
			this.index = 1;
			this.nContainer.style.transform = `translateX(${-this.nSliderWidth * this.index}px)`;
		}
	}

	#nSlideMoveToNext() {
		this.nItems = this.#getSlides();
		if(this.index >= this.nItems.length - 1) return;
		this.index++;
		this.nContainer.style.transform = `translateX(${-this.nSliderWidth * this.index}px)`;
		this.nContainer.style.transition = '.7s ease-out';
	}

	#nSlideMoveToPrev() {
		if(this.index <= 0) return;
		this.index--;
		this.nContainer.style.transition = '.7s ease-out';
		this.nContainer.style.transform = `translateX(${-this.nSliderWidth * this.index}px)`;
	};

	#clearInterval() {
		clearInterval(this.nSliderId);
	}

	#nTouchStart(e) {
			this.isDragging = true;
			this.startPos = this.#getPositionX(e);
	}

	#nTouchEnd() {
		this.isDragging = false;
		const movedBy = this.currentTranslate - this.prevTranslate;
		if(movedBy > 70) this.#nSlideMoveToPrev();

		if(movedBy < -70) this.#nSlideMoveToNext();
	}

	#nTouchMove(e) {
		if(this.isDragging) {
			const currentPosition = this.#getPositionX(e);
			this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
		}
	}

	#getPositionX(e) {
		return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
	}
}


// Carosuel Slider
const mSlider = document.querySelector('.mSlider');
const mPrev = mSlider.querySelector('.mSlider__prev');
const mNext = mSlider.querySelector('.mSlider__next');
const mItems = mSlider.querySelectorAll('.mSlider__item');

const interval = 10000;
let index = 0;

const gotoMSlide = function(index) {
	for(var i = 0; i < mItems.length; i++) {
		mItems[i].classList.remove('active');
		mItems[i].style.display = 'none';
		mItems[index].style.display = 'block';
		mItems[index].classList.add('active');
	}
};

gotoMSlide(0)

const mNextSlide = () => {
	if(index == mItems.length - 1) {
		index = 0;
	} else {
		index++;
	}
	
	gotoMSlide(index);
};

const mPrevSlide = function() {
	if(index == 0) {
		index = mItems.length - 1;
	} else {
		index--;
	}

	gotoMSlide(index);
};


setInterval(() => {
	mNextSlide();
}, interval);

mPrev.addEventListener('click', mPrevSlide);
mNext.addEventListener('click', mNextSlide);

////////////////////////////////////////
// Partner Slider
const prSlider = document.querySelector('.prSlider');
const prSlides = prSlider.querySelector('.prSlider__slides');
const prPrev = document.querySelector('.prSlider__prev');
const prNext = document.querySelector('.prSlider__next');
const prItems = prSlider.querySelectorAll('.prSlider__item');


let count = 0;
let inc = 0;
let margin = 0;
let prItemDisplay


if(screen.width >= 1024) {
	prItemDisplay = 5;
}

if(screen.width >= 768 && screen.width < 1024) {
	prItemDisplay = 3;
}

if(screen.width >= 425 && screen.width < 768) {
	prItemDisplay = 2;
}

if(screen.width >= 320 && screen.width < 425) {
	prItemDisplay = 1;
}


var prItemLeft = prItems.length % prItemDisplay;
var prItemSlide = Math.floor(prItems.length / prItemDisplay) - 1;

const prSlidesWidth = prSlides.clientWidth;

prNext.addEventListener('click', () => {
	if(inc !== prItemSlide + prItemLeft) {
		if(inc == prItemSlide) {
			inc = inc + prItemLeft;
			count = count - (prSlidesWidth / prItemDisplay) * prItemLeft;
		} else {
			inc++;
			count = count - prSlidesWidth;
		}
	}

	prSlides.style.transform = `translateX(${count}px)`;
});


prPrev.addEventListener('click', () => {
	if(inc !== 0) {
		if(inc == prItemLeft) {
			inc = inc - prItemLeft;
			count = count + (prSlidesWidth / prItemDisplay) * prItemLeft;
		} else {
			inc --;
			count = count + prSlidesWidth;
		}
	}

	prSlides.style.transform = `translateX(${count}px)`;
});
















