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
            const index = modal.getIn(['word', 'means']).findIndex( value => value === mean);
            
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

                const input =Map({
                    word : modal.getIn(['word', 'word']),
                    means : modal.getIn(['word', 'means']).push(mean)
                })
    
                ModalActions.change( input );
            }

        },

        remove : (id) => {
            const { ModalActions, modal }= this.props;
            const index = Number(id);

            if (index < modal.getIn(['word','means']).size ){
                const input = Map({
                    word : modal.getIn(['word', 'word']),
                    means : modal.getIn(['word','means']).delete(index)
                });

                console.log(input.toJS())

                ModalActions.change(input);
            }
            
        },

        change: (id, mean)=> {
            const { ModalActions, modal }= this.props;
            const index = Number(id);

            if (index < modal.getIn(['word','means']).size 
                    && modal.getIn(['word','means',index]) !== mean ){
                const input = Map({
                    word : modal.getIn(['word', 'word']),
                    means : modal.getIn(['word','means']).set(index, mean)
                });

                console.log(input.toJS())

                ModalActions.change(input);
            }
        }

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
        const {handleMean, handleChange} = this;
        const {modal} = this.props;
        return (
            <Modal
                modal={modal}
                onChange={handleChange}
                onAddMean={handleMean['add']}
                onChageMean={handleMean['change']}
                onRemoveMean={handleMean['remove']}
x            />
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