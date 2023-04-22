import { Component, OnInit } from '@angular/core';
import { IncidentsService } from 'src/app/services/incidents.service';
import { Incident } from 'src/app/Model/incident.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  incidents: Incident[] = [];
  
  constructor(private incidentService:IncidentsService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    const myGroup= this.auth.getUserGroup();
    //getting the incidents list on loading
    this.incidentService.getIncidents()
    .subscribe(
      (res)=>{
        //saving response to local state
        const filtered= res.filter((value:any)=>value.custcontact===myGroup);
        this.incidents= filtered;

      },
      (err)=>{
        console.log("Fetcing data error : ",err);
      }
    )
  }
  //handling the create part
  handleCreate(){
  //routing to edit page
  this.router.navigate(['/incidents/create']);
  }
  //handling the edit part
  handleEdit(value:Incident){
    //routing to edit page
    console.log("The id click: ",value);
    this.incidentService.setSelectedIncident(value);
    this.router.navigate(['/incidents/edit']);
  }
  //deleting the id 
  handleDelete(id:number){
    this.incidentService.deleteIncident(id)
    .subscribe(
      (res)=>{
        console.log("deleted..");
        //reloading the page
        this.ngOnInit();
      },
      (err)=>{
        console.log("Delete error: ",err);
      }
    )
  }

 
}
