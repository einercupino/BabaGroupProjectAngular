import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IncidentsService } from 'src/app/services/incidents.service';

@Component({
  selector: 'app-add-incidents',
  templateUrl: './add-incidents.component.html',
  styleUrls: ['./add-incidents.component.css']
})
export class AddIncidentsComponent implements OnInit {
  title!: string;
  //taking a form builder
  formBuilder: FormBuilder = new FormBuilder;

  incidentForm = this.formBuilder.group({
    state: '',
    customerName: '',
    priority:'',
    customerContact:'',
    type:'',
    createdBy:'',
    description:''
  });

  constructor(private route: ActivatedRoute,private incidentService:IncidentsService,private router:Router){  }
  //submitting the form to add incident data
  public submit() {
    console.log("New Incident data: ",this.incidentForm.value);

    const payload={
      state:this.incidentForm.value.state,
      priority: this.incidentForm.value.priority,
      type:this.incidentForm.value.type,
      custname:this.incidentForm.value.customerName,
      custcontact:this.incidentForm.value.customerContact,
      createdby:this.incidentForm.value.createdBy,
      resolved:new Date(),
      resolvedby:this.incidentForm.value.createdBy,
      description:this.incidentForm.value.description
    }

    this.incidentService.addIncidents(payload)
    .subscribe(
      (res)=>{
        console.log("Incident data: ",res);
        //navigating back to the incident page to view all incidents
        this.router.navigate(['/incidents']);
      },
      (err)=>{
        console.log("Fetcing data error : ",err);
      }
    )
  }
  //getting title
  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }

  //handle Cancel event
  handleCancel(){
    this.router.navigate(['/incidents']);
    }

}
