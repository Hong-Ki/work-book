import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import classNames from 'classnames/bind';
import {MdAdd} from 'react-icons/md';
import {Map, List} from 'immutable';

import * as modalActions from '../modules/modal'
import * as styles from '../style/layout.module.scss'

import Button from '../components/Button';

const cx = classNames.bind(styles);

class FooterContainer extends Component {

    handleShow = () => {
        const {ModalActions} = this.props;

        ModalActions.show();
    }

    render () {
        const {handleShow} = this;

        return (
            <div 
                className={cx('footer')}
                onClick={handleShow}
            >
                <Button>
                    <MdAdd/>
                </Button>
            </div>
        )
    }
};

export default connect(
    null,
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
) (FooterContainer);