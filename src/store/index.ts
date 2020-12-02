import { toArray } from '@/concerns/utilities';
import authios from '@/concerns/authios';
import MessageResource, { MessageDocument, MessagesDocument } from '@/types/MessageResource';
import Theme from '@/types/Theme';
import ThreadResource, { ThreadDocument, ThreadsDocument } from '@/types/ThreadResource';
import UserBuddyResource, { UserBuddiesDocument, UserBuddyDocument } from '@/types/UserBuddyResource';
import UserResource, { UserDocument, UsersDocument } from '@/types/UserResource';
import Vue from 'vue';
import Vuex from 'vuex';

// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
// TODO: remove
console.log(authios);

Vue.use(Vuex);

type AnyResource = MessageResource
  | ThreadResource
  | UserResource
  | UserBuddyResource;

type AnyDocument = MessageDocument
  | MessagesDocument
  | ThreadDocument
  | ThreadsDocument
  | UserDocument
  | UsersDocument
  | UserBuddyDocument
  | UserBuddiesDocument;

const dummyUser = (): UserResource => ({
  id: '0',
  type: 'user',
  attributes: {
    username: '[logged out]',
    role: 'peasant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  relationships: {
    userBuddies: {
      data: [],
    },
    buddies: {
      data: [],
    },
  },
});

export default new Vuex.Store({
  state: {
    user: dummyUser(),
    resources: {
      message: {} as { [id: string]: MessageResource },
      messageThread: {} as { [id: string]: ThreadResource },
      user: {} as { [id: string]: UserResource },
      userBuddy: {} as { [id: string]: UserBuddyResource },
    },
    theme: Theme.LIGHT,
  },

  mutations: {
    addResource(state, resource: AnyResource): void {
      const { id, type } = resource;
      state.resources[type][id] = resource;
    },

    setTheme(state, { theme }: { theme: Theme }): void {
      state.theme = theme;
    },

    setUser(state, user: UserResource): void {
      state.user = user;
    },
  },

  actions: {
    addResource({ commit }, resource: AnyResource): void {
      commit('addResource', resource);
    },

    addResourcesFromDocument({ commit }, document: AnyDocument): void {
      const { data, included } = document;

      if (data) {
        toArray(data).forEach(resource => commit('addResource', resource));
      }

      if (included) {
        toArray(included).forEach(resource => commit('addResource', resource));
      }
    },

    setTheme({ commit }, { theme }: { theme: Theme }): void {
      commit('setTheme', { theme });
    },

    setUser({ commit }, user: UserResource): void {
      commit('setUser', user);
    },

    // fetchRelationships({ commit }, resource: AnyResource): Promise<void> {
    //   const { relationships } = resource;
    //   if (!relationships) return Promise.resolve();
    //   const relationshipThings = Object.values(relationships) as Relationship[];
    //   relationshipThings.forEach
    // },

    fetchMessages({ dispatch }): Promise<void> {
      return authios.get<MessagesDocument>('/messages').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchMessage({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return authios.get<MessageDocument>(`/messages/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThreads({ dispatch }, { userId }: { userId: number | string }): Promise<void> {
      return authios.get<ThreadsDocument>(`/users/${userId}/message_threads`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThread({ dispatch }, { userId, buddyId }: { userId: number | string; buddyId: number | string }): Promise<void> {
      return authios.get<ThreadDocument>(`/users/${userId}/message_threads/${buddyId}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUsers({ dispatch }): Promise<void> {
      return authios.get<UsersDocument>('/users').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUser({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return authios.get<UserDocument>(`/users/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUserBuddies({ dispatch }): Promise<void> {
      return authios.get<UserBuddiesDocument>('/user_buddies').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUserBuddy({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return authios.get<UserBuddyDocument>(`/user_buddies/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    signIn({ dispatch, commit }, creds: { username: string; password: string }): Promise<void> {
      return authios.post<UserDocument>('/sign_in', { user: creds }).then((response) => {
        const userDocument = response.data;
        const userResource = userDocument.data;
        commit('setUser', userResource);
        return dispatch('addResourcesFromDocument', userDocument);
      });
    },

    signUp({ dispatch, commit }, deets: { username: string; password: string }): Promise<void> {
      return authios.post<UserDocument>('/sign_up', { user: deets }).then((response) => {
        const userDocument = response.data;
        const userResource = userDocument.data;
        commit('setUser', userResource);
        return dispatch('addResourcesFromDocument', userDocument);
      });
    },
  },

  getters: {
    signedIn(state): boolean {
      const { id } = state.user;
      return !!id && id !== '0';
    },

    messages(state): MessageResource[] {
      return Object.values(state.resources.message);
    },

    threads(state): ThreadResource[] {
      return Object.values(state.resources.messageThread);
    },

    users(state): UserResource[] {
      return Object.values(state.resources.user);
    },

    userBuddies(state): UserBuddyResource[] {
      return Object.values(state.resources.userBuddy);
    },
  },
});
