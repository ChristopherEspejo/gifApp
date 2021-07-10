import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    :string = '5AdvgQGefQxfVUxsErHy1jZ52qlhvyfX';
  private ServicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];


  //Todo: cambiar any por su tipo
  public resultados:Gif[] = [];

  get historial(){
    return[...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!)||[];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
  }

  buscarGifs(query:string = '' ){
    if(query.trim().length===0){
      return;
    }
  query= query.trim().toLocaleLowerCase();
  if(!this._historial.includes(query)){
    this._historial.unshift(query);
    
    this._historial= this._historial.splice(0,10);
    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    console.log(this._historial)

  }

  const params = new HttpParams()
                .set('api_key', this.apiKey)
                .set('limit', '10')
                .set('q', query);

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=5AdvgQGefQxfVUxsErHy1jZ52qlhvyfX&q=${query}&limit=10`)
           .subscribe(resp=>{
            console.log(resp.data);
            this.resultados=resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
           });
  }
}