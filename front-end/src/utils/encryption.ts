import CryptoJS from "crypto-js"

const SECRET_KEY = "ackrock-secret"

export const encryptPayload = (data: string) => {

  const encrypted = CryptoJS.AES.encrypt(
    data,
    SECRET_KEY
  ).toString()

  return encrypted
}