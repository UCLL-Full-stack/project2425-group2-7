import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/user/UserLoginForm";
import User_registrationForm from "@components/user/User_registrationForm";
import { useState } from "react";

const Login: React.FC = () => {
    const [showRegistration, setShowRegistration] = useState(false);

    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
                <section className="text-center pb-6">
                    <p>Not yet a user? 
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setShowRegistration(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                            create user
                        </a>
                    </p>
                </section>
                <User_registrationForm 
                    isOpen={showRegistration} 
                    onClose={() => setShowRegistration(false)}
                />
            </main>
        </>
    );
};

export default Login;