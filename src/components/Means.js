import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

//style
import styles from '../style/word.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Means extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    componentDidMount(prevProps, prevState, snapshot) {
        const current = this.ref.current;
        if (current === null ) {
            return;
        }
        if (current.offsetWidth > current.parentElement.offsetWidth ) {
            current.className = cx('overflowText');
        }

    }
    componentDidUpdate(prevProps, prevState) {
        const current = this.ref.current;
        if (current === null ) {
            return;
        }
        if (current.offsetWidth > current.parentElement.offsetWidth ) {
            current.className = cx('overflowText');
        }

    }

    static propTypes = {
        means : ImmutablePropTypes.listOf(
            PropTypes.string
        ),
        mode : PropTypes.string,
        onBlur : PropTypes.func
    }

    render() {
        const { means, mode, onBlur, onEdit } = this.props;
        let contents;

        if ( mode === 'TEST' ) {
            contents = (
                <input
                    placeholder={'ex) Mean1, Mean2'}
                    onBlur={onBlur}
                />
            )
        } else {
            contents = means.toJS()[0];
            for ( let i=1; i<means.size; i++ ) {
                contents += (", "+means.toJS()[i]);
            }

            contents = (
                <div>
                    <span
                        ref={this.ref}
                    >
                        {contents}
                    </span>
                </div>
            )
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