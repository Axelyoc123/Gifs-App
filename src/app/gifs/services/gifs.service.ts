import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList:Gif[]=[];

  private _tagsHistory:string[]=[];
  private apiKey:string='6lHPrx9lXT6PmiACS0C8AM7VCWPNrz5Y';
  private serviceUrl:string='https://api.giphy.com/v1/gifs';
  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }
  get tagHistory(){
    return [...this._tagsHistory];//*hara una copia de la busqueda creo
  }

  private organizeHistory(tag:string){
    tag=tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter((oldTag)=>oldTag!==tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory=JSON.parse(localStorage.getItem('history')!);
    //*this._tagsHistory=JSON.parse(localStorage.getItem('history')!);=el signo de ! que pusimos al final le estamos indicando a typescript que siempre recibiremos esa data
    localStorage.getItem('history');
    if(this._tagsHistory.length===0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this.tagHistory));
  }


  async searchTag(tag:string):Promise<void>{
    if(tag.length===0) return;
    this.organizeHistory(tag);
    const params=new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','12')
    .set('q',tag)
    //*forma de hacer la peticion http con fetch
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=6lHPrx9lXT6PmiACS0C8AM7VCWPNrz5Y&q=valorant&limit=10')
    // .then(respuesta=>respuesta.json())
    // .then(data=>console.log(data));
     //*forma de hacer la peticion http con herramientas de angular
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:params})
    .subscribe((resp)=>{
      this.gifList=resp.data
    })
  }

}
