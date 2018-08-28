import React from 'react';

export default ({ input, key, placeholder, meta }) => {
  return (
    <div key={key} className="input-field col s12">
      <input {...input} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <span className="red-text">{meta.error}</span>
      ) : (
        ''
      )}
    </div>
  );
};
