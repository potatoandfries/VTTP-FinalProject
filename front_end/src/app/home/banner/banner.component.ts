
import { Component, OnInit } from '@angular/core';
import { config } from '../../configurations/local';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerUrl!: string;

  constructor() {
  }

  ngOnInit() {
    this.bannerUrl = config.bannerUrl;
  }
}
