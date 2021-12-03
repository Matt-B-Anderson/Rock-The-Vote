import React from 'react'
import Issue from './Issue.jsx'

export default function IssueList(props) {
  const { issues, editIssue, deleteIssue, addVote, removeVote, addComment, getUserIssues, location } = props
  return (
    <div className="issue-list">
      {issues.map((issue, index) => <Issue issue={issue} key={index} editIssue={editIssue} deleteIssue={deleteIssue} addVote={addVote} removeVote={removeVote} addComment={addComment} getUserIssues={getUserIssues} location={location} />)}
    </div>
  )
}