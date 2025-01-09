import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  standalone: false,

  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent implements OnInit{ //*OnInit: se ejecuta cuando se inicializa el componente
  @Input()
  public gif!:Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required')
  }
}
