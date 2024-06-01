import React from 'react';
import Button from './Button';
import InputField from '../components/InputField';

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>salary</h4>
      <div className='mb-4'>
        <Button onclickHandler={handleClick} value="Hourly" title="Hourly" />
        <Button onclickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onclickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>

      <div>
      <label className='sidebar-label-container'>
        <input
            type='radio'
            name='test'
            id='test'
            value=""
            onChange={handleChange}
        />
          <span className='checkmark'></span>All 
        </label>
        <div>
          <InputField
            handleChange={handleChange}
            value="30" // Converted to string
            title="< 3000k"
            name="test"
          />
        </div>

        <div>
            <InputField
            handleChange={handleChange}
            value={50}
            title="< 5000k"
            name="test"
            />
        </div>

        <div>
            <InputField
            handleChange={handleChange}
            value={80}
            title="< 8000k"
            name="test"
            />
        </div>

        <div>
            <InputField
            handleChange={handleChange}
            value={100}
            title="< 10000k"
            name="test"
            />
        </div>

        </div>
    </div>
  )
}

export default Salary