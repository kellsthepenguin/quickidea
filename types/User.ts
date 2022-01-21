interface User {
  name: string,
  id?: number,
  mail: string,
  pw: string,
  salt: string
}

export default User
