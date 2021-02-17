import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'


class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          goals: []
        };
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.history.push('/home')
        }

        const url = "http://localhost:3001/goals";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ goals: response }))
          .catch(() => this.props.history.push("/"));
    }


render() {
        const { goals } = this.state;

        const completedGoals = goals.filter((goal, index) => (
            goal.completed === true && goal.user_id === this.props.currentUser.id
        ));

        const allGoals = completedGoals.map((goal, index) => (
            <div className='GoalCardC ui fluid card'>
                <div className="content">
                    {/* <i class="right floated like icon">{goal.tag_id}</i> */}
                    <button class="circular ui right floated olive icon button">
                        <i class="check icon"></i>
                    </button>
                    <div className="header">{goal.name} <i class="small right floated list icon"> {goal.tasks.length}</i></div>
                </div>

                <div className="black description">
                    {goal.info}
                </div>

                <div class="extra content">
                    <span class="left floated like">
                    <i class="calendar outline icon"></i>
                    {goal.date}
                    </span>
                    <span class="right floated star">
                    <i class="clock outline icon"></i>
                    {goal.time}
                    </span>   
                </div>
                <Link to={`/goals/${goal.id}`}><div class="ui bottom attached button">
                    <i class="angle down icon"></i>
                    Details
                </div></Link>
                

            </div>
        ));

        const noGoals = (
            <div className='GoalCard ui fluid card'>
                <div className="content">
                    <h4>
                        No goals completed yet.
                    </h4>
                </div>
            </div>
        )


    

    return (
        
        <div className='Goals'>

  

            <div className="Main ui two column centered grid">
 
                <div className="sixteen wide column">
                    {goals.length > 0 ? allGoals : noGoals}
                </div>
            </div>

        </div>
    );
  }


}

const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser,
      goals: state.goals
    }
  }

export default connect(mapStateToProps)(Complete);