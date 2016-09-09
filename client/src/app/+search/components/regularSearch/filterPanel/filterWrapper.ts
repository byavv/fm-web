import {
    Component, EventEmitter, Input,
    Output, ComponentFactoryResolver,
    ComponentMetadata,
    ComponentFactory, ViewContainerRef,
    OnInit, ReflectiveInjector,
    Compiler, NgModule, Type,
    ModuleWithComponentFactories,
} from '@angular/core';

import { SharedModule } from '../../../../shared';

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
    private _filter: FilterModel;
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

    constructor(private resolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private compiler: Compiler
    ) { }

    ngOnInit() {
        let filter = allFilters
            .find((key: any) => key.filterId === this.filter.id);
        if (filter) {
            this.compiler.clearCacheFor(filter);
            this.compiler
                .compileModuleAndAllComponentsAsync(this.createComponentModule(filter))
                .then((moduleWithFactories) => {
                    let factory = moduleWithFactories.componentFactories
                        .find((f) => f.componentType == filter);
                    let injector = ReflectiveInjector
                        .fromResolvedProviders([], this.viewContainerRef.parentInjector);
                    let componentRef = this.viewContainerRef
                        .createComponent(factory, 0, injector, []);
                    this._componentInstance = componentRef.instance;
                    this._componentInstance.filterValue = this.filter.value;
                    this._componentInstance.changed.subscribe((value) => {
                        this.changed.next(value);
                    });
                });
        }
    }

    createComponentModule(componentType: any): Type<any> {
        @NgModule({
            imports: [
                SharedModule,
            ],
            declarations: [
                componentType
            ],
        })
        class RuntimeComponentModule {
        }
        return RuntimeComponentModule;
    }
}
