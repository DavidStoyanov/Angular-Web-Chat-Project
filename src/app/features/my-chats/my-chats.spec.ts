import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChats } from './my-chats';

describe('MyChats', () => {
  let component: MyChats;
  let fixture: ComponentFixture<MyChats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyChats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyChats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
