> [!IMPORTANT]
> აპლიკაციაში ყველაფერი დაწერილია 0 - დან. ბიბლიოთეკების დახმარების გარეშე.
> ქეშირების სისტემის გაკეთება რათქმაუნდა მარტივად შეიძლებოდა React-query - ის გამოყენებთ
> თუმცა თქვენი მოთხოვნის შესაბამისად 0 - დან დავწერე useState - ის დახმარებით
> Infinite scroll - ს ვიყენებ მხოლოდ იმ შემთხვევაში თუ იუზერმა უკვე დასერჩა ფოტო,
> პოპულარული ფოტოების გამოტანის დროს არ ვიყენებ Infinite scroll - ს.

# Sweeft React.js Acceleration Program Project

This project is part of the Sweeft - Making Science React.js Acceleration Program. The application utilizes the Unsplash API to display images. It incorporates a caching system using React state and local storage, and features an infinite scroll functionality.

## Key Features

- **Unsplash API Integration:** The application fetches and displays images from the Unsplash API.

- **Caching System:** The project implements a caching mechanism using React state and local storage to enhance performance and reduce redundant API calls.

- **Infinite Scroll:** Users can seamlessly scroll through a collection of images, providing a smooth and dynamic user experience.

- **Search Functionality:** The app includes a search input where users can search for specific images, making it easy to find content of interest.

- **Image Modal:** Clicking on an image opens a modal that displays the full-size image along with additional details such as views, likes, and downloads.

- **Search History:** Users have access to a search history feature, allowing them to view their past searches.

## Folder Structure

The project structure is organized as follows:

```plaintext
react-app-starter/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── context/
  │   ├── hooks/
  │   ├── pages/
  │   ├── secrets/
  │   ├── styles/
  │   ├── types/
  │   ├── App.tsx
  │   ├── main.tsx
  │   └── ...
  ├── .gitignore
  ├── package.json
  └── README.md
```

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/levaniakobidze/sweeft-unsplash-api.git
   cd /sweeft-unsplash-api
   npm install
   npm run dev
   ```
