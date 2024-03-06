// impport statements for the required modules
import "./App.css";
import getUser from "../mocks/userData"; // import the mock server action to get the user from the database
import { SubmitHandler, useForm } from "react-hook-form"; // import the react-hook-form hook to handle the form
import { useState } from "react";

// type declaration for the form fields
type FormFields = {
  email: string;
  password: string;
};

function App() {
  // REACT HOOKS -------------------------------------------------------------------------------------------------------------------------------
  // react-hook-form hook to handle the form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  // state to show the success message after the form is submitted
  const [showSuccess, setShowSuccess] = useState(false);

  // EVENT HANDLERS ----------------------------------------------------------------------------------------------------------------------------
  // function to handle the form submission => only called once the form is valid
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // simulate a server action to get the user from the database
      await new Promise((resolve) => setTimeout(resolve, 1500)); // add a 1.5s delay
      const user = getUser(data.email, data.password);

      // throw an error to simulate a failed server action
      if (!user) throw new Error("User does not exist");

      // alert the user if the server action is successful
      // alert("Logged in successfully!");
      setShowSuccess(true);
    } catch (error) {
      // set the error message if the server action fails (root is the form field name for the form itself
      setError("root", {
        message: "Unable to find an account with the provided credentials.", // error message to prevent users from knowing which field is invalid
      });
    }
  };

  // Function for navigating after login
  const handleNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    window.location.href = "https://mervin-njy.github.io/2048-derivative/"; // navigate to 2048 game
  };

  // Function for loggin out after login
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    setShowSuccess(false); // hide the success message after logging out
    reset(); // clear form fields
  };

  // RENDER COMPONENT --------------------------------------------------------------------------------------------------------------------------
  return (
    // form element that uses the react-hook-form hook to handle the form submission callback
    // handleSubmit function prevents the default form submission, checks that the FormFields type is valid and calls the onSubmit function
    <form
      className="w-96 rounded-2xl border-1 border-purpleAccent px-8 py-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-2 h-16">
        {/* INPUT 1: email including validation */}
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-blueAccent hover:bg-main8 hover:text-blueAccent focus:border-purpleAccent focus:text-purpleAccent focus:outline-none"
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
          className="w-full rounded-lg border-2 border-main8 bg-main9 px-3 py-2 text-main transition duration-300 ease-in-out hover:border-blueAccent hover:bg-main8 hover:text-blueAccent focus:border-purpleAccent focus:text-purpleAccent focus:outline-none"
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
        {/* ERROR MESSAGE: failed server action to getUser - user doesn't exist */}
        {errors.root && (
          <span className="mr-3 mt-1 flex w-52 px-2 text-left text-sm text-redAccent">
            {errors.root.message}
          </span>
        )}

        <button
          type="submit"
          disabled={isSubmitting} // disable button while form is submitting
          className="w-24 rounded-lg bg-purpleMain px-4 py-2 tracking-wide text-main transition duration-500 ease-in-out hover:bg-purpleAccent hover:text-mainDarkest focus:outline-none"
        >
          {isSubmitting ? (
            <div className="lds-ripple">
              <div></div> <div></div> {/* loading animation */}
            </div>
          ) : (
            "Login" // display 'Login' text when form can be submitted
          )}
        </button>
      </div>

      {/* SUCCESS MESSAGE: show after form is submitted */}
      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="mb-10 text-center text-lg">
              You have logged in successfully. Would you like to play 2048?
            </h3>

            {/* Buttons to navigate to 2048 or log out */}
            <div className="flex justify-between">
              <button
                onClick={handleNav}
                className="w-24 rounded-lg bg-greenMain px-4 py-2 tracking-wide text-main transition duration-500 ease-in-out hover:bg-greenAccent hover:text-mainDarkest focus:outline-none"
              >
                YES
              </button>
              <button
                onClick={handleLogout}
                className="w-24 rounded-lg bg-yellowMain px-4 py-2 tracking-wide text-mainDarkest transition duration-500 ease-in-out hover:bg-yellowAccent focus:outline-none"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default App;
