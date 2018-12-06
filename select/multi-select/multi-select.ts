import { Component, Input, Output, EventEmitter, OnInit, OnChanges, Renderer2 } from '@angular/core';

/**
 * multiple select component with limiter ~
 * 
 * |-----------------------------------------------------------------------|
 * | First, please apply changes in ionic component select.js              |
 * |-----------------------------------------------------------------------|
 * | open file ../node_modules/ionic-angular/components/select/select.js   |
 * | In line 320 - if (selectedOption.checked || !selectedOption.checked)  |
 * |-----------------------------------------------------------------------|
 * 
 * ~ Format Example:
 * 
 * <multi-select (onItemSelect)="onItemSelect($event)" 
 *               [selectModel]="selectModel" 
 *               [selectArray]="contactsList" 
 *               [selectField]="{ name: 'name' }"
 *               [limit]="2">
 * </multi-select>
 * 
 * ~ Fields:
 * 
 * selectModel // accepts array of strings
 * 
 * selectArray = [
 *    {
 *      name: 'foo',
 *      value: 'bar'
 *    }
 * ]
 * Note: type value is optional, in case the value is not specified,
 * the name will be accepted as a value
 * 
 * limit: number  // limit on how many item can be selected by user
 * 
 * selectField // field to be used in selectArray (for array of objects)
 * 
 * limitations: 
 * 
 * only use if you need limit of multiple selection; otherwise, use the ion-select component
 * only works for SINGLE SELECT TAG (multiple select tag not supported due to DOM class conflict)
 */
@Component({
  selector: 'multi-select',
  templateUrl: 'multi-select.html'
})
export class MultiSelectComponent implements OnInit, OnChanges {

  @Input() selectModel = []
  @Input() selectField?: selectItem
  @Input() selectArray: Array<any> = []
  @Input() limit: number

  @Input() selected: boolean = true
  @Output() onItemSelect = new EventEmitter();

  checked_item = [];
  constructor(private renderer: Renderer2) { }
  ngOnInit() { }


  ngOnChanges(): void {
    if (this.selected && this.selectArray.length >= 1) {
      this.selectModel = [this.selectArray[0][this.selectField.value ? this.selectField.value : this.selectField.name]]
      this.checked_item = this.selectModel.slice()
    }
  }


  onSelectChanged(ev) {
    this.onItemSelect.emit(ev)
    if (this.checked_item.includes(ev)) {
      let i = this.checked_item.indexOf(ev)
      this.checked_item.splice(i, 1);
      let ByClass = document.getElementsByClassName("alert-tappable")
      for (let index = 0; index < this.selectArray.length; index++) {
        // remove disabled
        if (ByClass[index].hasAttribute('disabled')) {
          this.renderer.removeAttribute(ByClass[index], "disabled")
        }
      }
    } else {
      this.checked_item.push(ev);
      // disable if ${limit} items selected
      if (this.checked_item.length > (this.limit - 1)) {
        // wait while the DOM loads
        setTimeout(() => {
          let ByClass = document.getElementsByClassName("alert-tappable")
          for (let index = 0; index < this.selectArray.length; index++) {
            if (ByClass[index].attributes['aria-checked'].value == 'false') {
              this.renderer.setAttribute(ByClass[index], "disabled", "true")
            }
          }
        }, 50)
      }
    }
  }

  onCancel() {
    if (this.selectModel.length === 0) this.checked_item = [];
    else this.checked_item = this.selectModel.slice();
  }

  validateSelected() {
    if (this.selectModel.length > 1) {
      setTimeout(() => {
        if (this.checked_item.length > (this.limit - 1)) {
          let ByClass = document.getElementsByClassName("alert-tappable")
          for (let index = 0; index < this.selectArray.length; index++) {
            if (ByClass[index].attributes['aria-checked'].value == 'false') {
              this.renderer.setAttribute(ByClass[index], "disabled", "true")
            }
          }
        }
      }, 200)
    }
  }


  compareSelected(a, b) {
    return a == b;
  }
}

interface selectItem {
  name, value?
}