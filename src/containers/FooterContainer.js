import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classNames from 'classnames/bind';
import {MdAdd, MdRemove} from 'react-icons/md';
import {List} from 'immutable';

import * as modalActions from '../modules/modal'
import * as wordsActions from '../modules/words'
import * as styles from '../style/layout.module.scss'

import Button from '../components/Button';

const cx = classNames.bind(styles);

class FooterContainer extends Component {

    handleShow = () => {
        const {ModalActions} = this.props;

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

    render () {
        const {handleShow, handleRemove} = this;

        return (
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
    }
};

export default connect(
    null,
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        WordsActions : bindActionCreators(wordsActions, dispatch)
    })
) (FooterContainer);