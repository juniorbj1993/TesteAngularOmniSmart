import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { user } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public env = environment
    private headers = new HttpHeaders(
        {'Access-Control-Allow-Origin':this.env.frontRef}
    );
    
    constructor(private http: HttpClient) { }
    
    public getAllUsers(): Observable<any> {
        return this.http.get(this.env.api + '/users', {observe: 'response',headers:this.headers});
    }
    public getUser(id:string): Observable<any> {
        return this.http.get(this.env.api + '/users/'+id, {observe: 'response',headers:this.headers});
    }
    public setUser(id:string, data:user): Observable<any> {
        return this.http.post(this.env.api + '/users/'+id,data,{observe: 'response',headers:this.headers});
    }
    public deleteUser(id:string): Observable<any> {
        return this.http.delete(this.env.api + '/users/'+id, {observe: 'response',headers:this.headers});
    }
    public updateUser(id:string,data:user): Observable<any> {
        return this.http.put(this.env.api + '/users/'+id, data,{observe: 'response',headers:this.headers});
    }
    public testApi(){
        return "passou";
    }
}