import React, { useContext } from 'react'
import IssueList from './IssueList.jsx'
import { UserContext } from '../context/UserProvider.jsx'

export default function Public(props) {
    // const sortedIssues = issues.sort((a, b) => b.votes - a.votes)
    const {
        issues,
        addVote,
        removeVote,
        addComment
    } = useContext(UserContext)
    console.log(issues)

    const { location } = props

    return (
        <div className="public">
            <IssueList issues={issues} addVote={addVote} removeVote={removeVote} addComment={addComment} location={location} />
        </div>
    )
}