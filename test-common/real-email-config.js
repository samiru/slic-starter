const Mailosaur = require('mailosaur')
const RandomWords = require('random-words')

const { MAILOSAUR_SERVER_ID: serverId } = process.env

const client = new Mailosaur(process.env.MAILOSAUR_API_KEY)

export function generateEmailAddress() {
  return `${RandomWords(3).join('-')}.${serverId}@mailosaur.io`
}

export async function retrieveCode(emailAddress) {
  const email = await retrieveEmail(emailAddress)
  const emailBody = email.html.body
  const splitBody = emailBody.split(' ')
  const confirmationCode = splitBody[splitBody.length - 1]
  return confirmationCode
}

export function retrieveEmail(emailAddress) {
  return client.messages.waitFor(process.env.MAILOSAUR_SERVER_ID, {
    sentTo: emailAddress
  })
}
