const findCustomerByUserId = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/customers/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}



const customerService = {
    findCustomerByUserId,
}

export default customerService