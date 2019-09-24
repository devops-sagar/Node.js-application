import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!localStorage.getItem('email') || localStorage.getItem('email') === undefined) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}
