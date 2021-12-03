import React, { useState } from 'react'
import CommentList from './CommentList'
import IssueForm from './IssueForm'

const initInputs = {
  comment: ""
}

export default function Issue(props) {
  const { issue, editIssue, deleteIssue, addVote, removeVote, addComment, getUserIssues, location } = props

  const [inputs, setInputs] = useState(initInputs)
  const { comment } = inputs

  const [editToggle, setEditToggle] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addComment(inputs, issue._id)
    getUserIssues()
    // setInputs(initInputs)
  }

  function upVote() {
    addVote(issue._id)
  }

  function downVote() {
    removeVote(issue._id)
  }

  function displayBtns() {
    if (location.pathname.match(/public/)) {
      return null;
    }
    return <span>
      <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>
        Edit
      </button>
      <button onClick={() => deleteIssue(issue._id)}>Delete</button>
    </span>
  }

  console.log(issue)

  return (
    <div className="issue">
      { !editToggle ?
        <>
          <h1>{issue.title}</h1>
          <h3>{issue.description}</h3>
          <h3>Votes: {issue.votes}</h3>
          <h3>Comments:</h3>
          <div>
            <CommentList comments={issue.comments} />
          </div>
          <span>
            <button
              onClick={upVote}>
              upvote
        </button>
            <button
              onClick={downVote}>
              downvote
        </button>
          </span>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Add a comment"
              onChange={handleChange}
              name="comment"
              id="comment"
              cols="20"
              rows="5"
              value={comment}
            />
            <button>Add Comment</button>
          </form>

          {displayBtns()}
        </>
        :
        <>
          <IssueForm
            title={issue.title}
            description={issue.description}
            submit={editIssue}
            btnText="Edit Issue"
            _id={issue._id}
          />
          <button
            onClick={() => setEditToggle(prevToggle => !prevToggle)}
          >
            Close
          </button>
        </>
      }
    </div>
  )
}