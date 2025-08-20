import { TestBed } from '@angular/core/testing';

import { ChatMessageService } from './chat-message-service';

describe('ChatMessage', () => {
  let service: ChatMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
