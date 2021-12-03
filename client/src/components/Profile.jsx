import React, { useContext } from 'react'
import IssueForm from './IssueForm.jsx'
import IssueList from './IssueList.jsx'
import { UserContext } from '../context/UserProvider.jsx'

export default function Profile(props) {
    const {
        user: {
            username
        },
        getUserIssues,
        addIssue,
        editIssue,
        deleteIssue,
        issues,
        addVote,
        removeVote,
        addComment
    } = useContext(UserContext)
    console.log(issues)

    const { location } = props

    return (
        <div className="profile">
            <h1>Welcome @{username}!</h1>
            <h3>Add A Issue</h3>
            <IssueForm submit={addIssue} btnText="Add Issue" />
            <h3>Your issues</h3>
            <IssueList issues={issues} editIssue={editIssue} deleteIssue={deleteIssue} addVote={addVote} removeVote={removeVote} addComment={addComment} getUserIssues={getUserIssues} location={location} />
        </div>
    )
}