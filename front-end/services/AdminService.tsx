const findAdminByUserId = async (userId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/admins/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const adminService = {
    findAdminByUserId,
}

export default adminService;