import React, {Component} from 'react';
import classNames from 'classnames/bind';

import * as styles from '../style/modal.module.scss';

const cx = classNames.bind(styles);

class Result extends Component {

    render () {
        const {correct, wrong, resultVisible, onClick} = this.props;
        return ( 
            <div
                className={cx(resultVisible?['result','open-wrapper']:'result')}
                onClick={onClick}
            >   
                <div className={cx(resultVisible?['correct','open']:['correct','close'])} >
                        {correct}
                </div>
                <div className={cx(['total'])}>
                        /{correct+wrong}
                </div>
            </div>
        )
    }
}

export default Result;