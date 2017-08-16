# Familink API

## Json Web Token (JWT)

Api authentication is managed by JWT. Some links about JWT:
- [https://jwt.io/]()
- [https://fr.wikipedia.org/wiki/JSON_Web_Token]()
- [Blog post by Mikey Stecky-Efantis](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)

JWT sample token:
```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5ob2RpY3FAYmV3aXp5dS5jb20iLCJpYXQiOjE1MDI4Nzc0NTgsImV4cCI6MTUwMjg3ODM1OH0.WGen-IhN_zTB-L1ggwoH4Y0fZCzW_hV2u3GE2Pq2JFI
```

## Familink authentication

All routes are defined with a scope (public, secured). Routes starting by __public__ do not require authentication, unlike those starting with __secured__.
To access a secured route, you have to define the __Authorization__ header. If Authorization header not present, you get an HTTP 401 error with a specific message.
 You get an error too if the token is expired or invalid.

Sample header:

```
    Authorization = Bearer [[TOKEN]]
```

### Authentication workflow


- Call the login route. If login and password are correct, you will get a token :facepunch:
- Keep this token in storage for further use for future use until it is valid. Storage is ideally secured to avoid security vulnerabilities.
- Call a secured route with Authorization header

If you get an error (invalid or expired token), you have to get a new token by login.