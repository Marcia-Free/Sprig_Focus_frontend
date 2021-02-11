import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'


class Goals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          goals: []
        };
    }

    componentDidMount() {
        const url = "http://localhost:3001/api/v1/goals";
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


        const currentGoals = goals.filter((goal, index) => (
            goal.completed === false
        ));

        const allGoals = currentGoals.map((goal, index) => (
            <div className='GoalCard grey ui fluid card'>
            {/* goal={goal.name}
                info={goal.info}
                date={goal.date}
                time={goal.time}
                complete={goal.completed}
                user={goal.user_id}
                tag={goal.tag_id} */}

                <div className="content">
                    {/* <i class="right floated like icon">{goal.tag_id}</i> */}
                    {/* <button class="circular ui right floated icon button" onClick={this.markComplete}> */}
                        {/* <i class="check icon"></i> */}
                    {/* </button> */}
                    <div className="header">{goal.name}</div>
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
            <div className='GoalCard ui header'>
            <h4>
                No goals yet. Why not add a new one?
            </h4>
            </div>
        )


    

    return (
        
        <div className='Goals'>
        <NavBar />

                <h1>Focus</h1>

        <VirtualPet />
            <div className="ButtonColumn sixteen wide column">
                <Link to='/new'>
                    <button className="ui yellow labeled icon button">
                    <i className="columns icon"></i>
                    Create Goal
                </button></Link>

                <button className="ui yellow   right labeled icon button">
                    <i className="sticky note icon"></i>
                    Create Task
                </button>
            </div>
  

            <div className="ui two column centered grid">
                <div className="six wide grey column">Placeholder</div>
                <div className="eight wide olive column">
                    {goals.length > 0 ? allGoals : noGoals}
                </div>
            </div>

            


        <Footer />
        </div>
    );
  }


}
export default Goals;