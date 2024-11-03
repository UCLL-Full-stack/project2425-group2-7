import Head from "next/head";
import Header from "@components/header";
import PopUp from "@components/PopUp";
import { useState } from "react";
import { use } from "i18next";

const Home: React.FC = () => {
    const [buttonPopUp, setButtonPopup] = useState(false)

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
                <button onClick={() => setButtonPopup(true)}>Add car</button>
                <PopUp trigger={buttonPopUp} setTrigger={setButtonPopup}>
                    <p>Are you sure you want to add this car?</p>
                    
                </PopUp>
            </main>
        </>
    );
};

export default Home;