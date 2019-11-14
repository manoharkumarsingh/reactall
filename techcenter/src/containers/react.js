import React from 'react';
import { reactjs } from "../store/actions/quesans";
import { connect } from "react-redux";
class Reactjs extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {

    }
    render() {
        return (
            <div className="main container">
                <h1>React Page</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        react: state.Skill.react
    };
}
const mapDispatchToProps = dispatch => ({
    reactjs: async () => dispatch(reactjs()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reactjs);

