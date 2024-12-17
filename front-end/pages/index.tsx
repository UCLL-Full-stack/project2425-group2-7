import Head from 'next/head'
import Header from '@components/header'
import React, { useState, useEffect } from 'react'
import PopUp from '@components/LoyaltycardPopIp';

interface UserData {
  token: string;
  fullName: string;
  username: string;
  role: string;
}

const Home: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const userTier = 'Gold';

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
                {userData?.role === "CUSTOMER" && (
                    <button 
                        onClick={() => setShowPopup(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                                 transition-colors duration-200"
                    >
                        Show Loyalty Card Status
                    </button>
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