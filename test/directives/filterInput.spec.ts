import {describe, xdescribe, it, inject, beforeEach, beforeEachProviders, async, fakeAsync, tick}
from '@angular/core/testing';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, provideForms, disableDeprecatedForms} from '@angular/forms';
import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';
import {Component, Output, EventEmitter} from '@angular/core';
import {DebounceInput} from '../../client/app/shared/directives';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs';

@Component({
    selector: 'container',
    template: ` <input-wrapper                               
                            css='test' 
                            [(ngModel)]="model">
                         </input-wrapper>`,
    directives: [DebounceInput, REACTIVE_FORM_DIRECTIVES]
})
export class Container {
    @Output() changes = new EventEmitter();
    _model;
    get model() {
        return this._model;
    };
    set model(value) {
        console.log(value)
        this._model = value;
        this.changed(value);
    }
    constructor() {
        this.model = 'test';
    }

    changed(value) {
        this.changes.emit(value);
    }
}

describe('Directive: input for filters panel', () => {
    let fixture: ComponentFixture<any>;
    beforeEachProviders(() => [
        REACTIVE_FORM_DIRECTIVES,
        disableDeprecatedForms(),
        provideForms(),
        TestComponentBuilder
    ]);


    beforeEach(inject([TestComponentBuilder], tcb => {
        return tcb
            .createAsync(Container)
            .then(f => {
                fixture = f;
                fixture.detectChanges();
            });
    }));

    xit('should set input value', done => {
        let container = fixture.debugElement.componentInstance;
        let input = fixture.debugElement.query(By.css("input")).nativeElement;
        expect(input).toBeDefined();
        expect(input.value).toBe('test');
        done();
    })
    xit('should have assigned class', () => {
        let input = fixture.debugElement.query(By.css(".test")).nativeElement;
        expect(input).toBeDefined();
    });
});
