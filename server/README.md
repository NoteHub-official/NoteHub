# NoteHub Backend

## Project setup

```
npm install
```

### Hot-reloads for development server

```
npm run watch
```

### Start server

```
npm run start
```

### Compiles and minifies for production

Please refer to the README under NoteHub folder

### A database is required to configured in local environment:

Update all your local database info in `.env` file at `NOTEHUB/server/.env`.

**Note**: ".env" files in `src` and `models` folders are not intended to be changed in normal case.
They are intended for testing purpose. If you need to test your database connection, you can change them as well.

If the remote GCP database is enabled, you can uncomment that part of info and comment your info, then a remote database is connected.
