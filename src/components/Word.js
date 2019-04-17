import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

//style
import styles from '../style/word.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Word extends Component {
    static propTypes = {
        word : PropTypes.string,
        id : PropTypes.string
    }

    render() {
        const { word, id } = this.props;

        return (
            <div
                className={cx('word')}
            >
                {word}
            </div>
        )
    }
}

export default Word;