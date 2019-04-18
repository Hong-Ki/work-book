import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

//style
import styles from '../style/word.module.scss';
import classNames from 'classnames/bind';

//Component
import TestForm from './TestForm';

const cx = classNames.bind(styles);

class Means extends Component {
    static propTypes = {
        means : ImmutablePropTypes.listOf(
            PropTypes.string
        ),
        mode : PropTypes.string,
        onChange : PropTypes.func,
        onTest : PropTypes.func
    }

    render() {
        const { means, mode, onChange, onTest, onEdit } = this.props;
        let contents;

        if ( mode === 'test' ) {
            contents = (
                <TestForm
                    means={means}
                    onChange={onChange}
                    onTest={onTest}
                />
            )
        } else {
            contents = means.toJS()[0];
            for ( let i=1; i<means.size; i++ ) {
                contents += (", "+means.toJS()[i]);
            }
        }
        
        return (
            <div
                onClick={onEdit}
                className={cx('mean')}
            >
                {contents}
            </div>
        )
    }
}

export default Means;