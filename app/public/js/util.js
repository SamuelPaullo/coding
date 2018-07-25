String.prototype.replaceWords = function (word, newWord) {

	word = word.replace(/\s/g, ' ');

	var string = this;

    // replace com expressao regular
    var allWords = new RegExp( '\\b' + word + '\\b','gi');
    var newString = string.replace(allWords, newWord);

    return newString;
};


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
