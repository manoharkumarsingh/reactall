import React from 'react';
class CourseCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: " ",
        }

        this.handleField = this.handleField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.nameRef = React.createRef();
        this.descRef = React.createRef();
    }

    handleField() {
        this.setState({
            name: this.nameRef.current.value,
            desc: this.descRef.current.value
        })
    }

    handleSubmit() {
        // courseModule.addCourse(this.state);
    }

    handleUpdate() {
        console.log("Update Handle Course Details");
    }

    render() {
        return (
            <div className="modal fade" id="courseModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content rounded-0 border-0 p-4">
                        <div className="modal-header border-0">
                            <h3>Course Details</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="#" className="row">
                                <div className="col-12">
                                    <input type="text" className="form-control mb-3" name="courseName" placeholder="Course Name" value={this.state.name} ref={this.nameRef} onChange={this.handleField} />
                                </div>
                                <div className="col-12">
                                    <textarea type="text" className="form-control mb-3" name="courseDetails" placeholder="Course Details" value={this.state.desc} onChange={this.handleField} ref={this.descRef}>{this.state.desc}</textarea>
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CourseCreate;