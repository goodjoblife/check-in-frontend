
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CheckInList extends React.Component {
    static propTypes = {
        params: PropTypes.oneOfType([PropTypes.object]).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            checkIns: null,
        }
    }

    componentDidMount() {
        const key = this.props.params.key;
        const url = `https://test3.markchen.space/api/check-ins/${key}`;
        axios.get(url).then(response => {
            this.setState({
                checkIns: response.data,
            });
        });
    }

    render() {
        return (<div />);
    }
}

export default CheckInList;