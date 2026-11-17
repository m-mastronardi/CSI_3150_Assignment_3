# VinylVault - Indie Record Online Store

**CSI 3150 - Assignment 3A & 3B**

VinylVault is an online record store built using React and Vite. The application allows users to browse vinyl records, filter albums by genre, view individual album details, and add records to a shopping cart. Users can also update their cart, review their order, and complete a checkout form.

---

## Section 1: Project Setup & Execution Instructions

### Prerequisites

Before running the application, make sure the following are installed:

- Node.js version 21 or higher
- npm (included with Node.js)
- Git
- A web browser such as Chrome, Edge, or Firefox
- VS Code (recommended)

### Installation Instructions

1. Clone the VinylVault repository from GitHub:

   ```bash
   git clone https://github.com/m-mastronardi/CSI_3150_Assignment_3.git
   ```

2. Navigate into the project folder:

   ```bash
   cd vinylvault
   ```

   If the repository contains a separate `vinylvault` folder, navigate into that folder instead.

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Make sure React Router is installed:

   ```bash
   npm install react-router-dom
   ```

5. Start the Vite development server:

   ```bash
   npm run dev
   ```

6. After starting the server, the terminal should display a local URL, typically:

   ```text
   http://localhost:5173/
   ```

7. Open the URL in a web browser to view the VinylVault storefront.

8. Verify that the application is working by testing the genre filters, selecting an album to view its details, adding albums to the cart, adjusting quantities, and completing the checkout form.

### Project Directory Structure

The root directory contains `README.md`, `index.html`, `package.json`, and `vite.config.js`, which provide the project documentation and configuration. The `src` folder contains `main.jsx`, `App.jsx`, and `styles.css`, which initialize the application, manage the main functionality, and control the appearance of the website. The `components` folder contains reusable interface elements, while the `pages` folder contains the catalog, album details, and checkout pages. The `data` folder contains `albums.js`, which stores the album information displayed throughout the store.

---

## Section 2: React Component Hierarchy & State Flow Architecture

The VinylVault application is organized into reusable React components. The main `App` component manages the shopping cart and shares information with other components through props and callback functions. React Router allows users to navigate between the catalog, album details, and checkout pages without reloading the website.

### Component Tree

