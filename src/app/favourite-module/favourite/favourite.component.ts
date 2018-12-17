import { Component, OnInit } from '@angular/core';
 // import { MovieListComponent } from '../../movie-module/movies/movie-list/movie-list.component';
import { JsonApiService } from './../../services/json-api.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  providers: [JsonApiService]
})

export class FavouriteComponent implements OnInit {
public favMovies : any =[];
	public errorMsg ='';
	public showError : boolean = false;
	public flag = 'list';

	constructor(private jsonApiService: JsonApiService) { 
	}

	ngOnInit() {
    this.getFavourite();
	}

	//get data of favourite movies from database
	getFavourite() {
		this.jsonApiService.getFavourite().subscribe((res: any) =>{
			this.favMovies = res;

			this.showError = false;
		},(error:any)=>{
			this.errorMsg = error.statusText;
			this.showError = true;
		})
	}
	
setFavMovieList(event){
 this.favMovies=event.favMovies;
 this.getFavourite();
}

}
