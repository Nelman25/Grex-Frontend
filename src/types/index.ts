export interface IUserCredentials {
  email: string;
  password_hash: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  start: string; // must be string in ISO format
  end: string; // must be string in ISO format
  description?: string;
}

