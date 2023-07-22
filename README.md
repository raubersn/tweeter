# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Users can create short posts of up to 140 characters and have them append to the main page. Posts are sequential, with the most recent posts appearing at the top of the page. To do so, Tweeter fetches a list of posts from a simplified ‘server’ and allows users to add posts to this list dynamically. All the requests will be made asynchronously.

The web page is responsive and will present a single-column layout for screens smaller tha 1024px wide, and a two-columns layout for the wider ones.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above

## Screenshots

1. Layout for screens over 1024px wide
!["Screenshot of the UI for screens bigger than 1024 px"](https://github.com/raubersn/tweeter/blob/master/docs/big-screen.jpg)

2. Layout for screens below 1024px wide
!["Screenshot of the UI for screens smaller than 1024 px"](https://github.com/raubersn/tweeter/blob/master/docs/small-screen.jpg)

3. Validations
!["Screenshot of the empty message validation"](https://github.com/raubersn/tweeter/blob/master/docs/empty-message.jpg)
!["Screenshot of the message characters limit validation"](https://github.com/raubersn/tweeter/blob/master/docs/long-message.jpg)
