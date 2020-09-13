import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-asset',
  templateUrl: './portfolio-asset.component.html',
  styleUrls: ['./portfolio-asset.component.css']
})
export class PortfolioAssetComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  logoUrl: string;

  @Input()
  symbol: string;

  @Input()
  quantity: number;

  @Input()
  price: number;

  @Input()
  amount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
