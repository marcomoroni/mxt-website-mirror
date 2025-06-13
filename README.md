# MXT website

## Developing

### Setup

In order to start working on this project you need to:

1. Have npm installed. npm is a package manager used for the majority of web projects
2. On the root of this project run `npm install`. This will install all npm packages. They will will be placed inside the untracked folder `/node_modules`.

### Running the website

```bash
npm run dev

# Or start the server and open the app in a new browser tab.
npm run dev -- --open
```

### Formatting

The project should auto format via Prettier. Assuming you're using VSCode, make sure you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension installed. It should format files every time you save them.

### Svelte and SvelteKit

This project is built on top of [Svelte](https://svelte.dev/) 4.x and [SvelteKit](https://kit.svelte.dev/) 2.x. Svelte is a font-end UI framework and SvelteKit is, mostly, a router (given a url, a router generates the creation of the correct web page). Svelte and SvelteKit are made by the same team and work together wery well.

The main benefits of Svelte are:

- Creating reactive UI
- Split UI parts in components. These live in their own files and have their own scripts and styles
- There's no need for Svelte-specific versions of JavaScript libraries, unlike you may need in React for example
- There's almost no performance overhead to have reactivity, as Svelte compiles your code to insert reactivity rather than shipping a lot of JavaScript code to the client.

The [Svelte interactive tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte) is a great place to learn pretty much everything about it, as there are very few concepts to learn. You can also find more information on how Svelte compares to other UI web frameworks on [MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction).

The main benefits of SvelteKit are:

- Persistent page when changing url
- Easy routing and templating. Routes simply mirror your folder structure.

The Svelte tutorial linked above also includes the [tutorial for SvelteKit](https://learn.svelte.dev/tutorial/introducing-sveltekit).

### TypeScript

The project uses [TypeScript](https://www.typescriptlang.org/) to add type safety to JavaScript.

## Deploying

The site is hosted on GitHub Pages with a custom domain (mxt.co.uk).

The setup is the following:

- The site is built and deployed with the GitHub Action in the `.github/workflows/deploy.yml` file.
- In the repository settings for GitHub Pages:
  - GitHub Pages has been enabled;
  - the source is set to GitHub Actions;
  - the custom domain is set accordingly.
- In the DNS provider, the instructions on [how to configure a cutom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain) has been followed. If the repository changes ownership the `CNAME` needs to be updated.

## Keeping it up-to-date

Most dependencies are npm packages, so you can keep them up-to-date simply via npm.

Fonts are not related to npm, so they have to be updated manually.
