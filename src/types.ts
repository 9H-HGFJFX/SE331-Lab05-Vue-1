export interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  描述: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
  组织者: string;
}

export interface MessageState {
  message: string
}
export interface EventState {
  event: Event | null
}
