import Message from '@/models/Message';
import User from '@/models/User';
import store from '@/store';
import MessageResource from '@/types/MessageResource';
import ThreadResource from '@/types/ThreadResource';
import UserResource from '@/types/UserResource';

export default class Thread {
  static find(id: string | number): ThreadResource | null {
    return store.state.resources.messageThread[id] || null;
  }

  static getParticipants(thread: ThreadResource): (UserResource | null)[] {
    const { data } = thread.relationships.participants;
    return data.map(({ id }) => User.find(id));
  }

  static getMessages(thread: ThreadResource): (MessageResource | null)[] {
    const { data } = thread.relationships.messages;
    return data.map(({ id }) => Message.find(id));
  }
}
