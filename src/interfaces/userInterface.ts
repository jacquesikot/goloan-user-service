interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  gender?: string;
  year_of_birth?: string;
  relationship_status?: string;
  bvn?: string;
  password: string;
  pin?: string;
  user_type: string;
  created_at: string;
  updated_at?: string;
  last_login?: string;
  modified?: string;
}

export default IUser;
