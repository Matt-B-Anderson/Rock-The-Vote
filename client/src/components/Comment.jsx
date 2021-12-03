import React from 'react'

export default function Comment(props) {
    const { comment } = props
    return (
        <div>
            <p>{comment}</p>
        </div>
    )
}