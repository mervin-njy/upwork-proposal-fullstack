// TypeScript declaration file for the user data to be used in the form component
declare module "mocks/userData" {
  type User = {
    id: number;
    email: string;
    password: string;
  };

  const getUser: (email: string, password: string) => User | undefined;
  export default getUser;
}
