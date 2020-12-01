import UserBuddy from '@/models/UserBuddy';
import store from '@/store';
import UserBuddyResource from '@/types/UserBuddyResource';
import UserResource from '@/types/UserResource';

export default class User {
  static find(id: string | number): UserResource | null {
    return store.state.resources.user[id] || null;
  }

  static getUserBuddies(user: UserResource): (UserBuddyResource | null)[] {
    const { data } = user.relationships.userBuddies;
    return data.map(({ id }) => UserBuddy.find(id));
  }

  static getBuddies(user: UserResource): (UserResource | null)[] {
    const { data } = user.relationships.buddies;
    return data.map(({ id }) => User.find(id));
  }
}
