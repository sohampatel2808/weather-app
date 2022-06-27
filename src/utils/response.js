
const getErrorResponse = (errorMessage) => {
  return {
    error: errorMessage
  }
}

module.exports = {
  getErrorResponse: getErrorResponse,
}
