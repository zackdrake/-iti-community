import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';
import { UserStore } from '../../user.store';
import { UserQueries } from '../../services/user.queries';
import {NzMessageService} from "ng-zorro-antd/message";
let oldusername = '';

export class UserProfileForm {
  id: string;
  username: string;
  photoUrl?: string;
  _file?: File;
  user: User;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.photoUrl = user.photoUrl;
    this.user = user;
  }

  get file() {
    return this._file;
  }

  set file(file: File | undefined) {
    this._file = file;
    if (file) {
      this.toBase64(file).then(s => {
        this.photoUrl = s;
      })
    }
  }

  toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  hasChanged(): boolean {
    return !!this.file || this.username !== this.user.username
  }
}

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.less']
})
export class UserProfileModalComponent implements OnInit {
  @Input()
  user: User;

  @ViewChild("f")
  form: NgForm;
  supportedTypes = ".jpg, .png";
  isVisible: boolean = false;
  model: UserProfileForm;

  constructor(private userService: UserService, private userQueries: UserQueries, private nzMessageService: NzMessageService, private sanitizer: DomSanitizer, private store: UserStore) {

  }

  ngOnInit(): void {
    this.model = new UserProfileForm(this.user);
  }

  get photoUrl(): SafeResourceUrl {
    this.store.get(s => this.model.photoUrl = s.user?.photoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.model.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg");
  }

  async onOk() {
    // TODO vérifier si le formulaire est valide
    if (await this.userQueries.exists(this.model.username) && this.model.username != oldusername ) {
      this.nzMessageService.error("Identifiant déjà utilisé");

      return;
    }

    if (this.model.hasChanged()) {
      // TODO mettre à jour l'utilisateur via le service

      var person = {
        id: this.model.id,
        username: this.model.username,
        photo:this.model._file
      };
      this.userService.update(person);

    }

    this.close();
  }

  onFileUpload = (file: File) => {
    this.model.file = file;
    return false;
  }

  onCancel() {
    this.close();
  }

  open() {
    oldusername = this.model.username;
    this.model = new UserProfileForm(this.user);
    this.form.resetForm(this.model);
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
