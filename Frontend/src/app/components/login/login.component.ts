import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  regiForm: FormGroup;
  FirstName = '';
  LastName = '';
  Address = '';
  DOB: Date = null;
  Gender = '';
  Blog = '';
  Email = '';
  IsAccepted = 0;

  constructor(private formBuilder: FormBuilder) {
    // To initialize FormGroup
    this.regiForm = formBuilder.group({
      'FirstName' : [null, Validators.required],
      'LastName' : [null, Validators.required],
      'Address' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'DOB' : [null, Validators.required],
      'Gender': [null, Validators.required],
      'Blog': [null, Validators.required],
      'Email': [null, Validators.compose([Validators.required, Validators.email])],
      'IsAccepted': [null]
    });
  }

  ngOnInit() {
  }

  // On Change event of Toggle Button
  onChange(event: any) {
    if (event.checked === true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }


}
