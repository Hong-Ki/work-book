import React, {Component} from 'react';

import WordBox from './WordBox';

class WordBoxList extends Component {

    render() {
        const { words, mode, onEdit, onRemove, keyword, onBlur } = this.props;
        const wordList = words
                            .filter(
                                word => word.get('means').filter( mean => mean.indexOf(keyword) !== -1 ).size > 0
                                        || word.get('word').indexOf(keyword) !== -1
                            )
                            .map (
                                word => 
                                    <WordBox
                                        key={word.get('id')}
                                        keyword={keyword}
                                        word={word}
                                        mode={mode}
                                        onEdit={onEdit}
                                        onRemove={onRemove}
                                        onBlur={onBlur}
                                    />
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