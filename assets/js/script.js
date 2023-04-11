// ///////////////////////////////////////////////////
///////////// Navbar/////////////////////////////////
// Widget
const widget = document.querySelector('.widget');
const widgetItem = document.querySelectorAll('.widget__item *');
const widgetSearchIcon = widget.querySelector('.fa-magnifying-glass');


widgetItem.forEach(el => {
	const cloneNode = el.cloneNode(true);
	el.setAttribute('data-click-widget', 'widget-dropdown');
});

const hideWidget = function() {
	// widgetSearchIcon.classList.replace('fa-xmark', 'fa-magnifying-glass')
	widget
	 .querySelector('.widget__item.active .widget__dropdown')
	 .classList.remove('active');

	widget
	 .querySelector('.widget__item.active')
	 .classList.remove('active');
}

const toggleWidget = function(e) {
	if(e.target.hasAttribute('data-click-widget')) {
		const widgetItem = e.target.closest('.widget__item');
		if(widgetItem.classList.contains('active')) {
			hideWidget();
		} else {
			if(widget.querySelector('.widget__item.active')) {
				hideWidget();
			}

			widgetItem.classList.add('active');
			const widgetSub = widgetItem.querySelector('.widget__dropdown')
			widgetSub.classList.add('active');
			// widgetSearchIcon.classList.replace('fa-magnifying-glass', 'fa-xmark')
		}
	}
};

const toggleWidgethide = function(e) {
	if(!e.target.hasAttribute('data-click-widget')) {
		if(widget.querySelector('.widget__item.active')) {
			hideWidget();
			return false;
		}
	}
}

widget.addEventListener('click', toggleWidget.bind(this));
window.addEventListener('click', toggleWidgethide.bind(this));
// responsive menu
const nav = document.querySelector('.nav');
const bars = document.querySelector('.nav__bars');
const overlay = document.querySelector('.nav__overlay');
const navClose = document.querySelector('.nav__close');


// Clickable navbar when screen size between 768 and 1024
const hideDropdownMneu = () => {
	nav
	 .querySelector('.nav__item.active .dropdown')
	 .classList.remove('active');

	nav
	 .querySelector('.nav__item.active')
	 .classList.remove('active');
};

const toggleSubHover = (e) => {
	if(e.target.hasAttribute('data-click') && window.innerWidth > 768 && window.innerWidth <= 1024) {
		const dropdownItem = e.target.parentElement;

		if(dropdownItem.classList.contains('active')) {
			hideDropdownMneu();
		} else {
			if(nav.querySelector('.nav__item.active')) {
				hideDropdownMneu();
			}

			dropdownItem.classList.add('active');
			const dropdownSub = dropdownItem.querySelector('.dropdown');
			dropdownSub.classList.add('active');
		}
	}
};

const hideSubHover = function(e) {
	if(!e.target.hasAttribute('data-click')) {
		if(nav.querySelector('.nav__item.active')) {
			hideDropdownMneu();
			return false;
		}
	} 
};

// Responsive Navbar
const toggleNav = function() {
	nav.classList.toggle('active');
	overlay.classList.toggle('active');
}

const collapseSubMenu = function() {
	nav
	 .querySelector('.nav__item.active .dropdown')
	 .removeAttribute('style');
	nav
	 .querySelector('.nav__item.active')
	 .classList.remove('active');
}

const toggleSubMenu = (e) => {
	if(e.target.hasAttribute('data-toggle') && window.innerWidth <= 768) {
		e.preventDefault();
		const menuDropdown = e.target.parentElement;

		if(menuDropdown.classList.contains('active')) {
			collapseSubMenu();
		} else {
			if(nav.querySelector('.nav__item.active')) {
				collapseSubMenu();
			}

			menuDropdown.classList.add('active');
			const dropdownSub = menuDropdown.querySelector('.dropdown');
			dropdownSub.style.maxHeight = dropdownSub.scrollHeight + "px";
		}
	}
};

const resizeWindow = function() {
	if(window.innerWidth > 768) {
		if(nav.classList.contains('active')) {
			toggleSubMenu();
		}

		if(nav.querySelector('.nav__item.active')) {
			collapseSubMenu();
		}
	}

	if(window.innerWidth > 768 && window.innerWidth < 1024) {
		toggleSubHover();
	}
}

// sub => sub menu


nav.addEventListener('click', toggleSubMenu.bind(this));
window.addEventListener("resize", resizeWindow);
bars.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);
navClose.addEventListener('click', toggleNav);
nav.addEventListener('click', toggleSubHover.bind(this));
window.addEventListener('click', hideSubHover.bind(this))

// ////////////////////////////////////////////////
// Tooltip
// tooltip
let tooltip;
document.onmouseover = function(e) {
	let anchorElem = event.target.closest('[data-tooltip]');
	if(!anchorElem) return;

	tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
};

document.onmouseout = function() {
	if (tooltip) {
		tooltip.remove();
		tooltip = false;
	}
}

function showTooltip(anchorElem, html) {
      let tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = html;
      document.body.append(tooltipElem);

      let coords = anchorElem.getBoundingClientRect();

      let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + anchorElem.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';

      return tooltipElem;
};

