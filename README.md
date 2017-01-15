##Weather App

###local server directions
*assume user has node installed on local machine*

1. clone the repository to local machine
2. `npm install` - load dependencies
3. Install env module and set up file

  - _in terminal_
  `npm i dotenv -S` - install env npm package
  `touch .env` - create env file to handle local hosting and api key
`- _in .env file_
  `PORT=8765`
  `KEY=your-unique-api-key`
4. Start the server
  - _in terminal_
   `nodemon` - this will start the server on the localhost chosen in .env file
5. open localhost://#### in browser

![example](https://cloud.githubusercontent.com/assets/15387439/21964853/cdf0f82c-db21-11e6-856a-a9885c5c6e9a.png)
