import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public idFolder!: number;
  public condition: boolean = false;
  public folder!: any;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private folderService: FolderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idFolder = this.route.snapshot.params.id;
    if (this.idFolder > 0) {
      this.condition = true;
      this.folderService.obtainFolder(this.idFolder).then((folder: any) => {
        this.folder = folder;
      });
    }
  }

  public logOut() {
    this.loginService.logout();
    return this.router.navigate(['/']);
  }
}
