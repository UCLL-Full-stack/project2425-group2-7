import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/user/UserLoginForm";
import User_registrationForm from "@components/user/User_registrationForm";
import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
                    {!showRegistration ? (
                        <>
                            <UserLoginForm />
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
                        </>
                    ) : (
                        <User_registrationForm 
                            isOpen={showRegistration} 
                            onClose={() => setShowRegistration(false)}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async(context: { locale: any; }) =>{
    const {locale} = context
    return{
        props:{
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        },
    };
};

export default Login;