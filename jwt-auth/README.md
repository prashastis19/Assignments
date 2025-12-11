# JWT Auth Assignment

This project implements a simple JWT-based authentication system in Node.js using an in-memory array.

## Setup

1. Open the folder in VS Code.(Either download the entire repo zip and extract it or Go to: https://download-directory.github.io/ and paste https://github.com/prashastis19/Assignments/tree/main/jwt-auth and click download zip.Once downloaded it can be opened in VS Code or any code editor)

2. Install dependencies:

```bash(in Gitbash)
npm install express bcrypt jsonwebtoken dotenv
```

3. Make sure `.env` exists in the folder with:

```
JWT_SECRET=secret_key
```

4. Start the server:

```bash
node server.js
```

Server runs at http://localhost:3000

## Testing in Browser

1. Register a user:

```
http://localhost:3000/register?email=test@gmail.com&password=123
```

2. Login to get a JWT token:

```
http://localhost:3000/login?email=test@gmail.com&password=123
```

3. Invoke the protected function:

```
http://localhost:3000/invoke?token=PASTE_TOKEN_HERE
```

- Valid token → `Function invoked successfully`
- Invalid/expired token → `Access denied`

## Notes

- Tokens expire in 10 minutes.
- Passwords are hashed using `bcrypt`.
- All data is stored in-memory. Restarting the server clears all users.
