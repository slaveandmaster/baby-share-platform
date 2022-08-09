import React from 'react'

export default function Review({reviewItem}) {
  return (
    <div>
         <article className="review-item">
            <p className="review-author">{reviewItem.name}</p>
            <p className="review-comment">
              {reviewItem.comment}
            </p>
          </article>
    </div>
  )
}
