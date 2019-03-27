import React, { Component } from "react"

class ShowingStatus extends Component {

    constructor(props) {
        super(props)
        this.state = { dataKey: null }
    }


    componentDidMount() {
        const { drizzle } = this.props
        const contract = drizzle.contracts.VoteShowingResult

        const dataKey = contract.methods["didVote"].cacheCall()
        this.setState({ dataKey })
    }

    render() {
        // get the contract state from drizzleState
        const { VoteShowingResult } = this.props.drizzleState.contracts;
        // using the saved `dataKey`, get the variable we're interested in
        const voteStatus = VoteShowingResult.didVote[this.state.dataKey];

        if (typeof voteStatus === 'undefined') return ""

        return (
            <div>
                <p>Votes left: {voteStatus.value ? "0" : "1"} / 1</p>
            </div>
        )

    }

}

export default ShowingStatus