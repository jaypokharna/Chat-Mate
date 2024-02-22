/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Gender = ({onCheckboxChange,selectedGender}) => {
  return (
    <>  
    <div className="flex">
        <div className="form-control">
            <label className="label gap-2 cursor-pointer">
                <span className='label-text'>Male</span>
                <input type="checkbox"  className='checkbox border-slate-900'
                onChange={()=>onCheckboxChange("male")}
                checked={selectedGender === "male"}/>
            </label>
        </div>
        <div className="form-control">
        <label className="label gap-2 cursor-pointer">
                <span className='label-text'>Female</span>
                <input type="checkbox"  className='checkbox border-slate-900'
                onChange={()=>onCheckboxChange("female")}
                checked={selectedGender === "female"}/>
            </label>
        </div>
    </div>
    </>
  )
}

export default Gender