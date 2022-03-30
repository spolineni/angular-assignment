import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return profile details', (done: DoneFn) => {
    service.getUserProfile().subscribe(
      customers => {
        expect(customers).not.toBeNull();
        done();
      },
      done.fail
    );
  });

  it('should return registration status', (done: DoneFn) => {
    service.registerUser().subscribe(
      status => {
        expect(status).not.toBeNull();
        done();
      },
      done.fail
    );
  });
});
