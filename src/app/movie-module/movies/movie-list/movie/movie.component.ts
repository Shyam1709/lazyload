import { Component, OnInit, Input, Inject, Output, ViewContainerRef, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { JsonApiService } from './../../../../services/json-api.service';
import { AppConfig } from './../../../../config/config.constant';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [JsonApiService]
  
})

export class MovieComponent implements OnInit {
	@Input() movie: any;
	@Input() flag: any;
	@Input() updateMovies: any;
	@Output() favArray = new EventEmitter();
	@Output() err =new EventEmitter();
	@Output() update =new EventEmitter();
	public movieUrl=AppConfig.baseUrl;	public favMovies : any =[];
	public errorMsg ='';
	public updatedMovie:any={};
	public showError : boolean = false;
	public selectedMovie : any;
	public togglebutton:boolean=false;

	constructor(private jsonApiService : JsonApiService) {
	}

	ngOnInit() {
	}


    // Add favourite movie to  database
    addToFavourite(movie) {
    	this.jsonApiService.addToFavourite(movie).subscribe((res) =>{
    		this.getFavourite();
    		Swal({
    			position: 'center',
    			type: 'success',
    			title: 'Movie Added Successfuly',
    			showConfirmButton: false,
    			timer: 2000
    		})
    		this.showError = false;
    	},(error:any)=>{
    		Swal({
  type: 'error',
  title: 'Oops...',
  text: 'Movie Already Added!',
})
    		// this.err.emit({
    		// 	'errMsg': this.errorMsg
    		// })
    		// this.showError = true;
    	})

    }


  // get data of favourite movies from database
  getFavourite() {
  	this.jsonApiService.getFavourite().subscribe((res) =>{
  		this.favMovies = res;
  		this.favArray.emit({
  			'favMovies': this.favMovies
  		});
  		this.showError = false;
  	},(error:any)=>{
  		this.errorMsg = error.statusText;
  		this.showError = true;
  	})
  }

  //Delete movie from database
  deleteMovie(movieId){
  	Swal({
  		title: 'Alert!',
  		text: "Are you sure to delete this movie from your favourite list permanently",
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonColor: '#3085d6',
  		cancelButtonColor: '#d33',
  		confirmButtonText: 'Yes, delete it!'
  	}).then((result) => {
  		if (result.value) {
  			this.jsonApiService.deleteMovie(movieId).subscribe(data=>{
  				this.getFavourite();
  			},(error:any)=>{
  				this.errorMsg = error.statusText;
  				this.showError = true;
  			})
  		}
  	})

  }

  // Set Movie details to update
  setMovie(movie) {
  	this.update.emit({
  		'movie': movie
  	})
  }

setUpdatedMovieList(event){
	console.log("action" + JSON.stringify(this.updateMovies));
 this.getFavourite();
}

}
