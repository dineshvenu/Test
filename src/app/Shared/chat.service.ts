import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat :string;
  constructor(private http:HttpClient) { }
  getChatResponse(id:string):Observable<string>
  { 
    return this.http.get<string>('https://localhost:44385/api/SubCategory/ChateData?chat='+id);
  }
  public getUsers(id:string):string {
     this.http.get<string>('https://localhost:44385/api/SubCategory/ChateData?chat='+id)
    .subscribe((data: any) => {
      console.log("data");
      console.log(data["chat"]);
      this.chat=data["chat"];
      console.log(this.chat);
    });    
       return this.chat;
 }
 public getChatResponse1(id:string) {
  return this.http.get('https://localhost:44385/api/SubCategory/ChateData?chat='+id).toPromise();
}
}
