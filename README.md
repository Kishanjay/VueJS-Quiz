# Assignment
As a client we want to have a Quiz that takes about 5 minutes to complete.

The user should start by entering his/her name (which is necessary to save the score at the end of the game).
Every 30 seconds a random question will appear on the screen from the trivia api (https://opentdb.com/api.php?amount=1). It can never be the same question.

The answer should be chosen within the 30 seconds timeframe. If this is not the case the answer should be saved as a not valid answer.

When the user answered 10 questions the application should show him the score and the standings which will all be saved locally on the computer (no backend).

There should also be an Easter egg in the application. When someone types the word "RESET ALL" all scores will be removed. Or come up with your own.

## Extra
We created the following assignment to test your Frontend skills/ knowledge. Please create a git repo (can be local) before you start this assignment. When adding a commit please give a proper description to explain your choices. It only has to run in chrome (so you should use es6). Please don't use any boilerplates. You can/may use any framework/lib you want. When finished send a link or send your folder(zip with .git folder)

# Setup
- Install NodeJS
- Run `npm run build`

For development run `npm start`

## Test environment
NPM `v6.11.3`

MacOS `v10.14.3`

# Design decisions
Effectively this application needs to do the following:
- Have a quiz page
- Store the name of the user
- Be able to consume the 'random question' API
- Store the questions previously asked to the user
- Keep track of a timer
- Have an easter egg
- Store scores and standing locally

Since this is a small project the framework of choice will be VueJS and Bootstrap 4 will be used for styling.
Also because the assignment explicitly states not to use any boilerplates, no scaffolding tools are being used.

## Development
The code of this project should adhere to the VueJS and airbnb styleguide.
Run `npm run lint` to lint the source-code.