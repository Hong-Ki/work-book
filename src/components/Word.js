import React, {Component} from 'react';
import {Map, List} from 'immutable';
import {connect} from 'redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Word extends Component {

    static propTypes = {
        word: ImmutablePropTypes.mapContains({
            kor : ImmutablePropTypes.listOf(
                PropTypes.string
            ),
            eng : PropTypes.string,
            id : PropTypes.number,
            isComplete : PropTypes.bool
        }),
        search : ImmutablePropTypes.mapContains({
            kor : PropTypes.string,
            eng : PropTypes.string
        }),
        mode : PropTypes.string,
        onCheck : PropTypes.func,
        onGiveUp : PropTypes.func
    }

    render() {
        const { word, onCheck, onGiveUp } = this.props;
        return (
            <div>
                <p>ENG</p>
                <p>KOR</p>
                <p>IS_COMPLETE</p>
            </div>
        )
    }
    /*render() {
        const { word, onCheck, onGiveUp } = this.props;
        return (
            <div>
                <p>{word.get('eng')}</p>
                <p>{word.get('kor')}</p>
                <p>{word.get('isComplete')}</p>
            </div>
        )
    }*/
}

export default Word;