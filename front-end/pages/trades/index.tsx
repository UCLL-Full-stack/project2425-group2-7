import {useEffect, useState} from "react";
import {Transaction} from "@types";
import TransactionService from "@services/TransactionService";
import Head from "next/head";
import Header from "@components/header";
import TradeInOverviewTable from "@components/transactions/TransactionTable";

const TradeIns: React.FC = () => {
    const [tradeIns, setTradeIns] = useState<Array<Transaction>>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setTradeIns(tradeIns);
    }, [tradeIns]);

    const getAllTradeIns = async () => {
        setError("");
        const response = await TransactionService.getAllTransactions();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const tradeIns = await response.json()
            setTradeIns(tradeIns);
        }
    }

    useEffect(() => {
        getAllTradeIns();
    }, []);

    return (
        <>
            <Head>
                <title>Trade-Ins</title>
            </Head>
            <Header/>
            <main>
                <section>
                    {tradeIns && (
                        <>
                            <h2>Trade-in overview</h2>
                            <TradeInOverviewTable transactionTrades={tradeIns} />
                        </>
                    )}
                </section>
            </main>
        </>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const getServerSideProps = async(context: { locale: any; }) =>{
    const {locale} = context
    return{
        props:{
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        },
    };
};

export default TradeIns;