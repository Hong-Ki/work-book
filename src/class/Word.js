import { Map, List, fromJS, isImmutable } from 'immutable';
import shortid from 'shortid';

const defaultWord = {
  means: [],
  word: '',
  id: '',
  isComplete: false,
  completeCount: -1,
};

class Word {
  constructor(word) {
    const isImmu = isImmutable(word);

    for (const key in defaultWord) {
      this[key] = (isImmu ? word.get(key) : word[key]) || defaultWord[key];
    }

    if (this.id === '') {
      this.id = shortid.generate();
    }
  }

  isEqual = word => {
    let isEqual = true;
    for (const key in defaultWord) {
      isEqual = isEqual && this[key].toString() === word[key].toString();
      if (!isEqual) {
        break;
      }
    }

    return isEqual;
  };

  fromModal = () => {
    this.means = this.means.map(mean => mean.get('mean'));

    return this;
  };

  toModal = () => {
    // withImmutable
    const word = fromJS(Map(this)).set(
      'means',
      List(
        this.means.map(mean =>
          Map({ id: shortid.generate(), mean, isEditMod: false }),
        ),
      ),
    );
    return word;
  };

  toImmutable = () => {
    return Map({
      means: List(this.means),
      word: this.word,
      id: this.id,
      isComplete: this.isComplete,
      completeCount: this.completeCount,
    });
  };

  toTest = () => {
    return this.toImmutable()
      .set('isCorrect', false)
      .set('answers', List([]))
      .set('means', List(this.means).map(mean => mean.replace(/ /g, '')));
  };
}

export default Word;
