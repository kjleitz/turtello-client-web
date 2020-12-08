import { toArray } from '@/concerns/utilities';
import authios, { refreshAuth } from '@/concerns/authios';
import MessageResource, { MessageDocument, MessagesDocument } from '@/types/MessageResource';
import Theme from '@/types/Theme';
import ThreadResource, { ThreadDocument, ThreadsDocument } from '@/types/ThreadResource';
import UserBuddyResource, { UserBuddiesDocument, UserBuddyDocument } from '@/types/UserBuddyResource';
import UserResource, { UserDocument, UsersDocument } from '@/types/UserResource';
import Vue from 'vue';
import Vuex from 'vuex';
import { Resource } from '@/types/JsonApi';
import _ from 'underscore';
// import qs from 'qs';
// import VuexPersistence, { AsyncStorage } from 'vuex-persist';
// import localforage from 'localforage';

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

type AnyResourceType = AnyResource['type'];

interface RootState {
  authChecked: boolean;
  user: UserResource;
  thread: ThreadResource;
  resources: {
    message: { [id: string]: MessageResource };
    messageThread: { [id: string]: ThreadResource };
    user: { [id: string]: UserResource };
    userBuddy: { [id: string]: UserBuddyResource };
  };
  theme: Theme;
}

const dummyUser = (): UserResource => ({
  id: '0',
  type: 'user',
  attributes: {
    username: '[logged out]',
    role: 'peasant',
    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),
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

const dummyThread = (): ThreadResource => ({
  id: '0',
  type: 'messageThread',
  attributes: {
    slug: '',
    participantUsernames: [],
    latestMessageBody: '',
    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),
  },
  relationships: {
    messages: {
      data: [],
    },
    participants: {
      data: [],
    },
  },
});

const freshState = (): Omit<RootState, 'theme'> => ({
  authChecked: false,
  user: dummyUser(),
  thread: dummyThread(),
  resources: {
    message: {} as { [id: string]: MessageResource },
    messageThread: {} as { [id: string]: ThreadResource },
    user: {} as { [id: string]: UserResource },
    userBuddy: {} as { [id: string]: UserBuddyResource },
  },
});

// const vuexLocal = new VuexPersistence<RootState>({
//   storage: localforage as AsyncStorage,
//   asyncStorage: true,
// });

export default new Vuex.Store({
  // plugins: [
  //   vuexLocal.plugin,
  // ],

  state: {
    ...freshState(),
    theme: Theme.LIGHT,
  },

  mutations: {
    resetState(state): void {
      Object.assign(state, freshState());
    },

    addResource(state, resource: AnyResource): void {
      const { id, type } = resource;
      const { resources } = state;
      const existing = resources[type];
      state.resources = {
        ...resources,
        [type]: {
          ...existing,
          [id]: resource,
        },
      };
      // state.resources[type][id] = resource;
    },

    setTheme(state, { theme }: { theme: Theme }): void {
      state.theme = theme;
    },

    setUser(state, user: UserResource): void {
      state.user = user;
    },

    setThread(state, thread: ThreadResource): void {
      state.thread = thread;
    },

    setAuthChecked(state, { checked }: { checked: boolean }): void {
      state.authChecked = checked;
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

    setThread({ commit }, thread: ThreadResource): void {
      commit('setThread', thread);
    },

    setAuthChecked({ commit }, { checked }: { checked: boolean }): void {
      commit('setAuthChecked', { checked });
    },

    // fetchRelationships({ commit }, resource: AnyResource): Promise<void> {
    //   const { relationships } = resource;
    //   if (!relationships) return Promise.resolve();
    //   const relationshipThings = Object.values(relationships) as Relationship[];
    //   relationshipThings.forEach
    // },

    fetchMessages({ dispatch }, params: { ids?: (string | number)[]; include?: string[] } = {}): Promise<void> {
      return authios.get<MessagesDocument>('/messages', { params }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchMessage({ dispatch }, { id, include }: { id: number | string; include?: string[] }): Promise<void> {
      return authios.get<MessageDocument>(`/messages/${id}`, { params: { include } }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThreads({ dispatch }, params: { ids?: (string | number)[]; include?: string[] } = {}): Promise<void> {
      return authios.get<ThreadsDocument>(`/message_threads`, { params }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThreadsForUser({ dispatch }, { userId, include }: { userId: number | string; include?: string[] }): Promise<void> {
      return authios.get<ThreadsDocument>(`/users/${userId}/message_threads`, { params: { include } }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThread({ dispatch }, { id, include }: { id: number | string; include?: string[] }): Promise<void> {
      return authios.get<ThreadDocument>(`/message_threads/${id}`, { params: { include } }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchThreadForUser({ dispatch }, { userId, buddyId, include }: { userId: number | string; buddyId: number | string; include?: string[] }): Promise<void> {
      return authios.get<ThreadDocument>(`/users/${userId}/message_threads/${buddyId}`, { params: { include } }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUsers({ dispatch }, params: { ids?: (string | number)[]; include?: string[] } = {}): Promise<void> {
      return authios.get<UsersDocument>('/users', { params }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUser({ dispatch }, { id, include }: { id: number | string; include?: string[] }): Promise<void> {
      return authios.get<UserDocument>(`/users/${id}`, { params: { include } }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUserBuddies({ dispatch }, params: { ids?: (string | number)[]; include?: string[] } = {}): Promise<void> {
      return authios.get<UserBuddiesDocument>('/user_buddies', { params }).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      });
    },

    fetchUserBuddy({ dispatch }, { id, include }: { id: number | string; include?: string[] }): Promise<void> {
      return authios.get<UserBuddyDocument>(`/user_buddies/${id}`, { params: { include } }).then(({ data }) => {
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

    signOut({ commit }): Promise<void> {
      return authios.delete<UserDocument>('/sign_out').then(() => {
        commit('resetState');
      });
    },

    checkAuth({ commit }): Promise<void> {
      return refreshAuth().then((response) => {
        const userDocument = response.data;
        const userResource = userDocument.data;
        commit('setUser', userResource);
      }).catch((error) => {
        const code: string = error.response?.data?.error?.code || '';
        const expectedError = ['auth_token_invalid', 'refresh_token_invalid'].includes(code);
        if (!expectedError) console.error(error);
      }).finally(() => {
        commit('setAuthChecked', { checked: true });
      });
    },

    reifyResource({ state, dispatch }, options: { resource: Resource; useCached: boolean }): Promise<void> {
      const { useCached } = options;
      const { relationships } = options.resource;

      const promises = Object.values(relationships || {}).map(({ data }) => {
        const dataList = Array.isArray(data) ? data : [data];

        const unfetchedList = !useCached ? dataList : dataList.filter(({ type, id }) => {
          return !state.resources[type as AnyResourceType][id];
        });

        const representative = unfetchedList[0];
        if (!representative) return Promise.resolve();

        const type = representative.type as AnyResourceType;
        const ids = unfetchedList.map(({ id }) => id);
        switch (type) {
          case 'message': return dispatch('fetchMessages', { ids });
          case 'messageThread': return dispatch('fetchThreads', { ids });
          case 'user': return dispatch('fetchUsers', { ids });
          case 'userBuddy': return dispatch('fetchUserBuddies', { ids });
          default: return Promise.resolve();
        }
      });

      return Promise.all(promises).then();
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
