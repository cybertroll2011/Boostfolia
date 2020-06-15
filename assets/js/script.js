let body = document.querySelector("body");
let container = document.querySelectorAll(".container");

// header ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

let headerLogo = document.querySelector(".header__logo");
let headerNav = document.querySelector(".header__nav-wrapper");
let navBtn = document.querySelector(".header__nav-btn");
let closeHeaderNav = document.querySelector(".close-header-nav");

navBtn.onclick = openNav;

function openNav(e){
	headerNav.classList.toggle("header__nav-active");
	navBtn.classList.toggle("header__nav-btn-active");
	closeHeaderNav.classList.toggle("close-header-nav-active");
	body.classList.toggle("body-noscroll");
	window.onclick = closeNav;
}
function closeNav(e){
	if(e.target == closeHeaderNav){
		headerNav.classList.remove("header__nav-active");
		navBtn.classList.remove("header__nav-btn-active");
		closeHeaderNav.classList.remove("close-header-nav-active");
		body.classList.remove("body-noscroll");
	}
}
// fixed header 
let introH = document.querySelector(".intro").offsetHeight;
window.onscroll = function(){
	if(window.pageYOffset > introH){
		document.querySelector(".header").classList.add("header-fixed");
	}
	else if(window.pageYOffset < introH){
		document.querySelector(".header").classList.remove("header-fixed");
	}
}
// move to top of the page
headerLogo.onclick = function(e){
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	})
}
// move to block
let navLink = document.querySelectorAll(".nav__link")

for(let i = 0; i < navLink.length; i++){
	navLink[i].onclick = moveToBlock;
}

function moveToBlock(e){
	e.preventDefault();
	let navLinkAttr = this.getAttribute("data-block");
	for(let k = 0; k < container.length; k++){
		let containerAttr = container[k].getAttribute("data-block");
		if(navLinkAttr == containerAttr){
			let offset = container[k].offsetTop;
			window.scrollTo({
				top: offset - document.querySelector(".header").offsetHeight,
				behavior: "smooth"
			})
			headerNav.classList.remove("header__nav-active");
			navBtn.classList.remove("header__nav-btn-active");
			closeHeaderNav.classList.remove("close-header-nav-active");
			body.classList.remove("body-noscroll");
		}
	}
}


// intro ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

window.onload = function(e){
	document.querySelector(".intro__inner").classList.add("intro__inner-show");
	document.querySelector(".intro__works__items").classList.add("intro__works__items-show");
}

let introWorks = document.querySelector(".intro__works__items");
let introItem = document.querySelector(".intro__work__item");
let introItemWidth = introItem.offsetWidth;
let introNext = 0;
let introPrev = 0;
let introCount = 1;

document.querySelector(".intro__works-next").onclick = introWorksNext;
document.querySelector(".intro__works-prev").onclick = introWorksPrev;

function introWorksNext(e){
	if(introCount < 3){
		introNext += introItemWidth;
		introPrev -= introItemWidth;
		introWorks.style.left = -introNext+"px";
		introCount++;
	}
	if(introCount == 3){
		document.querySelector(".intro__works-next").classList.remove("intro__works-next-active");
	}
	if(introCount > 1){
		document.querySelector(".intro__works-prev").classList.add("intro__works-prev-active");
	}
}
function introWorksPrev(e){
	if(introCount > 1){
		introPrev += introItemWidth;
		introNext -= introItemWidth;
		introWorks.style.left = introPrev+"px";
		introCount--;
	}
	if(introCount == 1){
		document.querySelector(".intro__works-prev").classList.remove("intro__works-prev-active");
	}
	if(introCount < 3){
		document.querySelector(".intro__works-next").classList.add("intro__works-next-active");
	}
}

document.querySelector(".intro").onmousedown = introMouseDown;
document.querySelector(".intro").onmouseup = introMouseUp;

function introMouseDown(e){
	introBeginOffset = e.screenX;
}
function introMouseUp(e){
	introEndOffset = e.screenX;
	if(introBeginOffset > introEndOffset){
		introWorksNext();
	}
	if(introBeginOffset < introEndOffset){
		introWorksPrev();
	}
}


// about ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

let aboutItem = document.querySelectorAll(".about__item");
let aboutModal = document.querySelectorAll(".about__modal-content");

for(let i = 0; i < aboutItem.length; i ++){
	aboutItem[i].onclick = showAboutModal;
}
document.querySelector(".about__modal-wrapper").onclick = closeAboutModal;

