import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";

//related to ../../views/page/product-detail/buy-widget-form.html

export default class QuantitySelect extends Plugin {
    init() {
        console.log('Registered')
        //getting variables from template
        this.minus = DomAccess.querySelector(this.el, '.decrease');
        this.plus = DomAccess.querySelector(this.el, '.increase');
        this.field = DomAccess.querySelector(this.el, '.my-form-control');
        this.purchaseStepsElem = DomAccess.querySelector(this.el, '.purchaseSteps');

        //easier variable naming
        this.step = parseInt(this.purchaseStepsElem.value);
        this.min = parseInt(this.field.min); //did use value but it caused bugs sinse the value doesnt reset on reloading
        console.log(this.min)
        this.max = parseInt(this.field.max);
        //console.log(this.purchaseSteps);
        //console.log(this.field.max);
        //console.log(this.field.min);
        this.registerEvents();

    }

    registerEvents() {
        this.minus.addEventListener('click', this.decrease.bind(this));
        this.plus.addEventListener('click', this.increase.bind(this));
        this.plus.addEventListener('mousedown', this.increaseContinuous.bind(this))
        this.minus.addEventListener('mousedown', this.decreaseContinuous.bind(this))

    }


    //Todo DRY this up

    //gets called when the minus button on product detail page is pressed
    increase() {
        //console.log('max:'+this.field.max+'     value:'+ this.field.value)

        //check if the quantity increase is legal variable in template is {{ page.product.calculatedMaxPurchase }}
        if (parseInt(this.field.value) + this.step <= this.max ) {
            console.log('increase if true');
            this.field.value = parseInt(this.field.value) + this.step;
        }
    }

    //gets called when the minus button on product detail page is pressed
    decrease() {
        console.log('min'+parseInt(this.field.min)+'     value:'+ parseInt(this.field.value))

        //check if the quantity decrease is legal variable in template is {{ page.product.minPurchase }}
        if (parseInt(this.field.value) - this.step >= this.min ) {
            this.field.value = parseInt(this.field.value) -this.step ;
        }

    }

    increaseContinuous() {
        //user clicking and holding starts interval
        let tm = setTimeout(() => {
             this.increasing = setInterval(()=>{
                //called this.increase() build success but threw error in browser
                this.increase();
            },70);
        },200);
        //on initial click add Listener for mouseup event anywhere on the page
        document.addEventListener('mouseup', () => {
            //hander stops inteerval
            clearInterval(this.increasing);
            clearTimeout(tm);
        });

    }

    decreaseContinuous() {
        //user clicking and holding starts interval
        let tm = setTimeout(()=> {
            this.decreasing = setInterval(() => {
                this.decrease();
            }, 70);

        },200)
        //on initial click add Listener for mouseup event anywhere on the page
        document.addEventListener('mouseup', () => {
            //hander stops inteerval
            clearInterval(this.decreasing);
        });
    }
}

