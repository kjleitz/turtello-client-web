import { toArray } from '@/concerns/utilities';
import MessageResource, { MessageDocument, MessagesDocument } from '@/types/MessageResource';
import ThreadResource, { ThreadDocument, ThreadsDocument } from '@/types/ThreadResource';
import UserBuddyResource, { UserBuddiesDocument, UserBuddyDocument } from '@/types/UserBuddyResource';
import UserResource, { UserDocument, UsersDocument } from '@/types/UserResource';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

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

export default new Vuex.Store({
  state: {
    resources: {
      message: {} as { [id: string]: MessageResource },
      messageThread: {} as { [id: string]: ThreadResource },
      user: {} as { [id: string]: UserResource },
      userBuddy: {} as { [id: string]: UserBuddyResource },
    },
  },

  mutations: {
    addResource(state, resource: AnyResource): void {
      const { id, type } = resource;
      state.resources[type][id] = resource;
    },
  },

  actions: {
    addResourcesFromDocument({ commit }, document: AnyDocument): void {
      const { data, included } = document;

      if (data) {
        toArray(data).forEach(resource => commit('addResource', resource));
      }

      if (included) {
        toArray(included).forEach(resource => commit('addResource', resource));
      }
    },

    // fetchRelationships({ commit }, resource: AnyResource): Promise<void> {
    //   const { relationships } = resource;
    //   if (!relationships) return Promise.resolve();
    //   const relationshipThings = Object.values(relationships) as Relationship[];
    //   relationshipThings.forEach
    // },

    fetchMessages({ dispatch }): Promise<void> {
      return axios.get<MessagesDocument>('/messages').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchMessage({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return axios.get<MessageDocument>(`/messages/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchThreads({ dispatch }, { userId }: { userId: number | string }): Promise<void> {
      return axios.get<ThreadsDocument>(`/users/${userId}/message_threads`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchThread({ dispatch }, { userId, buddyId }: { userId: number | string; buddyId: number | string }): Promise<void> {
      return axios.get<ThreadDocument>(`/users/${userId}/message_threads/${buddyId}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchUsers({ dispatch }): Promise<void> {
      return axios.get<UsersDocument>('/users').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchUser({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return axios.get<UserDocument>(`/users/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchUserBuddies({ dispatch }): Promise<void> {
      return axios.get<UserBuddiesDocument>('/user_buddies').then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },

    fetchUserBuddy({ dispatch }, { id }: { id: number | string }): Promise<void> {
      return axios.get<UserBuddyDocument>(`/user_buddies/${id}`).then(({ data }) => {
        return dispatch('addResourcesFromDocument', data);
      }).catch((reason) => {
        console.error(reason);
      });
    },
  },

  getters: {
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
