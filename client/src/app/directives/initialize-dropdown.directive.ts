import { Directive, ElementRef, OnInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '.ui.dropdown'
})
export class InitializeDropdownDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  public ngOnInit(){

    $('.user.dropdown').dropdown();

  }

}