function showAboutModal(){
	body.classList.add("body-noscroll");
	document.querySelector(".about__modal-wrapper").classList.add("modal-wrapper-show");
	document.querySelector(".about__modal").classList.add("modal-show");
	let aboutItemAttr = this.getAttribute("data-modal");
	for(let k = 0; k < aboutModal.length; k++){
		let aboutModalAttr = aboutModal[k].getAttribute("data-modal");
		if(aboutItemAttr == aboutModalAttr){
			aboutModal[k].classList.add("modal-content-show");
		}
	}
}
function closeAboutModal(e){
	if(e.target == document.querySelector(".about__modal-wrapper") || e.target == document.querySelector(".about__close-modal") || e.target == document.querySelector(".about__close-modal>span")){
		body.classList.remove("body-noscroll");
		document.querySelector(".about__modal-wrapper").classList.remove("modal-wrapper-show");
		document.querySelector(".about__modal").classList.remove("modal-show");
		for(let i = 0; i < aboutModal.length; i++){
			aboutModal[i].classList.remove("modal-content-show");
		}
	}
}

document.querySelector(".about__modal-prev").onclick = aboutModalPrev;
document.querySelector(".about__modal-next").onclick = aboutModalNext;

document.querySelector(".about__modal-prev").onmousedown = modalNavMouseDown;
document.querySelector(".about__modal-prev").onmouseup = modalNavMouseUp;
document.querySelector(".about__modal-next").onmousedown = modalNavMouseDown;
document.querySelector(".about__modal-next").onmouseup = modalNavMouseUp;

function aboutModalPrev(){
	let activeModal = document.querySelector(".modal-content-show");
	let curActiveModal = activeModal.getAttribute("data-modal");
	if(curActiveModal>1){
		activeModal.classList.remove("modal-content-show");
		curActiveModal--;
		for(let i = 0; i < aboutModal.length; i++){
			let aboutModalAttr = aboutModal[i].getAttribute("data-modal");
			if(curActiveModal == aboutModalAttr){
				aboutModal[i].classList.add("modal-content-show");
			}
		}
	}
}
function aboutModalNext(){
	let activeModal = document.querySelector(".modal-content-show");
	let curActiveModal = activeModal.getAttribute("data-modal");
	if(curActiveModal < 3){
		activeModal.classList.remove("modal-content-show");
		curActiveModal++;
		for(let i = 0; i < aboutModal.length; i++){
			let aboutModalAttr = aboutModal[i].getAttribute("data-modal");
			if(curActiveModal == aboutModalAttr){
				aboutModal[i].classList.add("modal-content-show");
			}
		}
	}
}
function modalNavMouseDown(e){
	this.style.background = "rgba(0,0,0,.1)";
}
function modalNavMouseUp(e){
	this.style.background = "#fff";
}

// behind the scenes ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

document.querySelector(".play__video>img").onclick = openVideo;
document.querySelector(".bts__play-now").onclick = openVideo;
document.querySelector(".bts__video").onclick = closeVideo;

function openVideo(){
	document.querySelector(".bts__video").classList.add("bts__video-show");
	body.classList.add("body-noscroll");
}
function closeVideo(e){
	if(e.target == document.querySelector(".bts__video")){
		document.querySelector(".bts__video").classList.remove("bts__video-show");
		document.querySelector(".bts__video>video").pause();
		body.classList.remove("body-noscroll");
	}
}

// portfolio ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

let portfolio = document.querySelector(".portfolio__items");
let portfolioLink = document.querySelectorAll(".portfolio__bar-item");
let portfolioItem = document.querySelectorAll(".portfolio__item");

for(let i = 0; i < portfolioLink.length; i++){
	portfolioLink[i].onclick = function(e){
		e.preventDefault();
		for(let k = 0; k < portfolioLink.length; k++){
			portfolioLink[k].classList.remove("portfolio__bar-item-active");
		}
		this.classList.add("portfolio__bar-item-active");
		let portfolioLinkAttr = this.getAttribute("data-portfolio");
		for(let p = 0; p < portfolioItem.length; p++){
			portfolioItem[p].style.opacity = "0.5";
			let portfolioAttr = portfolioItem[p].getAttribute("data-portfolio");
			if(portfolioLinkAttr == portfolioAttr){
				portfolioItem[p].style.opacity = "1";
			}
		}
	}
	portfolioLink[0].onclick = function(e){
		e.preventDefault();
		for(let k = 0; k < portfolioLink.length; k++){
			portfolioLink[k].classList.remove("portfolio__bar-item-active");
		}
		this.classList.add("portfolio__bar-item-active");
		for(let j = 0; j < portfolioItem.length; j++){
			portfolioItem[j].style.opacity = "1";
		}
	}
}
// slider
portfolio.onmousedown = portfolioMouseDown;
portfolio.onmouseup = portfolioMouseUp;

