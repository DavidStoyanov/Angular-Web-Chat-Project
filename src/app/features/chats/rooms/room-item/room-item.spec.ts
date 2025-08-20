import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomItem } from './room-item';

describe('RoomItem', () => {
  let component: RoomItem;
  let fixture: ComponentFixture<RoomItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
