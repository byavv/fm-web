import { Component, Output, Input, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FilterController } from '../../../../../services/';
import { Subscription } from "rxjs";

@Component({
    selector: 'searchOptions',
    template: require("./searchOptions.html"),
    styles: [
        `       
        .dropdown-menu{
            min-width: 0;
            width:100%!important;
        }       
        .options > * {
             font-size: 0.9em;    
        }
        .options .dropdown-item {
            padding-left: 10px;
        }          
        `
    ]
})
export class SearchOptionsComponent {
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    @Input()
    limit: number;
    sortType: string;
    @Input()
    get sort(): string {
        return this.sortType + (this.up ? '+' : '-');
    }
    set sort(value) {
        if (value) {
            if (value.substr(-1) == '+') {
                this.up = true;
            } else {
                this.up = false;
            }
            this.sortType = value.replace(/[+-]/, '');
        }
    }
    up: boolean;
    sortTypes: any[] = [
        'price',
        'milage',
        'year'
    ];
    limits: any[] = [
        { name: "10", value: 10 },
        { name: "20", value: 20 },
        { name: "50", value: 50 }
    ];

    constructor(private filterController: FilterController) { }

    changeSortBy() {
        this.up = !this.up;
        this.changed.next({ sort: this.sort });
    }
    changeSortType(value) {
        this.sortType = value;
        this.changed.next({ sort: this.sort });
    }

    limitChanged(value) {
        this.changed.next({ limit: value });
    }
}
