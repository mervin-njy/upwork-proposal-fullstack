// mock user data for login

type User = {
  id: number;
  email: string;
  password: string;
};

const users: User[] = [
  {
    id: 1,
    email: "myname@example.com",
    password: "myname123",
  },
  {
    id: 2,
    email: "secured@email.xyz",
    password: "securep@ss",
  },
  {
    id: 3,
    email: "ayam@home.penyet",
    password: "tasteOfHome",
  },
];

// mock server side validation for user login
const getUser = (email: string, password: string): User | undefined => {
  return users.find(
    (user) => user.email === email && user.password === password,
  );
};

export default getUser;
