// impport statements for the required modules
// import { useState } from "react";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";

// type declaration for the form fields
type FormFields = {
  email: string;
  password: string;
};

// render the form App component
function App() {
  // react-hook-form hook to handle the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  // function to handle the form submission notification => only called once the form is valid
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // simulate a server action to get the user from the database
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // log the form data
    console.log(data);
  };

  // return the form
  return (
    // form element that uses the react-hook-form hook to handle the form submission callback
    // handleSubmit function prevents the default form submission, checks that the FormFields type is valid and calls the onSubmit function
    <form
      className="w-96 rounded-2xl border-1 border-purpleAccent px-8 py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-2 h-16">
        {/* INPUT 1: email including validation */}
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-main3 hover:bg-main8 hover:text-main3 focus:border-purpleAccent focus:text-purpleAccent focus:outline-none"
          {...register("email", {
            required: "Email field is required.", // returns string as error message if empty
            validate: (value) => {
              if (!value.includes("@")) return "Email must include '@' symbol";
              if (!value.includes(".")) return "Email must include '.' symbol";
              if (
                !value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
              )
                // validate email format ___@___.___ using regex
                return "Please enter a valid email address.";
              return true;
            },
          })}
        />
        {/* ERROR MESSAGE: email validation */}
        {errors.email && (
          <span className="mt-1 flex px-2 text-sm text-redAccent">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="mb-2 h-16">
        {/* INPUT 2: password including validation */}
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-main3 hover:bg-main8 hover:text-main3 focus:border-purpleAccent focus:text-purpleAccent focus:outline-none"
          {...register("password", {
            required: "Password field is required.", // returns string as error message if empty
            validate: (value) =>
              value.length >= 8 ||
              "Password must be at least 8 characters long", // validate length of password
          })}
        />
        {/* ERROR MESSAGE: password validation */}
        {errors.password && (
          <span className="mt-1 flex px-2 text-sm text-redAccent">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* LOGIN button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-purpleMain px-4 py-2 tracking-wide text-main transition duration-500 ease-in-out hover:bg-purpleAccent hover:text-mainDarkest focus:outline-none"
        >
          Login
        </button>
        {/* ERROR MESSAGE: failed server action to getUser - user doesn't exist */}
      </div>
    </form>
  );
}

export default App;
