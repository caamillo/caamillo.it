export const parse = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (err) {
        return
    }
}

export const isValid = async (token) => {
    if (!token) return
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

export const checkExpire = async (token, checkIfValid=false) => {
    if (!token) return

    const parsed = parse(token)
    if (!parsed || !parsed?.expires) return
    const expires = new Date(parsed.expires)
    const diff = expires - new Date()

    return diff > 0 && (checkIfValid ? await isValid(token) : true)
}

export const logout = async (token, setToken) => {
    if (!token) return

    const res = await fetch(`https://api.caamillo.it/logout?t=${ token }`)
    const data = await res.json()
    if (!data.error) setToken(undefined)
}