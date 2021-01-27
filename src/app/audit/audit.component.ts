import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import {UserService } from '@/_services';

@Component({templateUrl: 'audit.component.html',
            styleUrls: ['./audit.component.css']})
export class AuditComponent implements OnInit {

    public users : User[];
    constructor(private userServices : UserService){
    }
    
    ngOnInit(){
        this.userServices.getAll().subscribe(users => {
            this.users = users;
        })
    }
}