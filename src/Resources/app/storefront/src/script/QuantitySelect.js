import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";
export default class QuantitySelect extends Plugin {
    init() {
        console.log('Registered')
        this.minus = DomAccess.querySelector(this.el, '.decrease');
        this.plus = DomAccess.querySelector(this.el, '.increase');
        this.field = DomAccess.querySelector(this.el, '.my-form-control');
        this.purchaseStepsElem = DomAccess.querySelector(this.el, '.purchaseSteps');
        this.step = parseInt(this.purchaseStepsElem.value);
        this.min = parseInt(this.field.value);
        this.max = parseInt(this.field.max);
        //console.log(this.purchaseSteps);
        //console.log(this.field.max);
        console.log(this.field.min);
        this.registerEvents();
    }

    registerEvents() {
        this.minus.addEventListener('click', this.decrease.bind(this));
        this.plus.addEventListener('click', this.increase.bind(this));

    }

    decrease() {
        //console.log('min'+parseInt(this.field.min)+'     value:'+ parseInt(this.field.value))
        if (parseInt(this.field.value) - this.step >= this.min ) {
            this.field.value = parseInt(this.field.value) -this.step ;
        }

    }

    increase() {
        //console.log('max:'+this.field.max+'     value:'+ this.field.value)
        if (parseInt(this.field.value) + this.step <= this.max ) {
            console.log('increase if true');
            this.field.value = parseInt(this.field.value) + this.step;
        }
    }
}
