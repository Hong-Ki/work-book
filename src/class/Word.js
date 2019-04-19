import {Map, List, fromJS} from 'immutable';
import shortid from 'shortid';

const defaultWord = {
    means : [],
    word : '',
    id : '',
    isComplete : false
};

class Word {
    constructor( word ) {
        for ( let key in defaultWord ) {
            this[key] = word[key] || defaultWord[key];
        }
    }

    isEqual = ( word ) => {
        let isEqual = true;
        for (let key in defaultWord) {
            isEqual = isEqual && this[key].toString() === word[key].toString();
            if (!isEqual) {
                break;
            }
        }

        return isEqual;
    }

    fromModal = () => {
        this.means = this.means.map( mean => mean.mean );

        return this;
    }

    toModal = () => {
        //withImmutable
        const word = fromJS( Map(this) )
                    .set('means', List(
                        this.means.map (
                            mean => Map(
                                { id:shortid.generate(), mean:mean, isEditMod:false}
                            )
                        )
                    ));
        return word;
    }

    toImmutable = () => {
        return Map({
            means : List(this.means),
            word : this.word,
            id : this.id,
            isComplete : this.isComplete
        });
    }
}


export default Word;