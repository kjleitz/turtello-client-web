import User from '@/models/User';
import store from '@/store';
import MessageResource from '@/types/MessageResource';
import UserResource from '@/types/UserResource';

export default class Message {
  static find(id: string | number): MessageResource | null {
    return store.state.resources.message[id] || null;
  }

  static getSender(message: MessageResource): UserResource | null {
    return User.find(message.relationships.sender.data.id);
  }

  static getReceiver(message: MessageResource): UserResource | null {
    return User.find(message.relationships.receiver.data.id);
  }
}
