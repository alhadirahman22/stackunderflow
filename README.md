## Setup instructions

1) Install Docker.
2) Run:

```bash
docker compose up
```

App runs at `http://localhost:3500`.

## Overview

Stack Underflow is a lightweight, frontend-only Q&A web application inspired by Stack Overflow.
The app allows users to log in, browse questions, post new questions, update their own content,
and participate in discussions through comments — all within a single-page application.
There is no backend; all data is managed in memory.

## Functional requirements

1) Login (mocked)
- Implement a simple login flow.
- User can enter any username and password.
- Logged-in state remains active until the page is refreshed.
- No real authentication or backend integration required.

2) Questions (posts)
- Display a list of questions.
- Each question includes: title, description, status (open, answered, closed), created date/time.
- Users can create a new question, edit questions they created, and change the status of their own questions.
- Initial questions are pre-populated in memory on initial load.

3) Comments
- Each question supports multiple comments.
- Users can add a comment and edit their own comments.
- Comments update the UI immediately without page reload.

## Short explanation of your approach

- Built as a frontend-only SPA using Next.js App Router with in-memory state.
- Mocked authentication via React context; login state resets on refresh.
- Questions, status changes, and comments are handled using a reducer to keep state updates clean and easy to follow.
- Seed data is pre-populated on initial load.

## Any assumptions or known limitations

- No backend or persistence. Refreshing the page resets all data.
- Authentication is mocked; any username/password is accepted.
- Authorization relies on comparing the current username with the author field.
- IDs use `crypto.randomUUID()` which requires a modern browser.
