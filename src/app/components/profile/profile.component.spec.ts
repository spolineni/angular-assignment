import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserProfile']);
  userServiceSpy.getUserProfile.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: UserService, useValue: userServiceSpy}
      ]       
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile details on load', () => {
    component.ngOnInit();
    expect(userServiceSpy.getUserProfile).toHaveBeenCalled();
  })

  it('should logout', () => {
    spyOn(router, 'navigate').and.callThrough();
    let logoutBtn = fixture.debugElement.query(By.css('button'));
    logoutBtn.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledOnceWith(['user-registration']);
  })


});
