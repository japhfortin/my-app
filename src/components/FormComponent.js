import React, {Component} from 'react';  


class FormComponent extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        form: {
            age: -1,
            activity: -1,
            weight: 0
        },
        ageOptions: [
          {
            label: '1 - 4 months', 
            value: .07 
          }, 
          { 
            label: '5 - 7 months', 
            value: 0.05 
          }, 
          { 
            label: '8 - 10 months', 
            value: 0.03 
          }, 
          { 
            label: '11 - 12 months', 
            value: 0.02 
          }, 
          { 
            label: '1 year +', 
            value: 0.02 
          }
        ],
        activityOptions: [
          { 
            label: 'Low', 
            value: 0 
          }, 
          { 
            label: 'Medium', 
            value: 0.005 
          }, 
          { 
            label: 'High', 
            value: 0.01 
          }
        ],
        isSubmitted: false
            
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
    this.getFoodValue = this.getFoodValue.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.setState(
      prevState => ({
        isSubmitted: {
          ...prevState.isSubmitted
        }
      }),
      () => console.log(this.state.isSubmitted)
    );
    console.log(this.state.form)
  }

  handleAge(e) {
    let age = e.target.value
    this.setState(
      prevState => ({
        form: {
          ...prevState.form,
          age: age
        }
      })
    );
  }
  
  handleActivity(e) {
    let activity = e.target.value
    this.setState(
      prevState => ({
        form: {
          ...prevState.form,
          activity: activity
        }
      })
    );
  }

  handleWeight(e) {
    let weight = e.target.value
    this.setState(  
      prevState => ({
        form: {
          ...prevState.form,
          weight: weight
        }
      })
    );
  }

  getFoodValue() {
    let age = parseFloat(this.state.form.age)
    let activity = parseFloat(this.state.form.activity)
    let weight = parseFloat(this.state.form.weight)
    let foodValue = (age + activity) * weight
    return foodValue
  }

  render() {
    const vm = this
    let isSubmitted = this.state.isSubmitted

    function ComputeAge() {
      let age = parseFloat(vm.state.form.age)
      return (<p>{age} ({typeof age})</p>)
    }

    function ComputeActivity() {
      let activity = parseFloat(vm.state.form.activity)
      return (<p>{activity} {typeof activity}</p>)
    }

    function ComputeWeight() {
      let weight = parseFloat(vm.state.form.weight)
      return (<p>{weight} {typeof weight}</p>)
    }

    function ComputeFoodValue() {
      let value = parseFloat(vm.getFoodValue())
      return (value)
    }

    function ComputeFoodValueToFixed() {
      let value = parseFloat(vm.getFoodValue()).toFixed(2)
      return (value)
    }
    

    return (
      <div>
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <div className="form-group">
              <label>Age</label>
              <select 
              value={this.state.form.age}
              onChange={this.handleAge}
              className="form-control">
                <option value="">-- how old is your dog? --</option>
                {this.state.ageOptions.map((option, key) => {
                  return (
                    <option key={key} value={option.value} label={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
          </div>
          <div className="form-group">
              <label>Activity</label>
              <select 
              value={this.state.form.activity}
              onChange={this.handleActivity}
              className="form-control">
                <option value="">-- how big is your dog? --</option>
                {this.state.activityOptions.map((option, key) => {
                  return (
                    <option key={key} value={option.value} label={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
          </div>
          <div className="form-group">
              <label>Weight</label>
              <input
              className="form-control"
              type="text"
              value={this.state.form.weight}
              onChange={this.handleWeight}
              placeholder="Weight (lbs)"/>
          </div>
          
          <div className="text-right">
            <button
              className="btn btn-primary"
              type="submit"
              title="Submit">
              Submit
            </button>
          </div>
        </form>

        {isSubmitted &&
        <div>
          <table className="table">
            <tbody>
            <tr>
                <th>Age value: </th>
                <td><ComputeAge /></td>
              </tr>
              <tr>
                <th>Activity value: </th>
                <td><ComputeActivity /></td>
              </tr>
              <tr>
                <th>Weight value: </th>
                <td><ComputeWeight /></td>
              </tr>
            </tbody>
          </table>
          <p><strong><ComputeFoodValueToFixed/> lbs per day.</strong></p>
          <p><ComputeFoodValue/></p>
        </div>
        }
      </div>


    );
  }
}

export default FormComponent;