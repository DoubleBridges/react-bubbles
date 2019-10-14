import React, { useState } from "react";
import { axiosWithAuth, customAxios } from '../axiosWithAuth';
import axios from 'axios';

const initialColor = {
  color: "",
  code: { hex: "#" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors)
  const [editing, setEditing] = useState(false);

  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color)
  };

  const saveEdit = (e, color) => {
    e.preventDefault();
    axios
      .get(`https://cors-anywhere.herokuapp.com/http://thecolorapi.com/id?hex=${color.code.hex.slice(1)}`)
      .then(res => {
        setColorToEdit({ ...colorToEdit, color: res.data.name.value })
        console.log(res, res.data.name.value, colorToEdit)
        customAxios(`http://localhost:5000/api/colors/${color.id}`, color)
          .then(res => updateColors(res.data))
          .catch(err => console.log('ColorList: useEffect: PUT:', err))
      })
      .catch(err => console.log('ColorList: saveEdit: GET:', err))    
  };



  // const addColor = color => {
    // axios
      // .get()
  // }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => updateColors(res.data))
      .catch(err => console.log('ColorList: DELETE:', err))

  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li
            key={color.color}
            onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form
          onSubmit={e => saveEdit(e, colorToEdit)}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <form
        onSubmit={e => addColor(e, colorToEdit)}>
        <legend>add a color</legend>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => setEditing(false)}>cancel</button>
        </div>
      </form> */}
    </div>
  );
};

export default ColorList;