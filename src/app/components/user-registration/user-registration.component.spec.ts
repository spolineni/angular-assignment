import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
  userServiceSpy.registerUser.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [{provide: UserService, useValue: userServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check form elements created', () => {
    const inputElements = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('input');
    const textElements = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('textarea');
    expect(inputElements.length).toEqual(3);
    expect(textElements.length).toEqual(1);
  });

  it('check form field validations', () => {
    const nameElement = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('input')[0];
    const nameFromElement = component.registerForm.get('name');
    const emailElement = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('input')[0];
    const emailFromElement = component.registerForm.get('email');
    const passwordElement = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('input')[0];
    const passwordFromElement = component.registerForm.get('password');
    const textareaElement = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('textarea')[0];
    const textareaFromElement = component.registerForm.get('bio');
    expect(nameElement.value).toEqual(nameFromElement?.value);
    expect(nameFromElement?.errors).not.toBeNull();
    expect(nameFromElement?.errors?.['required']).toBeTruthy();
    expect(emailElement.value).toEqual(emailFromElement?.value);
    expect(emailFromElement?.errors).not.toBeNull();
    expect(emailFromElement?.errors?.['required']).toBeTruthy();
    expect(passwordElement.value).toEqual(passwordFromElement?.value);
    expect(passwordFromElement?.errors).not.toBeNull();
    expect(passwordFromElement?.errors?.['required']).toBeTruthy();
    expect(textareaElement.value).toEqual(textareaFromElement?.value);
    expect(textareaFromElement?.errors).not.toBeNull();
    expect(textareaFromElement?.errors?.['required']).toBeTruthy();

    component.registerForm.setValue({
      'name': 'king Julian', 
      'email': 'testemail',
      'password': '12131234',
      'bio': 'I like to move it move it'
      
    });
    expect(component.registerForm.valid).toEqual(false);
    expect(emailFromElement?.errors?.['email']).toBeTruthy();
  });

  it('should be valid when form is valid', () => {
    component.registerForm.setValue({
      'name': 'king Julian', 
      'email': 'king@gmail.com', 
      'password': '12131234',
      'bio': 'I like to move it move it'
    });

    expect(component.registerForm.valid).toEqual(true);
  });

  it('should call registerUser function on form submit', () => {
    //Since we are calling a mock GET API. Not testing for form data. Just testing if service method is called or not.
    spyOn(component, 'regiterUser');
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.regiterUser).toHaveBeenCalled();
  });

  it('should allow user to sign up', () => {
    component.regiterUser();
    expect(userServiceSpy.registerUser).toHaveBeenCalled();
  })

});
