# What is Pagination?

Pagination enables the user to select a specific page from a range of pages showing a defined number of data items in each page.

# Types of Pagination

1. **Controlled Pagination** - Controlled version of pagination for when the pagination state is managed by a parent component and showing distincs page numbers where the user has more control on the pages to be selected/loaded.
2. **Progressive Pagination** - Paginator to be used for ordered data where the size of the data is known. Here the page numbers are not visible & navigation is only controlled by the **Previous** & **Next** buttons.

# Pagination-Component
Create a pagination component for a list of items fetched from an API. User navigates between pages, and ensure the data is displayed correctly.

# Required Props

We will need the following props for the Pagination component:

- **totalCount**: represents the total count of data available from the source.
- **currentPage**: represents the current active page. We'll use a 1-based index instead of a traditional 0-based index for our currentPage value.
- **pageSize**: represents the maximum data that is visible in a single page.
- **onPageChange**: callback function invoked with the updated page value when the page is changed.
- **siblingCount** (optional): represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.

From the pagination component we'll invoke the usePagination hook which will take in the following parameters to compute the page ranges -
  - **totalCount**,
  - **currentPage**,
  - **pageSize**,
  - **siblingCount**.

# usePagination Custom Hook Implementation

The pagination hook must return the range of numbers to be displayed in our pagination component as an array. The computation logic should re-compute when either **currentPage**, **pageSize**, **siblingCount**, or **totalCount** changes. The total number of items returned by the hook should remain constant inorder to avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component.

Internally we use the **useMemo** hook to compute the core pagination logic. The useMemo callback will run when any value in the dependency array changes.

# States of a Pagination Component

There could be 4 possible states for a pagination component -

- Total page count is less than the page pills we want to show. In such a case we just return the range from 1 to totalPageCount.
- Total page count is greater than the page pills but only the right DOTS are visible.
- Total page count is greater than the page pills but only the left DOTS are visible.
- Total page count is greater than the page pills and both the left and the right DOTS are visible.

The implementation of the pagination hook is here - https://github.com/sauravmishra1710/Pagination-Component/blob/main/src/pagination-hooks/useControlledPagination.js

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
