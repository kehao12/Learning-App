import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '../pages/user/profile/profile.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ProfileComponent> {
    canDeactivate(component: ProfileComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
        }
        return true;
    }
}
