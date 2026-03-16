import CryptoJS from "crypto-js"

const SECRET = "ACKROCK_AUTH_SECRET"

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET
  ).toString()
}

export const decryptData = (cipher: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)

    if (!decrypted) return null

    return JSON.parse(decrypted)
  } catch {
    return null
  }
}