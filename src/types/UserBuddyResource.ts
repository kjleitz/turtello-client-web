import { CollectionDocument, Resource, ResourceDocument } from '@/types/JsonApi';

export interface UserBuddyAttributes {
  userId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  buddyId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  userUsername: string;
  buddyUsername: string;
  createdAt: string;
  updatedAt: string;
}

type UserBuddyResource = Resource<'userBuddy', UserBuddyAttributes, undefined>;
export default UserBuddyResource;

export type UserBuddyDocument = ResourceDocument<UserBuddyResource>;
export type UserBuddiesDocument = CollectionDocument<UserBuddyResource>;
