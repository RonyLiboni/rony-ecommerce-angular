import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductSearchComponent } from './customer-product-search.component';

describe('CustomerProductSearchComponent', () => {
  let component: CustomerProductSearchComponent;
  let fixture: ComponentFixture<CustomerProductSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerProductSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
