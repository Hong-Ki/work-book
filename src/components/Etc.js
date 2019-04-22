import React, {Component} from 'react';

import classNames from 'classnames/bind';
import wordStyle from '../style/word.module.scss';

import Button from './Button';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';

const cx = classNames.bind(wordStyle);

class Etc extends Component {
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
        const {handleSound} = this;
        
        return (
            <div className={cx('etc')}>
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

export default Etc;