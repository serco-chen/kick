# Kick.js

Javascript API client library.

**说明**
如果有任何问题，请随时跟我联系，issue 或者 email 都欢迎。

## 依赖
jQuery >= 1.5

## 使用方法

```javascript
// 发起一个 "GET" 请求到 "/posts/2/comments?q=nick"
Kick("posts", 2, "comments").get({q: "nick"})
// 返回一个 XMLHttpRequest object

// 发起一个 "POST" 请求到 "/posts/2/comments", 并设置 contentType 为 "application/json"
Kick("posts", 2, "comments").post({content: "Hello world!"}).success(function(message){
  alert(message);
}).fail(function(error){
  console.log(error);
});
```

**注意**
url 最前面会自动添加一个"/", 如果本身没有的话。
如果这不是你想要的，你可以通过调用 `relative()` 方法，在单次调用中关闭这个行为

```javascript
// fire a "GET" request to "posts/2/comments?q=nick"
Kick("posts", 2, "comments").relative().get({q: "nick"})
```

