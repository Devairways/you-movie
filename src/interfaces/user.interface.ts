export interface User {
  name: string;
  email: string;
  age: number;
}

export interface SingleUserResponse {
  user: User;
}

export interface UserArrayResponse {
  users: User[];
}
