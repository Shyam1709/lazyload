import { Component, OnInit } from '@angular/core';
import { JsonApiService } from './../../services/json-api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [JsonApiService]
})

export class MoviesComponent implements OnInit {
public movies =[];
  public showHome=true;
  public errorMsg ='';
  public showError : boolean = false;
  public favMovies=[];
  public flag = 'search';
  public searchResult:boolean=false;

  constructor(private jsonApiService: JsonApiService) { }

  ngOnInit() {
    this.countFavourite();
  }

  //to set movielist data from search component
  setMovieList(event){
  this.movies = event.moviesList;
   console.log(this.movies.length);
  if(this.movies.length>0){
  this.showHome=false;
  } if(this.movies.length==0){
  	this.searchResult=true;
  	this.showHome=false;
  }
  }

  //get data of favourite movies from database
  countFavourite() {
    this.jsonApiService.getFavourite().subscribe((res : any) =>{
      this.favMovies = res;
      this.showError = false;
    },(error:any)=>{
      this.errorMsg = error._body;
      this.showError = true;
    })
  }

//to set total no of favourite movies on browser  
setFavMovieList(event){
 this.favMovies=event.favMovies;
 this.countFavourite();
}

}
