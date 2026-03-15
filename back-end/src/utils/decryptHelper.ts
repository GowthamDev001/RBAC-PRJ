import CryptoJS from "crypto-js"

const SECRET_KEY = "ackrock-secret"

export const decryptPayload = (encrypted: string) => {

  const bytes = CryptoJS.AES.decrypt(
    encrypted,
    SECRET_KEY
  )

  const decrypted = bytes.toString(
    CryptoJS.enc.Utf8
  )

  return decrypted
}