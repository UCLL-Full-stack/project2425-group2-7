import Head from 'next/head'
import Header from '@components/header'
import React, { useState, useEffect } from 'react'
import PopUp from '@components/LoyaltycardPopIp';
import UserTestingTable from "@components/UserTestingTable";
import UserService from "@services/userService";
import {User} from "@types";

interface UserData {
  token: string;
  fullName: string;
  username: string;
  role: string;
}
const users: User[] = [
    {id: 1000, password: "kong", username: "kong", email: "kong@", role: "ADMIN", firstName:"kong", lastName: "kong"},
    {id: 2000, password: "wamie", username: "wamie", email: "wamie@", role: "CUSTOMER", firstName:"wamie", lastName: "wamie"}

]


const Home: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const userTier = 'Gold';
    const [error, setError] = useState<string>();

    // this bit has to be changed to a few users from seed.ts for the lecturer
    /**
    const getAllUsers = async () => {
        const response = await UserService.getUsers();
        setError("")
        if (!response.ok) {
            setError(response.statusText);
        } else {
            const users = await response.json()
            setUsers(users);
        }
    }
     *
     */

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserData(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        //getAllUsers();
    }, []);

    return (
        <>
            <Head>
                <title>Car Dealer</title>
                <meta name="description" content="Car dealer app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">Welcome to the Naustyne Dealership</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Discover our extensive selection of vehicles. We offer the best prices and a hassle-free shopping experience.
                    Whether you are looking for a new or used car, our team is here to help you find the perfect match.
                </p>
                {(userData?.role === "CUSTOMER") && (
                    <button 
                        onClick={() => setShowPopup(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                                 transition-colors duration-200"
                    >
                        Show Loyalty Card Status
                    </button>
                )}
                {users && (
                    <><h2>Testing users</h2><UserTestingTable users={users} /></>
                )}
                <PopUp 
                    trigger={showPopup}
                    setTrigger={setShowPopup}
                    tier={userTier}
                />
            </main>
        </>
    );
};

export default Home;