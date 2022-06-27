
const getErrorResponse = (errorMessage) => {
  return {
    error: errorMessage
  }
}

const getDefaultResponse = (title) => {
  return {
    title: title, 
    authorName: 'Soham Patel'
  }
}

get404Response = () => {
  return {
    title: '404',
    errorMessage: 'Page not found'
  }
}

module.exports = {
  getErrorResponse: getErrorResponse,
  getDefaultResponse: getDefaultResponse,
  get404Response: get404Response
}
