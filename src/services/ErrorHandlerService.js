export const CheckError = e => {
  if(e.message.startsWith('GraphQL')) {
    return e.message.split('error:')[1]
  } else {
    return `Aconteceu algo com nossos servidores... Por favor, tente novamente em breve.`
  }
};