import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    let commentNodes = data.map(comment => {
      return (
        <Comment author={comment.author} key={comment._id}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div style={style.commentList}>
        {commentNodes}
      </div>
    )
  }
}

export default CommentList;
