import {useEffect, useState} from "react";
import {Transaction} from "@types";
import TransactionService from "@services/TransactionService";

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
}