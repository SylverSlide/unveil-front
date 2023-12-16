import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private echo: Echo;
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher.key,
      cluster: environment.pusher.cluster,
      encrypted: true,
    });
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { message });
  }

  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.echo.channel('unveil').listen('.MessageSent', (message: any) => {
        observer.next(message);
      });
    });
  }

  fetchMessages(questionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${questionId}`);
  }
}
