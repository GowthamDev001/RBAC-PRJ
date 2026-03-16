export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register"
  },
  ROLE: {
    GET_ALL: "/roles",
    CREATE: "/roles",
    UPDATE: "/roles",
    DELETE: "/roles"
  },

  USER: {
    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update"
  },

  ARTICLE: {
    GET_ALL: "/articles",
    GET_BY_ID: "/articles",
    CREATE: "/articles",
    UPDATE: "/articles",
    DELETE: "/articles"
  }
  ,
  CATEGORY: {
    GET_ALL: "/categories",
    CREATE: "/categories",
    UPDATE: "/categories",
    DELETE: "/categories"
  },

  REVIEW: {
    GET_BY_ARTICLE: "/reviews/article",
    CREATE: "/reviews",
    UPDATE: "/reviews",
    DELETE: "/reviews"
  }

}