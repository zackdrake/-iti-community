import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserQueries } from '../../services/user.queries';
import {NzMessageService} from "ng-zorro-antd/message";

class UserRegistrationFormModel {
  username = '';
  password = '';
  confirmPassword = '';
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('f')
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries: UserQueries,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    if (this.model.username == null) {
      this.nzMessageService.error("Identifiant requis");
      return;
    }
    if (this.model.password == null) {
      this.nzMessageService.error("Mot de passe requis");
      return;
    }
    if (await this.userQueries.exists(this.model.username)) {
      this.nzMessageService.error("Identifiant déjà utilisé");

      return;
    }
    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      this.nzMessageService.error("Les mots de passes ne correspondent pas");
      return;
    }


    // TODO Enregistrer l'utilisateur via le UserService
    this.userService.register(this.model.username , this.model.password);
    this.goToLogin();
  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login']);
  }
}
