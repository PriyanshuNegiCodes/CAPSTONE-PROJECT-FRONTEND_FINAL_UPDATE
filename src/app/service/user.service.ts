import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private router:Router) {}

  currentUser:any;

  baseUrl:string ="http://localhost:8085/api/v1/auth";
  baseurl2:string="http://localhost:8085/api/v1/user/";

  setUser(name:any){
   localStorage.setItem("name", name);
   this.currentUser=localStorage.getItem("name") 
  }
  getUser(){
    if(localStorage.getItem("name")){
      return localStorage.getItem("name");
    }
    return this.currentUser;
  }

  editUserProject(members: any, project: any){
    for(let i=0;i<members.length;i++){
      this.httpClient.get(`http://localhost:8085/api/v1/user/updateProject/${members[i]}/${project.name}`).subscribe(
        response=>{
            console.log(response);
        },
        error=>{
           console.log(error);    
        }
      )
     }  
 
  }
    updateUserProject(members: any, project: any) {

    const observables = members.value.map((member: any) =>
      this.httpClient.get(`http://localhost:8085/api/v1/user/updateProject/${member}/${project.name}`)
    );

    forkJoin(observables).subscribe(
      () => {
        console.log("All HTTP requests completed");

        console.log("now routing");
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/boardView']);
              });
      },
      (error) => {
        console.error("An error occurred during the HTTP requests:", error);
      }
    );
  }

  removeProjectOfMember(projectName:any, name:any){
    const observable=name.map((member:any)=>{
     
      this.httpClient.get(this.baseurl2+`removeProjectFromMember/${projectName}/${member}`).subscribe();
    })
    forkJoin(observable).subscribe(
      () => {
        console.log("All HTTP requests completed in Deletion");
      },
      (error) => {
        console.error("An error occurred during the HTTP requests:", error);
      }
    );
  }

  resetUser(){
    localStorage.removeItem("name")
    this.currentUser=undefined;
  }


  loginUser(loginData:any){
    return this.httpClient.post(this.baseUrl+"/login", loginData);
  }
  regsiterCustomer(userData:any){
    return this.httpClient.post(this.baseurl2+'register', userData );
    // return this.httpClient.post('http://localhost:8007/api/v1/user/register', userData );
  }

  findUserCustomer(name:string){
    return this.httpClient.get(this.baseUrl+"/findUser/"+`${name}`);
  }

  getProjectList(){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem("jwt")}` })
  
    return this.httpClient.get(this.baseurl2+"details", {headers})
  }
  
  deleteProject(projectName:string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem("jwt")}` })

    return this.httpClient.get(this.baseurl2+ `removeProject/${projectName}`, {headers})
  }

  getAllUsers(){
    return this.httpClient.get(this.baseUrl+ '/registeredUsers');
  }

  // removeProjectOfMember(projectName:any, name:any){
  //   return this.httpClient.get(this.baseurl2+`removeProjectFromMember/${projectName}/${name}`)
  // }

}