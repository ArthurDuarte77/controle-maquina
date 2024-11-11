export interface Users {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: Role;
}
  
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}
  
  
  
  
  
  