import store from '@/store';
import MessageResource from '@/types/MessageResource';
import ThreadResource from '@/types/ThreadResource';

export function threadTitleFor(thread: ThreadResource): string {
  const { participantUsernames } = thread.attributes;
  const { username } = store.state.user.attributes;
  const otherParticipants = participantUsernames.filter(pu => pu !== username);
  return otherParticipants.join(', ');
}

export function threadMessagesFor(thread: ThreadResource): MessageResource[] {
  return thread.relationships.messages.data.reduce((memo, { type, id }) => {
    const message = store.state.resources[type][id];
    if (message) memo.push(message);
    return memo;
  }, [] as MessageResource[]);
}
