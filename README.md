# Multi Level Checkbox Facet Exercise

In this excercise, a dynamic and interactive checkbox tree facet component was built. The main aim of the task was to enhance the user experience by providing quick filtering options to refine product listings without causing unnecessary scrolling or confusion.

The task was accomplished using the latest Next.js version for building the overall application structure and providing both server-side rendering capabilities.

React Context was used for data sharing between different components. To keep the codebase maintainable, most of the business logic was encapsulated within a separate custom hook.

The published application can be found [multi-level-checkboxes.vercel.app](https://multi-level-checkboxes.vercel.app/).

## Background

Facets are subset of filtering and help users to quickly refine their options
without losing their way or ending up scrolling on irrelevant products.
In this exercice you are going to build a checkbox tree facet component using react.

Given a server response the ui should display a tree of checkboxes with name and quantities
of the brand category similar to `preview.png` attached to this exercice.

![preview](preview.png)

(preview.png)

---

Use `response.json` attached to this exercice as a server response to build the facet component.
the root category is gender and has a attribute `parent: "0"`.
Feel free to import the file as it in your solution or wrap it with a promise.

---

### Task

1 - Build an ui tree of checkboxes to represent the tree of categories given by `response.json`

2 - Modify the code to show initially only the parent category checkboxes then add toggle to show children.
if the user clicks `Kleding` it should show all the children of `Kleding` and so on.

3 - Add selected category functionality to show selected categories.

4 - Add remove selected category and add remove-all selected categories functionalities.

5 - On each of the child categories, add `select all` checkbox which select all the subtree of categories
example: `select all` checkbox can select all items underneath `Kleding` and so on.

**Requirements and bonus**

- Work should be structured, including a readme.
- Add a screenshot of your final outcome
- Bonus for slick and concise ui with re-usable components
- Bonus for testing.
