# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Primary Functionality: The code creates a React application that allows users to:
Upload a document (PNG, JPG, JPEG).
Input a URL.
Generate a QR code from the inputted URL.
Display the uploaded document along with the generated QR code overlaid on it.
Download the document with the embedded QR code as a PNG image.

Framework/Library:
React: The code is written in React, using hooks like useState and useRef.
qrcode.react: This library is used for generating QR codes.
Native Canvas API: Used to render the document image and the QR code on a single, manipulable canvas.

Key Technologies/APIs:
JavaScript: The core language.
JSX: Used for defining the UI structure.
React Hooks: useState for managing component state, useRef for creating a ref to the document element.
File API: Used to handle file uploads (e.g., event.target.files).

URL.createObjectURL: To create a temporary URL for the uploaded file.
Canvas API (ctx.drawImage): To render images directly to a hidden canvas and overlay the QR code.
canvas.toDataURL To save the canvas as a png/jpg file.
Document.createElement To create an anchor tag
a.download To enable downloading

External Resources:
React Documentation: https://react.dev/
qrcode.react: https://www.npmjs.com/package/qrcode.react
Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
File API https://developer.mozilla.org/en-US/docs/Web/API/File_API
URL.createObjectURL https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
Document.createElement https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
a.download https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download
canvas.toDataURL https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
