import React, {Component} from 'react';
import classNames from 'classnames/bind';

import * as styles from '../style/word.module.scss';

const cx = classNames.bind(styles);

class FileForm extends Component{
    handleClick = (e)=> {
        const target = e.target.tagName === 'DIV'? e.target:e.target.parentElement;
        let text = '';
        for (let i=0; i<target.childElementCount; i++) { 
            let el = target.children[i];
            let tab = el.className.charAt (
                el.className.indexOf('tab') +3 
                );
                
                for (let j=0; j<Number(tab); j++) {
                text += '\t';
            }
            text += el.textContent+'\n';
        }
        
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        window.alert('copy complete this text!');
    }
    render () {
        const {mode} = this.props;
        const {handleClick} = this;

        return (
            <div className={ mode === 'FILE FORM' ? cx(['fileForm','open']) : cx(['fileForm','close']) }>
                <h1>File is must be JSON. (*.json)</h1>
                <div 
                    className={cx('text')}
                    onClick={handleClick}
                >
                    <p>[</p>
                    <p className={cx('tab1')}>{'{'}</p>
                    <p className={cx('tab2')}>"wrod":"enter your word to here",</p>
                    <p className={cx('tab2')}>"means": [</p>
                    <p className={cx('tab3')}>"enter your mean to here", </p>
                    <p className={cx('tab3')}>"if you need more means. concat like this",</p>
                    <p className={cx('tab3')}>...</p>
                    <p className={cx('tab2')}>]</p>
                    <p className={cx('tab1')}>{'}'}</p>
                    <p className={cx('tab1')}>{',{'}</p>
                    <p className={cx('tab2')}>"wrod":"if you need more words. concat like this",</p>
                    <p className={cx('tab2')}>"means": [</p>
                    <p className={cx('tab3')}>"enter your means to here", </p>
                    <p className={cx('tab3')}>...</p>
                    <p className={cx('tab2')}>]</p>
                    <p className={cx('tab1')}>{'}.....'}</p>
                    <p>]</p>
                </div>
            </div>
        )
    }
}

export default FileForm;