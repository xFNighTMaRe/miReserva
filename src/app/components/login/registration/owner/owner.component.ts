import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';
import { UserOwner } from '../../../../models/user-owner';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { Users } from 'src/app/models/users';
import { SimpleAlertComponent } from '../../../modals/simple-alert/simple-alert';
import { ServiceRouterService } from '../../../../shared/service-router.service';

@Component({
  selector: 'app-registration-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  public users:Users = new Users(null,null,null,null,null);
  public userOwner:UserOwner = new UserOwner(null,null,null,null,null)
  public acept:boolean = null;
  constructor(
    private serviceRegistration: ServiceRegistrationService,
    private serviceLogin:ServiceLoginService,
    public serviceRouter:ServiceRouterService,
    public dialog:MatDialog,
    ) {
   }
onSubmit(form:any){
  const owner = {
    "owner_id": null,
    "cif": form.value.cif,
    "name": form.value.name,
    "surname": form.value.surname,
    "photo": null,
    "mail":form.value.email,
    "password":form.value.password
  }
  this.serviceRegistration.registrationOwner(owner)
  .subscribe((data:any)=>{console.log(data)
    if(data.control) {
      localStorage.setItem('users', JSON.stringify(new Users (
        null,
        data.data,
        null,
        form.value.mail,
        form.value.password
      )));
      localStorage.setItem('userOwner', JSON.stringify(new UserOwner(
        data.data,
        form.value.cif,
        form.value.name,
        form.value.surname,
        null
      )));
      this.serviceRouter.routerOwner()
    }
    else {
    const dialogRef = this.dialog.open(SimpleAlertComponent);
      dialogRef.componentInstance.mensaje="Ese correo ya está registrado, intentalo de nuevo";
      const email:any=document.getElementById("profile")
      email.value=null;
      const password:any=document.getElementById("password")
      password.value=null;
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
  });}})}
 ngOnInit(): void {
}}