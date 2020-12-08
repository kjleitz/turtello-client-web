import { CollectionDocument, HasOneRelationship, Resource, ResourceDocument } from '@/types/JsonApi';

export interface MessageAttributes {
  senderId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  receiverId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  senderUsername: string;
  receiverUsername: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  arrivesAt: string;
}

export type MessageRelationships = {
  sender: HasOneRelationship<'user'>;
  receiver: HasOneRelationship<'user'>;
};

type MessageResource = Resource<'message', MessageAttributes, MessageRelationships>;
export default MessageResource;

export type MessageDocument = ResourceDocument<MessageResource>;
export type MessagesDocument = CollectionDocument<MessageResource>;
