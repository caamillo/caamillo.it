const parse = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (err) {
        return
    }
}

const isValid = async (token) => {
    try {
        const isValidRes = await fetch('https://api.caamillo.it/validate-token', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        const data = await isValidRes.json()
        return data?.data
    } catch (err) {
        return false
    }
}

export default async function checkExpire(token, checkIfValid=false) {
    if (!token) return

    const parsed = parse(token)
    if (!parsed || !parsed?.expires) return
    const expires = new Date(parsed.expires)
    const diff = expires - new Date()

    return diff > 0 && (checkIfValid ? await isValid(token) : true)
}