import React, { useState } from 'react';
// Styles
import styles from './dropdown.module.scss';

/**
 * Accesses a nested object property using a string path.
 * If the path includes a '+', the function will concatenate the values found at the specified paths.
 *
 * @param {Object} obj - The object to access.
 * @param {String} path - The string path (e.g., 'user.first_name + user.last_name').
 * @returns {*} The value at the specified path in the object, or concatenated values if '+' is used.
 */
const getNestedValue = (obj, path) => {
  if (path.includes('+')) {
    return path
      .split('+')
      .map((part) => part.trim())
      .reduce((acc, part) => {
        const value = part
          .split('.')
          .reduce((acc, part) => acc && acc[part], obj);
        return acc ? `${acc} ${value}` : value;
      }, '');
  } else {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
};
/**
 * Dropdown component
 *
 * @param {string} id The unique identifier of the dropdown field
 * @param {string} name The name of the dropdown field
 * @param {string} placeholder The placeholder text of the dropdown field
 * @param {function} onChange The function to be called when the value of the dropdown field changes
 * @param {function} onBlur The function to be called when the dropdown field loses focus
 * @param {array} items An array of objects containing the dropdown options. The structure of the objects is specified by labelKey and valueKey.
 * @param {string} labelKey The object property to use as the display label for each dropdown option. Supports nested paths like 'user.name'.
 * @param {string} valueKey The object property to use as the value for each dropdown option. Supports nested paths.
 * @param {string} color The color of the dropdown field (default: "black")
 *
 * @returns {React.Element} A fieldset element containing a dropdown field
 */
const Dropdown = React.forwardRef(
  (
    {
      id,
      name,
      placeholder,
      onChange,
      onBlur,
      items,
      labelKey = 'name',
      valueKey = 'id',
      color = 'black',
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleDropdownChange = (e) => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const dropdownColorClass =
      color === 'white' ? styles.dropdown__white : styles.dropdown__black;

    return (
      <fieldset className={`${styles.dropdown} ${dropdownColorClass}`}>
        <label htmlFor={id}>{placeholder}</label>
        <select
          id={id}
          name={name}
          value={selectedValue}
          onChange={handleDropdownChange}
          onBlur={onBlur}
          ref={ref}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {items.map((item, index) => (
            <option key={index} value={getNestedValue(item, valueKey)}>
              {getNestedValue(item, labelKey)}
            </option>
          ))}
        </select>
      </fieldset>
    );
  }
);

export default Dropdown;
