import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { Car } from '../../../../../../lib/models';

@Component({
    selector: 'carItem',
    template: require("./carListItem.html"),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require('./component.scss')]
})
export class CarItemComponent {
    @Input()
    car: Car;
    constructor() { }
}
