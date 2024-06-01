import React from 'react';
import InputField from '../components/InputField';

const Location = ({ handleChange }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>

            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test" id="test" value="" onChange={handleChange} />
                    <span className='checkmark'></span>All
                </label>
            </div>

            <div>
                <InputField handleChange= {handleChange} value="Mumbai" title="Mumbai" name="test" />
                <div>
                <InputField handleChange= {handleChange} value="Bengaluru" title="Bengaluru" name="test" />
                </div>
                <div>
                <InputField handleChange= {handleChange} value="Pune" title="Pune" name="test" />
                </div>
                <div>
                <InputField handleChange= {handleChange} value="Delhi" title="Delhi" name="test" />
                </div>
                <div>
                <InputField handleChange= {handleChange} value="kolkata" title="Kolkata" name="test" />
                </div>
            </div>
        </div>
    );
};

export default Location;
