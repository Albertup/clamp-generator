# Madmoco Clamp Generator

An intuitive web-based tool for generating responsive CSS `clamp()` functions. This generator helps you create fluid typography and scalable layouts with ease, ensuring your designs look great on any screen size.

## Features

- **Fluid Typography**: Easily create font sizes that scale smoothly between a minimum and maximum size based on the viewport width.
- **Responsive Layouts**: Generate `clamp()` functions for any CSS property, like padding, margin, or width, to create fully responsive components.
- **Pixel and REM Units**: Switch between `px` and `rem` units for both input and output to fit your project's needs.
- **Intuitive Interface**: A simple and clean UI that makes it easy to configure your clamp values.
- **Copy to Clipboard**: Instantly copy the generated CSS rule with a single click.

## How to Use

1.  **Set Viewport Range**: Define the minimum and maximum viewport widths where the scaling should occur.
2.  **Set Property Range**: Enter the minimum and maximum values for the CSS property you want to scale (e.g., `font-size`).
3.  **Generate**: The tool instantly generates the `clamp()` function.
4.  **Copy**: Click the copy button to grab the CSS rule and paste it into your project.

## Getting Started

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/Madmoco/clamp-generator.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd clamp-generator
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```

## Available Scripts

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm test`: Runs the test suite.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.