import API from '@/utils/API'

type Credentials = {
  email: string,
  password: string,
}

type LoginResponse = {
  token: string;
  expiresAt: string;
  user?: {}
}

class Auth {

  redirectUrl: string = '/'
  TOKEN_KEY: string = 'authToken'
  EXPIRES_AT_KEY: string = 'expiresAt'
  REFRESH_TOKEN_EXPIRES_AT: string = 'refreshTokenExpiresAt'

  login = async (cred: Credentials) => {
    return new Promise<void>((resolve, reject) => {
      API.post('/api/auth/login', cred).then(({ data }) => {
        this.setLoginSession(data)
        resolve()
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  logout = () => {
  }

  refresh = () => {
  }

  setRedirectedUrl = (URL: string) => this.redirectUrl = URL

  getAuthHeader = (type = 'Bearer') => `${type} ${localStorage.getItem(this.TOKEN_KEY)}`

  isLoggedIn = () => {
    const expiresAt = JSON.parse(localStorage.getItem(this.EXPIRES_AT_KEY) || '0')
    return expiresAt && Date.now() > expiresAt
  }

  private setLoginSession = ({ token, expiresAt }: LoginResponse) => {
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt)
  }


}

const auth = new Auth()
export default auth
