import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as modalActions from '../modules/modal';

import Modal from '../components/Modal'

class WordModalContainer extends Component {
    handleBulr = (mean) => {
        const {ModalActions, modal } = this.props;

        const input = {
            word : modal.getIn(['word', 'word']),
            mean : mean
        }

        ModalActions.change(
            input
        );

    }

    handleChange = (word) => {
        const {ModalActions} = this.props;

        const input = {
            word : word,
            mean : ''
        }

        ModalActions.change(
            input
        );
    }

    render () {
        const {handleBulr, handleChange} = this;
        const {modal} = this.props;
        return (
            <Modal
                modal={modal}
                onBlur={handleBulr}
                onChange={handleChange}
            />
        );
    }
}

export default connect(
    (state) => ({
        modal:state.modal
    }),
    (dispatch) => ({
        WordsActions: bindActionCreators(wordsActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
) (WordModalContainer);