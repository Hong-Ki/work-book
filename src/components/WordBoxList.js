import React, {Component} from 'react';

import WordBox from './WordBox';

class WordBoxList extends Component {

    render() {
        const { words, mode, onEdit, onRemove } = this.props;
        const wordList = words.
                            map(
                                word => (
                                    <WordBox
                                        key={word.get('id')}
                                        word={word}
                                        mode={mode}
                                        onEdit={onEdit}
                                        onRemove={onRemove}
                                    />
                                )
                            )

        return (
            <div
            >
                {wordList}
            </div>
        )
    }
}


export default WordBoxList;