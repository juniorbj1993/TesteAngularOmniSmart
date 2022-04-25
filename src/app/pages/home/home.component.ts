import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ELEMENT_DATA: user[] = [
    {id: 1, name: 'Hydrogen', phone: "(88) 9 8111-7229", email: 'juniorbj1993@gmail.com'},
  ];
  displayedColumns: string[] = ['id', 'name', 'phone', 'email','action'];
  dataSource:Array<user> | undefined;
  title = 'Teste Angular OmniSmart';
  
  constructor(
    private router:  Router, 
    private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  go(){
    this.router.navigateByUrl("/user");
  }

  getUsers(){
    this.userService.getAllUsers().subscribe((data)=>{
      this.dataSource = data;
      console.log(data);
    },error=>{
      this.dataSource = this.ELEMENT_DATA;
      console.log(error);
    })
  }

  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe((data)=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  
  editarUser(id:string){
    this.router.navigateByUrl("/user/"+id);
  }

}
