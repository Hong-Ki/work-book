import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as wordsActions from '../modules/words';
import * as testActions from '../modules/test';

import WordBoxList from '../components/WordBoxList';

import classNames from 'classnames/bind';

class TestContainer extends Component {

    render() {
        const {words, keyword, mode} = this.props;

        return (
            <div></div>
        )
    }
}

export default connect(

    (state) => ({
        words : state.words,
        mode : state.base.get('mode')
    }),
    (dispatch) => ({
        WordActions: bindActionCreators(wordsActions, dispatch),
        TestActions: bindActionCreators(testActions, dispatch)
    })

) (WordBoxListContainer);