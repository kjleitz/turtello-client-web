import { CollectionDocument, HasManyRelationship, Resource, ResourceDocument } from '@/types/JsonApi';

export interface ThreadAttributes {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreadRelationships {
  messages: HasManyRelationship<'message'>;
  participants: HasManyRelationship<'user'>;
}

type ThreadResource = Resource<'messageThread', ThreadAttributes, ThreadRelationships>;
export default ThreadResource;

export type ThreadDocument = ResourceDocument<ThreadResource>;
export type ThreadsDocument = CollectionDocument<ThreadResource>;
