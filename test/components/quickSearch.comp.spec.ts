import {provide, ApplicationRef, Component, PLATFORM_DIRECTIVES} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, provideForms, disableDeprecatedForms} from '@angular/forms';
import {it, xit, describe, expect, afterEach,
    beforeEach, async, inject, beforeEachProviders, addProviders} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {QuickSearchComponent} from "../../client/app/quickSearch/components/quickSearchBase";
import { APP_SERVICES_PROVIDERS, AppController, Api } from '../../client/app/shared/services';
import {setBaseTestProviders} from '@angular/core/testing';
import { MockRouter, MockAppController, MockApiService } from '../helpers/mocks';
import {Router} from '@angular/router';
import {Subject, Observable} from 'rxjs';


import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';

@Component({
    selector: 'test-cmp',
    directives: [QuickSearchComponent],
    template: '<div><quickSerch></quickSerch></div>'
})
class TestComponent { }

describe('COMPONENTS TESTS', () => {
    let builder: TestComponentBuilder;
    let componentFxt: ComponentFixture<QuickSearchComponent>;

    describe("Quich search component tests", () => {
        beforeEach(() => {
            addProviders([
                REACTIVE_FORM_DIRECTIVES,
                APP_SERVICES_PROVIDERS,
                provide(Router, { useFactory: () => new MockRouter() }),
                provide(AppController, { useFactory: () => new MockAppController() }),
                provide(Api, { useClass: MockApiService }),
                disableDeprecatedForms(),
                provideForms()
            ])
        });
        beforeEach(inject([TestComponentBuilder], (tcb) => {
            builder = tcb;
        }));
        beforeEach(inject([AppController, Router, Api], (appController, router, apiBackEnd) => {
            spyOn(router, "navigate");
            spyOn(apiBackEnd, "getCarsCount").and.returnValue(Observable.of({ count: 42 }));
            spyOn(apiBackEnd, 'getMakerModels').and.returnValue(Observable.of([]));

        }));
        beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(QuickSearchComponent)
                .then(fixture => {
                    componentFxt = fixture;
                  //  fixture.detectChanges();
                });
        }));

        xit('app should initialize', async(inject([AppController], (appController) => {
            var compiled = componentFxt.debugElement.nativeElement;
            appController.init$.subscribe(value => {
                expect(value.makers).toBeDefined();
            });
            componentFxt.debugElement.componentInstance.count$.subscribe((value) => {
                expect(value).toBe(42);
                componentFxt.whenStable().then(() => {
                    expect(componentFxt.componentInstance.carMakers[0].name).toBe('gravitsapa_motors');
                    expect(compiled.querySelector('#maker')
                        .options.item(1).innerHTML).toBe('gravitsapa_motors');
                    expect(compiled.querySelector('button').innerText).toBe('Show 42');
                })//.detectChanges();

            })
            appController.start();
        })));

        xit('should require cars models when maker change', async(inject([AppController, Api], (appController, apiBackend) => {
            var compiled = componentFxt.debugElement.nativeElement;

            appController.init$.subscribe(value => {
                //   let select = componentFxt.debugElement.query(By.css("select#maker"));
                //   dispatchEvent(select.nativeElement, "change");
                componentFxt.debugElement.componentInstance.carFormModel.maker = value.makers[0];
                componentFxt.detectChanges();
                componentFxt.whenStable().then(() => {
                    expect(apiBackend.getMakerModels).toHaveBeenCalledWith(1)
                })
            });
            appController.start();
        })));
        xit('should submit and build search request params', async(inject([Router, Api], (router, apiBackend) => {
            componentFxt.debugElement.componentInstance.submit();
            expect(router.navigate).toHaveBeenCalledWith(['SearchList', {}]);
        })));
    });
});