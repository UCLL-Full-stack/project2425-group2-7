import userService from "@services/userService";
import { useRouter } from "next/router";
import { useState } from "react";


const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('')

  

  const clearErrors = () => {
    setNameError(undefined);
    setPasswordError(undefined);
    setError("")
  };

  const validate = (): boolean => {
    let result = true;

    if (!name?.trim()) {
      setNameError("Name is required");
      result = false;
    }
    
    if (!password?.trim()) {
      setPasswordError("Password is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    
    if (!validate()) {
      return;
    }


    const user = { username: name, password};
    const response =await userService.loginUser(user);
    

    if(response.ok){
      const userData = await response.json();
      sessionStorage.setItem("loggedInUser",JSON.stringify({
        token: userData.token,
        fullName: userData.fullName,
        username: userData.username,
        role: userData.role,
        id: userData.id,
      }
      ));

      setShowWelcome(true);

      
      setTimeout(() => {
        router.push("/");
      },2000);
    }else{
      setError("Username or password incorrect")
      console.log('An error occurred during login')
    }
    
  };

  return (
    <>
      <h3 className="px-0">Login</h3>
      {error && (
        <div>{error}</div>
      )}
      {showWelcome && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          login successful {JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").username}, redirecting to home page! 
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {nameError && (
            <div className="text-red-800">{nameError}</div>
          )}
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
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {passwordError && <p className="text-red-800">{passwordError}</p>}
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;