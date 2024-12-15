import classNames from "classnames";
import { useState } from "react";
import userService from "@services/userService";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const User_registrationForm: React.FC<RegistrationFormProps> = ({ isOpen, onClose }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [usernameError, setUserNameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [firstNameError, setFirstNameError] = useState<string>();
  const [lastNameError, setLastNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [roleError, setRoleError] = useState<string>();

  if (!isOpen) return null;

  const clearErrors = () => {
    setUserNameError("");
    setPasswordError("");
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setRoleError("");
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUserNameError("Username is required");
      result = false;
    }
    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }
    if(!firstName || firstName.trim() === ""){
        setFirstNameError("Firstname is required")
        result = false
    }
    if(!lastName || lastName.trim() === ""){
        setLastNameError("Lastname is required")
        result = false
    }
    if(!role || role.trim() === ""){
        setRoleError("Role is required")
        result = false
    }
    if(!email.includes("@")){
        setEmailError("Use a valid email please")
        result = false
    }

    return result;
  };

  //const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // clearErrors();  
    

    // if (!validate()) {
    //     return;
    // }

    // const userData = {
    //   userName: username,
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   password: password,
    //   role: role.toUpperCase()
    // }

    // console.log('Sending user data:', userData);

    // try {
    //     const response = await userService.registerUser(userData);
    //     console.log('Response:', response);
        
    //     if (response) {  // Check if response exists
    //         sessionStorage.setItem("loggedInUser", username);
    //         onClose();
    //     }
    // } catch (error) {
    //     console.error('Registration error:', error);
    //     // Optionally show error to user
    // }
  //}

  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="popup-inner bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">Register New User</h2>
<form onSubmit={ async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const userData = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role.toUpperCase()
  }

  console.log('Sending user data:', userData);

  try {
      const response = await userService.registerUser(userData);
      console.log('Response:', response);
      
      if (response) {
          onClose();
      }
  } catch (error) {
      console.error('Registration error:', error);
  }
}}>
          <label htmlFor="firstnameInput" className="block mb-2 text-sm font-medium">
            First name:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="firstnameInput"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {<p className="text-red-800">{firstNameError}</p>}
          </div>

          <label htmlFor="lastnameInput" className="block mb-2 text-sm font-medium">
            Last name:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="lastnameInput"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {<p className="text-red-800">{lastNameError}</p>}
          </div>

          <label htmlFor="usernameInput" className="block mb-2 text-sm font-medium">
            Username:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {<p className="text-red-800">{usernameError}</p>}
          </div>

          <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
            Email:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="emailInput"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {<p className="text-red-800">{emailError}</p>}
          </div>

          <label htmlFor="roleInput" className="block mb-2 text-sm font-medium">
            Role:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <select
              id="roleInput"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            >
              <option value="">Select a role</option>
              <option value="customer">CUSTOMER</option>
              <option value="admin">ADMIN</option>
            </select>
            {<p className="text-red-800">{roleError}</p>}
          </div>

          <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
            Password:
          </label>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {<p className="text-red-800">{passwordError}</p>}
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
                    
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default User_registrationForm;





