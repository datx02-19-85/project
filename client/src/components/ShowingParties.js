import React, { Component } from "react"

class ShowingParties extends Component {

    constructor(props) {
        super(props)
        this.state = { dataKey: null }
    }

    componentDidMount() {
        const { drizzle } = this.props
        const contract = drizzle.contracts.Voting

        // const dataKey = contract.methods["parties"].cacheCall()
        // this.setState({ dataKey })
    }

    render() {
        return (<div><h4>Party</h4></div>)
    }
}

export default ShowingParties