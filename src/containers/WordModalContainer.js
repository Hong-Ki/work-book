import React, {Component} from 'react';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import shortid from 'shortid';

import Word from '../class/Word';

import * as wordsActions from '../modules/words';
import * as modalActions from '../modules/modal';

import Modal from '../components/Modal'

class WordModalContainer extends Component {
    handleMean = {

        add : ( mean ) => {
            const {ModalActions, modal } = this.props;
            const index = modal.getIn( ['word', 'means'] ).findIndex( item => item.get('mean').replace(/ /g,'') === mean.replace(/ /g,'') );
            // 입력한 뜻이 존재 하지 않을 경우
            if (index < 0 ) {
                const meanObj = Map({
                    id : shortid.generate(),
                    mean :mean,
                    isEditMode : false
                });
                ModalActions.addMean( meanObj );
            } else {
                alert('exist');
            }

        },

        remove : (id) => {
            const { ModalActions, modal }= this.props;
            const index = modal.getIn( ['word', 'means'] ).findIndex( mean => mean.get('id') === id);

            if (index >= 0 ){
                ModalActions.removeMean(index);
            }
            
        },

        change: (id, value)=> {
            const { ModalActions, modal }= this.props;
            const index = modal.getIn( ['word', 'means'] ).findIndex( mean => mean.get('id') === id );
            const otherMeans = modal.getIn(['word', 'means']).delete(index);

            let mean = value;

            if ( otherMeans.findIndex( mean => mean.get('mean').replace(/ /g,'') === value.replace(/ /g,'') ) > -1 ) {
                alert('dup');
                mean = modal.getIn(['word', 'means', index, 'mean']);
            }

            ModalActions.changeMean( {index, mean} );
        },
        
        toggleMode: (id) => {
            const {ModalActions, modal} = this.props;
            const index = modal.getIn( ['word', 'means'] ).findIndex( mean => mean.get('id') === id);

            ModalActions.toggleMeanMode(index);
        }

    }

    handleWord = {
        add: () => {
            const {WordsActions, ModalActions, modal} = this.props;
            const word = Map({
                word : modal.getIn(['word', 'word']),
                means : modal.getIn(['word', 'means']).map(mean => mean.get('mean')),
                isComplete : false,
                id : shortid.generate()
            });
            
            WordsActions.create(word);
            ModalActions.hide();
        },
        change: () => {
            const {WordsActions, ModalActions, modal} =this.props;
            const word = new Word( modal.get('word').toJS() ).fromModal();
            
            WordsActions.update(word);
            ModalActions.hide();
        }
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
        const {handleMean, handleChange, handleWord, handleCancel} = this;
        const {modal} = this.props;

        return (
            <div>
                {
                    modal.get('visible') && (
                                    <Modal
                                        modal={modal}
                                        mode={modal.get('mode')}
                                        onChange={handleChange}
                                        toggleMeanMode={handleMean['toggleMode']}
                                        onAddMean={handleMean['add']}
                                        onChangeMean={handleMean['change']}
                                        onRemoveMean={handleMean['remove']}
                                        onAdd={handleWord[modal.get('mode')]}
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