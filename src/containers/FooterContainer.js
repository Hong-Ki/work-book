import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classNames from 'classnames/bind';
import {MdAdd, MdRemove} from 'react-icons/md';
import {List} from 'immutable';

import * as modalActions from '../modules/modal';
import * as wordsActions from '../modules/words';
import * as baseActions from '../modules/base';
import * as testActions from '../modules/test';

import * as styles from '../style/layout.module.scss';

import Button from '../components/Button';

import Word from '../class/Word';

const cx = classNames.bind(styles);

class FooterContainer extends Component {

    handleShow = () => {
        const {ModalActions} = this.props;
        const input = document.createElement('input');
        input.onchange = this.checkFile;
        input.accept= 'application/json';
        input.type='file';
 
        if (window.confirm('Do you want add word from JSON file?')) {
            input.click();
            return;
        }

        ModalActions.show();
    }

    handleRemove = () => {
        const {WordsActions} = this.props;
        const idList = List(document.querySelectorAll('input[type="checkbox"]:checked'))
                            .map(element => element.id);
                            
        if ( idList.isEmpty() ) {
            window.alert('Please select more than one!');
            return;
        }

        if ( window.confirm('do you want remove?')) {
            WordsActions.remove(idList);
        }
        
    }

    checkFile = (e) => {
        const file = e.target.files[0];
        const fr = new FileReader();

        if (e.target.value === '' ) {
            return;
        }

        if ( file.type !== e.target.accept ) {
            window.alert('It is wrong file type!');
            e.target.value='';
            return;
        }

        fr.onload = (e) => {
            const contents = e.target.result;
            const {WordsActions} = this.props;

            try {
                const words = JSON.parse(contents);
                words.map( word => WordsActions.create( new Word(word).toImmutable() ) );
            } catch {
                window.alert( 'Error of parsing. please check your file this site : https://jsonlint.com' );
                return;
            }
        }
        
        fr.readAsText(file);


    }

    handleSubmit = () => {
        const {TestActions,ModalActions,BaseActions} = this.props;

        TestActions.submit();
        BaseActions.setMode('WORDS');
        ModalActions.showResult();
    }

    render () {
        const {handleShow, handleRemove, handleSubmit} = this;
        const {mode} = this.props;

        const buttons = (mode !== 'TEST') ?
        (
            <div 
                className={cx('footer')}
            >
                <Button
                    onClick={handleShow}
                    >
                    <MdAdd/>
                </Button>
                <Button
                    onClick={handleRemove}
                >
                    <MdRemove/>
                </Button>
                
            </div>
        )
        :
        (
            <div 
                className={cx('footer')}
            >
                <Button
                    onClick={handleSubmit}
                >
                    SUBMIT
                </Button>
            </div>
        )

        return (
            <div>
                {buttons}
            </div>
        )
    }
};

export default connect(
    (state) => ({
        mode : state.base.get('mode')
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        WordsActions : bindActionCreators(wordsActions, dispatch),
        BaseActions : bindActionCreators(baseActions, dispatch),
        TestActions : bindActionCreators(testActions, dispatch)
    })
) (FooterContainer);