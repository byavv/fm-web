import {
    Component, EventEmitter, Input,
    Output, ComponentFactoryResolver, ComponentMetadata,
    ComponentFactory, ViewContainerRef, OnInit, ReflectiveInjector
} from '@angular/core';
import * as filters from './filters';
import { allFilters } from './filters';
import { FilterModel } from '../../../../lib/models';
import { IFilterComponent } from '../../../../lib/';
@Component({
    selector: 'filterWrapper',
    template: `
    <div class='wrapper'>
        <ng-content></ng-content>
    </div>`,
    styles: [`
        .wrapper{
            margin-bottom: 10px;
        }        
    `]
})
export class FilterWrapperComponent implements OnInit {
    private _filter: FilterModel
    @Input()
    get filter(): FilterModel {
        return this._filter;
    }
    set filter(filter: FilterModel) {
        this._filter = filter
        if (this._componentInstance) {
            this._componentInstance.filterValue = filter.value;
        }
    }
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    private _componentInstance: IFilterComponent;

    constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }
    ngOnInit() {
        let filter = allFilters.find((key: any) => key.filterId === this.filter.id)
        if (filter) {
            /*  this.dcl.resolveComponentFactory()
                  .loadNextToLocation(filter, this.viewContainerRef)
                  .then((component) => {
                      this._componentInstance = component.instance;
                      this._componentInstance.filterValue = this.filter.value;
                      this._componentInstance.changed.subscribe((value) => {
                          this.changed.next(value);
                      });
                  });*/
            //    let factory = this.dcl.resolveComponentFactory<typeof filter>(new Type<typeof filter>)
       //     const metadata = new ComponentMetadata({
        //        selector: 'dynamic-html',
        //        template: this.src,
        //    });
        //    let factory = this.createComponentFactory()
            let injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainerRef.parentInjector);
       //     this.viewContainerRef
       //         .createComponent(factory, 0, injector, []);
        }
    }
    createComponentFactory(cmpClass: any, metadata: ComponentMetadata): ComponentFactory<any> {
        //   const cmpClass = class DynamicComponent { };
        const decoratedCmp = Component(metadata)(cmpClass);
        return this.resolver.resolveComponentFactory(decoratedCmp);
    }
}
