# What is Pagination?

Pagination enables the user to select a specific page from a range of pages showing a defined number of data items in each page.

# Types of Pagination

1. **Controlled Pagination** - Controlled version of pagination for when the pagination state is managed by a parent component and showing distincs page numbers where the user has more control on the pages to be selected/loaded.
2. **Progressive Pagination** - Paginator to be used for ordered data where the size of the data is known. Here the page numbers are not visible & navigation is only controlled by the **Previous** & **Next** buttons.

We will implement both the type of pagination with custom hooks for both.

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

## Sibling Count

Represents the minimum number of page buttons to be shown on each side of the current page button. 
Defaults to 1.

### 1 Sibling
<img src="https://github.com/sauravmishra1710/Pagination-Component/blob/dev/Demo/1%20Sibbling.png">

### 2 Siblings
<img src="https://github.com/sauravmishra1710/Pagination-Component/blob/dev/Demo/2%20Sibblings.png">

### 3 Siblings
<img src="https://github.com/sauravmishra1710/Pagination-Component/blob/dev/Demo/3%20Sibblings.png">

# States of a Pagination Component

There could be 4 possible states for a pagination component -

- Total page count is less than the page pills we want to show. In such a case we just return the range from 1 to totalPageCount.
- Total page count is greater than the page pills but only the right DOTS are visible.
- Total page count is greater than the page pills but only the left DOTS are visible.
- Total page count is greater than the page pills and both the left and the right DOTS are visible.

The implementation of the pagination hook is here - https://github.com/sauravmishra1710/Pagination-Component/blob/main/src/pagination-hooks/useControlledPagination.js

# Basic Ideas of the Implementation

Calculate total pages from totalCount and pageSize as follows:

```const totalPageCount = Math.ceil(totalCount / pageSize);```

```Math.ceil``` will return the next higher integer value based on the result & this will ensure that we are reserving an extra page for the remaining data to prevent any potential data loss.

The core idea of the implementation is that we identify the range of numbers to show in our pagination component and then join them together with the DOTS (...) if required & return the final range. Based on the 4 possible states of the pagination component mentioned above, we decide what to return in the final range - 

- For the first scenario where our totalPageCount is less than the total number of pills we calculated based on the other params, we just return a range of numbers 1..totalPageCount .
- For the other scenarios, we go about identifying whether we need DOTS on the left or right side of the currentPage by calculating the left and right indices after including the sibling pills to the currentPage and then make our decisions.

# Consume the Hook to Implement the Pagination Component

- Do not render a Pagination component if there are fewer than two pages (and then we return null) .
- Render the Pagination component as a list with left and right arrows which handle the previous and next actions the user makes. In between the arrows, we map over the paginationRange and render the page numbers as pagination-items. 
- The DOTS are rendered as unicode character should there be a need to display them.
- As a special handling we add a disabled class to the left/right arrow if the currentPage is the first or the last page, respectively. We disable the pointer-events and update the styles of the arrow icons through CSS if the icon needs to be disabled.
- Add click event handlers to the page pills which will invoke the onPageChanged callback function with the updated value of currentPage.

Code: https://github.com/sauravmishra1710/Pagination-Component/blob/main/src/components/ControlledPagination.jsx

Finally, the component will need to maintain - 

- a **currentPage** state.
- a **pageSize** state. This will maintain the total number of items to be displayed on the page based on a user selection input.
- calculate the data to be rendered for a given page using a map.
- a **paginationType** state to switch between the **controlled** (default) & **progressive** pagination types.

# Demo & Screenshots

### Controlled
<img src="https://github.com/sauravmishra1710/Pagination-Component/blob/dev/Demo/Controlled.png" alt="Controlled Pagination" width="900" height="300">

### Progressive
<img src="https://github.com/sauravmishra1710/Pagination-Component/blob/dev/Demo/Progressive.png" alt="Progressive Pagination" width="900" height="300">

### Demo

https://github.com/user-attachments/assets/fccc002f-ceb5-4ba1-93cd-12e545eeb6c0


# Reference

https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
