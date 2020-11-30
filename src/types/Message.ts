export interface MessageAttributes {
  senderId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  receiverId: number; // these should not be stored in attributes; see https://jsonapi.org/format/#document-resource-object-attributes
  senderUsername: string;
  receiverUsername: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  arrivesAt: Date;
}

export type MessageRelationshipTypes = 'sender' | 'receiver';
