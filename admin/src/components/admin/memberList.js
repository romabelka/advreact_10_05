import React, {Component} from 'react';
import {connect} from 'react-redux';
import {membersList} from "../../ducks/auth";

class MemberList extends Component {
    render() {
        const {membersList} = this.props;

        return (
            <div>
            {membersList && membersList.length > 0 ?
                <table cellSpacing={0} cellPadding={6} style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.td}>First name</th>
                        <th style={styles.td}>Last Name</th>
                        <th>e-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membersList.map(member => <tr key={member.email}>
                        <td style={styles.td}>{member.firstname}</td>
                        <td style={styles.td}>{member.lastname}</td>
                        <td>{member.email}</td>
                    </tr>)}
                    </tbody>
                </table>
                : null}
            </div>
        );
    }
}

export default connect(state => ({membersList: membersList(state)}),)(MemberList);

const styles = {
    table: {
        marginTop: 30,
        border: 1,borderStyle: 'solid', borderColor: '#000'
    },
    td: {
        borderRight: 1,
        borderLeft: 0,
        borderTop: 0,
        borderBottom: 0,
        borderStyle: 'solid',
        borderColor: '#000',
    }
}