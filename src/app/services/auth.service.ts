import { Injectable } from "@angular/core";
import { HttpHeaderResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../Model/user.model";

@Injectable({
    providedIn: 'root',
})

export class AuthService{
    apiUrlExpress= 'https://bbgincbackend.azurewebsites.net/';        //TODO
    headers= new HttpHeaders();
    
    constructor(private http:HttpClient){
        //do nothing
    }

    register(payload:any){
        return this.http.post(`${this.apiUrlExpress}register`,payload);
    }

    login(username:string,password:string):Observable<User>{
        return this.http.post(`${this.apiUrlExpress}login`,{username,password});
    }

    setLocalStorage(responseObj:any){
        //obj
        localStorage.setItem('token',responseObj.token);
    }

    setUserData(responseObj:any){
        localStorage.setItem('displayName',responseObj.user.displayName);
        localStorage.setItem('userGroup',responseObj.user.group);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('displayName');
        localStorage.removeItem('userGroup');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getDisplayName(){
        return localStorage.getItem('displayName');
    }

    getUserGroup(){
        return localStorage.getItem('userGroup');
    }

    isLoggedOut(){
        return !this.getToken();
    }
}