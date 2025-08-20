import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBoard } from './room-board';

describe('RoomBoard', () => {
  let component: RoomBoard;
  let fixture: ComponentFixture<RoomBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
