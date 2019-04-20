import React, {Component} from 'react';

import classNames from 'classnames/bind';
import buttonStyle from '../style/button.module.scss';
import wordStyle from '../style/word.module.scss';

import Button from './Button';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';
import {MdDelete} from 'react-icons/md';

const cx = classNames.bind(wordStyle);
const cx2 = classNames.bind(buttonStyle);

class Result extends Component {
    handleSound = (e) => {
        e.stopPropagation();
        const { word } = this.props;
        let msg = new SpeechSynthesisUtterance(word);
        msg.lang='en-us';
        msg.volume=1;
        msg.rate=1;
        msg.pitch=1;
        
        speechSynthesis.speak(msg);
    }
    
    render() {
        const {isComplete, onSound} = this.props;
        const {handleSound, handleRemove} = this;
        
        return (
            <div className={cx('result')}>
                <Button 
                    className={'wordContainerButton'} 
                    onClick={handleSound}
                >
                    <IoMdVolumeHigh />
                </Button>
            </div>
        )
    }
}

export default Result;