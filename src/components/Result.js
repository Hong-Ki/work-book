import React, {Component} from 'react';

import classNames from 'classnames/bind';
import style from '../style/index.module.scss';

import Button from './Button';

//icons
import {IoMdVolumeHigh} from 'react-icons/io';
import {MdDelete} from 'react-icons/md';

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

    handleRemove = (e) => {
        const {id, onRemove} =this.props;

        onRemove(id);
    }

    render() {
        const {isComplete, onSound, id} = this.props;
        const {handleSound, handleRemove} = this;
        
        return (
            <div className={cx('result')}>
                <Button 
                    className={cx('wordContainerButton')} 
                    onClick={handleSound}
                >
                    <IoMdVolumeHigh />
                </Button>
                <Button 
                    className={cx('wordContainerButton')} 
                    onClick={handleRemove}
                >
                    <MdDelete />
                </Button>
            </div>
        )
    }
}

export default Result;