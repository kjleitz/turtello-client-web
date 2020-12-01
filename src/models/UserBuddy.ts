import store from '@/store';
import UserBuddyResource from '@/types/UserBuddyResource';

export default class UserBuddy {
  static find(id: string | number): UserBuddyResource | null {
    return store.state.resources.userBuddy[id] || null;
  }
}
