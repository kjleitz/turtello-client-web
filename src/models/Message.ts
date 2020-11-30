// how about trying to use the vanilla JSON:API objects?
export default interface Message {
  id: number | null;
  senderId: number;
  receiverId: number;
  senderUsername: string;
  receiverUsername: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  arrivesAt: Date;
}
