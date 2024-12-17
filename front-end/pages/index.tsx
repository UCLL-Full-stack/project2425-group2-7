import Head from 'next/head'
import Header from '@components/header'
import React, { useState } from 'react'
import PopUp from '@components/LoyaltycardPopIp';

const Home: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const userTier = 'Gold';
    // const [loggedInUser,setLoggedInUser] = useState<string>("")

    // const user  = sessionStorage.getItem("loggedInUser");
    // if (user) {
    //     setLoggedInUser(user);
    // }

    return (
        <>
            <Head>
                <title>Car Dealer</title>
                <meta name="description" content="Car dealer app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main className="container">
                <h1>Welcome to the Naustyne dealership</h1>
                <p>
                    Discover our extensive selection of vehicles. We offer the best prices and a hassle-free shopping experience.
                    Whether you are looking for a new or used car, our team is here to help you find the perfect match.
                </p>
                 <button 
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Show Loyalty card status
                </button>
                
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