"use strict";

    //A test suite to read book data
describe("Inverted Index Suite", function(){
    let newIndex, books, sampleString;
        
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

        newIndex.createIndex(books);

        sampleString = "As &you can see here, we have defined *the function, useCounter(), as the target of the self-executing function %block.";
    });

    describe("Class Inverted Index Class", function() {
        it("Inverted Index should be a class", function() {
            expect(typeof(newIndex)).toBe("object");
        });

    });

    describe("Suite to Tokenize String", function() {
        it("Method tokenize should create and return a correct array of all words from a supplied string", function() {
            expect(newIndex.tokenize(sampleString)).toBeDefined();
            expect(newIndex.tokenize(sampleString).length).toBe(20);
            expect(newIndex.tokenize(sampleString)).not.toContain("&");
        });
    });

    describe("Suite to Create Unique Words", function() {
        it("Method uniqueWords should create and return a correct array of words", function() {
            expect(newIndex.uniqueWords(sampleString)).toBeDefined();
            expect(newIndex.uniqueWords(sampleString).length).toBe(16);
        });
    });

    describe("Suite to Create Index", function() {
        it("Method createIndex should create an index mapping words to document locations", function() {
            expect(newIndex.createIndex(books)).toBeDefined();
            expect(newIndex.index.heroku).toBeDefined();
            expect(Object.keys(newIndex.index).length).toBe(38);
        });
    });

    describe("Suite to Read Data", function() {
        it("JSON file should not be empty", function() {
            expect(newIndex.indexWords.length).toBeGreaterThan(0);
        });
    });
    describe("Suite to Search Index", function() {
        it("Method searchIndex should return documents containing the search item", function() {
            let searches = newIndex.searchIndex("heroku");
            expect(JSON.stringify(searches)).toBe(JSON.stringify([0]));
            expect(newIndex.searchIndex("andela")).toBe("We are Sorry but that word is not found in our database");
        });
    });
        
});