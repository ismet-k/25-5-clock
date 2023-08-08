import React from "react";

class Break extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "Break",
            length: 5 * 60,
        };
    }

    handleBreakDecrement() {
        this.setState({
            length: this.state.length - 1,
        });
    }

    handleBreakIncrement() {
        this.setState({
            length: this.state.length + 1,
        });
    }

    render() {
        return (
            <span>{this.state.length}</span>
        )
    }
}

export default Break;