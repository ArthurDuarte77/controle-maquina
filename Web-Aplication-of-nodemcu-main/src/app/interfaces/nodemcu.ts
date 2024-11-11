export interface Nodemcu {
  id:      number;
  counter: number;
  state:   string;
  data:    number;
  nome:    string;
  id_user: IDUser;
}

export interface IDUser {
  id:                    number;
  username:              string;
  email:                 string;
  password:              string;
  role:                  string;
  enabled:               boolean;
  accountNonLocked:      boolean;
  authorities:           Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired:     boolean;
}

export interface Authority {
  authority: string;
}
