export const capitalizeFirstLetter = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getWordsSplitedByCaps = (word: string): Array<any> | null => {
  word = capitalizeFirstLetter(word);
  const matchedWords: Array<string> | null = word.match(/[A-Z][a-z]+|[0-9]+/g);

  if (matchedWords) {
    return matchedWords;
  } else {
    return [word];
  }
};

export const getFormattedLabel = (label: string): string | undefined => {
  const words: Array<any> | null = getWordsSplitedByCaps(label);

  const wordsUpperCased = words?.map((word: string) => {
    return capitalizeFirstLetter(word);
  });
  return wordsUpperCased?.join(" ");
};
