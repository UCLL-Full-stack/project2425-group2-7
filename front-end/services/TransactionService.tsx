const getAllTransactions = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/transactions";
    console.log(apiUrl);

    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
}
const TransactionService = {
    getAllTransactions,
}
export default TransactionService;