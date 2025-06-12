import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({ template: ''})
export abstract class ReactiveComponent implements OnDestroy {
    protected onDestroy$: Subject<void> = new Subject();

    public ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
