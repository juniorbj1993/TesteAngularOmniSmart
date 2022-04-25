import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  idUser:number|undefined;
  public form!: FormGroup;
  action:string = "CADASTRAR";
  
  userData: user = {id: 1, name: 'Hydrogen', phone: "(88) 9 8111-7229", email: 'juniorbj1993@gmail.com'};

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService:UserService) { }
  
  createForm(){
    this.form = this.formBuilder.group({
      id: [this.userData.id],
      name: [this.userData.name, [Validators.required]],
      phone: [this.userData.phone, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      password: [this.userData.password, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.createForm()
    if(this.activatedRoute.snapshot.params.id){
      this.idUser = this.activatedRoute.snapshot.params.id;
      this.action = "ALTERAR"
      this.getUser(this.activatedRoute.snapshot.params.id);
    }else{
      this.idUser = undefined;
      this.action = "CADASTRAR"
    }
    
  }

  realizarAcao(){
    let dataSend = this.form.value;
    if(this.activatedRoute.snapshot.params.id){
      this.userService.updateUser(this.activatedRoute.snapshot.params.id,dataSend).subscribe((data)=>{
        console.log(data)
      },error => {
        console.log(error)
      })
    }else{
      this.userService.setUser(this.activatedRoute.snapshot.params.id,dataSend).subscribe((data)=>{
        console.log(data)
      },error => {
        console.log(error)
      })
    }
  }

  getUser(id:string){
    this.userService.getUser(id).subscribe((data)=>{
      this.userData = data;
    },error => {
      console.log(error)
    })
  }
}
