import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  messages = [];
  name = '';
  message = '';

  constructor(private route: ActivatedRoute, private socket: Socket, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params.name;
    });

    this.socket.on('message', message => this.messages.push(message));

    this.socket.on('users-changed', data => {
      const user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
