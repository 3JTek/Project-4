
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import selectStyles from '../common/SelectStyles'
<label className="label">Categories</label>

return
<div className="field has-addons">
  <Select
    isMulti
    clearValue
    styles={selectStyles}
    value={categoriesSelected.map(category => {
      return {value: category.type, label: category.type }
    }
    )}
    name="categories"
    options={categories.map(category => {
      return {value: category.type, label: category.type, id: category.id}
    }
    )}
    onChange={handleChange}
    components={makeAnimated()}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  <button
    onSubmit={handleSubmit}
  >Submit</button>
</div>
