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
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  // return the form
  return (
    // form element that uses the react-hook-form hook to handle the form submission callback
    // handleSubmit function prevents the default form submission, checks that the FormFields type is valid and calls the onSubmit function
    <form
      className="border-1 w-96 rounded-2xl border-purpleAccent px-8 py-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-2 h-16">
        {/* form input field: email including validation */}
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-purpleAccent hover:bg-main8 hover:text-purpleAccent focus:outline-none focus:ring focus-visible:ring-purpleAccent focus-visible:ring-opacity-75"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="mt-1 flex px-2 text-sm text-redAccent">
            This field is required!
          </span>
        )}
      </div>

      <div className="mb-2 h-16">
        {/* form input field: password including validation */}
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-purpleAccent hover:bg-main8 hover:text-purpleAccent focus:outline-none focus:ring focus-visible:ring-purpleAccent focus-visible:ring-opacity-75"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="mt-1 flex px-2 text-sm text-redAccent">
            This field is required!
          </span>
        )}
      </div>

      {/* form submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-purpleMain px-4 py-2 tracking-wide text-main transition duration-500 ease-in-out hover:bg-purpleAccent hover:text-mainDarkest"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default App;
