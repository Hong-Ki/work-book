import React, {Component} from 'react';

import classNames from 'classnames/bind';
import style from '../style/index.module.scss';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';

const cx = classNames.bind(style);

class Result extends Component {
    handleSound = (e) => {
        const { word } = this.props;
        // const index = state.findIndex( word => word.get('id') === action.payload );
        let msg = new SpeechSynthesisUtterance(word);
        msg.lang='en-us';
        msg.volume=1;
        msg.rate=1;
        msg.pitch=1;

        speechSynthesis.speak(msg);
    }

    render() {
        const {isComplete, onSound, id} = this.props;
        const {handleSound} = this;
        
        return (
            <span className={cx('result')}>
                <button className={cx('addButton')} onClick={handleSound}>
                    <IoMdVolumeHigh />
                </button>
            </span>
        )
    }
}

export default Result;