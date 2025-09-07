export type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  logo: string;
  location: string;
};

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  userId: string;
  unreadCount: number;
};

export type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
  timestamp?: string;
};

export type SendMessagePayload = {
  recipientId: string;
  content: string;
  conversationId: string;
};
