/**
 * Created by swbr1212 on 2016. 3. 18..
 */
var Comment = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                안녕! 난 댓글 폼이야.
            </div>
        );
    }
});
var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>댓글</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});
var data = [
    {author: "Pete Hunt", text: "댓글입니다"},
    {author: "Jordan Walke", text: "*또 다른* 댓글입니다"}
];
ReactDOM.render(
    <CommentBox url="api/comments.json" pollInterval={2000} />,
    document.getElementById('content')
);