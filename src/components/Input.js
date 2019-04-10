import PropTypes from 'prop-types';

Input.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default Input;