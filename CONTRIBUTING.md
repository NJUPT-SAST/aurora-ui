# Contributing

Thanks for your interest in contributing to ui.sast.fun. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.


## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.

## Structure

This repository is structured as follows:

```
packages
├── ui-react
│    └── lib
│       └── ${component-name}
│          ├── index.module.scss
│          └── index.tsx
└──  ui-universal
      └── lib
           └──components
                └── ${component-name}
                   ├── index.module.scss
                   └── index.tsx
docs
└── docs
```

| Path                     | Description                              |
| ------------------------ | ---------------------------------------- |
| `packages/ui-react`      | The React components for the website.    |
| `packages/ui-universal`  | The web components for the website.      |
| `docs`                   | The docs for the components.             |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/SAST-UI.git
```

### Navigate to project directory

```bash
cd SAST-UI
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace.

#### Examples

1. To run the `sast-ui-react.vercel.app` website:

```bash
pnpm run ui-react:dev
```

2. To run the `ui-react` package:

```bash
pnpm run ui-react:start
```

3. To run the `ui-universal` package:

```bash
pnpm run ui-uni:dev
```

## Documentation

The documentation for this project is located in the `docs` workspace. You can run the documentation locally by running the following command:

```bash
pnpm run docs:dev
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `docs` directory.


## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

We don't allow git commits, please use pnpm commit and follow the steps to select your commit.
```bash
pnpm commit
```

## Requests for new components

If you have a request for a new component, please open a issue on GitHub. We'll be happy to help you out.


## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

Currently only the react component library supports test, and the test code is in development

```bash
pnpm --filter @sast/ui-react test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
