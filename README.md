# Warryn

<p align="center">
  <img alt='Welcome from Warryn' src='/docs/WarrynWelcome.png'/>
</p>

This is a [Routable](https://routable.com) test project to "consume GitHub issues to create a simple interface that will aid a product manager in prioritizing issues and/or enhancements for a given repository."

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Table of Contents

- [Setup](#setup)
- [Run](#run)
- [Test](#test)
- [Project Specs](#project-specs)
- [Decision Points](#decision-points)
- [Todos](#todos)

## Setup

Computer prerequisites:

- Node.js v10
- npm corresponding to that version of Node.js
- Internet connection
- Chrome

```bash
git clone https://github.com/adamjaffeback/warryn.git
cd warryn/
npm install
```

## Run

`npm start` will automatically run a dev server, compile the code, and launch your default browser window to localhost:3000 (on Linux-based machines, at least).

## Testing

Launches Jest in verbose, interactive watch mode. There are snapshot and JS unit tests. See [Project Specs](#project-specs) for links.

## Project Specs

- [x] User provides GitHub token when starting the app
- [x] Repository choices are formatted in a single column interface
- [x] When a repository is selected, the app switches to a two column interface, with repos on the left and issues on the right
- [x] GitHub issues are ranked by default: created, desc
- [x] Reordering a repository is persisted via [sessionStorage](https://github.com/adamjaffeback/warryn/search?q=sessionStorage&unscoped_q=sessionStorage) if the user refreshes the application (however the token is not)
- [x] Uses Redux, see [`src/state`](https://github.com/adamjaffeback/warryn/tree/master/src/state)
- [x] Uses Jest and includes a least one snapshot
  - See [`src/components/RepoCard`](https://github.com/adamjaffeback/warryn/blob/master/src/components/RepoCard/RepoCard.test.js) for snapshots
  - See [`src/state/actions/tests`](https://github.com/adamjaffeback/warryn/blob/master/src/state/actions/tests/issuesActions.test.js) and [`src/state/reducers/tests`](https://github.com/adamjaffeback/warryn/blob/master/src/state/reducers/tests/userReducer.test.js) for basic unit testing of state transformation
- [x] No direct usage of CSS framework used
- [x] Uses multiple `@media` queries, see [PrioritizePage](https://github.com/adamjaffeback/warryn/blob/master/src/pages/PrioritizePage/PrioritizePage.css) for one
- [x] Responsive design
- [x] Issue column cards contain assignee avatar, title, created time, and last updated in text form
- [x] Some component reusability

## Decision Points

### Repos without Open Issues

The spec didn't mention how to handle repositories without open issues. The application is fundamentally used to order issues, so repositories with no open issues aren't very interesting to us. I also made a bet that project managers are unlikely to want to order issues which are closed.

However, I chose to render *all* the repos to illustrate that I understood using GitHub's API's pagination Link header feature and *had* fetched all available repos. To make the repos more visually distinct, we display the repositories with issues above repositories without issues. Repositories without open issues have disabled styling/functionality, because clicking on them wouldn't fetch any issues for ordering.

### GitHub Validation

I'm not doing any sort of checking about the validity of the GitHub token. This isn't a complicated task, but it was a feature that, as a test project, I felt could be relegated to the todo list.

### Routing

I could've built this application without routing (`react-router-dom`) by using Redux state variables to toggle pages, but felt that including an example of routing was a better presentation of production code.

### Styling

I adopted colors and themes from Routable's marketing pages. For example, meet Warryn...my modest attempt at bringing Warren to life. :-) I also used the colors, gradients, and background SVG from the Routable "hero" section. Design is pseudo-Material Design with drop shadows, slight rounding of corners, and use of Card components.

The pages are organized with CSS Grid and components are generally internally styled with Flexbox.

Using a styling framework would really simplify some of the responsive work, but it was explicitly disallowed.

The Warryn SVG and favicon are totally open source.

## Todos

> "You do not have to finish the challenge, but your project must work."

In no particular order:

1. Validate GitHub token.
1. Add error UI for the user. Currently, errors are only `console.error`ed; add a [Snackbar](https://material-ui.com/components/snackbars/) when something goes wrong.
1. Make a better, more styled loading component and place it correctly on the CSS Grid.
1. On mobile, when a user selects a repository, the RepoSelector reformats from vertical to horizontal. Center the selected RepoCard in the overflow-x scroll.
1. Add a home/logout button.
1. Add SASS.
1. Add filters to toggle visibility of repos with/without issues.
1. Include open and closed issues for a repo, adding filters to toggle their visibility.
1. Use a service worker for resource caching/PWA.