- **`<App />`** - `src/App.jsx`
  - Main component responsible for managing shared application state and connecting the different pages.
  - **State:**
    - `cart` (Array): Stores the albums added to the shopping cart, including their quantities.
    - `isCartOpen` (Boolean): Determines whether the shopping cart drawer is visible.
  - **Calculated Values:**
    - `cartCount` (Number): Total quantity of albums in the cart.
    - `subtotal` (Number): Total cost of all items in the cart.
  - **Callback Functions:**
    - `addToCart(album)`: Adds an album to the cart or increases its quantity if it already exists.
    - `updateQuantity(albumId, change)`: Increases or decreases the quantity of a selected album.
    - `removeFromCart(albumId)`: Removes an album from the cart.
    - `clearCart()`: Empties the cart after a successful checkout.
    - `setIsCartOpen(value)`: Opens or closes the cart drawer.

  - **`<Navbar />`** - `src/components/Navbar.jsx`
    - Displays the VinylVault logo, catalog navigation, and shopping cart button.
    - **State:** None. Receives shared cart information from `App`.
    - **Props:**
      - `cartCount` (Number): Total number of items in the shopping cart.
      - `onToggleCart` (Function): Opens the shopping cart drawer.
    - **Events:**
      - Clicking the logo or catalog link navigates to the home page using React Router's `Link`.
      - Clicking the cart button calls `onToggleCart()`.

  - **`<Routes />`** - React Router
    - Controls which page is displayed based on the current URL.

    - **`<CatalogPage />`** - `src/pages/CatalogPage.jsx`
      - **Route:** `/`
      - Displays the main storefront, genre filtering options, and album grid.
      - **State:**
        - `selectedGenre` (String): Stores the currently selected genre, initially set to `"All"`.
      - **Props:**
        - `onAddToCart` (Function): Adds an album to the shopping cart.
      - **Events:**
        - Clicking a genre filter updates `selectedGenre`.
        - Albums are filtered based on the selected genre.
        - The filtered albums are displayed using `.map()`.
      - **Filtering Options:**
        - All
        - Jazz
        - Electronic
        - Rock
        - Classical

      - **`<AlbumCard />`** - `src/components/AlbumCard.jsx`
        - Reusable component displaying information about an individual album.
        - **State:** None.
        - **Props:**
          - `album` (Object): Contains the album's title, artist, genre, price, image, and other information.
          - `onAddToCart` (Function): Adds the selected album to the cart.
        - **Events:**
          - Clicking an album navigates to `/album/:albumId` using React Router's `Link`.
          - Clicking Add to Cart calls `onAddToCart(album)`.

    - **`<AlbumDetailPage />`** - `src/pages/AlbumDetailPage.jsx`
      - **Route:** `/album/:albumId`
      - Displays detailed information about the selected vinyl record.
      - **State:**
        - `quantity` (Number): Stores the selected purchase quantity, initially set to 1.
      - **Props:**
        - `onAddToCart` (Function): Adds the selected album to the shopping cart.
      - **Events:**
        - Uses `useParams()` to retrieve the album ID from the URL.
        - Increasing or decreasing the quantity updates the `quantity` state.
        - Clicking Add to Cart calls `onAddToCart(album)` for each unit selected.
        - Clicking Back to Catalog returns the user to the storefront.
      - **Displayed Information:**
        - Album cover
        - Album title and artist
        - Genre and price
        - Album description
        - Pressing weight
        - Catalog number
        - Record speed
        - Stock availability

    - **`<CheckoutPage />`** - `src/pages/CheckoutPage.jsx`
      - **Route:** `/checkout`
      - Allows users to review their order and enter shipping and payment information.
      - **State:**
        - `formData` (Object): Stores the information entered into the checkout form.
        - `isSubmitted` (Boolean): Tracks whether the order was successfully submitted.
      - **Props:**
        - `cart` (Array): Contains the current shopping cart items.
        - `subtotal` (Number): Total price of the items in the cart.
        - `onClearCart` (Function): Clears the cart after checkout.
      - **Events:**
        - `handleChange(event)`: Updates the form state when the user enters information.
        - `handleSubmit(event)`: Prevents the default form submission, validates the required fields, clears the cart, and displays an order confirmation.
        - Uses `useNavigate()` to navigate between pages.
      - **Form Fields:**
        - Full Name
        - Street Address
        - City
        - Postal Code
        - Card Details
      - **Order Summary:**
        - Displays each album, its quantity, individual price, and subtotal.

  - **`<CartDrawer />`** - `src/components/CartDrawer.jsx`
    - Displays a slide-over shopping cart that can be opened or closed without reloading the page.
    - **State:** None. Cart information and drawer visibility are managed by `App`.
    - **Props:**
      - `cart` (Array): Contains the albums currently in the cart.
      - `isOpen` (Boolean): Controls whether the cart drawer is visible.
      - `subtotal` (Number): Total price of all items.
      - `onClose` (Function): Closes the cart drawer.
      - `onUpdateQuantity` (Function): Updates an album's quantity.
      - `onRemove` (Function): Removes an album from the cart.
    - **Events:**
      - Clicking the close button calls `onClose()`.
      - Clicking the plus or minus buttons calls `onUpdateQuantity(albumId, change)`.
      - Clicking Remove calls `onRemove(albumId)`.
      - Clicking Proceed to Checkout closes the drawer and navigates to `/checkout` using `useNavigate()`.
    - **Displayed Information:**
      - Album title and price
      - Quantity controls
      - Remove button
      - Calculated subtotal
      - Checkout button

### State Management and Data Flow

The shopping cart state is stored in `App.jsx` because multiple components need access to the same information. When a user adds an album from the catalog or album detail page, the `addToCart()` function updates the cart using React's `useState` hook.

The updated cart information is passed to the navigation bar, cart drawer, and checkout page through props. This keeps the cart badge, item quantities, and calculated totals synchronized as the user moves between pages.

The cart is updated using immutable operations such as `.map()`, `.filter()`, and the spread operator instead of directly modifying the original state. This allows React to recognize changes and update the interface automatically.

The catalog page manages its own genre filter because that information is only needed on the catalog page. Similarly, the checkout page manages its own form data because the shipping and payment fields are only used during checkout.

### React Router Navigation

The application uses `react-router-dom` to manage navigation between three main routes:

- `/` - Displays the album catalog and genre filters.
- `/album/:albumId` - Displays detailed information about a selected album.
- `/checkout` - Displays the order summary and checkout form.

React Router's `Link`, `useParams()`, and `useNavigate()` allow users to move between pages without refreshing the browser. This creates a single-page application where the shopping cart remains synchronized throughout the shopping experience.
