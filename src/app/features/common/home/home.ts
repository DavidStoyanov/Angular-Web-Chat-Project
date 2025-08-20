import { Component } from '@angular/core';
import { Chats } from '../../chats/chat-wrap/chats';

@Component({
  selector: 'app-home',
  imports: [Chats],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
