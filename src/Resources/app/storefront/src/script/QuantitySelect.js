import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";
export default class QuantitySelect extends Plugin {
    init() {
        console.log('Registered')
        this.minus = DomAccess.querySelector(this.el, '.decrease');
        this.plus = DomAccess.querySelector(this.el, '.increase');
        this.field = DomAccess.querySelector(this.el, '.my-form-control')
        console.log(this.field.max)
        console.log(this.field.min)
        this.registerEvents()
    }

    registerEvents() {
        this.minus.addEventListener('click', this.decrease.bind(this))
        this.plus.addEventListener('click', this.increase.bind(this))

    }

    decrease() {
        console.log('min'+parseInt(this.field.min)+'     value:'+ parseInt(this.field.value))
        if (this.field.value > this.field.min) {
            this.field.value -= 1;
        }

    }

    increase() {
        console.log('max:'+this.field.max+'     value:'+ this.field.value)
        if (parseInt(this.field.value) < parseInt(this.field.max)) {
            console.log('increase if true')
            this.field.value = parseInt(this.field.value) + 1;
        }
    }
}
