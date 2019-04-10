import React, {Component} from 'react';

import WordBox from './WordBox';

class WordBoxList extends Component {
    
    render() {
        const { words, search, mode, onSound } = this.props;

        const wordList = words.
                            map(
                                word => (
                                    <WordBox
                                        key={word.get('id')}
                                        word={word}
                                        mode={mode}
                                        onSound={onSound}
                                    />
                                )
                            )

        return (
            <div>
                {wordList}
            </div>
        )
    }
}


export default WordBoxList;