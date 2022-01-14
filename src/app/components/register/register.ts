import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * Ajoute un nouvel utilisateur
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;

    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    register() {
        if (this.ngForm.form.invalid) {
            return;
        }
        // TODO utiliser registrationService pour ajouter un nouvel utilisateur
        // TODO utiliser this.router.navigate pour rediriger l'utilisateur vers la page de login
    }
}
