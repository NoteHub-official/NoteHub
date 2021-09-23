# API Book

This markdown file is meant to be used as a reference for different API in the routes (`./src/routes/`) directory.

To make you easier to use this manual, I will document all APIs in its **complete path** from the host.

[TOC]

## /api

`/api` is the father endpoint of all APIs listed in `routes` directory.

**Note: It does not hold any functionalities.**

## /api/user

`/api/user` is the father endpoint of all APIs listed in `routes/user` directory.

### /api/user/insert-user

_Insert a user into the user schema_

- **Method**: POST
- **Params**: A JSON object

```JSON
{
    "firstName": "NoteHub",					// Required
    "lastName": "Lover",					// Required
    "email": "abcdefg@illinois.edu",		// Required
    "avatarUrl": "https://xxxxx.com"		// Optional
}
```

- **Return**:
  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message

### /api/user/get-user-by-email

_Get a user by his email_

- **Method**: POST
- **Params**: A JSON object

```JSON
{
    "email": "abcdefg@illinois.edu",		// Required
}
```

- **Return**:
  - 200 - SUCCESS: A JSON object containing a user's information
  - 400 - FAIL: A JSON object containing the error message

### /api/user/update-user

\*Update a user's info by his email. Only put the information needed to be changed. Otherwise do not put into inputs. **Note: Do not use null string `""` as it will set the corresponding field to `""`\***

- **Method**: PUT
- **Params**: A JSON object

```JSON
{
    "firstName": "NoteHub", 			// Optional
    "lastName": "Lover",				// Optional
    "email": "abcdefg@illinois.edu",	// Required
    "avatarUrl": "https://xxxxx.com"	// Optional
}
```

- Return:
  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message

### /api/user/delete-user-by-email

_Delete a user's info by his email._

- **Method**: DELETE
- **Params**: A JSON object

```JSON
{
    "email": "abcdefg@illinois.edu",	// Required
}
```

- Return:
  - 204 - SUCCESS: null
  - 400 - FAIL: A JSON object containing the error message
