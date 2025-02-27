export type MessageType = 
  | 'question'
  | 'answer'
  | 'paragraph'
  | 'header1'
  | 'header2'
  | 'listItem'
  | 'checkbox';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: number;
  checked?: boolean;
}

export interface Persona {
  id: string;
  name: string;
  color?: string;
  avatar?: string | null;
  emoji?: string;
  favorite?: boolean;
  messages?: Message[];
}