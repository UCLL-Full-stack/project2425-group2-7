import Head from "next/head";
import Header from "@components/header";

const Home: React.FC = () => {
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
            </main>
        </>
    );
};

export default Home;