import Message from '@/models/Message';

interface User { id: number | null }

// how about trying to use the vanilla JSON:API objects?
export default interface Thread {
  id: number | null;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  participants: User[];
}
