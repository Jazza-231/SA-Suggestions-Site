# Scratch Addons Suggestion Site

It's in the name. Made by Jazza, and maybe others? I'm not sure.
I am also not sure if this will ever be finished, or actually used in a semi-official capacity.

## How to contribute?

Clone the repo. If you don't know how to do that, this probably isn't the project for you.

Install dependencies with pnpm, I forget to do this all the time.

Then run `pnpm dev` to start the dev server, and it will by default be available at <http://localhost:5173/>

Right now there is no need for enviroment variables, but they will probably be needed eventually, if I remember I'll update this to include instructions on how to set them up.

Try to stick to the design characteristics of SA as much as possible, I'll set up some CSS variables for colors and stuff.

## Todo

- [x] Make a repo
- [x] Basic design
- [x] Theme switch - kinda done
- [x] Displaying suggestions text
- [x] Displaying suggestions images
- [ ] Submitting suggestions
- [ ] Sorting suggestions
- [ ] Pagination
- [ ] Authentication - Scratch for community, Github for devs
- [ ] "Roles" - dev, admin, etc
- [ ] More

Current supabase config in json, I am not too familar with supabase, but I think this is semi-right:

```json
{
  "suggestion": {
    "id": "unique-uuid-v4",
    "title": "Descriptive title of the suggestion",
    "description": "Detailed explanation of the suggestion",
    "type": "Bug | Improvement | New Addon",
    "status": "pending | in-progress | completed",
    "tags": ["tag1", "tag2"],
    "images": [
      {
        "id": "unique-file-identifier",
        "url": "full-public-url-to-image",
        "alt": "Descriptive alternative text"
      }
    ],
    "votes": 0,
    "author": {
      "id": "user-unique-identifier",
      "username": "display-username"
    },
    "createdAt": "ISO-8601-timestamp"
  }
}
```