function portfolioMouseDown(e){
	portfBeginPos = e.screenX;
}
function portfolioMouseUp(e){
	if(body.offsetWidth > 770){
		portfEndPos = e.screenX;
		if(portfBeginPos > portfEndPos){
			this.style.left = -18+"%";
		}
		if(portfBeginPos < portfEndPos){
			this.style.left = 0;
		}
	}
}


// team ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

let teamMember = document.querySelectorAll(".team__member");
let teamBtn = document.querySelectorAll(".member-switcher");

for(let i = 0; i < teamBtn.length; i++){
	teamBtn[i].onclick = function(){
		let teamBtnAttr = this.getAttribute("data-member");
		if(teamBtnAttr > 0){
			for(let m = 0; m < teamMember.length; m++){
				teamMember[m].classList.remove("team__member-active");
				let teamMemberAttr = teamMember[m].getAttribute("data-member");
				if(teamMemberAttr == teamBtnAttr){
					teamMember[m].classList.add("team__member-active");
				}
			}
		}
	}
}

// map ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

let map = document.querySelector(".map>iframe");
let openMap = document.querySelector(".map__open");
let mapArrow = document.querySelector(".map__open>img");
let mapCount = 0;

openMap.onclick = function(e){
	if(mapCount == 0){
		mapCount++;
		map.style.height = "400px";
		mapArrow.style.transform = "rotate(-180deg)";
	}
	else if(mapCount == 1){
		mapCount--;
		map.style.height = "0";
		mapArrow.style.transform = "rotate(0)";
	}
}


// onscroll evetns ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ

window.onscroll = function(){
	// fixed header ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ
	let introH = document.querySelector(".intro").offsetHeight;
	if(window.pageYOffset > introH){
		document.querySelector(".header").classList.add("header-fixed");
	}
	else if(window.pageYOffset < introH){
		document.querySelector(".header").classList.remove("header-fixed");
	}
	// smooth coming ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ
	let scrollTop = window.pageYOffset;

	let offsetAbout = document.querySelector(".about").offsetTop;
	if(scrollTop > offsetAbout*0.3){
		document.querySelector(".about__inner").classList.add("about__inner-show");
	}

	let offsetVideo = document.querySelector(".behind__the__scenes").offsetTop;
	if(scrollTop > offsetVideo*0.5){
		document.querySelector(".bts__left").classList.add("bts__left-show");
		document.querySelector(".bts__right").classList.add("bts__right-show");
	}

	let offsetPortfolio = document.querySelector(".portfolio").offsetTop;
	if(scrollTop > offsetPortfolio*0.7){
		document.querySelector(".portfolio__inner").style.right = 0;
	}
	if(scrollTop > offsetPortfolio*0.9){
		for(let i = 0; i < document.querySelectorAll(".portfolio__line").length; i++){
			document.querySelectorAll(".portfolio__line")[i].style.left = 0;
		}
	}

	let offsetClients = document.querySelector(".clients").offsetTop;
	if(scrollTop > offsetClients*0.8){
		document.querySelector(".clients__inner").style.left = 0;
	}

	let offsetTeam = document.querySelector(".team").offsetTop;
	if(scrollTop > offsetTeam*0.8){
		document.querySelector(".team__inner").style.right = 0;
	}

	let offsetFeatures = document.querySelector(".features").offsetTop;
	if(scrollTop > offsetFeatures*0.8){
		document.querySelector(".features__inner").style.top = 0;
	}

	let offsetBlog = document.querySelector(".blog").offsetTop;
	if(scrollTop > offsetBlog*0.8){
		document.querySelector(".blog__inner").style.right = 0;
		for(let i = 0; i < document.querySelectorAll(".blog__article").length; i++){
			document.querySelectorAll(".blog__article")[i].style.top = 0;
		}
	}

	let offsetPricing = document.querySelector(".pricing").offsetTop;
	if(scrollTop > offsetPricing*0.9){
		for(let i = 0; i < document.querySelectorAll(".pricing__item-top-hidden").length; i++){
			document.querySelectorAll(".pricing__item-top-hidden")[i].style.top = 0;
		}
		for(let k = 0; k < document.querySelectorAll(".pricing__item-bottom-hidden").length; k++){
			document.querySelectorAll(".pricing__item-bottom-hidden")[k].style.bottom = 0;
		}
	}

	let offsetContact = document.querySelector(".contact").offsetTop;
	if(scrollTop > offsetContact*0.9){
		document.querySelector(".contact__inner").style.right = "0";
	}

	let offsetMap = document.querySelector(".map").offsetTop;
	if(scrollTop > offsetMap*0.7){
		document.querySelector(".map__open").style.top = "0";
	}

	let offsetFooter = document.querySelector(".footer").offsetTop;
	if(scrollTop > offsetFooter*0.9){
		document.querySelector(".footer__inner").style.bottom = "0";
	}
}