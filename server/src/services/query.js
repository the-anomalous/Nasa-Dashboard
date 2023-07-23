const DEFUALT_PAGE_NUMBER = 1 
const DEFUALT_LIMIT = 0

const getPagination = query => {
  const page = Math.abs(query.page) || DEFUALT_PAGE_NUMBER
  const limit = Math.abs(query.limit) || DEFUALT_LIMIT
  const skip = (page - 1) * limit

  return {
    skip, 
    limit
  }
}

module.exports = {
  getPagination
}
