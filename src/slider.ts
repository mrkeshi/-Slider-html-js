class Slide{
    slides=document.querySelector('.slides') as HTMLDivElement
    slide=this.slides.querySelectorAll<HTMLDivElement>('.slide')
    arrows=document.querySelector('.arrows') as HTMLDivElement
    nextbtn=this.arrows.querySelectorAll('span')[1] as HTMLElement
    prevbtn=this.arrows.querySelectorAll('span')[0] as HTMLElement
    dots=document.querySelector('.dots') as HTMLElement
    counter=1
    width=this.slide[0].clientWidth


    constructor(){
    this.clone()
    this.arrowBtns()
    this.dotsAction()
    }
    dotsAction(){
        this.dots.querySelectorAll('span').forEach((element,key)=>{
            element.addEventListener('click',()=>{
                this.counter=1+key
                this.slides.style.transition="transform 0.4s ease-in-out"
                this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
                this.transitioned()
            })
            console.log(key)
        })
    }
    clone(){
        let first=this.slide[0].cloneNode(true) as HTMLDivElement
        let last=this.slide[this.slide.length-1].cloneNode(true) as HTMLDivElement
        last.id='last_slide'
        first.id='first_slide'
        this.slide[0].before(last)
        this.slides.appendChild(first)
        this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
        this.slide=this.slides.querySelectorAll<HTMLDivElement>('.slide')
    }
    arrowBtns(){
        this.nextbtn.addEventListener('click',()=>{
            setTimeout(() => {
                if(this.counter>=this.slide.length-1) return
                this.slides.style.transition="transform 0.4s ease-in-out"
                this.counter++
                this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
                this.transitioned()
            }, 100);
     
        })
        this.prevbtn.addEventListener('click',()=>{
     setTimeout(() => {
        if(this.counter<=0) return
        this.slides.style.transition="transform 0.4s ease-in-out"
        this.counter--
        this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
        this.transitioned()
     }, 100);
        })
    }
    transitioned(){
        this.slides.addEventListener('transitionend',()=>{ 
                if(this.slide[this.counter].id=='first_slide'){ 
                    this.slides.style.transition="none"
                    this.counter=this.slide.length -this.counter
                    this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
                }       
                 if(this.slide[this.counter].id=='last_slide'){
                    this.slides.style.transition="none"
                    this.counter=this.slide.length-2
                    this.slides.style.transform=`translateX(${-this.counter*this.width}px)`
                }
                this.dots.querySelector('.active')?.classList.remove('active')  
                this.dots.querySelectorAll('span')[this.counter-1].classList.add('active')

        })
    }
}
new Slide()