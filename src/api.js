export async function getVans() {
    const res = await fetch("/api/vans", {
        method: 'GET',
      })
    // if (res.status === 200) {
    //     throw {
    //         message: "Failed to fetch vans", 
    //         statusText: res.statusText,
    //         status: res.status
    //     }
    // }
    const data = await res.json()
    return data.vans
}