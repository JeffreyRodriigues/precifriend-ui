import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasListComponent } from './receitas-list.component';

describe('ReceitasListComponent', () => {
  let component: ReceitasListComponent;
  let fixture: ComponentFixture<ReceitasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
