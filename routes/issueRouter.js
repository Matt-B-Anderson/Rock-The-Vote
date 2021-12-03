const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const Comment = require('../models/comment')

// Get All Issues
issueRouter.get("/", (req, res, next) => {
    Issue.find().sort({ votes: 'desc' })
        .populate('comments')
        .exec(function (err, issues) {
            if (err) {
                res.status(500)
                return next(err)
            }
            const transformedIssues = issues.map(transformVotes).sort((a, b) => b.votes - a.votes)
            return res.status(200).send(transformedIssues)
        })

})


//Get User Issues
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id })
        .populate('comments')
        .exec(function (err, issues) {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues.map(transformVotes))
        })
})

// Add new Issue
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Add comment to Issue
issueRouter.post("/comments/:issueId", (req, res, next) => {
    req.body.user = req.user._id
    req.body.issue = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        Issue.updateOne({ _id: req.params.issueId },
            { $push: { comments: savedComment._id } }, (err, issue) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(savedComment)
            })
    })
})

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.user._id },
        (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            console.log(deletedIssue)
            return res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}.`)
        }
    )
})

// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(transformVotes(updatedIssue))
        }
    )
})

//Upvote or Downvote an Issue
issueRouter.put("/vote/:issueId/:type", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, 'votes.userId': { $ne: req.user._id } },
        { $push: { votes: { userId: req.user._id, voteType: req.params.type === 'increment' ? 1 : -1 } } },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            console.log(updatedIssue)
            return res.status(201).send(updatedIssue ? transformVotes(updatedIssue) : null)
        }
    )
})

function transformVotes(issue) {
    if (!issue.votes) {
        issue.votes = []
    }
    const test = issue.votes.reduce((total, vote) => {
        return total += vote.voteType
    }, 0)
    issue.votes = test
    return issue
}

module.exports = issueRouter