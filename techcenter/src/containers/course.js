import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { skill } from "../store/actions/skill";


class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: {}
        };
    }
    async componentDidMount() {
        await this.props.allSkill();
    }
    render() {
        var skill = this.props.skill.data;
        return (
            <div className="main container">
                <div style={{ paddingTop: '10px' }}>
                    <section className="page-title-section overlay" data-background="images/backgrounds/page-title.jpg">
                        <div className="row">
                            <div className="col-md-8">
                                <ul className="list-inline custom-breadcrumb">
                                    <li className="list-inline-item"><Link className="h2 text-primary font-secondary" to={"courses"} > Our Courses</Link></li>
                                    <li className="list-inline-item text-white h3 font-secondary " />
                                </ul>
                                <p className="text-lighten">Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others.</p>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="row">
                            {
                                skill.map(item => {
                                    return (
                                        <div className="w3-card-4 col-md-4" key={item._id} >
                                            <img src={"../img/" + item.name + ".png"} alt="Alps" style={{ width: '100%' }} />
                                            <div className="w3-container w3-center">
                                                <Link to={"coursesingle"} >
                                                    <h4 className="card-title">{item.name}</h4>
                                                </Link>
                                                <p className="card-text mb-4 overflow">{item.desc}</p>
                                                <Link
                                                    to={{
                                                        pathname: item.name.toLowerCase().replace(' js', '') + `/${item._id}`,
                                                    }}
                                                    className="w3-button w3-indigo w3-block">
                                                    Start Study
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                    {/* /courses */}
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        skill: state.Skill.courses
    };
}
const mapDispatchToProps = dispatch => ({
    allSkill: async () => dispatch(skill()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses);

