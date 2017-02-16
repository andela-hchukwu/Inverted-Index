"use strict";

    //A test suite to read book data
describe("Inverted Index Suite", function(){
    let newIndex, books;
        
    beforeEach(function(){
        //Create an instance of the Index class
        newIndex = new InvertedIndex();
        
        //Test files to be used in the Index
        books = [
            {"title": "Heroku",
            "text":"You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved"
            },
            {"title": "Coveralls",
            "text": "See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered."
            }         
        ];
    });

    describe("Class Inverted Index Class", function() {
        it("Inverted Index should be a class", function(){
            expect(typeof(newIndex)).toBe("object");
        });

    });

    describe("Suite to Read Data", function(){
        it("JSON file should not be empty", function(){
            newIndex.createIndex(books);
            expect(newIndex.index.heroku).toBeDefined();
        });
    });
        
});