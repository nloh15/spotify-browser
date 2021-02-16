import { Component, Input, OnInit } from '@angular/core';
import { TrackFeature } from '../../data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() name:string;
  @Input() color:string;
  @Input() percent:string;
  @Input() percentageStr:string;

  constructor() { }

  ngOnInit() {
  }

}
