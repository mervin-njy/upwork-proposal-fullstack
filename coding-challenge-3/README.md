# React and TypeScript Login Component

This is a mock up of a Login Component built with React, TypeScript and Tailwind CSS. The component includes fields for email and password, as well as a submit button. As we will not be using an actual database for the CRUD server actions of user accounts, we will create mock data for the "existing" user accounts, which can be viewed in the userData.js file in the /mocks directory. For easy reference, these are the users:

| User ID | Email              | Password    |
| ------- | ------------------ | ----------- |
| 1       | myname@example.com | myname123   |
| 2       | secured@email.xyz  | securep@ss  |
| 3       | ayam@home.penyet   | tasteOfHome |

This project utilizes the following:

| Technology      | Description                                        |
| --------------- | -------------------------------------------------- |
| React           | A JavaScript library for building user interfaces. |
| TypeScript      | A superset of JavaScript that adds static typing.  |
| Tailwind CSS    | A utility-first CSS framework for rapid styling.   |
| React Hook Form | A library for managing forms in React with hooks.  |

## To setup

1. **Clone the Repository** (skip this if you have already done so):

   ```bash
   git clone https://github.com/mervin-njy/upwork-proposal-fullstack.git
   ```

2. **Navigate to Project Directory:**

   ```bash
   cd upwork-proposal-fullstack/coding-challenge-3
   ```

3. **Install Dependencies:**

- React w/ TypeScript (using vite)

  ```bash
  npx create-vite react-ts-login --template react-ts
  cd react-ts-login
  npm install
  ```

- React Hook Form

  ```bash
  npm install react-hook-form

  ```

- Tailwind CSS (for styling)

  ```bash
  npm install -D tailwindcss postcss autoprefixer     # install tailwindcss
  npx tailwindcss init -p                             # create tailwind.config.js file
  npm install -D vite-plugin-windicss                 # install Vite Tailwind CSS plugin to automatically integrate Tailwind CSS styles during development
  npm install -D prettier prettier-plugin-tailwindcss # automatic class sorting with Prettier
  ```

  Configurations and directives have been added manually - visit [tailwind](https://tailwindcss.com/docs/guides/vite) documentation to see instructions, specifically for Vite.

## To run server

1. **Start the Server:**

   ```bash
   npm run dev
   ```

## Credits

Loading spinner has been modified from an open source pure CSS loading animation by [PlotDB Ltd.](https://loading.io/css/)
