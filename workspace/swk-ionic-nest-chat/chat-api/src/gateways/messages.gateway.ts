import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {
  names: Map<string, string> = new Map();

  handleDisconnect(client) {
    client.server.emit('users-changed', {
      user: this.names[client.id],
      event: 'left',
    });
    this.names.delete(client.id);
  }

  @SubscribeMessage('set-name')
  setName(client, name: string) {
    this.names[client.id] = name;
    client.server.emit('users-changed', { user: name, event: 'joined' });
  }

  @SubscribeMessage('add-message')
  addMessage(client, message) {
    client.server.emit('message', {
      text: message.text,
      from: this.names[client.id],
      created: new Date(),
    });
  }
}
