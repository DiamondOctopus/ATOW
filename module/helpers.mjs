/**
            THANK YOU IMOGEN FOR THIS ONE
 **/
export function toCamelCase(str, delim) {
    let parts = str.split(delim)
    const firstWord = parts[0].toLowerCase()
    if (parts.length > 1) {
        let lastWords = parts.slice(1)
        lastWords.forEach(s => {s[0] = s[0].toUpperCase()})
        return [...firstWord, ...lastWords].join("")
    } else {
        return firstWord
    }
}
