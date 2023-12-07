const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = lower.toUpperCase()
const digits = '0123456789'
const specials = '-'

const ALLOWED_CHARACTERS = lower + upper + digits + specials

export const avoidIllegalCharacters = (e) => {
    if (ALLOWED_CHARACTERS.includes(e.key) || e.key === 'Backspace' || e.key.startsWith('Arrow')) return
    e.preventDefault()
}