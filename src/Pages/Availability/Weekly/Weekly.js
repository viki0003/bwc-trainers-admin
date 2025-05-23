import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import "./weekly.css";

const Weekly = () => {
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
    <div className="locked-in">
      <div className="locked-in-content">
        <div className="locked-in-header">
          <p>Weekly Availability Selector</p>
          <span>4 May 2024 - 10 May 2024 </span>
        </div>
        <div className="locked-in-table">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Availability</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>
                  <div className="availability-select">
                    <select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="checkbox-group">
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                    <div className="checkbox-group-item">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label htmlFor="ingredient1">10:00 AM – 12:00 PM</label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Weekly;
