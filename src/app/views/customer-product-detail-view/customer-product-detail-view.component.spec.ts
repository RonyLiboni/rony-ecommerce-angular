import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductDetailViewComponent } from './customer-product-detail-view.component';

describe('CustomerProductDetailViewComponent', () => {
  let component: CustomerProductDetailViewComponent;
  let fixture: ComponentFixture<CustomerProductDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerProductDetailViewComponent]
    });
    fixture = TestBed.createComponent(CustomerProductDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
