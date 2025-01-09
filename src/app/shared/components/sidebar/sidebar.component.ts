import { Component, EventEmitter, Output } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private gifsService:GifsService){}

  get tags():string[]{
    return this.gifsService.tagHistory
  }

  searchSidebar(tag:string){
    return this.gifsService.searchTag(tag);
  }

}
