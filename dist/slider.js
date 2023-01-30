"use strict";
class Slide {
    constructor() {
        this.slides = document.querySelector('.slides');
        this.slide = this.slides.querySelectorAll('.slide');
        this.arrows = document.querySelector('.arrows');
        this.nextbtn = this.arrows.querySelectorAll('span')[1];
        this.prevbtn = this.arrows.querySelectorAll('span')[0];
        this.dots = document.querySelector('.dots');
        this.counter = 1;
        this.width = this.slide[0].clientWidth;
        this.clone();
        this.arrowBtns();
        this.dotsAction();
    }
    dotsAction() {
        this.dots.querySelectorAll('span').forEach((element, key) => {
            element.addEventListener('click', () => {
                this.counter = 1 + key;
                this.slides.style.transition = "transform 0.4s ease-in-out";
                this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
                this.transitioned();
            });
            console.log(key);
        });
    }
    clone() {
        let first = this.slide[0].cloneNode(true);
        let last = this.slide[this.slide.length - 1].cloneNode(true);
        last.id = 'last_slide';
        first.id = 'first_slide';
        this.slide[0].before(last);
        this.slides.appendChild(first);
        this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
        this.slide = this.slides.querySelectorAll('.slide');
    }
    arrowBtns() {
        this.nextbtn.addEventListener('click', () => {
            setTimeout(() => {
                if (this.counter >= this.slide.length - 1)
                    return;
                this.slides.style.transition = "transform 0.4s ease-in-out";
                this.counter++;
                this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
                this.transitioned();
            }, 100);
        });
        this.prevbtn.addEventListener('click', () => {
            setTimeout(() => {
                if (this.counter <= 0)
                    return;
                this.slides.style.transition = "transform 0.4s ease-in-out";
                this.counter--;
                this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
                this.transitioned();
            }, 100);
        });
    }
    transitioned() {
        this.slides.addEventListener('transitionend', () => {
            var _a;
            if (this.slide[this.counter].id == 'first_slide') {
                this.slides.style.transition = "none";
                this.counter = this.slide.length - this.counter;
                this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
            }
            if (this.slide[this.counter].id == 'last_slide') {
                this.slides.style.transition = "none";
                this.counter = this.slide.length - 2;
                this.slides.style.transform = `translateX(${-this.counter * this.width}px)`;
            }
            (_a = this.dots.querySelector('.active')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            this.dots.querySelectorAll('span')[this.counter - 1].classList.add('active');
        });
    }
}
new Slide();
