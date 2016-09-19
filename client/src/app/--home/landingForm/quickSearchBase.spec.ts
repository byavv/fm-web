/* tslint:disable */
import { ApplicationRef, Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { QuickSearchComponent } from "./quickSearchBase";
import { MakerApi, CarApi } from '../../shared/services';
import { SharedModule } from '../../shared';
import reducers from '../../core/reducers';
import { StoreModule } from '@ngrx/store';
import { APP_CORE_API_PROVIDERS } from '../../core';
import { Router, RouterModule } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { TestBed, async, inject } from '@angular/core/testing'
import { Store } from '@ngrx/store';
import { CatalogActions } from "../../core/actions";
import { AppState, getMakers, getCatalogReady } from "../../core/reducers";

@Component({
    selector: 'test-cmp',
    template: ''
})
class TestComponent { }
class MockRouter {
    navigate(value) { }
}

describe('COMPONENTS TESTS', () => {
    describe("Quich search component tests", () => {
        beforeEach(() => TestBed.configureTestingModule({
            imports: [
                RouterModule,        
                StoreModule.provideStore(reducers),               
                SharedModule
            ],
            providers: [
                { provide: Router, useClass: MockRouter },
                ...APP_CORE_API_PROVIDERS
            ],
            declarations: [
                TestComponent,
                QuickSearchComponent
            ]
        })
            .overrideComponent(TestComponent, {
                set: {
                    template: '<quickSearch></quickSearch>'
                }
            })
            .compileComponents()
        )

        beforeEach(inject([Router, MakerApi, CarApi], (router, makerApi, carApi) => {
            spyOn(router, "navigate");
            spyOn(carApi, "count").and.returnValue(Observable.of({ count: 42 }));
            spyOn(makerApi, 'getCarModels').and.returnValue(Observable.of([]));
        }));

        it('should init', async(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.innerHTML).toContain('Made by');
        }));

        it('should contain count', async(
            inject([Store, CatalogActions],
                (store: Store<AppState>, catalogActions: CatalogActions) => {

                    let fixture = TestBed.createComponent(QuickSearchComponent);

                    let beingTestedCompInst: QuickSearchComponent = fixture
                        .debugElement
                        .componentInstance;

                    beingTestedCompInst
                        .count$
                        .subscribe((value) => {
                            expect(value).toBe(42);
                            fixture
                                .whenStable()
                                .then(() => {
                                    let buttonDe = fixture.debugElement.query(By.css('.btn'));
                                    expect(buttonDe.nativeElement.innerHTML).toContain('Show 412');
                                })
                        });

                    //   beingTestedCompInst.ready$                              
                    //        .do(() => { console.log('ready') })
                    //        .subscribe(() => { })

                    store.dispatch(catalogActions.setAppLookups({
                        makers: [],
                        engineTypes: []
                    }));
                })
        ));
    });
});
