import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatRoomPage } from './chat-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: ':name', component: ChatRoomPage }]),
  ],
  declarations: [ChatRoomPage],
})
export class ChatRoomPageModule {}
