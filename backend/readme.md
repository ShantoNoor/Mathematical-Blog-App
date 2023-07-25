# Creaing Vertual Environment
```bash
python -m venv venv
```

# Installing Requirements
```bash
pip install -r requirements.txt
```

# Running the Server
```bash
python manage.py runserver
```

# Creating SuperUser
```bash
python manage.py createsuperuser
```

# Already Created SuperUser
- username: `admin`
- password: `admin`

# JSON Web Token Authentication -> access_token, refresh_token
## Must add a Header in request
###  Header Name: Authorization
## Example:
### `Authorization: JWT access_token`

# API Endpoints
## Related to blog blogs
### http://127.0.0.1:8000/api/blog/
### http://127.0.0.1:8000/api/blog/1
### http://127.0.0.1:8000/api/blog/me
### http://127.0.0.1:8000/api/blog/1/my_blog
## Related to blog comments
### http://127.0.0.1:8000/api/blog/1/comment
### http://127.0.0.1:8000/api/blog/1/comment/1
## Related to blog ratings
### http://127.0.0.1:8000/api/blog/1/rating
### http://127.0.0.1:8000/api/blog/1/rating/1
## Related to profiles
### http://127.0.0.1:8000/api/profiles/  -> login required
### http://127.0.0.1:8000/api/profiles/1  -> login required(Moderator and Admin Only)
### http://127.0.0.1:8000/api/profiles/me  -> login required(Current User's Profile Info)
## Related to login
### http://127.0.0.1:8000/api/auth/jwt/create -> login
### http://127.0.0.1:8000/api/auth/jwt/refresh -> login
## Related to users
### http://127.0.0.1:8000/api/auth/users -> signup(Creating a New User)
### http://127.0.0.1:8000/api/auth/users -> login required(Moderator and Admin Only)
### http://127.0.0.1:8000/api/auth/users/1 -> login required(Moderator and Admin Only)
### http://127.0.0.1:8000/api/auth/users/me/ -> login required(Current User Info)