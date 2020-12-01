import { CollectionDocument, HasManyRelationship, Resource, ResourceDocument } from '@/types/JsonApi';

export interface UserAttributes {
  username: string;
  role: 'peasant' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRelationships {
  userBuddies: HasManyRelationship<'userBuddy'>;
  buddies: HasManyRelationship<'user'>;
}

type UserResource = Resource<'user', UserAttributes, UserRelationships>;
export default UserResource;

export type UserDocument = ResourceDocument<UserResource>;
export type UsersDocument = CollectionDocument<UserResource>;
