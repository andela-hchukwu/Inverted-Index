[![Build Status](https://travis-ci.org/andela-hchukwu/Inverted-Index.svg?branch=Fix%2F13965538%2Frefactor-code)](https://travis-ci.org/andela-hchukwu/Inverted-Index)
[![Coverage Status](https://coveralls.io/repos/github/andela-hchukwu/Inverted-Index/badge.svg?branch=Fix%2F13965538%2Frefactor-code)](https://coveralls.io/github/andela-hchukwu/Inverted-Index?branch=Fix%2F13965538%2Frefactor-code)
[![Code Climate](https://codeclimate.com/github/andela-hchukwu/Inverted-Index/badges/gpa.svg)](https://codeclimate.com/github/andela-hchukwu/Inverted-Index)

# Inverted-Index
An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

Inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

# **Why the project is useful**
The purpose of an inverted index is to allow user perform fast and full text search

## Usage
* Clone the repository `git clone https://github.com/andela-hchukwu/Inverted-Index.git`
* Run `npm install` to install all dependencies.
* To run test, run `npm test`
* To use inverted index, run `npm start` and go to `localhost://5000`
* Upload your file(s), here is a [sample](https://github.com/andela-hchukwu/Inverted-Index/blob/development/spec/books.json) file.
* Select a file from the uploaded files and click on *create index* to get an index of the selected file.
* To search the created index of a file, select file and enter the word(s) you want to search in the search box.
* Click on *search* to see your result, the result table does not display if none of the searched word(s) is not in the index created.

# **Features**
* Create indices from uploaded file.
* Find the indexes for a particular file.
* Allows single/multiple JSON files upload
* Search created index.

# **How can I get started with the project**
* You can view the application [here](https://indexinverted.herokuapp.com/)

## Technologies and Services
Written in Javascript es6 syntax and nodejs on the backend, with the followinng:
* Jasmine (Test runner)
* Gulp (Task runner)
* Angular js (Frontend views)
* Travic CI (Continious Integration)
* Coveralls (Test coverage percentage)
* Hound CI (Check for style violations)
* HTML/CSS (Frontend)

## Contributions
* Clone the repository.
* Create a new branch for included feature(s).
* Raise a pull request.