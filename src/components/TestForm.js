import React, {Component} from 'react';

//Component
//import Input from './Input';

class TestForm extends Component {

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange({
            answer : e.target.value
        })
    }

    render() {
        const { keyword, onTest } = this.props;

        const {handleChange} = this;

        return (

            <div>
                <form>
                    <input 
                        value={keyword} 
                        placeholder="단어의 뜻을 입력하세요." 
                        onChange={handleChange}
                    />
                </form>
                <button
                    onClick={onTest}
                >
                CHECK
                </button>
            </div>
        )
    }
}

export default TestForm;