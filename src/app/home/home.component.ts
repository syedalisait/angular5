import { Component, OnInit } from '@angular/core';
import { trigger, stagger, transition, query, style, animate} from '@angular/animations'
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
  	trigger('goals', [
      transition('* => *', [
  			query(':enter', animate(6000, style({ opacity: 1 })),
  			)
  		])
  	])
  ]
})
export class HomeComponent implements OnInit {
	itemCount: number = 4;
	goalText: string = '';
	goals = [];
	constructor(private _data: DataService) { }

	ngOnInit() {
    this._data.goal.subscribe( res => this.goals = res);
    this.itemCount = this.goals.length;

    this._data.changeGoal(this.goals);
	}

	addItem() {
		this.goals.push(this.goalText);
		this.goalText = '';
		this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
	}

	removeItem(i) {
		this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
	}

}
