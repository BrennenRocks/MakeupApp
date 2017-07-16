import { Directive, ElementRef, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

declare const $: any;

@Directive({
  selector: '.ui.button'
})
export class InitializePopupDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private blogService: BlogService
  ) { }

  public ngOnInit(){
    //$('activating element').popup();

    $('.like.button').popup({
      position: 'bottom left',
      transition: 'drop',
      hoverable: true
    });

    $('.dislike.button').popup({
      position: 'bottom right',
      transition: 'drop',
      hoverable: true
    });
  }

}
