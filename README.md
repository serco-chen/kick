# Memorable

Javascript API client library.

**Note**
If something doesn't work, feel free to report a bug or start an issue.

## Dependency
jQuery >= 1.5

## Usage

```javascript
// fire a "GET" request to "/posts/2/comments?q=nick"
Kick("posts", 2, "comments").get({q: "nick"})
// return a XMLHttpRequest object

// fire a "POST" request to "/posts/2/comments", with contentType of "application/json"
Kick("posts", 2, "comments").post({content: "Hello world!"}).success(function(message){
  alert(message);
}).fail(function(error){
  console.log(error);
});
```

**Caution**
A extra "/" will prepend to the request url if there's none.
If you do not like the behavior, you can turn it off in the single request by

```javascript
// fire a "GET" request to "posts/2/comments?q=nick"
Kick("posts", 2, "comments").relative().get({q: "nick"})
```

