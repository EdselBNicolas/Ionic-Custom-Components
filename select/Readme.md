 MULTIPLE SELECT COMPONENT WITH LIMITER
  
 
 First, please apply changes in ionic component select.js              
 
 open file ../node_modules/ionic-angular/components/select/select.js 
 In line 320 - if (selectedOption.checked || !selectedOption.checked) 
  
 Format Example:
  
  <multi-select (onItemSelect)="onItemSelect($event)" 
                 [selectModel]="selectModel" 
                 [selectArray]="contactsList" 
                 [selectField]="{ name: 'name' }"
                 [limit]="2">
   </multi-select>
  
 Fields:
  
  selectModel // accepts array of strings
  
  selectArray = [
     {
       name: 'foo',
       value: 'bar'
     }
  ]
  Note: type value is optional, in case the value is not specified,
  the name will be accepted as a value
  
  limit: number  // limit on how many item can be selected by user
  
  selectField // field to be used in selectArray (for array of objects)
  
  limitations: 
  
  only use if you need limit of multiple selection; otherwise, use the ion-select component
  only works for SINGLE SELECT TAG (multiple select tag not supported due to DOM class conflict)

How to use:

1. paste your desired component in your ionic components folder,
2. import in components module

and you're done!

check the ts file for some documentation ~ 


Note: overwrite the existing select.js in:
../node_modules/ionic-angular/components/select/select.js

