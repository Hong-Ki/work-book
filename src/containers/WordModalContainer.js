import React, {Component} from 'react';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as modalActions from '../modules/modal';

import Modal from '../components/Modal'

class WordModalContainer extends Component {
    handleMean = {

        check: (mean) => {
            const {modal} = this.props;
            const index = modal.getIn(['word', 'means']).findIndex( value => value.get('mean') === mean);
            
            if (index < 0 || mean === '' || mean === null || typeof(mean) === 'undefined' ) {
                return -1;
            }

            return index;
        },

        add : (mean) => {
            const {ModalActions, modal } = this.props;
            const isExist = this.handleMean.check(mean);

            // 입력한 뜻이 존재 하지 않을 경우
            if (isExist < 0 ) {
                ModalActions.addMean( mean );
            }

        },

        remove : (idx) => {
            const { ModalActions, modal }= this.props;
            const index = Number(idx);

            if (index < modal.getIn(['word','means']).size ){
                
                ModalActions.removeMean(index);
            }
            
        },

        change: (idx, mean)=> {
            const { ModalActions, modal }= this.props;
            const index = Number(idx);

            ModalActions.changeMean( {index, mean} );
        }

    }

    handleAdd = () => {
        const {WordsActions, modal} = this.props;
        const word = Map({
            word : modal.getIn(['word', 'word']),
            means : modal.getIn(['word', 'means']).map(mean => mean.get('mean')),
            isComplete : false,
            id : 0
        });

        WordsActions.create(word);
    }

    handleCancel = () => {
        const {ModalActions} = this.props;
        ModalActions.hide();
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
        const {handleMean, handleChange, handleAdd, handleCancel} = this;
        const {modal} = this.props;
        return (
            <div>
                {
                    modal.get('visible') && (
                                    <Modal
                                        modal={modal}
                                        onChange={handleChange}
                                        onAddMean={handleMean['add']}
                                        onChangeMean={handleMean['change']}
                                        onRemoveMean={handleMean['remove']}
                                        onAdd={handleAdd}
                                        onCancel={handleCancel}
                                    />
                    )
                }
            </div>
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