import React, {Component} from 'react';

import WordBox from './WordBox';

import classNames from 'classnames/bind';

import * as styles from '../style/word.module.scss';

const cx = classNames.bind(styles);

class WordBoxList extends Component {

    render() {
        const { words, mode, onEdit, onRemove, keyword, onBlur,isAtive } = this.props;
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
                className={ cx( isAtive?['wordList','open']:['wordList','close'] )}
            >
                {wordList}
            </div>
        )
    }
}


export default WordBoxList;