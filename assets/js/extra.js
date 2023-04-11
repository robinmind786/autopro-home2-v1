const pSlider = document.querySelector('.pSlider');
const pPrev = pSlider.querySelectorAll('.pSlider__prev');
const pNext = pSlider.querySelectorAll('.pSlider__next');
const pItems = pSlider.querySelectorAll('.pSlider__item');
const pDots = pSlider.querySelector('.pSlider__dots');


let pCurrentItem = 0;
const pMaxItem = pItems.length;

const pCreateDots = function() {
	pItems.forEach((item, index) => {
		const dotImg = item.querySelector('img');
		pDots.insertAdjacentHTML('beforeend', `
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
};

const pDotActive = function(index) {
	const pDotsItem = pSlider.querySelectorAll('.pSlider__dots--item');
	pDotsItem.forEach(dot => {
		dot.classList.remove('active');
	});

	pSlider.querySelector(`.pSlider__dots--item[data-slide="${index}"]`)
		.classList.add('active');
};

const goToP = function(index) {
	for(let i = 0; i < pItems.length; i++) {
		pItems[i].style.display = 'none';
		pItems[index].style.display = 'block';
	};
};

goToP(0);
pCreateDots();
pDotActive(0);


const pPrevSlide = function() {
	if(pCurrentItem == 0) {
		pCurrentItem = pMaxItem - 1;
	} else {
		pCurrentItem--;
	}

	goToP(pCurrentItem);
	pDotActive(pCurrentItem);
}

const pNextSlide = function() {
	if(pCurrentItem == pMaxItem - 1) {
		pCurrentItem = 0;
	} else {
		pCurrentItem++;
	}

	goToP(pCurrentItem);
	pDotActive(pCurrentItem);
};

pNext.forEach(el => {
	el.addEventListener('click', pNextSlide);
});

pPrev.forEach(el => {
	el.addEventListener('click', pPrevSlide);
});

pDots.addEventListener('click', function(e) {
	e.preventDefault();
	console.log()
	if(e.target.parentNode.parentNode.classList.contains('pSlider__dots--item')) {
		const {slide} = e.target.parentNode.parentNode.dataset;
		if(!slide) return;
		goToP(slide);
		pDotActive(slide);
	}
});