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

- Method: POST
- Params: A JSON object

```JSON
{
    "firstName": "NoteHub",
    "lastName": "Lover",
    "email": "abcdefg@illinois.edu",
    "avatarUrl": "https://xxxxx.com"
}
```

- Return:
  - 200 - SUCCESS: The original JSON object
  - 400 - FAIL: A JSON object containing the error message

### /api/user/update-user

### /api/user/get-user-by-email
