import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://moviesdatabase.p.rapidapi.com/titles?year=1999&limit=50';

  constructor() { }

  getMovies(): Observable<any[]> {
    const headers = new Headers();
    headers.append('X-RapidAPI-Key', '28beb357e5msh502d8b54ed40ba5p158a9djsnadc07bfed53c');
    headers.append('X-RapidAPI-Host', 'moviesdatabase.p.rapidapi.com');

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    return new Observable<any[]>(observer => {
      fetch(this.apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data.results);
          observer.complete();
        })
        .catch(error => {
          console.error('Error:', error);
          observer.error(error);
        });
    });
  }
}