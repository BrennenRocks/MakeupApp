import { Directive, ElementRef, OnInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '.ui.popup'
})
export class InitializePopupDirective implements OnInit {

  constructor(
    private el: ElementRef
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

    $('.menu .user').popup({
        inline: true,
        hoverable: true,
        on: 'click',
        closable: true,
        position : 'bottom left',
        lastRestort: 'bottom left'
      });

      $('.menu .product').popup({
          inline   : true,
          hoverable: true,
          position : 'bottom left',
          lastResort: 'bottom left',
          delay: {
            show: 300,
            hide: 500
          }
        });

  }

}
